import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1600; // 1.6 seconds
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
          }, 150);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const formattedCount = Math.floor(progress).toString().padStart(3, '0');

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-black text-white select-none pointer-events-auto"
        >
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                Nikhil Hoskatta • AI Engineer Portfolio
              </span>
            </div>
            <span className="font-mono text-xs text-white/40 hidden sm:inline-block">
              INITIALIZING DIGITAL TWIN
            </span>
          </div>

          {/* Center Stage Counter */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-2"
            >
              <span className="font-heading italic font-normal text-8xl sm:text-9xl md:text-[13rem] text-white tracking-tight leading-[0.85]">
                {formattedCount}
              </span>
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                Grounded in Verified Profile Data
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-white/40">
              <span>LOADING SYSTEMS</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="w-full h-[1px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
