import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Welcome', path: '/' },
  { name: 'Introduction', path: '/introduction' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Why Solikos', path: '/why-solikos' },
  { name: 'Impact', path: '/impact' },
  { name: 'Partnership', path: '/partnership' },
];

export const BottomNavSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-black flex flex-col justify-between min-h-[100dvh] overflow-hidden relative">
      <div className="px-6 md:px-8 pt-12">
        <p className="text-xs font-bold text-[#F4F4F4] tracking-tight max-w-[200px]">
          Interested in reliable infrastructure?
          <br />
          Reserve a consultation with Solikos
        </p>
      </div>

      <div className="w-full overflow-hidden flex whitespace-nowrap my-12 md:my-16 border-y border-white/5 py-10">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0 pr-12">
              <h2 className="text-4xl md:text-6xl font-medium text-[#F4F4F4] tracking-tighter leading-none">
                Asset Management & O&M
              </h2>
              <span className="mx-8 text-2xl text-[#B5B0A1] opacity-30">•</span>
              <h2 className="text-4xl md:text-6xl font-medium text-[#F4F4F4] tracking-tighter leading-none">
                Productive Use of Energy (PUE)
              </h2>
              <span className="mx-8 text-2xl text-[#B5B0A1] opacity-30">•</span>
              <h2 className="text-4xl md:text-6xl font-medium text-[#F4F4F4] tracking-tighter leading-none">
                Project Bankability
              </h2>
              <span className="mx-8 text-2xl text-[#B5B0A1] opacity-30">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="px-6 md:px-8 pb-12 flex flex-col md:flex-row justify-end items-start md:items-end gap-12">
        <nav className="flex flex-col items-start md:items-end gap-1 text-left md:text-right w-full">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ x: -10 }}>
              <Link
                to={item.path}
                className="text-2xl md:text-3xl text-[#F4F4F4] hover:text-[#B5B0A1] font-medium tracking-tight transition-colors block"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default BottomNavSection;
