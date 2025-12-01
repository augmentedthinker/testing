import React from 'react';
import { Gavel, RefreshCw, Menu } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo Section */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-indigo-500/20 shadow-lg">
              <Gavel size={20} />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg tracking-tight hidden sm:block">Debate Arena</h1>
              <h1 className="font-bold text-slate-800 text-lg tracking-tight sm:hidden">Debate</h1>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] md:text-[11px] font-medium text-slate-500 uppercase tracking-wider">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onReset}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          title="Reset Debate"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;