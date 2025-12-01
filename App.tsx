import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import Sidebar from './components/Sidebar';
import { Message, Role } from './types';
import { sendMessageStream, resetChat } from './services/geminiService';

// Simple UUID generator since we can't install packages
const generateId = () => Math.random().toString(36).substring(2, 15);

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    // 1. Add User Message
    const userMessage: Message = {
      id: generateId(),
      role: Role.USER,
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 2. Prepare Placeholder for Bot Message
    const botMessageId = generateId();
    const botMessagePlaceholder: Message = {
      id: botMessageId,
      role: Role.MODEL,
      content: '', // Start empty
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessagePlaceholder]);

    try {
      let accumulatedText = '';

      // 3. Stream Response
      await sendMessageStream(text, (chunkText) => {
        accumulatedText += chunkText;
        
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMessageId 
              ? { ...msg, content: accumulatedText } 
              : msg
          )
        );
      });

      // 4. Finalize
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMessageId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (error) {
      console.error("Chat error:", error);
      // Update the placeholder with error state
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMessageId 
            ? { 
                ...msg, 
                content: "I'm sorry, I encountered an error. Please try again.", 
                isStreaming: false,
                isError: true
              } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    resetChat();
  };

  return (
    <div className="flex h-screen supports-[height:100dvh]:h-[100dvh] bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={handleReset}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full w-full relative transition-all duration-300 min-w-0">
        <Header 
          onReset={handleReset} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-hidden relative flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 text-center text-slate-400">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-3">Welcome to Gemini Chat</h2>
              <p className="max-w-md mx-auto text-sm sm:text-base leading-relaxed text-slate-500">
                Start a conversation to see the power of the Gemini 2.5 Flash model in action.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth custom-scrollbar">
               <div className="max-w-3xl mx-auto">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            </div>
          )}

          <div className="flex-shrink-0 z-10 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-4 pb-2">
             <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;