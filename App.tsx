import React, { useState } from 'react';
import Header from './components/Header';
import MatchSelector from './components/MatchSelector';
import AnalysisDashboard from './components/AnalysisDashboard';
import { analyzeMatch } from './services/geminiService';
import { MatchQuery, AnalysisData, AnalysisStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (query: MatchQuery) => {
    setStatus(AnalysisStatus.SEARCHING);
    setError(null);
    setAnalysisData(null);

    try {
      // Small artificial delay to show UI state change if API is too fast (unlikely but good UX)
      // and to allow user to see the "Running" state.
      const data = await analyzeMatch(query);
      setAnalysisData(data);
      setStatus(AnalysisStatus.COMPLETED);
    } catch (err) {
      console.error(err);
      setError("Unable to complete analysis. Please check your network connection or API limits.");
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans pb-12">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-wh-navy tracking-tight">
            Strategic Intelligence Center
          </h2>
          <p className="mt-2 text-gray-600">
            Advanced algorithmic analysis for identifying market inefficiencies in global football leagues.
          </p>
        </div>

        <MatchSelector 
          onAnalyze={handleAnalyze} 
          disabled={status === AnalysisStatus.SEARCHING || status === AnalysisStatus.ANALYZING} 
        />

        {status === AnalysisStatus.SEARCHING && (
           <div className="flex flex-col items-center justify-center py-20 animate-pulse">
             <div className="w-16 h-16 border-4 border-wh-navy border-t-wh-yellow rounded-full animate-spin mb-4"></div>
             <p className="text-lg font-medium text-wh-navy">Aggregating Global Data Sources...</p>
             <p className="text-sm text-gray-500">Scanning match history, odds movements, and league metrics.</p>
           </div>
        )}

        {status === AnalysisStatus.ERROR && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error || "An unexpected error occurred."}
                </p>
              </div>
            </div>
          </div>
        )}

        {status === AnalysisStatus.COMPLETED && analysisData && (
          <AnalysisDashboard data={analysisData} />
        )}
      </main>
    </div>
  );
};

export default App;
