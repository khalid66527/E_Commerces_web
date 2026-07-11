"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import {
  FiUser,
  FiBarChart2,
  FiUsers,
  FiBox,
  FiPlusCircle,
  FiCreditCard,
  FiFolderPlus,
  FiClock,
  FiLogOut,
  FiHome,
  FiMenu,
  FiX
} from 'react-icons/fi';

export default function DashboardSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;
  const role = user?.role || 'user';

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/signin');
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const adminLinks = [
    { name: 'Profile', href: '/dashboard/admin/profile', icon: FiUser },
    { name: 'Analytics', href: '/dashboard/admin/analyticsOverview', icon: FiBarChart2 },
    { name: 'Manage Users', href: '/dashboard/admin/manageUser', icon: FiUsers },
    { name: 'Manage Products', href: '/dashboard/admin/manageallproduct', icon: FiBox },
    { name: 'Post Product', href: '/dashboard/admin/postaProduct', icon: FiPlusCircle },
    { name: 'Transactions', href: '/dashboard/admin/viewAllTransactions', icon: FiCreditCard },
  ];

  const userLinks = [
    { name: 'Profile', href: '/dashboard/user/profile', icon: FiUser },
    { name: 'My Added Products', href: '/dashboard/user/myadded', icon: FiFolderPlus },
    { name: 'Purchase History', href: '/dashboard/user/purcesshistory', icon: FiClock },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between bg-[#111122]/90 backdrop-blur-xl border-b border-[#8B5CF6]/20 px-4 py-4 w-full text-white">
        <p className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] uppercase">
          {role} <span className="text-[#EC4899]">Panel</span>
        </p>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-[#16162a] text-gray-300 hover:text-white"
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0A0A16] md:bg-[#07070F]/95 border-r border-[#8B5CF6]/15 flex flex-col justify-between transition-transform duration-300 ease-in-out h-screen
        md:sticky md:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Section */}
        <div>
          {/* Logo (Desktop only) */}
          <div className="hidden md:flex items-center h-20 px-6 border-b border-gray-800/40">
            <p className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] uppercase">
              {role} <span className="text-[#EC4899]">Panel</span>
            </p>

          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/10 text-white border-l-4 border-[#EC4899] shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                      : 'text-gray-400 hover:bg-[#16162a]/65 hover:text-white'
                    }
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-[#EC4899]' : 'text-gray-400'} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile Card & Actions */}
        <div className="p-4 border-t border-gray-800/50 space-y-3">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#16162a]/50 rounded-xl transition-all"
          >
            <FiHome size={14} />
            <span>Go to Homepage</span>
          </Link>

          {/* User Profile Card */}
          {user && (
            <div className="bg-[#111122]/60 border border-gray-850 p-3 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-xs uppercase shadow-md flex-shrink-0">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate leading-tight">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5 capitalize">{role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-[#F43F5E] hover:bg-red-500/10 rounded-lg transition-all"
                title="Log Out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}