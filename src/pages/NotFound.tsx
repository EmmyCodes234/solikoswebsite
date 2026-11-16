import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <main className="bg-[#050505] min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#B5B0A1 1px, transparent 1px), linear-gradient(90deg, #B5B0A1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl relative z-10"
      >
        <motion.div
          animate={{ opacity: [1, 0.4, 1, 0.8, 1], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <img
              src="/solikos-icon.png"
              alt="Solikos Icon"
              className="w-24 h-24 opacity-60 object-contain"
            />
            <Zap
              className="w-10 h-10 text-[#B5B0A1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(181,176,161,0.5)]"
            />
          </div>
        </motion.div>

        <h1
          className="text-8xl md:text-9xl font-bold text-[#F4F4F4] leading-none tracking-tighter mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          OFF-GRID
        </h1>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-1.5 w-12 bg-[#EF4444] rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EF4444]">
            Connection Interrupted
          </span>
        </div>

        <p className="text-xl text-[#A3A3A3] font-medium leading-relaxed mb-12 max-w-md mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. You&apos;ve wandered outside our current energy grid.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-4 bg-[#B5B0A1] text-black rounded-full px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
        >
          <ArrowLeft size={18} />
          <span>Return to Hub</span>
        </Link>

        <div className="mt-16 flex items-center justify-center gap-1 opacity-20">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-1 rounded-full bg-[#B5B0A1] ${level <= 2 ? 'h-4' : 'h-2 opacity-30'}`}
            />
          ))}
          <span className="ml-2 text-[8px] font-bold uppercase tracking-widest text-[#B5B0A1]">
            Low Signal
          </span>
        </div>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B5B0A1]/5 rounded-full blur-[120px] pointer-events-none" />
    </main>
  );
};

export default NotFound;
