import React from 'react';
import { motion } from 'framer-motion';

const BrainIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M12 18v4" />
  </svg>
);

const CodeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CloudIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

const GraduationIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

export const AboutSection: React.FC = () => {
  const capabilityCards = [
    {
      title: 'AI & Machine Learning',
      icon: BrainIcon,
      tags: ['Python', 'PyTorch', 'Groq LLaMA', 'LLM Engineering', 'Predictive Modeling'],
      desc: 'Developing fine-tuned prompt pipelines, semantic LLM orchestration, and machine learning models for predictive analysis and retention modeling.',
    },
    {
      title: 'Full-Stack Engineering',
      icon: CodeIcon,
      tags: ['React', 'FastAPI', 'TypeScript', 'JavaScript', 'MongoDB', 'RESTful APIs'],
      desc: 'Architecting high-performance asynchronous API backends with FastAPI and building responsive, fluid frontends with React and modern UI systems.',
    },
    {
      title: 'Cloud & Automation',
      icon: CloudIcon,
      tags: ['AWS', 'Azure', 'N8N Automation', 'PowerBI', 'SQL Schemas'],
      desc: 'Cloud infrastructure provisioning, automated data extraction workflows, document datastores, and executive business analytics.',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-white/10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 space-y-16 sm:space-y-20">
        
        {/* Editorial Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span>// CAPABILITIES</span>
          </div>
          <h2 className="font-heading italic text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.05]">
            Building intelligent systems, end to end.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Combining algorithmic rigor with modern full-stack development to build deterministic, fast, and scalable digital solutions.
          </p>
        </div>

        {/* 3 Major Liquid-Glass Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilityCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="liquid-glass liquid-glass-hover rounded-[1.25rem] p-6 sm:p-7 min-h-[360px] flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading italic text-2xl sm:text-3xl text-white font-normal">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-1.5">
                  {card.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-[11px] font-mono text-white/80 rounded-lg bg-white/[0.04] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Background & Education Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          
          {/* Engineering Narrative */}
          <div className="lg:col-span-8 liquid-glass rounded-[1.25rem] p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block">
                ENGINEERING PROFILE
              </span>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
                I specialize in bridging the gap between theoretical machine learning models and production full-stack software. From architecting async backend APIs with FastAPI to training and fine-tuning predictive algorithms, I engineer systems designed for low latency and high accuracy.
              </p>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                My work spans intelligent simulation engines like the Memory Decay Simulator and automated unstructured data extractors like the AI Resume Parser.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">PRIMARY FOCUS</span>
                <span className="text-white mt-0.5 block">AI & Full-Stack</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">CORE LANGUAGE</span>
                <span className="text-white mt-0.5 block">Python & TS</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">LOCATION</span>
                <span className="text-white mt-0.5 block">Bengaluru, IN</span>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="lg:col-span-4 liquid-glass rounded-[1.25rem] p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                <GraduationIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block">
                  ACADEMIC FOUNDATION
                </span>
                <h3 className="font-heading italic text-2xl text-white font-normal mt-1">
                  B.E. in Computer Science
                </h3>
                <p className="text-xs text-white/80 font-normal mt-1">
                  AMC Engineering College
                </p>
                <p className="text-[11px] text-white/40 font-mono mt-0.5">
                  Bengaluru, India • 2023 – 2027
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/50">CUMULATIVE GPA</span>
                <span className="text-white font-semibold px-2 py-0.5 rounded bg-white/10 border border-white/15">
                  7.9 / 10.0
                </span>
              </div>
              <p className="text-[11px] text-white/50 leading-normal font-light">
                Core coursework in DSA, Operating Systems, Machine Learning, DBMS, and Distributed Systems.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
