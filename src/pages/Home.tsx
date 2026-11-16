import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import VelocitySkew from '../components/VelocitySkew';
import BottomNavSection from '../components/BottomNavSection';

const solutionCards = [
  {
    title: 'Distributed Energy Assets',
    desc: 'Replacing fossil fuel-heavy operations with multi-megawatt solar systems focused on long-term project bankability and operational stability.',
    img: '/assets/solar-1-new.png',
  },
  {
    title: 'Interconnected Mini-Grids',
    desc: 'Empowering urban hubs through strategic tripartite agreements with DisCos to deliver 24/7 reliability for productive use.',
    img: '/assets/solar-2-new.png',
  },
  {
    title: 'Regulatory & Market Liaison',
    desc: 'Navigating the regulatory and compliance frameworks—from licensing to grid-level project structuring—to de-risk your energy transition.',
    img: '/assets/solar-3-new.png',
  },
];

const methodologySteps = [
  {
    num: '01',
    title: 'Insight & Bankability',
    desc: "We begin with rigorous technical feasibility and financial modeling. Our processes are designed to meet the stringent 'bankability' requirements of global finance institutions like the World Bank and AfDB.",
  },
  {
    num: '02',
    title: 'Regulatory Orchestration',
    desc: "Navigating the clean energy regulatory landscape is not just a service; it's a product. We manage tripartite agreements with DisCos and secure the necessary licenses to de-risk your investment.",
  },
  {
    num: '03',
    title: 'Ruggedized Deployment',
    desc: "Our EPC teams deploy tier-1 components ruggedized for the West African climate. We build with 'Interconnected Readiness' in mind, ensuring seamless grid integration.",
  },
  {
    num: '04',
    title: 'Asset Stewardship',
    desc: 'Once commissioned, we treat every installation as a long-term energy asset. Our Solikos Dashboard provides real-time O&M data to ensure 99%+ system uptime for the project lifecycle.',
  },
];

