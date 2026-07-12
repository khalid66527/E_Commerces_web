import ShopsideBar from '@/components/ShopsideBar';
import React from 'react';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar */}
      <aside className="w-full lg:w-64 shrink-0">
        <ShopsideBar />
      </aside>
      {/* Right Main Grid */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
