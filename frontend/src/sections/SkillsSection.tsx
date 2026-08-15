import React from 'react';
import { motion } from 'framer-motion';

const TerminalIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const GlobeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CpuIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const DatabaseIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const LayersIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      category: 'Languages & Core',
      icon: TerminalIcon,
      skills: ['Python', 'Java', 'JavaScript', 'SQL'],
      desc: 'Object-oriented programming, algorithmic structures, and scripting.',
    },
    {
      category: 'Full-Stack & APIs',
      icon: GlobeIcon,
      skills: ['FastAPI', 'React.js', 'Node.js', 'Tailwind CSS', 'Vite', 'RESTful APIs'],
      desc: 'Asynchronous APIs, component architectures, and responsive interfaces.',
    },
    {
      category: 'Machine Learning & Data',
      icon: CpuIcon,
      skills: ['Scikit-learn', 'PyTorch', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib'],
      desc: 'Predictive mathematical modeling, data pipelines, and retention curve simulations.',
    },
    {
      category: 'Cloud & Databases',
      icon: DatabaseIcon,
      skills: ['AWS', 'Microsoft Azure', 'MongoDB', 'SQL', 'Git', 'GitHub'],
      desc: 'Cloud compute services, document datastores, relational schemas, and CI/CD.',
    },
    {
      category: 'AI & Automation Tools',
      icon: LayersIcon,
      skills: ['Groq LLaMA', 'Prompt Engineering', 'LLM Systems', 'PowerBI', 'N8N Automation'],
      desc: 'LLM orchestration, structured output parsing, and enterprise analytics.',
    },
  ];

  return (
    <section id="skills" className="relative py-24 sm:py-32 border-t border-white/10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span>// TECHNICAL STACK</span>
          </div>
          <h2 className="font-heading italic text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.05]">
            Engineering toolkit & stack.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Verified technologies across backend development, machine learning pipelines, and cloud computing.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="liquid-glass liquid-glass-hover rounded-[1.25rem] p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] uppercase text-white/40">
                      SYS // 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading italic text-2xl text-white font-normal">{cat.category}</h3>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed font-light">{cat.desc}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.03] text-white/80 border border-white/5 hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
