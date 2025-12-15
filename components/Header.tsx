import React from 'react';
import { BarChart3, Globe2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-wh-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-wh-yellow p-1.5 rounded-md text-wh-navy">
            <BarChart3 size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">William's Quant Edge</h1>
            <p className="text-xs text-wh-gold font-medium uppercase tracking-widest">Global Intelligence Unit</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
          <div className="flex items-center space-x-2">
             <Globe2 size={16} className="text-wh-yellow" />
             <span>Network Status: <span className="text-green-400">Online</span></span>
          </div>
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-white border border-white/20">
            v2.5.0 Flash
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
