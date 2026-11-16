import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, PlusCircle, Zap, Shield, ArrowUpRight, Search } from 'lucide-react';
import { productsData, productCategories } from '../../data/products';

export const PulseCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = productsData.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.highlight.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-1">
            <span>Solikos Pulse</span>
            <span>&bull;</span>
            <span>Inventory &amp; Datasheets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hardware Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official commercial hardware specifications derived from certified equipment imports.
          </p>
        </div>

        <Link
          to="/pulse/create"
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
        >
          <PlusCircle size={15} />
          <span>New Invoice</span>
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search hardware by model name or specification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400/80 transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Image Frame */}
            <div className="relative aspect-4/3 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
              <span className="absolute top-3 right-3 bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                {prod.warranty}
              </span>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-amber-700 uppercase tracking-widest font-bold block mb-1">
                  {prod.categoryLabel}
                </span>
                <h3 className="font-bold text-base text-slate-900 leading-snug mb-1">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{prod.tagline}</p>
              </div>

              {/* Specs Pills */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
                {prod.detailedSpecs.slice(0, 3).map((s, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="text-slate-400">{s.label}:</span>
                    <span className="font-mono font-medium text-slate-800 truncate max-w-[170px] text-right">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <Link
                  to={`/pulse/create?model=${encodeURIComponent(prod.name)}`}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <PlusCircle size={14} />
                  <span>Invoice This Hardware</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PulseCatalog;
