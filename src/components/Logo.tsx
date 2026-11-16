import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', color = 'white', showText = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src="/solikos-icon.png"
        alt="Solikos Energy"
        className="w-10 h-10 md:w-11 md:h-11 object-contain shrink-0"
      />
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className="text-xl md:text-2xl font-bold tracking-tight uppercase"
            style={{ color, fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            SOLIKOS
          </span>
          <span
            className="text-[9px] md:text-[10px] font-semibold tracking-[0.3em] uppercase opacity-90 mt-1"
            style={{ color, fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            ENERGY
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
