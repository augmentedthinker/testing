import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative group rounded-2xl bg-white shadow-lg shadow-indigo-900/5 border border-gray-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 transition-all duration-300">
        <form onSubmit={handleSubmit} className="flex items-end p-2">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a topic (e.g., Democracy vs Monarchy) to see historical figures debate..."
            className="w-full max-h-32 min-h-[44px] py-2.5 px-3 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 resize-none font-medium leading-relaxed custom-scrollbar"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`flex-shrink-0 ml-2 mb-1 p-2 rounded-xl transition-all duration-200 ${
              text.trim() && !isLoading
                ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-105 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={20} className={text.trim() ? 'ml-0.5' : ''} />
            )}
          </button>
        </form>
        
        {/* Decorative corner accent */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-[2px]" />
      </div>
      <div className="text-center mt-3">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <Sparkles size={12} className="text-indigo-400" />
          Powered by Gemini 2.5 Flash
        </p>
      </div>
    </div>
  );
};

export default ChatInput;