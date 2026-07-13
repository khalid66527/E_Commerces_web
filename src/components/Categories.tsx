"use client";

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSmartphone, FiCpu, FiMonitor, FiHeadphones, FiGrid, FiHelpCircle } from 'react-icons/fi';

interface CategoryItem {
  name: string;
  count: number;
}

interface CategoriesProps {
  categories: CategoryItem[];
}

const getCategoryIcon = (name: string) => {
  const lowercase = name.toLowerCase();
  if (lowercase.includes('phone') || lowercase.includes('mobile')) {
    return <FiSmartphone className="text-3xl text-[#EC4899]" />;
  }
  if (lowercase.includes('laptop') || lowercase.includes('computer') || lowercase.includes('pc') || lowercase.includes('monitor')) {
    return <FiMonitor className="text-3xl text-[#8B5CF6]" />;
  }
  if (lowercase.includes('audio') || lowercase.includes('headphone') || lowercase.includes('sound') || lowercase.includes('speaker')) {
    return <FiHeadphones className="text-3xl text-pink-400" />;
  }
  if (lowercase.includes('accessory') || lowercase.includes('gadget') || lowercase.includes('watch') || lowercase.includes('charger')) {
    return <FiCpu className="text-3xl text-purple-400" />;
  }
  return <FiGrid className="text-3xl text-[#8B5CF6]" />;
};

const getCategoryBgImage = (name: string) => {
  const lowercase = name.toLowerCase();
  if (lowercase.includes('phone') || lowercase.includes('mobile')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop';
  }
  if (lowercase.includes('laptop') || lowercase.includes('computer') || lowercase.includes('pc') || lowercase.includes('monitor')) {
    return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop';
  }
  if (lowercase.includes('audio') || lowercase.includes('headphone') || lowercase.includes('sound') || lowercase.includes('speaker')) {
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop';
  }
  if (lowercase.includes('camera')) {
    return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop';
  }
  if (lowercase.includes('tablet')) {
    return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop';
  }
  return 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=600&auto=format&fit=crop';
};

export default function Categories({ categories }: CategoriesProps) {
  return (
    <div className="py-6">
      {/* Title Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-widest text-foreground uppercase">
          Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">Categories</span>
        </h1>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mx-auto mt-4 rounded-full animate-pulse"></div>
        <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
          Browse our high-performance collection of premium gear sorted by category.
        </p>
      </div>

      {/* Grid Layout */}
      {categories.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-3xl backdrop-blur-md">
          <FiHelpCircle className="mx-auto text-5xl text-gray-600 animate-bounce" />
          <p className="text-muted-foreground mt-4 text-lg">No categories found in the database yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Link 
              key={cat.name} 
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative block p-[1.5px] rounded-[24px] overflow-hidden hover:-translate-y-2 transition-transform duration-500 category-card-wrapper"
              style={{
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Spinning gradient border overlay (revealed on hover) */}
              <div 
                className="absolute -inset-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] border-spin-element z-0 pointer-events-none" 
                style={{ backgroundImage: 'conic-gradient(from 0deg, #8B5CF6, #EC4899, #8B5CF6)' }}
              />

              {/* Inner container */}
              <div className="relative z-10 w-full h-80 bg-card rounded-[22px] overflow-hidden flex flex-col justify-between p-8 border border-border group-hover:border-transparent transition-all duration-300">
                {/* Background category image with zoom */}
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={getCategoryBgImage(cat.name)} 
                    alt={cat.name} 
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-card/20" />
                </div>

                {/* Content layers */}
                <div className="relative z-10 flex justify-between items-start gap-4">
                  {/* Icon wrapper */}
                  <div className="p-4 bg-muted border border-border rounded-2xl group-hover:scale-110 group-hover:bg-[#8B5CF6]/10 group-hover:border-[#8B5CF6]/30 transition-all duration-500 shadow-md">
                    {getCategoryIcon(cat.name)}
                  </div>
                  
                  {/* Count badge */}
                  <span className="px-3.5 py-1.5 bg-card border border-border rounded-full text-xs font-black text-[#EC4899] group-hover:bg-[#EC4899]/10 group-hover:border-[#EC4899]/30 transition-all duration-300 shadow-lg">
                    {cat.count} {cat.count === 1 ? 'Product' : 'Products'}
                  </span>
                </div>

                {/* Text & Link info */}
                <div className="relative z-10 space-y-3">
                  <h3 className="text-2xl font-black text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#EC4899] transition-all duration-300 tracking-wide uppercase">
                    {cat.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <span className="font-semibold">Browse Products</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300 text-[#EC4899]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Embedded CSS for fadeInUp and rotating border animations */}
      <style>{`
        .category-card-wrapper {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .category-card-wrapper:hover .border-spin-element {
          animation: border-spin 3s linear infinite;
        }
        @keyframes border-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
