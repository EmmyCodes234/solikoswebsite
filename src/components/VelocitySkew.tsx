import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface VelocitySkewProps {
  children: React.ReactNode;
  className?: string;
}

export const VelocitySkew: React.FC<VelocitySkewProps> = ({ children, className = '' }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  return (
    <motion.div style={{ skewY }} className={`origin-center ${className}`}>
      {children}
    </motion.div>
  );
};

export default VelocitySkew;
