import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import VelocitySkew from '../components/VelocitySkew';
import BottomNavSection from '../components/BottomNavSection';

export const Impact: React.FC = () => {
  const esgMetrics = [
    {
      num: '01',
      title: 'Carbon Abatement.',
      desc: "Displacing fossil fuel generation at scale leads to verifiable carbon credit generation and environmental resilience for Nigeria's and Africa's industrial hubs.",
    },
    {
      num: '02',
      title: 'PUE Enterprise Hubs.',
      desc: "We don't just power homes; we empower 'Enterprise Hubs' for rice milling, cassava processing, and cold storage, driving local economic yield.",
    },
    {
      num: '03',
      title: 'Health Resilience.',
      desc: 'Our mini-grids power primary healthcare centers, ensuring vaccine cold-chains remain intact and births are attended under reliable light.',
    },
    {
      num: '04',
      title: 'Job Multiplier.',
      desc: 'Reliable power is the foundation of employment. We measure success by the 1000s of SMEs enabled by our decentralized energy assets.',
    },
  ];

  return (
    <main className="bg-black min-h-screen">
      <PageHeader
        title="Economic Yield."
        subtitle="Measuring Transformation"
        image="/assets/impact_new.png"
      />

      {/* 1. ESG Metrics Grid */}
      <section className="py-24 md:py-40 px-6 md:px-8 border-b border-white/5 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {esgMetrics.map((metric, idx) => (
              <div key={idx} className="group">
                <span className="text-xs font-bold text-[#444] uppercase tracking-widest mb-6 block font-mono">
                  ESG Metric {metric.num}
                </span>
                <h3 className="text-2xl font-medium mb-4 text-[#F4F4F4] group-hover:text-[#B5B0A1] transition-colors">
                  {metric.title}
                </h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Numerical Impact & Metrics */}
      <section className="bg-black text-[#F4F4F4] pt-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 mb-20">
          <VelocitySkew>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-center mb-24">
              Productive Use of Energy. <br />
              Measurable Impact.
            </h2>
          </VelocitySkew>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-8 md:py-0">
              <div className="text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-4">
                17K<span className="text-[#A3A3A3]">+</span>
              </div>
              <div className="text-sm tracking-widest uppercase text-[#A3A3A3]">
                People Impacted
              </div>
            </div>

            <div className="py-8 md:py-0">
              <div className="text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-4">
                99<span className="text-[#A3A3A3]">%</span>
              </div>
              <div className="text-sm tracking-widest uppercase text-[#A3A3A3]">
                System Uptime
              </div>
            </div>

            <div className="py-8 md:py-0">
              <div className="text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-4">
                10MW<span className="text-[#A3A3A3]">+</span>
              </div>
              <div className="text-sm tracking-widest uppercase text-[#A3A3A3]">
                Pipeline Deployment
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Compliance Marquee */}
        <div className="relative flex overflow-x-hidden border-y border-white/10 py-6 bg-[#0a0a0a]">
          <motion.div
            className="flex whitespace-nowrap items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                <span className="text-lg md:text-xl font-light tracking-wide mx-4">
                  Strategic Compliance:
                </span>
                <span className="text-lg md:text-xl font-medium mx-4">
                  Global Clean Energy Initiatives
                </span>
                <span className="text-lg md:text-xl text-[#A3A3A3] mx-4">•</span>
                <span className="text-lg md:text-xl font-medium mx-4">
                  International Renewable Standards
                </span>
                <span className="text-lg md:text-xl text-[#A3A3A3] mx-4">•</span>
                <span className="text-lg md:text-xl font-medium mx-4">
                  DARES Universal Access Scale-up
                </span>
                <span className="text-lg md:text-xl text-[#A3A3A3] mx-4">•</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Video Showcase */}
        <div className="relative h-[80vh] bg-black flex items-center justify-center overflow-hidden mt-20">
          <video
            src="/assets/impact.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="relative z-10 text-center px-6">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B5B0A1] mb-4 block font-mono">
              Operational Showcase
            </span>
            <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-white max-w-2xl mx-auto">
              Powering the heartbeat of local industry.
            </h3>
          </div>
        </div>
      </section>

      {/* 3. Bottom Navigation Section */}
      <BottomNavSection />
    </main>
  );
};

export default Impact;
