import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, AlertCircle, Mic2 } from 'lucide-react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const isError = message.isError;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
          isUser 
            ? 'bg-indigo-600 text-white' 
            : isError 
              ? 'bg-red-100 text-red-600'
              : 'bg-white border border-gray-200 text-purple-600'
        }`}>
          {isUser ? <User size={16} /> : isError ? <AlertCircle size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed overflow-hidden break-words ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-sm' 
              : isError
                ? 'bg-red-50 border border-red-100 text-red-800 rounded-tl-sm'
                : 'bg-white border border-gray-100 text-slate-800 rounded-tl-sm'
          }`}>
            {isError ? (
               <span>{message.content}</span>
            ) : (
              <ReactMarkdown
                className="prose prose-sm max-w-none break-words"
                components={{
                  // Speaker Label styling for H3
                  h3: ({ node, ...props }) => (
                    <div className="flex items-center gap-2 mt-6 mb-2 pt-2 border-t border-slate-100 first:mt-0 first:border-t-0 first:pt-0">
                      <div className="p-1 bg-indigo-100 text-indigo-600 rounded-md">
                        <Mic2 size={12} />
                      </div>
                      <h3 className={`font-bold text-xs uppercase tracking-wider text-indigo-600`} {...props} />
                    </div>
                  ),
                  p: ({ node, ...props }) => <p className={`mb-2 last:mb-0 ${isUser ? 'text-indigo-50' : 'text-slate-700'}`} {...props} />,
                  strong: ({ node, ...props }) => <strong className={`font-semibold ${isUser ? 'text-white' : 'text-slate-900'}`} {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                  li: ({ node, ...props }) => <li className="" {...props} />,
                  code: ({ node, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match && !String(children).includes('\n');
                    return isInline ? (
                      <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${isUser ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-800'}`} {...props}>
                        {children}
                      </code>
                    ) : (
                      <div className="rounded-lg overflow-hidden my-3 border border-slate-200 bg-slate-900 shadow-sm">
                         <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/50 border-b border-slate-800 text-xs text-slate-400">
                           <span>{match?.[1] || 'code'}</span>
                         </div>
                         <pre className="p-3 overflow-x-auto text-xs text-slate-200 font-mono">
                           <code className={className} {...props}>
                             {children}
                           </code>
                         </pre>
                      </div>
                    );
                  },
                  a: ({ node, ...props }) => <a className="underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity" target="_blank" rel="noopener noreferrer" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
            
            {message.isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 align-middle bg-emerald-500 animate-pulse rounded-sm" />
            )}
          </div>
          
          <span className="text-[10px] text-gray-400 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;