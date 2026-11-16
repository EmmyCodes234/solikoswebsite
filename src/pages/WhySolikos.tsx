import React from 'react';
import PageHeader from '../components/PageHeader';
import VelocitySkew from '../components/VelocitySkew';
import BottomNavSection from '../components/BottomNavSection';

export const WhySolikos: React.FC = () => {
  return (
    <main className="bg-black min-h-screen">
      <PageHeader
        title="Indigenous Resilience."
        subtitle="Global Standards"
        image="/assets/solar-3-new.png"
      />

      {/* 1. Core Pillars */}
      <section className="py-24 md:py-40 px-6 md:px-8 border-b border-white/5 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-10 leading-[0.9] text-[#F4F4F4]">
                Ruggedized for the Pan-African Context.
              </h2>
              <p className="text-xl md:text-2xl text-[#A3A3A3] leading-relaxed font-light">
                Many energy solutions fail in Africa because they aren&apos;t designed for the climate, the grid instability, or the local regulatory nuances. Solikos is different. We combine world-class engineering with an intimate understanding of the Nigerian and African energy landscapes.
              </p>
            </div>

            <div className="lg:w-1/2 w-full space-y-12">
              <div className="flex gap-8 group">
                <div className="w-[1px] bg-white/10 h-auto group-hover:bg-[#B5B0A1] transition-colors duration-500" />
                <div className="py-2">
                  <h4 className="text-[#F4F4F4] text-2xl font-medium mb-3 tracking-tight">
                    99%+ Uptime
                  </h4>
                  <p className="text-[#A3A3A3] text-lg font-light leading-relaxed">
                    Operational excellence through continuous real-time asset monitoring and proactive field maintenance.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-[1px] bg-white/10 h-auto group-hover:bg-[#B5B0A1] transition-colors duration-500" />
                <div className="py-2">
                  <h4 className="text-[#F4F4F4] text-2xl font-medium mb-3 tracking-tight">
                    DARES Program Ready
                  </h4>
                  <p className="text-[#A3A3A3] text-lg font-light leading-relaxed">
                    Our project structures are pre-verified for Clean Energy Subsidies, ensuring expedited deployment timelines.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-[1px] bg-white/10 h-auto group-hover:bg-[#B5B0A1] transition-colors duration-500" />
                <div className="py-2">
                  <h4 className="text-[#F4F4F4] text-2xl font-medium mb-3 tracking-tight">
                    Lagos-Led Engineering
                  </h4>
                  <p className="text-[#A3A3A3] text-lg font-light leading-relaxed">
                    Expertise born in the heart of West Africa&apos;s economic hub, applying global best practices to local infrastructural realities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Solikos Advantage */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-black text-[#F4F4F4]">
        <div className="container mx-auto max-w-7xl">
          <VelocitySkew>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-16">
              The Solikos Advantage.
            </h2>
          </VelocitySkew>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            <div className="bg-[#111] rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-colors">
              <h3 className="text-3xl font-medium tracking-tight">Performance-Based.</h3>
              <p className="text-[#A3A3A3] text-lg leading-relaxed">
                Our rigorous project structuring and engineering models signal the financial stability and execution capacity that large-scale partners demand.
              </p>
            </div>

            <div className="md:col-span-2 bg-[#111] rounded-[2rem] overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <img
                src="/assets/solar-2.jpg"
                alt="Clean energy installation"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-medium tracking-tight mb-4">
                  Productive Use of Energy.
                </h3>
                <p className="text-[#EAEAEA] text-lg leading-relaxed max-w-md">
                  We design Enterprise Hubs that power agro-processing, healthcare, and commerce—energy infrastructure that creates economic growth, not just electricity.
                </p>
              </div>
            </div>

            <div className="md:col-span-3 bg-[#111] rounded-[2rem] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/5 hover:border-white/20 transition-colors">
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight max-w-lg">
                Rugged Reliability. <br />
                Global Standards.
              </h3>
              <p className="text-[#A3A3A3] text-lg leading-relaxed max-w-xl">
                Nigerian-born, climate-resilient engineering for the toughest operating environments. We bridge the gap between regulatory mandates and market reality with 99%+ system uptime and bankable project structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Navigation Section */}
      <BottomNavSection />
    </main>
  );
};

export default WhySolikos;
