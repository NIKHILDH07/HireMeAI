import React from 'react';
import { motion } from 'framer-motion';

const ArrowUpRightIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ArrowDownIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export const Hero: React.FC = () => {
  const capabilities = [
    { label: 'AI / ML', desc: 'Groq LLaMA & ML models' },
    { label: 'FULL STACK', desc: 'FastAPI, React & Python' },
    { label: 'CLOUD', desc: 'AWS & Oracle certified' },
    { label: 'AUTOMATION', desc: 'Pipelines & Workflows' },
  ];

  const technologies = ['React', 'Python', 'FastAPI', 'Groq', 'AWS', 'PyTorch', 'MongoDB'];

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8 px-5 sm:px-8 lg:px-16 select-none bg-transparent">
      
      {/* Hero Badge */}
      <div className="max-w-5xl mx-auto w-full flex justify-center pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-[11px] font-mono tracking-widest text-white uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AI / FULL-STACK ENGINEER</span>
        </motion.div>
      </div>

      {/* Center Cinematic Content */}
      <div className="max-w-4xl mx-auto w-full text-center my-auto py-2 sm:py-4 space-y-4 sm:space-y-6">
        
        {/* Main Hero Heading: NIKHIL HOSKATTA */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading italic text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-normal text-white tracking-tight leading-[0.95] uppercase"
        >
          Nikhil Hoskatta
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-xl mx-auto leading-relaxed"
        >
          AI and full-stack engineer building practical intelligent systems, immersive interfaces, and automation-driven products.
        </motion.p>

        {/* Dual Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="#chat"
            className="liquid-glass-pill text-white hover:bg-white/10 rounded-full px-6 py-3 text-xs sm:text-sm font-medium transition-all flex items-center gap-2 shadow-lg"
          >
            <span className="text-white">Talk to My AI</span>
            <ArrowUpRightIcon className="w-4 h-4 text-white" />
          </a>

          <a
            href="#projects"
            className="liquid-glass-pill rounded-full px-6 py-3 text-xs sm:text-sm font-normal text-white hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <span>View My Work</span>
            <ArrowDownIcon className="w-4 h-4 text-white/60" />
          </a>
        </motion.div>

      </div>

      {/* Bottom Capabilities & Tech Highlights */}
      <div className="max-w-7xl mx-auto w-full space-y-4 pt-2">
        
        {/* Real Portfolio Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {capabilities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + idx * 0.08 }}
              className="liquid-glass p-3.5 sm:p-4 rounded-2xl flex flex-col justify-between"
            >
              <span className="font-mono text-xs sm:text-sm font-semibold text-white tracking-tight">
                {item.label}
              </span>
              <span className="text-[10px] sm:text-xs text-white/60 lowercase mt-0.5">
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tech Bar */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-white/50 overflow-x-auto gap-4">
          <span className="text-white/40 uppercase tracking-widest flex-shrink-0">CORE TECH:</span>
          <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
            {technologies.map((tech, i) => (
              <span key={i} className="text-white/70 hover:text-white transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
