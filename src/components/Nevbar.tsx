"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiLogOut,
  FiLayout,
  FiSettings,
  FiGrid
} from 'react-icons/fi';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const role = user?.role || 'user'; // default to 'user'

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false); // Solves the load/hydration flash issue
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Initialize theme securely without visual flickering
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const initialTheme = isDark ? 'dark' : 'light';
    setTheme(initialTheme);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle click outside profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedOutsideDesktop = !desktopDropdownRef.current || !desktopDropdownRef.current.contains(event.target as Node);
      const clickedOutsideMobile = !mobileDropdownRef.current || !mobileDropdownRef.current.contains(event.target as Node);

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
      setIsOpen(false);
      router.push('/auth/signin');
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Define routes dynamically based on session & roles
  const getNavLinks = () => {
    if (!user) {
      return [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Categories', href: '/categories' }
      ];
    }

    if (role === 'admin') {
      return [
        { name: 'Home', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Products', href: '/shop' },
        { name: 'Orders', href: '/dashboard' },
        { name: 'Users', href: '/dashboard' }
      ];
    }

    return [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'Categories', href: '/categories' },
      { name: 'Hot Deals', href: '/deals' },
      { name: 'Cart', href: '/cart' }
    ];
  };

  const navLinks = getNavLinks();

  // Prevent rendering raw layout elements before mounting to secure theme consistency
  if (!mounted) {
    return <div className="w-full h-20 bg-[#06060C] border-b border-white/[0.05]" />;
  }

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/70 dark:bg-[#06060C]/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(139,92,246,0.03)]">
      {/* Top Border Animated Neon line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center">
            <Link
              href="/"
              className="group relative text-2xl font-extrabold tracking-widest text-white"
            >
              {/* Main Text */}
              <span className="relative z-10 flex items-center">
                <span className="glitch-text">TECHWAVE</span>

                <span className="ml-1 text-pink-500 relative">
                  .
                  <span className="absolute inset-0 animate-pulse text-pink-400 blur-[2px]">.</span>
                </span>
              </span>

              {/* Neon Glow Layer */}
              <span className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></span>

              {/* Bottom Line Animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 group-hover:w-full transition-all duration-500"></span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                placeholder="Search premium gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100/80 dark:bg-[#16162a]/40 border border-gray-300/70 dark:border-[#8B5CF6]/15 focus:border-[#EC4899] dark:focus:border-[#8B5CF6] rounded-xl pl-4 pr-10 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#EC4899]/10 dark:focus:ring-[#8B5CF6]/10 transition-all duration-300 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#EC4899] transition-colors duration-200">
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Actions & Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Desktop Navigation Links */}
            <div className="flex space-x-6 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium relative py-1 transition-all duration-300 group ${isActive
                      ? 'text-[#EC4899] font-bold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#EC4899]'
                      }`}
                  >
                    <span>{link.name}</span>
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 border-l border-gray-200 dark:border-white/[0.08] pl-6">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.04] border border-transparent hover:border-gray-200/50 dark:hover:border-white/[0.05] active:scale-90 transition-all duration-200"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <FiSun size={19} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" /> : <FiMoon size={19} className="text-indigo-600" />}
              </button>

              {/* Cart Button */}
              <Link href="/cart" className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.04] border border-transparent hover:border-gray-200/50 dark:hover:border-white/[0.05] rounded-xl active:scale-95 transition-all duration-200 group">
                <FiShoppingCart size={19} className="group-hover:translate-x-0.5 transition-transform" />
                <span className="absolute top-1 right-1 h-4 w-4 bg-[#EC4899] text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-md shadow-[#EC4899]/40 animate-bounce">
                  2
                </span>
              </Link>

              {/* Profile Dropdown or Sign In */}
              {isPending ? (
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#8B5CF6] animate-spin" />
              ) : user ? (
                <div className="relative" ref={desktopDropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl border border-gray-200 dark:border-white/[0.08] hover:border-[#EC4899]/40 dark:hover:border-[#8B5CF6]/40 transition-all duration-300 bg-gray-50 dark:bg-white/[0.02] text-gray-700 dark:text-white"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-xs uppercase shadow-inner">
                      {user.name ? user.name[0] : 'U'}
                    </div>
                    <span className="text-xs font-semibold max-w-[80px] truncate hidden lg:inline">
                      {user.name}
                    </span>
                    <FiChevronDown size={14} className={`transform transition-transform duration-300 text-gray-400 ${dropdownOpen ? 'rotate-180 text-[#EC4899]' : ''}`} />
                  </button>

                  {/* Dropdown Menu (Dashboard inside profile) */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-[#0c0c14] border border-gray-100 dark:border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(139,92,246,0.15)] py-2 text-gray-800 dark:text-gray-200 transition-all duration-300 origin-top-right">
                      <div className="px-4 py-2.5 border-b border-gray-100 dark:border-white/[0.06]">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{user.email}</p>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 rounded-md text-[9px] font-bold uppercase tracking-wider">
                          {role}
                        </span>
                      </div>

                      <div className="p-1.5 space-y-0.5">
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/[0.04] rounded-xl text-sm font-medium transition-colors group"
                        >
                          <FiUser size={16} className="text-[#8B5CF6] group-hover:scale-110 transition-transform" />
                          <span>Profile</span>
                        </Link>

                        {/* Integrated Dashboard Links directly inside Profile */}
                        <Link
                          href="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/[0.04] rounded-xl text-sm font-medium transition-colors group"
                        >
                          <FiGrid size={16} className="text-[#EC4899] group-hover:scale-110 transition-transform" />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          href="/dashboard" // Keeps fallback architecture safe
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/[0.04] rounded-xl text-sm font-medium transition-colors group"
                        >
                          <FiSettings size={16} className="text-gray-400 group-hover:rotate-45 transition-transform" />
                          <span>Settings</span>
                        </Link>
                      </div>

                      <div className="px-1.5 border-t border-gray-100 dark:border-white/[0.06] mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 rounded-xl text-sm font-medium transition-all text-left"
                        >
                          <FiLogOut size={16} />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:opacity-90 active:scale-95 text-white rounded-xl text-xs font-extrabold tracking-wide transition-all shadow-md shadow-[#EC4899]/20"
                >
                  <FiUser size={14} /> Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Actions Container */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.04]"
            >
              {theme === 'dark' ? <FiSun size={18} className="text-yellow-400" /> : <FiMoon size={18} className="text-indigo-600" />}
            </button>

            {/* Cart (Mobile) */}
            <Link href="/cart" className="relative p-2 text-gray-600 dark:text-gray-300">
              <FiShoppingCart size={18} />
              <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#EC4899] text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                2
              </span>
            </Link>

            {/* Mobile Profile Dropdown */}
            {user ? (
              <div className="relative" ref={mobileDropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-xs uppercase shadow"
                >
                  {user.name ? user.name[0] : 'U'}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white dark:bg-[#0c0c14] border border-gray-100 dark:border-white/[0.06] shadow-xl py-1 text-gray-800 dark:text-gray-200">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-white/[0.06] text-xs">
                      <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <span className="text-[9px] font-bold text-[#8B5CF6] uppercase">{role}</span>
                    </div>
                    <div className="p-1">
                      <Link href="/profile" onClick={() => setDropdownOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-white/[0.04] rounded-lg text-xs">Profile</Link>
                      <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-white/[0.04] rounded-lg text-xs">Dashboard</Link>
                    </div>
                    <div className="p-1 border-t border-gray-100 dark:border-white/[0.06]">
                      <button onClick={handleLogout} className="w-full text-left block px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 rounded-lg text-xs">Log Out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/signin" className="p-2 text-gray-600 dark:text-gray-300">
                <FiUser size={18} />
              </Link>
            )}

            {/* Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] focus:outline-none transition-colors"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Links Sidebar/Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#06060C] border-b border-gray-100 dark:border-white/[0.06] absolute w-full left-0 shadow-2xl transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="relative my-2">
              <input
                type="text"
                placeholder="Search gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-2 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={16} />
              </button>
            </form>

            {/* Mobile Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                      ? 'bg-[#8B5CF6]/10 text-[#EC4899] font-bold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.02] hover:text-[#EC4899]'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {!user && (
              <div className="border-t border-gray-200 dark:border-white/[0.06] pt-4 flex items-center justify-between px-3">
                <span className="text-xs font-semibold text-gray-400">Join Techwave</span>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-xl text-xs font-bold"
                >
                  <FiUser size={14} /> Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}