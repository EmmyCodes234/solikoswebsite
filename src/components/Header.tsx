import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

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
          className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-10 md:py-8 flex justify-start md:justify-between items-center pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex gap-12 pointer-events-auto">
            <Link
              to="/partnership"
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#F4F4F4]/60 hover:text-[#F4F4F4] transition-colors"
            >
              Reserve
            </Link>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
