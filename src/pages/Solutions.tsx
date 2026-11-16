import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import BottomNavSection from '../components/BottomNavSection';

export interface SolutionItem {
  id: string;
  title: string;
  headline: string;
  desc: string;
  img: string;
}

export const solutionsData: SolutionItem[] = [
  {
    id: 'Generation & Distribution',
    title: 'Interconnected Mini-Grids',
    headline: 'Universal access at scale.',
    desc: 'We deploy utility-scale interconnected mini-grids within DisCo footprints. By retrofitting existing networks with solar-hybrid power, we deliver 24/7 reliability for productive use in urban and peri-urban hubs.',
    img: '/assets/solar-2-new.png',
  },
  {
    id: 'Advisory & Compliance',
    title: 'Regulatory Liaison',
    headline: 'Navigating the power landscape.',
    desc: 'Large-scale energy deployment requires project bankability. From grid compliance to financial project structuring, our experts guide your energy investments from blueprint to operational commissioning.',
    img: '/assets/solar-3-new.png',
  },
  {
    id: 'Installation & Management',
    title: 'Asset Lifecycle Management',
    headline: 'Predictable performance.',
    desc: 'We treat solar infrastructure as high-yield energy assets. Our end-to-end management covers everything from EPC to long-term O&M, ensuring your systems are precision-engineered for the West African and continental climates and optimized for ROI.',
    img: '/assets/solar-1-new.png',
  },
];

const FlowCard: React.FC<{ children: React.ReactNode; className?: string; rx?: number }> = ({
  children,
  className = '',
  rx = 40,
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 pointer-events-none z-50">
        <svg className="absolute inset-0 w-full h-full" width="100%" height="100%">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx={rx}
            ry={rx}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx={rx}
            ry={rx}
            fill="none"
            stroke="#F4F4F4"
            strokeWidth="2"
            strokeDasharray="150 2000"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ animation: 'energyFlow 3s linear infinite' }}
          />
        </svg>
      </div>
      {children}
    </div>
  );
};

