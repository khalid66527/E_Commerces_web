import React from 'react';

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-[#06060c] py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-9 w-48 bg-white/10 rounded-2xl" />
          <div className="h-1 w-16 bg-white/5 rounded-full" />
        </div>

        {/* Filter inputs skeleton */}
        <div className="flex gap-4 items-center">
          <div className="h-12 flex-grow bg-white/5 rounded-2xl" />
          <div className="h-12 w-52 bg-white/5 rounded-2xl" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="border border-white/[0.04] bg-[#0c0c14]/20 rounded-3xl p-6 space-y-6">
              <div className="aspect-square bg-white/5 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 w-12 bg-white/10 rounded-md" />
                <div className="h-6 w-3/4 bg-white/10 rounded-md" />
                <div className="h-4 w-full bg-white/5 rounded-md" />
                <div className="h-4 w-2/3 bg-white/5 rounded-md" />
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-white/[0.04]">
                <div className="space-y-1">
                  <div className="h-3 w-8 bg-white/5 rounded" />
                  <div className="h-6 w-16 bg-white/10 rounded" />
                </div>
                <div className="h-8 w-24 bg-white/5 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
