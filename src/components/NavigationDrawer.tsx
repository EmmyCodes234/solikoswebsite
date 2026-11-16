import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import Logo from './Logo';

interface NavigationDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navLinks = [
  { name: 'Welcome', path: '/' },
  { name: 'Introduction', path: '/introduction' },
  { name: 'Products & Systems', path: '/solutions' },
  { name: 'Why Solikos', path: '/why-solikos' },
  { name: 'Impact', path: '/impact' },
  { name: 'Partnership', path: '/partnership' },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 bg-[#22201F] flex p-4 gap-4"
        >
          <div className="flex-1 flex flex-col justify-between pt-20 pb-24 px-6 md:pl-12 md:pr-8">
            <nav className="flex flex-col gap-1">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  whileHover={{ x: 20 }}
                  className="w-fit"
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl md:text-6xl lg:text-7xl font-light text-[#F4F4F4] hover:text-[#B5B0A1] tracking-tight transition-colors block py-1"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-[#A3A3A3] text-sm">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#B5B0A1] mb-2">Inquiries</p>
                <a href="mailto:info@solikosenergyltd.com" className="hover:text-white transition-colors">
                  info@solikosenergyltd.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <Zap size={14} className="text-[#B5B0A1]" />
                <span>Pan-African Power Transition</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex w-1/3 flex-col justify-between pt-20 pb-24 px-12 border-l border-white/10 bg-[#1C1B1A]">
            <div>
              <Logo className="mb-12" />
              <p className="text-[#A3A3A3] text-sm leading-relaxed mb-8">
                Utility-scale clean energy infrastructure partner. Bridging the power deficit with engineered predictability across Nigeria and Africa.
              </p>
              <div className="space-y-3 text-xs font-mono text-[#888]">
                <p>• Lagos, Nigeria (HQ)</p>
                <p>• Victoria Island Grid Hub</p>
                <p>• 24/7 Operations Command</p>
              </div>
            </div>
            <div className="text-xs text-[#666] font-mono">
              © {new Date().getFullYear()} Solikos Energy LTD.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationDrawer;
