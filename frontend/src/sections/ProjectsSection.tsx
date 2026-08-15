import React from 'react';
import { motion } from 'framer-motion';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-white/10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span>// PROJECTS</span>
          </div>
          <h2 className="font-heading italic text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.05]">
            Projects.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Full-stack machine learning applications, predictive retention simulators, and automated parsing pipelines.
          </p>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Project 1: Memory Decay Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 liquid-glass liquid-glass-hover rounded-[1.25rem] p-8 sm:p-10 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    FULL-STACK AI APPLICATION
                  </span>
                  <h3 className="font-heading italic text-3xl sm:text-4xl text-white font-normal pt-1">
                    Memory Decay Simulator
                  </h3>
                </div>

                <a
                  href="https://github.com/NIKHILDH07"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass-pill p-2.5 rounded-full text-white/70 hover:text-white hover:border-white/30 transition-all"
                  title="View Repository on GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                An interactive cognitive retention simulator modeling the <strong className="text-white font-normal">Ebbinghaus Forgetting Curve</strong>. Combines machine learning algorithms (XGBoost, Scikit-learn) with Groq LLaMA to forecast knowledge decay rates and formulate personalized study schedules.
              </p>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest block">KEY ARCHITECTURAL HIGHLIGHTS</span>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70 font-light">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-white flex-shrink-0 mt-1" />
                    <span>Engineered end-to-end full-stack platform with React, Vite, FastAPI, and MongoDB.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-white flex-shrink-0 mt-1" />
                    <span>Embedded Groq LLaMA 3.1 for automated personalized study recommendations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-white flex-shrink-0 mt-1" />
                    <span>Implemented secure JWT authentication and user retention tracking telemetry.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-1.5">
              {['FastAPI', 'React', 'Groq LLaMA', 'MongoDB', 'PyTorch', 'XGBoost', 'JWT'].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-[11px] font-mono text-white/80 rounded-lg bg-white/[0.04] border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project 2: AI Resume Parser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 liquid-glass liquid-glass-hover rounded-[1.25rem] p-8 sm:p-10 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    EXTRACTION ENGINE
                  </span>
                  <h3 className="font-heading italic text-3xl sm:text-4xl text-white font-normal pt-1">
                    AI Resume Parser
                  </h3>
                </div>

                <a
                  href="https://github.com/NIKHILDH07"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass-pill p-2.5 rounded-full text-white/70 hover:text-white hover:border-white/30 transition-all"
                  title="View Repository on GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                An automated parsing engine converting unstructured resume documents (PDF, DOCX) into validated, structured candidate profiles and schemas via LLM extraction.
              </p>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest block">KEY ARCHITECTURAL HIGHLIGHTS</span>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70 font-light">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-white flex-shrink-0 mt-1" />
                    <span>Semantic candidate data normalization recognizing varied section formats.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-white flex-shrink-0 mt-1" />
                    <span>Integrated PyPDF, python-docx, and Pydantic validation schemas.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-1.5">
              {['Python', 'FastAPI', 'LLM Engineering', 'PyPDF', 'Pydantic', 'JSON Schema'].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-[11px] font-mono text-white/80 rounded-lg bg-white/[0.04] border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
