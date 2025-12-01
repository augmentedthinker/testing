import React from 'react';
import { Plus, MessageSquare, X, Settings, HelpCircle, History } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat }) => {
  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col h-full border-r border-slate-800 shadow-2xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="font-bold text-white text-lg tracking-tight">Menu</span>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-4 pt-2 lg:pt-5">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-900/20 group hover:shadow-indigo-500/20 border border-indigo-500/50"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">New Debate</span>
          </button>
        </div>

        {/* Navigation / History */}
        <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
          <div className="mb-8">
            <h3 className="flex items-center gap-2 px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <History size={12} />
              Recent Topics
            </h3>
            <div className="space-y-1">
              {['AI vs Human Art', 'Universal Basic Income', 'Space Exploration Cost', 'Remote vs Office Work'].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left group"
                >
                  <MessageSquare size={16} className="flex-shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  <span className="truncate opacity-90 group-hover:opacity-100">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-1 bg-slate-950">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <HelpCircle size={18} />
            <span>Help & FAQ</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;