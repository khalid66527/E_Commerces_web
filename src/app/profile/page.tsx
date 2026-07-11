"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { FiUser, FiMail, FiCalendar, FiShield, FiHeart, FiShoppingBag, FiTruck } from 'react-icons/fi';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/signin');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#06060C] flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-[#EC4899] animate-spin"></div>
          <p className="mt-4 text-[#A78BFA] text-sm font-semibold tracking-wider animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect via useEffect
  }

  const user = session.user;
  const role = user.role || 'user';

  return (
    <div className="relative min-h-[80vh] bg-white dark:bg-[#06060C] text-gray-800 dark:text-gray-200 font-sans py-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EC4899]/5 dark:bg-[#EC4899]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
            Account Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account information and preferences</p>
        </div>

        {/* Profile Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main User Info Card */}
          <div className="md:col-span-1 bg-gray-50 dark:bg-gradient-to-b from-[#111122]/90 to-[#07070F]/95 border border-gray-200 dark:border-[#8B5CF6]/20 rounded-[2rem] p-6 text-center shadow-lg relative overflow-hidden">
            {/* Ambient Card Glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"></div>
            
            {/* Avatar Ring */}
            <div className="relative w-28 h-28 mx-auto mt-4 mb-6 rounded-full p-1 bg-gradient-to-tr from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] shadow-xl">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#111122] flex items-center justify-center text-4xl font-black text-[#EC4899] uppercase">
                {user.name ? user.name[0] : 'U'}
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">{user.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-4">{user.email}</p>
            
            <span className="inline-block px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              {role}
            </span>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-2 text-left space-y-4">
              <div className="flex items-center space-x-3 text-xs">
                <FiMail className="text-[#EC4899] w-4 h-4" />
                <span className="text-gray-600 dark:text-gray-400 truncate">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <FiShield className="text-[#8B5CF6] w-4 h-4" />
                <span className="text-gray-600 dark:text-gray-400 capitalize">Role: {role}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <FiCalendar className="text-[#F43F5E] w-4 h-4" />
                <span className="text-gray-600 dark:text-gray-400">Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</span>
              </div>
            </div>
          </div>

          {/* Quick stats and details */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-[#111122]/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center">
                <FiShoppingBag className="mx-auto w-6 h-6 text-[#8B5CF6] mb-2" />
                <div className="text-2xl font-black text-gray-900 dark:text-white">0</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Orders</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#111122]/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center">
                <FiHeart className="mx-auto w-6 h-6 text-[#EC4899] mb-2" />
                <div className="text-2xl font-black text-gray-900 dark:text-white">0</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Wishlist</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#111122]/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center">
                <FiTruck className="mx-auto w-6 h-6 text-[#F43F5E] mb-2" />
                <div className="text-2xl font-black text-gray-900 dark:text-white">0</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Shipped</div>
              </div>
            </div>

            {/* Profile Preferences */}
            <div className="bg-gray-50 dark:bg-gradient-to-b from-[#111122]/60 to-[#07070F]/80 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-850 pb-3">Personal Settings</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-150 dark:border-gray-800/40">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Display Name</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{user.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-150 dark:border-gray-800/40">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Email Address</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-150 dark:border-gray-800/40">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Verification Status</span>
                  <span className="text-emerald-500 font-bold uppercase text-xs tracking-wider">Verified</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Authentication Type</span>
                  <span className="text-gray-900 dark:text-white font-semibold capitalize">Email & Password</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
