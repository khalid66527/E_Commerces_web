

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push('/auth/signin');
      } else {
        const role = session.user.role || 'user';
        if (role === 'admin') {
          router.push('/dashboard/admin/profile');
        } else {
          router.push('/dashboard/user/profile');
        }
      }
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin"></div>
    </div>
  );
}