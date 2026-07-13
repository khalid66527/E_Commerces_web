"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/admin/analyticsOverview');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin"></div>
    </div>
  );
}