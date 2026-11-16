import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Systems');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const assetsToLoad = [
      '/assets/hero_new.png',
      '/assets/intro_new.png',
      '/assets/solar-1-new.png',
      '/assets/solar-2-new.png',
      '/assets/solar-3-new.png',
      '/assets/impact_new.png',
    ];

    const statusPhrases = [
      'Caching Visual Assets',
      'Analyzing African Power Grids',
      'Optimizing Solar Yield',
      'Syncing Distribution Nodes',
      'Empowering Industrial Hubs',
    ];

    const totalDuration = 3500;
    const intervalTime = 20;
    const totalTicks = totalDuration / intervalTime;

    let currentTick = 0;
    let assetsLoaded = false;

    (async () => {
      const promises = assetsToLoad.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      );
      await Promise.all(promises);
      assetsLoaded = true;
    })();

    const interval = setInterval(() => {
      currentTick++;
      const currentPct = Math.min((currentTick / totalTicks) * 100, 100);

      if (currentPct >= 90 && !assetsLoaded && currentTick < totalTicks * 2) {
        return;
      }

      setProgress(currentPct);
      const phraseIndex = Math.min(
        Math.floor((currentPct / 100) * statusPhrases.length),
        statusPhrases.length - 1
      );
      setStatusText(statusPhrases[phraseIndex]);

      if (currentTick >= totalTicks && assetsLoaded) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center text-[#F4F4F4]"
      exit={{
        y: '-100%',
        transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] },
      }}
    >
      <div className="relative flex flex-col items-center">
        <div className="overflow-hidden mb-12 py-2 px-4 text-center">
          <motion.div
            initial={{ y: '110%', rotateX: -30, opacity: 0 }}
            animate={{ y: '0%', rotateX: 0, opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="flex items-center gap-4"
          >
            <img
              src="/solikos-icon.png"
              alt="Solikos Energy"
              className="w-14 h-14 md:w-20 md:h-20 object-contain shrink-0"
            />
            <div className="flex flex-col justify-center leading-none text-left">
              <h1
                className="text-4xl md:text-6xl font-bold tracking-tight uppercase"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                SOLIKOS
              </h1>
              <span
                className="text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-[#B5B0A1] mt-1.5"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                ENERGY
              </span>
            </div>
          </motion.div>
        </div>

        <div className="w-72 md:w-96 max-w-[80vw] h-[2px] bg-white/5 overflow-hidden relative rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#B5B0A1]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-white/30 blur-md"
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
            style={{ transform: 'translateX(-100%)' }}
          />
        </div>

        <div className="mt-6 w-72 md:w-96 max-w-[80vw] flex justify-between items-center overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-bold tracking-[0.4em] text-[#B5B0A1] uppercase opacity-80"
          >
            {statusText}
          </motion.span>
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-mono text-[#B5B0A1] opacity-60"
          >
            {Math.round(progress).toString().padStart(3, '0')}%
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/20"
      />
    </motion.div>
  );
};

export default Preloader;
