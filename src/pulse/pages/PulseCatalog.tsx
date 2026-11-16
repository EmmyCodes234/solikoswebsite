import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
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
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">Products</h1>
          <p className="text-xs text-[#737373] mt-1">
            Hardware catalog with technical specifications and warranty details.
          </p>
        </div>

        <Link
          to="/pulse/create"
          className="bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus size={15} />
          <span>New invoice</span>
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-2.5 rounded-xl border border-[#ECECEB] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={15} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#A3A3A3]"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#111111] text-white'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#F4F4F3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl border border-[#ECECEB] hover:border-[#CCCCCC] transition-colors p-4 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Image Frame */}
              <div className="relative aspect-4/3 bg-[#FBFBFA] rounded-lg p-4 flex items-center justify-center border border-[#F4F4F3] mb-3">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-2.5 right-2.5 bg-white text-[#737373] text-[10px] font-medium px-2 py-0.5 rounded border border-[#ECECEB]">
                  {prod.warranty}
                </span>
              </div>

              {/* Title & category */}
              <span className="text-[10px] text-[#A3A3A3] uppercase tracking-wider font-medium">
                {prod.categoryLabel}
              </span>
              <h3 className="text-sm font-semibold text-[#111111] mt-0.5">{prod.name}</h3>
              <p className="text-xs text-[#737373] mt-1">{prod.highlight}</p>

              {/* Specs */}
              <div className="mt-3 pt-3 border-t border-[#F4F4F3] space-y-1 text-xs">
                {prod.detailedSpecs.slice(0, 3).map((spec, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[#A3A3A3]">{spec.label}</span>
                    <span className="font-mono text-[#111111]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F4F4F3]">
              <Link
                to="/pulse/create"
                className="w-full bg-[#F4F4F3] hover:bg-[#EAEAEA] text-[#111111] text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus size={13} />
                <span>Add to invoice</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PulseCatalog;
