"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { 
  FiShoppingBag, 
  FiUsers, 
  FiDollarSign, 
  FiBox, 
  FiPlus, 
  FiActivity, 
  FiTrendingUp, 
  FiGrid, 
  FiClock, 
  FiTruck, 
  FiCheckCircle 
} from 'react-icons/fi';

export default function DashboardPage() {
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
          <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin"></div>
          <p className="mt-4 text-[#A78BFA] text-sm font-semibold tracking-wider animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect via useEffect
  }

  const user = session.user;
  const role = user.role || 'user';

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
          Admin Command Center
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time store metrics, inventory management, and user controls</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-gray-50 dark:bg-gradient-to-br from-[#111122]/90 to-[#07070F]/95 border border-gray-250 dark:border-[#8B5CF6]/20 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#8B5CF6]"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sales</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">$45,231.89</h3>
            </div>
            <div className="p-3 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-2xl">
              <FiDollarSign size={22} />
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-bold mt-4">
            <FiTrendingUp className="mr-1" /> +12.5% from last month
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-50 dark:bg-gradient-to-br from-[#111122]/90 to-[#07070F]/95 border border-gray-250 dark:border-[#8B5CF6]/20 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#EC4899]"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Orders</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">+349</h3>
            </div>
            <div className="p-3 bg-[#EC4899]/10 text-[#EC4899] rounded-2xl">
              <FiShoppingBag size={22} />
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-bold mt-4">
            <FiTrendingUp className="mr-1" /> +8.2% from last week
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-50 dark:bg-gradient-to-br from-[#111122]/90 to-[#07070F]/95 border border-gray-250 dark:border-[#8B5CF6]/20 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#F43F5E]"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Products Registered</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">1,894</h3>
            </div>
            <div className="p-3 bg-[#F43F5E]/10 text-[#F43F5E] rounded-2xl">
              <FiBox size={22} />
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-xs font-bold mt-4">
            Stable Inventory
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-50 dark:bg-gradient-to-br from-[#111122]/90 to-[#07070F]/95 border border-gray-250 dark:border-[#8B5CF6]/20 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-500"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Registered Users</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">12,492</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
              <FiUsers size={22} />
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-bold mt-4">
            <FiTrendingUp className="mr-1" /> +24% new signups
          </div>
        </div>

      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Admin Controls */}
        <div className="lg:col-span-1 bg-gray-50 dark:bg-[#111122]/55 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">Administrative Controls</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#16162a]/40 hover:bg-[#8B5CF6]/5 dark:hover:bg-[#8B5CF6]/10 border border-gray-200 dark:border-gray-800/80 hover:border-[#8B5CF6] dark:hover:border-[#8B5CF6]/60 rounded-2xl transition-all group">
              <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-300 font-semibold group-hover:text-[#8B5CF6]">
                <FiPlus className="w-5 h-5 text-[#8B5CF6]" />
                <span>Add New Product</span>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-[#06060c] px-2.5 py-1 rounded-full uppercase">NEW</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#16162a]/40 hover:bg-[#EC4899]/5 dark:hover:bg-[#EC4899]/10 border border-gray-200 dark:border-gray-800/80 hover:border-[#EC4899] dark:hover:border-[#EC4899]/60 rounded-2xl transition-all group">
              <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-300 font-semibold group-hover:text-[#EC4899]">
                <FiGrid className="w-5 h-5 text-[#EC4899]" />
                <span>Manage Categories</span>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#16162a]/40 hover:bg-[#F43F5E]/5 dark:hover:bg-[#F43F5E]/10 border border-gray-200 dark:border-gray-800/80 hover:border-[#F43F5E] dark:hover:border-[#F43F5E]/60 rounded-2xl transition-all group">
              <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-300 font-semibold group-hover:text-[#F43F5E]">
                <FiActivity className="w-5 h-5 text-[#F43F5E]" />
                <span>View System Logs</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Recent Sales List */}
        <div className="lg:col-span-2 bg-gray-50 dark:bg-[#111122]/55 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3 mb-5">Recent Transactions</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#16162a]/20 border border-gray-200/80 dark:border-gray-800/40 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Sony PlayStation 5 Pro</p>
                <p className="text-xs text-gray-500">Order #TW-94830 • by Alice Vance</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900 dark:text-white">+$699.99</span>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Completed</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#16162a]/20 border border-gray-200/80 dark:border-gray-800/40 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Apple MacBook Pro 16"</p>
                <p className="text-xs text-gray-500">Order #TW-94829 • by Bobby Drake</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900 dark:text-white">+$2,499.00</span>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Completed</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#16162a]/20 border border-gray-200/80 dark:border-gray-800/40 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Nothing Phone (3)</p>
                <p className="text-xs text-gray-500">Order #TW-94828 • by Carol Danvers</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900 dark:text-white">+$599.99</span>
                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  // User Dashboard Component
  const UserDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
          Welcome Back, {user.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your orders, check your wishlists, and manage your gadget account</p>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gradient-to-br from-[#111122]/90 to-[#07070F]/95 border border-gray-250 dark:border-[#8B5CF6]/20 rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Orders Placed</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">0</h3>
            </div>
            <div className="p-3 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-2xl">
              <FiShoppingBag size={22} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gradient-to-br from-[#111122]/90 to-[#07070F]/95 border border-gray-250 dark:border-[#8B5CF6]/20 rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty Points</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">120</h3>
            </div>
            <div className="p-3 bg-[#EC4899]/10 text-[#EC4899] rounded-2xl">
              <FiTrendingUp size={22} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gradient-to-br from-[#111122]/90 to-[#07070F]/95 border border-gray-250 dark:border-[#8B5CF6]/20 rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Spent</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">$0.00</h3>
            </div>
            <div className="p-3 bg-[#F43F5E]/10 text-[#F43F5E] rounded-2xl">
              <FiDollarSign size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="bg-gray-50 dark:bg-[#111122]/55 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3 mb-5">Order Tracking & History</h3>
        
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            0
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white">No orders yet</h4>
            <p className="text-sm text-gray-550 dark:text-gray-400 mt-1 max-w-xs mx-auto">Explore our high-end electronics catalog to make your first purchase!</p>
          </div>
          <button 
            onClick={() => router.push('/shop')} 
            className="px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-xl text-xs font-bold tracking-wider hover:brightness-110 transition-all shadow-md"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-[85vh] bg-white dark:bg-[#06060C] text-gray-800 dark:text-gray-200 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EC4899]/5 dark:bg-[#EC4899]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}
