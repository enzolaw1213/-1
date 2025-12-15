export interface MatchQuery {
  homeTeam: string;
  awayTeam: string;
  league?: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface AnalysisData {
  summary: string;
  leagueAnalysis: string;
  h2hAnalysis: string;
  oddsAnalysis: string;
  recommendation: string;
  confidenceScore: number;
  sources: GroundingSource[];
  simulatedOddsHistory: {
    time: string;
    home: number;
    draw: number;
    away: number;
  }[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  SEARCHING = 'SEARCHING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}
