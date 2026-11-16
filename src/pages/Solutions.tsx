import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight, 
  X, 
  SlidersHorizontal,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import BottomNavSection from '../components/BottomNavSection';
import { productsData, productCategories, Product } from '../data/products';

export const Solutions: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-black min-h-screen text-[#F4F4F4]">
      {/* 1. Header */}
      <PageHeader
        title="Hardware Systems."
        subtitle="Energy Storage & Hybrid Inverters"
        image="/assets/solar-1-new.png"
      />

      {/* 2. Catalog Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1800px] mx-auto">
        {/* Section Intro & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-[0.25em] text-[#B5B0A1]">
              <Cpu size={14} />
              <span>Certified Technical Catalog</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#F4F4F4]">
              Deployed Hardware &amp; Storage
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {productCategories.map((cat) => {
              const count = cat.id === 'all' 
                ? productsData.length 
                : productsData.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#F4F4F4] text-black shadow-lg font-semibold'
                      : 'bg-white/5 text-[#A3A3A3] hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-[#888]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group bg-[#141414] hover:bg-[#181818] rounded-3xl border border-white/10 hover:border-[#B5B0A1]/50 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Product Image Frame */}
                <div 
                  onClick={() => setSelectedProduct(product)}
                  className="relative w-full aspect-square bg-[#FDFDFD] p-8 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <picture>
                    <source srcSet={product.image} type="image/webp" />
                    <img
                      src={product.fallbackImage}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </picture>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="bg-black/80 backdrop-blur-md text-[#F4F4F4] text-[10px] uppercase font-mono tracking-wider px-3 py-1 rounded-full border border-white/10">
                      {product.categoryLabel}
                    </span>
                    <span className="bg-[#B5B0A1]/90 text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {product.warranty}
                    </span>
                  </div>

                  {/* Quick Preview Hover Indicator */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-black/80 text-white text-xs font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Content & Specs */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#B5B0A1] mb-2">
                      <Zap size={13} />
                      <span>{product.highlight}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#F4F4F4] group-hover:text-white transition-colors mb-3">
                      {product.name}
                    </h3>

                    <p className="text-sm text-[#888] leading-relaxed mb-6">
                      {product.tagline}
                    </p>

                    {/* Quick Specs Pill Badges */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#666] block">
                          Output / Storage
                        </span>
                        <span className="text-sm font-semibold text-[#EAEAEA]">
                          {product.keySpecs.powerOrCapacity}
                        </span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#666] block">
                          Voltage Rating
                        </span>
                        <span className="text-sm font-semibold text-[#EAEAEA]">
                          {product.keySpecs.voltage}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs font-medium text-[#A3A3A3] hover:text-white transition-colors underline underline-offset-4"
                    >
                      Specifications
                    </button>

                    <Link
                      to={`/partnership?product=${encodeURIComponent(product.name)}`}
                      className="bg-[#F4F4F4] hover:bg-white text-black px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all shadow-md"
                    >
                      <span>Reserve</span>
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Product Specs Modal Dialog */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#181818] border border-white/15 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-20"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  {/* Modal Product Image */}
                  <div className="w-full md:w-1/2 aspect-square bg-[#FDFDFD] rounded-2xl p-6 flex items-center justify-center shrink-0">
                    <picture>
                      <source srcSet={selectedProduct.image} type="image/webp" />
                      <img
                        src={selectedProduct.fallbackImage}
                        alt={selectedProduct.name}
                        className="w-full h-full object-contain"
                      />
                    </picture>
                  </div>

                  {/* Modal Title & Highlights */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-white/10 text-white text-[10px] uppercase font-mono tracking-wider px-3 py-1 rounded-full">
                        {selectedProduct.categoryLabel}
                      </span>
                      <span className="bg-[#B5B0A1] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {selectedProduct.warranty}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                      {selectedProduct.name}
                    </h3>

                    <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                      {selectedProduct.tagline}
                    </p>

                    <Link
                      to={`/partnership?product=${encodeURIComponent(selectedProduct.name)}`}
                      onClick={() => setSelectedProduct(null)}
                      className="w-full bg-[#F4F4F4] hover:bg-white text-black py-3 rounded-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                    >
                      <span>Inquire / Reserve Unit</span>
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>

                {/* Detailed Specifications Table */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B5B0A1] mb-4">
                    <SlidersHorizontal size={14} />
                    <span>Technical Datasheet Specifications</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.detailedSpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-center"
                      >
                        <span className="text-[11px] font-mono text-[#777] uppercase tracking-wider mb-1">
                          {spec.label}
                        </span>
                        <span className="text-sm font-semibold text-[#F4F4F4]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Bottom Navigation */}
      <BottomNavSection />
    </main>
  );
};

export default Solutions;
