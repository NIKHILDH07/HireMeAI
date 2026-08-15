import React from 'react';

const MailIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const FileDownIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M12 18v-6" />
    <path d="m9 15 3 3 3-3" />
  </svg>
);

const ArrowUpRightIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-28 sm:py-36 border-t border-white/10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-6 max-w-4xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-mono tracking-widest text-white/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>// LET&apos;S CONNECT</span>
          </div>
          <h2 className="font-heading italic text-5xl sm:text-7xl md:text-8xl font-normal text-white tracking-tight leading-[0.95]">
            Let&apos;s build something meaningful.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light max-w-lg mx-auto leading-relaxed">
            Open to Software Developer, Full-Stack Engineer, and AI Engineering roles.
          </p>
        </div>

        {/* Contact Links: 2x2 Grid + Centered CV */}
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Top 4 Cards: 2-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email */}
            <a
              href="mailto:hoskattanikhil@gmail.com"
              className="liquid-glass liquid-glass-hover p-6 rounded-[1.25rem] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-white/40 block">DIRECT EMAIL</span>
                  <span className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                    hoskattanikhil@gmail.com
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/nikhil-d-hoskatta"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass liquid-glass-hover p-6 rounded-[1.25rem] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-white/40 block">LINKEDIN</span>
                  <span className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                    nikhil-d-hoskatta
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/NIKHILDH07"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass liquid-glass-hover p-6 rounded-[1.25rem] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-white/40 block">GITHUB</span>
                  <span className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                    NIKHILDH07
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </a>

            {/* Phone */}
            <a
              href="tel:7760166382"
              className="liquid-glass liquid-glass-hover p-6 rounded-[1.25rem] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-white/40 block">DIRECT PHONE</span>
                  <span className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                    +91 7760166382
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </a>

          </div>

          {/* Centered Curriculum Vitae Card (Same dimensions as other cards) */}
          <div className="flex justify-center">
            <a
              href="/DevResume.pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-[calc(50%-0.5rem)] liquid-glass liquid-glass-hover p-6 rounded-[1.25rem] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileDownIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-white/40 block">CURRICULUM VITAE</span>
                  <span className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                    Download Resume (PDF)
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
