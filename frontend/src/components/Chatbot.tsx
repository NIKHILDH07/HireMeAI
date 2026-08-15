import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types/chat';
import { sendChatMessage, ApiClientError } from '../services/api';

const BotIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ArrowUpRightIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const RefreshIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const CopyIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const STARTER_QUESTIONS = [
  "What are Nikhil's strongest technical skills & tech stack?",
  "Tell me about the Memory Decay Simulator project.",
  "What is Nikhil's experience with Python, FastAPI, and AI?",
  "What certifications and education does Nikhil hold?",
];

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Container-scoped scroll ONLY - never scrolls the main window/page
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (questionToSend?: string) => {
    const text = (questionToSend || inputQuestion).trim();
    if (!text || isLoading) return;

    setErrorMessage(null);
    setInputQuestion('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      let displayError = 'An error occurred while communicating with the AI service.';

      if (err instanceof ApiClientError) {
        displayError = err.message;
      } else if (err instanceof Error) {
        displayError = err.message;
      }

      setErrorMessage(displayError);

      const errorAiMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `Error: ${displayError}`,
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setErrorMessage(null);
  };

  const retryLastMessage = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSend(lastUserMessage.content);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="chat" className="relative py-24 sm:py-32 border-t border-white/10 bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-16 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-mono tracking-widest text-white/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>// INTERACTIVE AI</span>
          </div>
          <h2 className="font-heading italic text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.05]">
            Meet My AI Twin.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light max-w-xl mx-auto leading-relaxed">
            Ask questions about my projects, skills, experience, and technical journey. Grounded directly in verified resume data via Groq LLaMA 3.3.
          </p>
        </div>

        {/* Liquid Glass Console Frame */}
        <div className="liquid-glass-strong rounded-[1.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[650px] sm:h-[700px] relative">
          
          {/* Console Header Bar */}
          <div className="px-6 py-4 border-b border-white/5 bg-black/60 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <BotIcon className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white text-sm">Nikhil&apos;s AI Representative</h3>
                  <span className="font-mono text-[10px] text-white/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10 hidden sm:inline-block">
                    Groq LLaMA 3.3 70B
                  </span>
                </div>
                <p className="font-mono text-[11px] text-white/40">Grounded exclusively in verified profile data</p>
              </div>
            </div>

            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                title="Reset Conversation"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Messages Feed Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            
            {/* Empty State */}
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8 space-y-8">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white">
                  <BotIcon className="w-7 h-7" />
                </div>
                
                <div className="max-w-md space-y-2">
                  <h4 className="font-heading italic text-2xl text-white font-normal">Ask anything about my experience</h4>
                  <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    Select a starter prompt below or enter any technical question. The AI responds strictly from verified facts.
                  </p>
                </div>

                {/* Starter Prompts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                  {STARTER_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="p-3.5 text-left text-xs font-mono text-white/80 liquid-glass hover:bg-white/[0.06] hover:text-white rounded-2xl transition-all duration-200 flex items-center justify-between group"
                    >
                      <span className="line-clamp-2">{q}</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/30 group-hover:text-white flex-shrink-0 ml-2 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Bubbles */}
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.isError ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-white/10 text-white border border-white/15'
                    }`}>
                      {msg.isError ? <AlertIcon className="w-3.5 h-3.5" /> : <BotIcon className="w-3.5 h-3.5" />}
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 text-sm leading-relaxed relative group ${
                      msg.role === 'user'
                        ? 'bg-white text-black font-normal rounded-tr-none shadow-md'
                        : msg.isError
                        ? 'bg-rose-950/40 text-rose-200 border border-rose-800/40 rounded-tl-none font-light'
                        : 'liquid-glass text-white/90 border border-white/10 rounded-tl-none whitespace-pre-wrap font-light'
                    }`}
                  >
                    {msg.content}
                    
                    <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-white/40">
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      
                      {msg.role === 'assistant' && !msg.isError && (
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-white rounded"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <CheckIcon className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <CopyIcon className="w-3 h-3 text-white/40" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center flex-shrink-0 mt-1">
                      <UserIcon className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3.5 justify-start"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center flex-shrink-0 mt-1">
                  <BotIcon className="w-3.5 h-3.5" />
                </div>
                <div className="liquid-glass rounded-3xl rounded-tl-none px-5 py-4 text-xs font-mono text-white/70 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-white/40">Synthesizing resume knowledge...</span>
                </div>
              </motion.div>
            )}

          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mx-6 mb-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-between text-xs text-rose-300 font-mono">
              <div className="flex items-center gap-2">
                <AlertIcon className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={retryLastMessage}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 ml-3 underline underline-offset-2"
              >
                <RefreshIcon className="w-3 h-3" />
                Retry
              </button>
            </div>
          )}

          {/* Input Controls */}
          <div className="p-4 sm:p-5 border-t border-white/5 bg-black/70 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask about Nikhil's skills, projects, or background..."
                className="flex-1 bg-white/[0.04] border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none transition-colors disabled:opacity-50 font-light"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !inputQuestion.trim()}
                className="p-3.5 bg-white text-black hover:bg-neutral-200 disabled:opacity-30 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                {isLoading ? (
                  <RefreshIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <SendIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
