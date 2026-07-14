import React from 'react';

export default function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#06060c] py-12 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="h-6 w-64 bg-white/5 rounded" />

        {/* Product details skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery block */}
          <div className="space-y-6">
            <div className="aspect-square bg-white/5 rounded-3xl" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-2xl" />
              ))}
            </div>
          </div>

          {/* Details side block */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-white/10 rounded-full" />
                <div className="h-5 w-16 bg-white/10 rounded-full" />
              </div>
              <div className="h-10 w-3/4 bg-white/10 rounded-xl" />
              <div className="h-8 w-28 bg-white/10 rounded-md" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-20 bg-white/5 rounded" />
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-2/3 bg-white/5 rounded" />
            </div>

            <div className="h-12 w-full bg-white/5 rounded-2xl" />

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.04]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 bg-white/5 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
