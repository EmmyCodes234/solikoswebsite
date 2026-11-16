import React from 'react';
import PageHeader from '../components/PageHeader';
import VelocitySkew from '../components/VelocitySkew';
import BottomNavSection from '../components/BottomNavSection';

export const Introduction: React.FC = () => {
  const caresPillars = [
    {
      title: 'Creative',
      desc: 'Bespoke technical solutions for non-standard environments.',
    },
    {
      title: 'Audacious',
      desc: 'Targeting universal energy access for millions across the African continent by 2029.',
    },
    {
      title: 'Respectful',
      desc: 'Honoring the cultural and social context of every community we enter.',
    },
    {
      title: 'Empathetic',
      desc: 'Designing systems based on the lived experience of the end user.',
    },
  ];

  return (
    <main className="bg-black min-h-screen">
      <PageHeader
        title="Predictable Energy."
        subtitle="The Infrastructure Partner"
        image="/assets/intro_new.png"
      />

      {/* 1. CAREs Framework Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-b border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-8 text-[#F4F4F4]">
                Our Framework of Empathy (CAREs)
              </h2>
              <p className="text-xl text-[#A3A3A3] leading-relaxed mb-8">
                We believe that years of utility failure have not just caused economic damage, but have damaged the psyche of the energy consumer. At Solikos, we address this through our <strong className="text-white">CAREs</strong> framework: Creative, Audacious, Respectful, and Empathetic.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {caresPillars.map((item, idx) => (
                <div key={idx} className="bg-[#111] p-8 rounded-2xl border border-white/5">
                  <h4 className="font-bold text-[#F4F4F4] mb-2 font-mono uppercase tracking-widest text-xs">
                    {item.title}
                  </h4>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Narrative & Pillars Section ($T) */}
      <section className="bg-black text-[#F4F4F4] pb-24 md:pb-32">
        <div className="w-full h-[60vh] md:h-[80vh] relative mb-16 md:mb-24 overflow-hidden">
          <img
            src="/assets/intro_new.png"
            alt="Lagos community empowered by solar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 md:px-8">
          <VelocitySkew>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-16 md:mb-24 max-w-6xl leading-[0.85]">
              When the Lights Come On, <br />
              Business Thrives.
            </h2>
          </VelocitySkew>

          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24 mb-32">
            <div className="md:w-1/3">
              <p className="text-lg font-bold uppercase tracking-widest text-[#B5B0A1] mb-6 block font-mono">
                Our Narrative
              </p>
            </div>
            <div className="w-full md:w-[55%]">
              <p className="text-xl md:text-3xl text-[#EAEAEA] leading-tight font-medium mb-8">
                Converting utility failure into operational certainty for the African continent.
              </p>
              <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed font-light">
                We understand that years of service failures have damaged the psyche of energy consumers. Solikos was built on a framework of empathy and operational excellence to replace that volatility with predictability. We engineer scalable solar infrastructure designed to turn sunk energy costs into strategic assets for emerging commercial hubs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B5B0A1] mb-6 block">
                01 — Scale
              </span>
              <h3 className="text-2xl font-medium mb-4 text-[#F4F4F4]">Interconnected Readiness</h3>
              <p className="text-[#A3A3A3] leading-relaxed">
                We don&apos;t just build off-grid. We build to integrate. Our systems are designed to work alongside existing Distribution Companies (DisCos) to stabilize the urban grid.
              </p>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B5B0A1] mb-6 block">
                02 — Compliance
              </span>
              <h3 className="text-2xl font-medium mb-4 text-[#F4F4F4]">Regulatory Mastery</h3>
              <p className="text-[#A3A3A3] leading-relaxed">
                From initial environmental compliance to operational verification, we navigate the bureaucratic complexity so you can focus on growth.
              </p>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B5B0A1] mb-6 block">
                03 — Impact
              </span>
              <h3 className="text-2xl font-medium mb-4 text-[#F4F4F4]">Productive Yield</h3>
              <p className="text-[#A3A3A3] leading-relaxed">
                Every kilowatt we generate is measured by the economic activity it enables—rice mills running, hospitals humming, and markets thriving.
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

export default Introduction;
