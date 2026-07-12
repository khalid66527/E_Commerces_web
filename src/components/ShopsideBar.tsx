"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  FiSliders, 
  FiSmartphone, 
  FiHeadphones, 
  FiCamera, 
  FiMonitor, 
  FiTablet, 
  FiGrid 
} from 'react-icons/fi';

const categories = [
  { name: 'All Categories', value: '' },
  { name: 'Laptop', value: 'Laptop' },
  { name: 'Phone', value: 'Phone' },
  { name: 'Smartphone', value: 'Smartphone' },
  { name: 'Earphone', value: 'Earphone' },
  { name: 'Camera', value: 'Camera' },
  { name: 'Monitor', value: 'Monitor' },
  { name: 'Tablet', value: 'Tablet' },
];

const getCategoryIcon = (name: string) => {
  switch (name) {
    case 'Laptop': return <FiMonitor className="text-base" />;
    case 'Phone': return <FiSmartphone className="text-base" />;
    case 'Smartphone': return <FiSmartphone className="text-base" />;
    case 'Earphone': return <FiHeadphones className="text-base" />;
    case 'Camera': return <FiCamera className="text-base" />;
    case 'Monitor': return <FiMonitor className="text-base" />;
    case 'Tablet': return <FiTablet className="text-base" />;
    default: return <FiGrid className="text-base" />;
  }
};

export default function ShopsideBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams ? (searchParams.get('category') || '') : '';

  const handleCategorySelect = (value: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full bg-[#0c0c14]/40 border border-white/[0.04] rounded-3xl p-6 backdrop-blur-md space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06] text-white">
        <FiSliders className="text-[#8B5CF6]" />
        <h3 className="font-extrabold uppercase tracking-wider text-sm">Filters</h3>
      </div>

      {/* Admin Panel Styled Category List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3">Categories</h4>
        <nav className="flex flex-col space-y-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8B5CF6]/15 to-[#EC4899]/15 text-white font-extrabold border-l-4 border-pink-500 shadow-md shadow-purple-500/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02] border-l-4 border-transparent'
                }`}
              >
                {/* Active highlight dot */}
                {isActive && (
                  <span className="absolute right-4 w-1.5 h-1.5 bg-[#EC4899] rounded-full animate-ping" />
                )}

                {/* Staggered left icon shift on hover */}
                <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-[#EC4899]' : 'text-gray-500 group-hover:text-white'}`}>
                  {getCategoryIcon(cat.name)}
                </div>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
