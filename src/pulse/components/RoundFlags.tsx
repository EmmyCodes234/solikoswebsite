import React from 'react';

interface FlagProps {
  className?: string;
  size?: number;
}

/**
 * Clean circular round flag for Nigeria (NGN)
 * Green - White - Green with subtle border
 */
export const NigeriaRoundFlag: React.FC<FlagProps> = ({ className = 'w-4 h-4', size = 18 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`inline-block shrink-0 rounded-full overflow-hidden shadow-2xs ${className}`}
    aria-label="Nigeria"
  >
    <circle cx="16" cy="16" r="16" fill="#008751" />
    <rect x="10.66" y="0" width="10.68" height="32" fill="#FFFFFF" />
    <circle cx="16" cy="16" r="15.5" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
  </svg>
);

/**
 * Clean circular round flag for United States (USD)
 * Stars & Stripes inside circle with subtle border
 */
export const USRoundFlag: React.FC<FlagProps> = ({ className = 'w-4 h-4', size = 18 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`inline-block shrink-0 rounded-full overflow-hidden shadow-2xs ${className}`}
    aria-label="United States"
  >
    <defs>
      <clipPath id="us-circle-clip">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
    </defs>
    <g clipPath="url(#us-circle-clip)">
      {/* 13 Stripes */}
      <rect x="0" y="0" width="32" height="32" fill="#B22234" />
      <rect x="0" y="2.46" width="32" height="2.46" fill="#FFFFFF" />
      <rect x="0" y="7.38" width="32" height="2.46" fill="#FFFFFF" />
      <rect x="0" y="12.3" width="32" height="2.46" fill="#FFFFFF" />
      <rect x="0" y="17.23" width="32" height="2.46" fill="#FFFFFF" />
      <rect x="0" y="22.15" width="32" height="2.46" fill="#FFFFFF" />
      <rect x="0" y="27.07" width="32" height="2.46" fill="#FFFFFF" />

      {/* Blue Canton */}
      <rect x="0" y="0" width="14" height="15" fill="#1A3370" />

      {/* Simplified Crisp Stars Grid */}
      <g fill="#FFFFFF">
        <circle cx="3" cy="3" r="0.9" />
        <circle cx="7" cy="3" r="0.9" />
        <circle cx="11" cy="3" r="0.9" />

        <circle cx="5" cy="5.5" r="0.9" />
        <circle cx="9" cy="5.5" r="0.9" />

        <circle cx="3" cy="8" r="0.9" />
        <circle cx="7" cy="8" r="0.9" />
        <circle cx="11" cy="8" r="0.9" />

        <circle cx="5" cy="10.5" r="0.9" />
        <circle cx="9" cy="10.5" r="0.9" />

        <circle cx="3" cy="13" r="0.9" />
        <circle cx="7" cy="13" r="0.9" />
        <circle cx="11" cy="13" r="0.9" />
      </g>
    </g>
    <circle cx="16" cy="16" r="15.5" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
  </svg>
);
