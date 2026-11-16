import React from 'react';
import VelocitySkew from './VelocitySkew';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, image }) => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80dvh] overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="text-xs md:text-sm font-bold text-[#B5B0A1] tracking-[0.4em] uppercase mb-6 block transition-all duration-700">
              Solikos — {subtitle}
            </span>
            <VelocitySkew>
              <h1 className="text-5xl md:text-[8vw] lg:text-[7vw] font-medium text-[#F4F4F4] leading-[0.95] tracking-tighter text-balance">
                {title}
              </h1>
            </VelocitySkew>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
