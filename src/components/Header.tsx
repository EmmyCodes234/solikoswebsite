import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';

export const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 md:py-8 flex justify-between items-center pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Link to="/" aria-label="Solikos Energy Home">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex gap-12 pointer-events-auto">
            <Link to="/partnership">
              <MagneticButton className="bg-[#F4F4F4] text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 shadow-lg hover:bg-white transition-all">
                <span className="text-sm font-medium">Reserve</span>
                <div className="bg-[#2A2A2A] text-[#F4F4F4] p-2 rounded-full relative z-10 group-hover:bg-black transition-colors duration-500">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
              </MagneticButton>
            </Link>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