export const Home: React.FC = () => {
  const narrativeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: narrativeProgress } = useScroll({
    target: narrativeRef,
    offset: ['start 80%', 'end 50%'],
  });

  const narrativeWords =
    'We understand that years of service failures have damaged the psyche of energy consumers. Solikos is built on a framework of empathy and operational excellence, delivering energy-as-a-service that de-risks growth and empowers the next generation of industry across Nigeria and Africa.'.split(
      ' '
    );

  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({ target: horizontalRef });
  const horizontalX = useTransform(horizontalProgress, [0, 1], ['0%', '-66.66%']);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <motion.img
            src="/assets/hero_new.png"
            alt="Solar Infrastructure"
            className="w-full h-full object-cover origin-center"
            animate={{
              scale: [1.02, 1.1, 1.02],
              x: [0, -30, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        </div>

        <div className="hidden md:flex absolute top-8 right-8 z-40">
          <Link to="/partnership">
            <MagneticButton className="bg-[#F4F4F4] text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 shadow-lg">
              <span className="text-sm font-medium">Reserve</span>
              <div className="bg-[#2A2A2A] text-[#F4F4F4] p-2 rounded-full relative z-10 group-hover:bg-black transition-colors duration-500">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            </MagneticButton>
          </Link>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 py-12 md:py-20 max-w-[1800px] mx-auto">
          <div className="pt-24 md:pt-32">
            <VelocitySkew>
              <h1
                className="text-[14vw] md:text-[9vw] lg:text-[8vw] font-medium text-[#F4F4F4] leading-[0.95] tracking-tighter text-balance max-w-5xl"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Renewable Energy <br />
                <span className="text-[#B5B0A1]">for African Industry.</span>
              </h1>
            </VelocitySkew>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="max-w-full md:max-w-2xl">
              <p className="text-[#F4F4F4] text-xl md:text-2xl font-medium leading-tight opacity-90 tracking-tight text-balance">
                Converting the volatility of fossil fuels into the predictability of solar. We build economic independence for Nigeria&apos;s and Africa&apos;s industrial future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Word-by-Word Narrative Reveal */}
      <section
        ref={narrativeRef}
        className="min-h-[100dvh] flex items-center px-6 md:px-8 py-24 md:py-32 bg-black"
      >
        <p className="text-3xl md:text-[5.5vw] leading-[1.1] md:leading-[1.05] font-medium tracking-tight flex flex-wrap gap-x-2 md:gap-x-[1.5vw] gap-y-2">
          {narrativeWords.map((word, i) => {
            const start = i / narrativeWords.length;
            const end = start + 1 / narrativeWords.length;
            const opacity = useTransform(narrativeProgress, [start, end], [0.15, 1]);
            const y = useTransform(narrativeProgress, [start, end], [15, 0]);

            return (
              <motion.span
                key={i}
                style={{ opacity, y, display: 'inline-block' }}
                className="text-[#F4F4F4] will-change-[opacity,transform]"
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </section>

      {/* 3. Two Overlapping Ovals Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#0a0a0a] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        <div className="flex w-full md:w-1/2 relative h-[50vw] md:h-auto md:aspect-[8/3] justify-center md:justify-start">
          <div className="absolute left-0 md:relative md:left-auto w-[60%] md:w-1/2 aspect-[4/3] md:aspect-square rounded-[50%] overflow-hidden z-10">
            <img
              src="/assets/solar-1-new.png"
              alt="Solikos Industrial Solar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-0 md:relative md:right-auto w-[60%] md:w-1/2 aspect-[4/3] md:aspect-square rounded-[50%] overflow-hidden z-20 md:-ml-8">
            <img
              src="/assets/solar-2-new.png"
              alt="Solikos Mini-Grid"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 max-w-xl mt-8 md:mt-0">
          <p className="text-2xl md:text-4xl font-medium text-[#A3A3A3] leading-tight tracking-tight mb-8">
            Transitioning Nigeria&apos;s and Africa&apos;s industrial hubs from the volatility of fossil fuels to the strategic predictability of solar assets.
          </p>
          <p className="text-lg md:text-xl text-[#8A8A8A] leading-relaxed">
            At Solikos Energy LTD, we leverage indigenous intelligence and global engineering standards to de-risk the energy transition. Whether it&apos;s retrofitting a commercial tower in Lagos or deploying an interconnected mini-grid for a productive-use hub, we deliver &apos;energy-as-a-service&apos; that powers growth.
          </p>
        </div>
      </section>

      {/* 4. Horizontal Scroll Solution Cards */}
      <section ref={horizontalRef} className="relative h-[300vh] bg-black">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute top-12 md:top-24 left-6 md:left-8 z-10">
            <VelocitySkew>
              <span className="text-sm font-bold text-[#A3A3A3] tracking-tight">
                Discover available Solutions
              </span>
            </VelocitySkew>
          </div>

          <motion.div
            style={{ x: horizontalX }}
            className="flex gap-8 px-6 md:px-8 w-[300vw] md:w-[240vw] mt-16"
          >
            {solutionCards.map((card, i) => (
              <div key={i} className="w-[90vw] md:w-[70vw] shrink-0 flex flex-col justify-center">
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl mb-8">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-4xl md:text-6xl font-medium text-[#F4F4F4] tracking-tighter mb-4">
                      {card.title}
                    </h3>
                    <p className="text-xl text-[#A3A3A3] max-w-md">{card.desc}</p>
                  </div>
                  <Link
                    to="/solutions"
                    className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors shrink-0"
                  >
                    <ArrowUpRight size={24} />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. The Solikos Methodology */}
      <section className="py-24 md:py-40 bg-black text-[#F4F4F4] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#B5B0A1] mb-8 block font-mono">
                Precision Engineering
              </span>
              <VelocitySkew>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.85] mb-12">
                  The Solikos <br />
                  Methodology.
                </h2>
              </VelocitySkew>
              <p className="text-xl text-[#A3A3A3] leading-relaxed max-w-lg mb-12">
                We translate complex regulatory mandates and infrastructure needs into bankable, operational energy assets. Our methodology is built on a decade of indigenous expertise and global standards.
              </p>
              <div className="hidden md:block overflow-hidden rounded-3xl group">
                <img
                  src="/assets/solar-1-new.png"
                  alt="Solikos Solar Installation"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-24 md:space-y-32">
              {methodologySteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="group border-t border-white/10 pt-12 md:pt-16"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-mono text-sm tracking-widest text-[#B5B0A1]">
                      {step.num}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#555] group-hover:text-white transition-colors font-mono">
                      Phase {step.num}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 text-[#F4F4F4]">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Infinite Marquee */}
      <section className="py-20 md:py-32 bg-black border-t border-white/5 overflow-hidden">
        <div className="px-6 md:px-8 mb-8">
          <p className="text-xs font-bold text-[#F4F4F4] tracking-tight max-w-[150px]">
            Want to learn more about the benefits of—Solikos?
          </p>
        </div>
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            className="flex"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
          >
            {[...Array(4)].map((_, i) => (
              <h2
                key={i}
                className="text-[18vw] font-bold text-[#F4F4F4] tracking-tighter leading-none shrink-0 pr-8"
              >
                Why Solikos?*
              </h2>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Bottom Navigation Section */}
      <BottomNavSection />
    </div>
  );
};

export default Home;
