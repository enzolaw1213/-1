import { GoogleGenAI } from "@google/genai";
import { AnalysisData, MatchQuery } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMatch = async (query: MatchQuery): Promise<AnalysisData> => {
  const modelId = "gemini-2.5-flash"; // Using Flash for speed + search capability

  const prompt = `
    Role: You are the Chief Data Scientist for William Hill.
    Task: Analyze the match between ${query.homeTeam} and ${query.awayTeam} ${query.league ? `in the ${query.league}` : ''}.
    
    You MUST use Google Search to find REAL, up-to-date information about:
    1. Recent form of both teams.
    2. Head-to-Head (H2H) history.
    3. League characteristics (e.g., goal averages, home advantage bias).
    4. Current market odds (European 1x2 and Asian Handicap) if available.
    
    Output Format:
    Provide a comprehensive analysis structured with the following sections. 
    IMPORTANT: You must include a JSON block at the very end of your response containing simulated or real historical odds data for visualization.
    
    Structure:
    ## League & Context
    (Qualitative analysis of the league's style and team tiers)
    
    ## H2H & Form Fact-Check
    (Verified data on past meetings and recent performance)
    
    ## Odds & Market Logic
    (Analyze the movement of European Odds vs Asian Handicap. Identify if there is "False Odds" or "Induction")
    
    ## Quantifiable Action Plan
    (Specific recommendation with confidence level)
    
    ## JSON_DATA
    \`\`\`json
    {
      "simulatedOddsHistory": [
        {"time": "Opening", "home": 1.95, "draw": 3.4, "away": 3.8},
        {"time": "24h Pre", "home": 1.90, "draw": 3.5, "away": 4.0},
        {"time": "12h Pre", "home": 1.98, "draw": 3.4, "away": 3.7},
        {"time": "1h Pre", "home": 2.05, "draw": 3.3, "away": 3.6}
      ],
      "confidenceScore": 85
    }
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    
    // Extract Sources
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri && web.title) || [];

    // Parse Sections manually since we can't force JSON with Search
    const summary = text.substring(0, 300) + "..."; // Brief intro
    
    // Helper to extract section content
    const extractSection = (header: string): string => {
      const regex = new RegExp(`## ${header}([\\s\\S]*?)(##|$)`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : "Analysis pending...";
    };

    const leagueAnalysis = extractSection("League & Context");
    const h2hAnalysis = extractSection("H2H & Form Fact-Check");
    const oddsAnalysis = extractSection("Odds & Market Logic");
    const recommendation = extractSection("Quantifiable Action Plan");

    // Extract JSON Data
    let jsonPart = { simulatedOddsHistory: [], confidenceScore: 0 };
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      try {
        jsonPart = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse embedded JSON", e);
      }
    }

    return {
      summary,
      leagueAnalysis,
      h2hAnalysis,
      oddsAnalysis,
      recommendation,
      confidenceScore: jsonPart.confidenceScore || 0,
      simulatedOddsHistory: jsonPart.simulatedOddsHistory || [],
      sources,
    };

  } catch (error) {
    console.error("Analysis Failed", error);
    throw new Error("Failed to analyze match data.");
  }
};
