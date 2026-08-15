import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ArrowUpRightIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'AI Twin', href: '#chat' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-5 sm:px-8 lg:px-16 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Left: Circular Liquid Glass Logo */}
          <a
            href="#"
            className="liquid-glass-pill rounded-full p-2.5 flex items-center gap-2.5 text-white hover:border-white/30 transition-all group"
          >
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono text-[10px] font-bold text-white group-hover:bg-white group-hover:text-black transition-colors">
              N
            </div>
            <span className="font-medium text-xs tracking-tight pr-1.5 hidden sm:inline-block text-white">
              Nikhil Hoskatta
            </span>
          </a>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex liquid-glass-pill rounded-full px-6 py-2.5 items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-normal text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Talk to My AI CTA & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            <a
              href="#chat"
              className="liquid-glass-pill hover:bg-white hover:text-black rounded-full px-4 sm:px-5 py-2 text-xs font-medium transition-all duration-200 flex items-center gap-1.5 shadow-sm text-white"
            >
              <span>Talk to My AI</span>
              <ArrowUpRightIcon className="w-3 h-3" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden liquid-glass-pill p-2 rounded-full text-white/80 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <CloseIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 md:hidden liquid-glass-strong rounded-2xl p-5 border border-white/15 space-y-3 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <span>{link.name}</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/40" />
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <a
                href="/DevResume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block text-center w-full py-2 text-xs font-medium text-white/70 hover:text-white"
              >
                Download Resume (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
