import React from 'react';
import { AnalysisData } from '../types';
import { TrendingUp, ShieldAlert, LineChart as ChartIcon, ExternalLink, Award } from 'lucide-react';
import OddsChart from './OddsChart';
import ReactMarkdown from 'react-markdown'; // Actually, we will render simple text since we stripped markdown manually or let's use a simple renderer.
// Note: To keep it single file dependency simple without extra packages if not requested, I'll render the text directly with paragraphs.
// But the prompt allows using existing libraries. I will implement a simple text renderer to avoid complex deps if `react-markdown` isn't strictly requested.
// Wait, prompt says "Use popular and existing libraries". I will assume standard React text rendering for simplicity in this generated code block.

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  colorClass?: string;
}

const AnalysisSection: React.FC<SectionProps> = ({ title, icon, content, colorClass = "text-wh-navy" }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
    <div className={`flex items-center space-x-2 mb-4 ${colorClass}`}>
      {icon}
      <h3 className="text-lg font-bold uppercase">{title}</h3>
    </div>
    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
      {content}
    </div>
  </div>
);

interface AnalysisDashboardProps {
  data: AnalysisData;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ data }) => {
  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recommendation Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-wh-navy to-[#002543] rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Award size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2 text-wh-gold">
              <TrendingUp size={20} />
              <span className="font-bold uppercase tracking-wider text-sm">Primary Strategy</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">{data.recommendation}</h2>
            <div className="flex items-center space-x-4">
               <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                 <span className="text-xs text-gray-300 block uppercase">Confidence Model</span>
                 <span className="text-2xl font-bold text-wh-yellow">{data.confidenceScore}%</span>
               </div>
               <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                 <span className="text-xs text-gray-300 block uppercase">Risk Level</span>
                 <span className={`text-2xl font-bold ${data.confidenceScore > 75 ? 'text-green-400' : 'text-orange-400'}`}>
                   {data.confidenceScore > 75 ? 'LOW' : 'MED'}
                 </span>
               </div>
            </div>
          </div>
        </div>

        {/* Sources Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center space-x-2 mb-4 text-gray-600">
            <ExternalLink size={20} />
            <h3 className="font-bold uppercase text-sm">Verified Sources</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-40 space-y-3">
             {data.sources.length > 0 ? (
               data.sources.map((source, idx) => (
                 <a 
                   key={idx} 
                   href={source.uri} 
                   target="_blank" 
                   rel="noreferrer"
                   className="block p-3 bg-gray-50 rounded border border-gray-100 hover:border-wh-navy/30 transition-colors group"
                 >
                   <p className="text-xs font-semibold text-wh-navy truncate group-hover:text-blue-600">{source.title}</p>
                   <p className="text-[10px] text-gray-400 truncate mt-1">{source.uri}</p>
                 </a>
               ))
             ) : (
               <p className="text-sm text-gray-400 italic">No direct sources linked via API.</p>
             )}
          </div>
        </div>
      </div>

      {/* Main Analysis Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
           <AnalysisSection 
             title="League & Context Attributes" 
             icon={<Globe2Icon />} 
             content={data.leagueAnalysis}
           />
           <AnalysisSection 
             title="Fact-Check: H2H & Form" 
             icon={<ShieldAlert size={20} />} 
             content={data.h2hAnalysis}
             colorClass="text-red-700"
           />
        </div>
        
        <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-center space-x-2 mb-2 text-wh-navy">
               <ChartIcon size={20} />
               <h3 className="text-lg font-bold uppercase">Odds & Market Logic</h3>
             </div>
             <p className="text-sm text-gray-700 mb-4 whitespace-pre-line">{data.oddsAnalysis}</p>
             <OddsChart data={data.simulatedOddsHistory} />
           </div>
        </div>
      </div>
    </div>
  );
};

// Simple Icon component to avoid Lucide import error if specific icon missing, mainly structural
const Globe2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
)

export default AnalysisDashboard;
