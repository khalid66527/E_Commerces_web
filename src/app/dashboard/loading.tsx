import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#06060c] p-6 md:p-10 animate-pulse space-y-8">
      {/* Header skeleton */}
      <div className="pb-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-60 bg-white/10 rounded-xl" />
          <div className="h-4 w-96 bg-white/5 rounded-lg" />
        </div>
        <div className="h-10 w-28 bg-white/5 rounded-xl" />
      </div>

      {/* Metrics grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="border border-white/[0.06] bg-white/[0.01] rounded-[2rem] p-6 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-white/5 rounded" />
              <div className="h-7 w-24 bg-white/10 rounded-md" />
            </div>
            <div className="h-12 w-12 bg-white/5 rounded-2xl" />
          </div>
        ))}
      </div>

      {/* Charts area skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-white/[0.06] rounded-[2.5rem] p-6 bg-white/[0.01] h-80" />
        <div className="border border-white/[0.06] rounded-[2.5rem] p-6 bg-white/[0.01] h-80" />
      </div>
    </div>
  );
}
