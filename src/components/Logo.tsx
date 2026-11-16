import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-16', color = 'white' }) => {
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      <img
        src="/solikos-icon.png"
        alt="Solikos Icon"
        className="w-16 h-16 md:w-32 md:h-32 object-contain brightness-0 invert -ml-6 md:-ml-8"
      />
      <span
        className="text-4xl md:text-6xl font-light tracking-tight transition-colors -ml-3 md:-ml-8"
        style={{ color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Solikos
      </span>
    </div>
  );
};

export default Logo;