export const StackingSolutions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <div className="relative bg-black pb-32">
      {/* Card 0 */}
      <div ref={containerRef} className="h-[100dvh] relative z-10">
        <div className="h-full w-full overflow-hidden flex items-center justify-center">
          <motion.div
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none"
            style={{ opacity: titleOpacity }}
          >
            <h1 className="text-[22vw] md:text-[18vw] font-bold text-[#F4F4F4] leading-[0.75] tracking-tighter">
              Solikos
            </h1>
          </motion.div>

          <div className="absolute inset-0 w-full h-full">
            <img
              src={solutionsData[0].img}
              className="absolute inset-0 w-full h-full object-cover"
              alt={solutionsData[0].title}
            />
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              style={{ opacity: contentOpacity }}
              className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between text-[#F4F4F4]"
            >
              <div className="flex justify-between items-start w-full mt-24 md:mt-32">
                <div>
                  <h2 className="text-5xl md:text-8xl lg:text-[9vw] font-medium tracking-tighter leading-none max-w-5xl">
                    {solutionsData[0].title}
                  </h2>
                  <p className="text-2xl md:text-4xl font-light mt-4 text-[#EAEAEA]">
                    {solutionsData[0].headline}
                  </p>
                </div>
                <span className="text-xl md:text-2xl font-medium mt-4 hidden md:block">
                  (Scroll)
                </span>
              </div>

              <div className="flex items-center gap-4 md:gap-6 max-w-md mb-24 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <Plus size={20} />
                </div>
                <p className="text-sm md:text-base font-medium leading-tight">
                  {solutionsData[0].desc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Card 1 */}
      <div className="sticky top-0 h-[100dvh] w-full pt-8 md:pt-12 z-20">
        <FlowCard rx={40} className="w-full h-full">
          <div className="w-full h-full relative rounded-t-[40px] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.6)] bg-black">
            <img
              src={solutionsData[1].img}
              className="absolute inset-0 w-full h-full object-cover"
              alt={solutionsData[1].title}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between text-[#F4F4F4]">
              <div className="flex justify-between items-start w-full mt-16 md:mt-20">
                <div>
                  <h2 className="text-5xl md:text-8xl lg:text-[9vw] font-medium tracking-tighter leading-none max-w-5xl">
                    {solutionsData[1].title}
                  </h2>
                  <p className="text-2xl md:text-4xl font-light mt-4 text-[#EAEAEA]">
                    {solutionsData[1].headline}
                  </p>
                </div>
                <span className="text-xl md:text-2xl font-medium mt-4 hidden md:block">
                  (Scroll)
                </span>
              </div>

              <div className="flex items-center gap-4 md:gap-6 max-w-md mb-24 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <Plus size={20} />
                </div>
                <p className="text-sm md:text-base font-medium leading-tight">
                  {solutionsData[1].desc}
                </p>
              </div>
            </div>
          </div>
        </FlowCard>
      </div>

      {/* Card 2 */}
      <div className="sticky top-0 h-[100dvh] w-full pt-16 md:pt-24 z-30">
        <FlowCard rx={40} className="w-full h-full">
          <div className="w-full h-full relative rounded-t-[40px] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.6)] bg-black">
            <img
              src={solutionsData[2].img}
              className="absolute inset-0 w-full h-full object-cover"
              alt={solutionsData[2].title}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between text-[#F4F4F4]">
              <div className="flex justify-between items-start w-full mt-16 md:mt-20">
                <div>
                  <h2 className="text-5xl md:text-8xl lg:text-[9vw] font-medium tracking-tighter leading-none max-w-5xl">
                    {solutionsData[2].title}
                  </h2>
                  <p className="text-2xl md:text-4xl font-light mt-4 text-[#EAEAEA]">
                    {solutionsData[2].headline}
                  </p>
                </div>
                <span className="text-xl md:text-2xl font-medium mt-4 hidden md:block">
                  (Scroll)
                </span>
              </div>

              <div className="flex items-center gap-4 md:gap-6 max-w-md mb-24 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <Plus size={20} />
                </div>
                <p className="text-sm md:text-base font-medium leading-tight">
                  {solutionsData[2].desc}
                </p>
              </div>
            </div>
          </div>
        </FlowCard>
      </div>
    </div>
  );
};

export const Solutions: React.FC = () => {
  return (
    <main className="bg-black min-h-screen">
      <PageHeader
        title="Industrial Stability."
        subtitle="Distributed Energy Assets"
        image="/assets/solar-1-new.png"
      />

      {/* 1. Intro Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-b border-white/5">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-8 italic text-[#F4F4F4]">
              Asset Management as a Service.
            </h2>
            <p className="text-xl md:text-2xl text-[#A3A3A3] leading-relaxed mb-12">
              We treat solar infrastructure as high-yield energy assets. Solikos engineers scalable renewable energy solutions tailored for commercial and industrial resilience. Our solutions are designed to replace fossil fuel-heavy operations with predictable, climate-resilient systems.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-[#F4F4F4] font-medium mb-4 text-xl">Bankability.</h4>
                <p className="text-[#A3A3A3] leading-relaxed">
                  Every project is structured to meet international financial standards, ensuring ease of debt and equity financing.
                </p>
              </div>
              <div>
                <h4 className="text-[#F4F4F4] font-medium mb-4 text-xl">Predictability.</h4>
                <p className="text-[#A3A3A3] leading-relaxed">
                  Switch from volatile fossil fuel CAPEX to stable solar OPEX. We manage the volatility so you can manage your growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Institutional Advisory Section */}
      <section className="py-24 md:py-40 px-6 md:px-8 border-b border-white/5 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
            <div className="lg:w-1/2">
              <span className="text-xs font-bold text-[#444] uppercase tracking-[0.4em] mb-8 block font-mono">
                Expert Consulting
              </span>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 leading-[0.9] text-[#F4F4F4]">
                Institutional Advisory &amp; Liaison.
              </h2>
              <p className="text-xl text-[#A3A3A3] leading-relaxed mb-12">
                Large-scale energy deployment is often bottlenecked by bureaucratic complexity. Our specialized consultancy arm provides regulatory navigation as a product, de-risking your transition from day one.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[#F4F4F4] font-medium mb-3 tracking-tight">
                    Grid Compliance Standards
                  </h4>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">
                    We manage the full licensing lifecycle for Distributed Energy Resources (DERs) up to 10MW.
                  </p>
                </div>
                <div>
                  <h4 className="text-[#F4F4F4] font-medium mb-3 tracking-tight">
                    Financing &amp; Compliance
                  </h4>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">
                    Expert project structuring and infrastructure financing via global energy compliance platforms.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <img
                src="/assets/solar-3-new.png"
                alt="Regulatory Advisory"
                className="w-full aspect-square md:aspect-[4/3] object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stacking Solutions Cards */}
      <StackingSolutions />

      {/* 4. Bottom Navigation Section */}
      <BottomNavSection />
    </main>
  );
};

export default Solutions;
