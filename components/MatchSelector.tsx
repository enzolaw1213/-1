import React, { useState } from 'react';
import { Search, Trophy } from 'lucide-react';
import { MatchQuery } from '../types';

interface MatchSelectorProps {
  onAnalyze: (query: MatchQuery) => void;
  disabled: boolean;
}

const MatchSelector: React.FC<MatchSelectorProps> = ({ onAnalyze, disabled }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [league, setLeague] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam && awayTeam) {
      onAnalyze({ homeTeam, awayTeam, league });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4 text-wh-navy">
        <Trophy size={20} />
        <h2 className="text-lg font-bold uppercase">Match Configuration</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="col-span-1 md:col-span-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">League (Optional)</label>
          <input
            type="text"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            placeholder="e.g. Premier League"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-wh-navy focus:border-wh-navy block p-2.5 transition-colors"
          />
        </div>
        <div className="col-span-1 md:col-span-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Home Team</label>
          <input
            type="text"
            required
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            placeholder="e.g. Manchester City"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-wh-navy focus:border-wh-navy block p-2.5 transition-colors"
          />
        </div>
        <div className="flex items-center justify-center pb-3 text-gray-400 font-bold text-sm">VS</div>
        <div className="col-span-1 md:col-span-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Away Team</label>
          <input
            type="text"
            required
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            placeholder="e.g. Arsenal"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-wh-navy focus:border-wh-navy block p-2.5 transition-colors"
          />
        </div>
        <div className="col-span-1 md:col-span-4 mt-2">
           <button
            type="submit"
            disabled={disabled}
            className={`w-full flex items-center justify-center space-x-2 text-white bg-wh-navy hover:bg-[#002543] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {disabled ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Running Quantitative Models...</span>
              </>
            ) : (
              <>
                <Search size={18} />
                <span>Initialize Analysis Sequence</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchSelector;
