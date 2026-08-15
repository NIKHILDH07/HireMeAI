import React from 'react';
import { motion } from 'framer-motion';

const VerifiedIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ExperienceSection: React.FC = () => {
  const credentials = [
    {
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle',
      year: '2025',
      domain: 'Cloud AI & ML Architecture',
      description: 'Validated foundational knowledge of AI concepts, machine learning workloads, and Oracle Cloud AI infrastructure services.',
    },
    {
      title: 'Microsoft Elevate: Power BI – Business Applications Internship',
      issuer: 'Microsoft',
      year: 'Internship',
      domain: 'Data Modeling & Analytics',
      description: 'Hands-on experience with business intelligence modeling, data pipeline transformations, and executive performance reporting.',
    },
    {
      title: 'AWS Academy Graduate',
      issuer: 'Amazon Web Services',
      year: 'Cloud Academy',
      domain: 'Cloud Infrastructure',
      description: 'Comprehensive study of AWS cloud computing fundamentals, compute instances, networking, IAM security, and databases.',
    },
    {
      title: 'Artificial Intelligence & Machine Learning Specialization',
      issuer: 'Industry Credential',
      year: 'Specialization',
      domain: 'Machine Learning Systems',
      description: 'Applied statistical learning, feature engineering, neural network foundations, and model evaluation metrics.',
    },
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32 border-t border-white/10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span>// CREDENTIALS</span>
          </div>
          <h2 className="font-heading italic text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.05]">
            Verified certifications & experience.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Professional certifications and internships validating cloud engineering and machine learning expertise.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="liquid-glass liquid-glass-hover rounded-[1.25rem] p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-[11px] font-mono text-white/80 rounded-full bg-white/5 border border-white/10">
                    {item.issuer}
                  </span>
                  <span className="font-mono text-xs text-white/40">{item.year}</span>
                </div>

                <h3 className="font-heading italic text-2xl text-white font-normal pt-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">{item.domain}</span>
                <span className="flex items-center gap-1.5 text-white/90">
                  <VerifiedIcon className="w-3.5 h-3.5 text-white" />
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
