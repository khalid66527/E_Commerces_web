
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push('/auth/signin');
      } else if (session.user.role !== 'admin') {
        router.push('/dashboard/user/profile');
      }
    }
  }, [session, isPending, router]);

  if (isPending || !session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#06060C] flex items-center justify-center transition-colors">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}