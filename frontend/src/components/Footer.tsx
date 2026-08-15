import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono text-[10px] font-bold text-white">
            N
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-sm text-white">Nikhil Hoskatta</span>
            <span className="font-mono text-[10px] text-white/40 uppercase">
              • AI / Full-Stack Engineer
            </span>
          </div>
        </div>

        <p className="text-xs font-mono text-white/40 text-center">
          FastAPI • Groq LLaMA 3.3 • Interactive AI Twin
        </p>

        <p className="text-xs font-mono text-white/40">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};
