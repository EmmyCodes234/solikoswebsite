import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const [lagosTime, setLagosTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLagosTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { Icon: Twitter, url: '#' },
    { Icon: Instagram, url: '#' },
    { Icon: Linkedin, url: '#' },
    { Icon: Facebook, url: '#' },
  ];

  return (
    <footer className="bg-[#0A0A0A] pt-32 pb-12 px-6 md:px-12 flex flex-col relative overflow-hidden border-t border-white/5">
      <div className="absolute -bottom-10 left-0 w-full pointer-events-none opacity-[0.02] select-none translate-y-1/4">
        <h2 className="text-[28vw] font-bold tracking-tighter leading-none text-white whitespace-nowrap">
          Solikos
        </h2>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-24 border-b border-white/5">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#666] mb-4 block">
                Institutional Mission
              </span>
              <p className="text-xs font-semibold tracking-[0.25em] text-[#B5B0A1] uppercase mb-4">
                Your Power, Our Priority
              </p>
              <p className="text-xl md:text-2xl text-[#F4F4F4] font-light max-w-md leading-relaxed tracking-tight mb-8">
                Converting the volatility of fossil fuels into the strategic predictability of solar infrastructure.
              </p>
            </div>
            <div className="text-sm font-mono text-[#888]">
              <a href="mailto:info@solikosenergyltd.com" className="hover:text-white transition-colors">
                info@solikosenergyltd.com
              </a>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#444]">
                Directory
              </span>
              <div className="flex flex-col gap-3">
                <Link to="/" className="text-sm text-[#A3A3A3] hover:text-[#F4F4F4] transition-colors">
                  Welcome
                </Link>
                <Link to="/introduction" className="text-sm text-[#A3A3A3] hover:text-[#F4F4F4] transition-colors">
                  Introduction
                </Link>
                <Link to="/solutions" className="text-sm text-[#A3A3A3] hover:text-[#F4F4F4] transition-colors">
                  Products &amp; Systems
                </Link>
                <Link to="/why-solikos" className="text-sm text-[#A3A3A3] hover:text-[#F4F4F4] transition-colors">
                  Why Solikos
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#444]">
                Ecosystem
              </span>
              <div className="flex flex-col gap-3">
                <Link to="/impact" className="text-sm text-[#A3A3A3] hover:text-[#F4F4F4] transition-colors">
                  Impact & ESG
                </Link>
                <Link to="/partnership" className="text-sm text-[#A3A3A3] hover:text-[#F4F4F4] transition-colors">
                  Institutional Alliance
                </Link>
                <Link to="/brand-guidelines" className="text-sm text-[#B5B0A1] hover:text-white transition-colors font-medium">
                  Brand Guidelines 2026
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#444] mb-8">
              Headquarters
            </span>
            <p className="text-sm text-[#F4F4F4] mb-2 font-medium">Lagos, Nigeria</p>
            <p className="text-xs text-[#A3A3A3] leading-relaxed mb-10">
              Victoria Island, Lagos<br />Energy Pillar, West Africa
            </p>
            <div className="flex flex-col items-start md:items-end gap-2 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#444] uppercase tracking-widest">
                <Globe size={10} />
                <span>Lagos, NG</span>
              </div>
              <div className="text-xl font-mono text-[#B5B0A1] tracking-tighter">
                {lagosTime}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pt-12 border-t border-white/5">
          <div className="flex gap-6">
            {socialLinks.map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                className="text-[#444] hover:text-[#F4F4F4] transition-all duration-300"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 text-xs text-[#555] font-mono">
            <span>© {new Date().getFullYear()} Solikos Energy LTD. All rights reserved.</span>
            <a
              href="https://litocodes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#F4F4F4] transition-colors"
            >
              Crafted by litocodes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
