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
  FiSettings
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize theme
  useEffect(() => {
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setDropdownOpen(false);
            setIsOpen(false);
            router.push('/auth/signin');
            router.refresh();
          }
        }
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Define routes dynamically based on session & roles
  // "user nah takle route page hobe 3 ta ar signin user login takle route path hobe 5 ta"
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
        { name: 'Products', href: '/shop' }, // Fallback to shop
        { name: 'Orders', href: '/dashboard' }, // Fallback to dashboard
        { name: 'Users', href: '/dashboard' } // Fallback to dashboard
      ];
    }

    // Default user logged in (5 routes)
    return [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'Categories', href: '/categories' },
      { name: 'Hot Deals', href: '/deals' },
      { name: 'Cart', href: '/cart' }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="relative w-full bg-white dark:bg-[#06060C]/90 backdrop-blur-xl border-b border-gray-200 dark:border-[#8B5CF6]/20 z-50 sticky top-0 transition-colors duration-300">
      {/* Top Border Neon Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
              TECHWAVE<span className="text-[#EC4899]">.</span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search premium gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#16162a]/60 border border-gray-300 dark:border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EC4899] transition-colors">
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Actions & Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Desktop Navigation Links */}
            <div className="flex space-x-6 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className={`text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-[#EC4899] font-semibold' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-[#EC4899] dark:hover:text-[#EC4899]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-800 pl-6">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-xl text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} className="text-indigo-600" />}
              </button>

              {/* Cart Button (Always visible/placeholder for style) */}
              <Link href="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-[#A78BFA] transition-colors">
                <FiShoppingCart size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                  2
                </span>
              </Link>

              {/* Profile Dropdown or Sign In */}
              {isPending ? (
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#8B5CF6] animate-spin" />
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl border border-gray-300 dark:border-[#8B5CF6]/30 hover:border-[#EC4899] dark:hover:border-[#EC4899] transition-all bg-gray-50 dark:bg-[#111122]/50 text-gray-700 dark:text-white"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-xs uppercase shadow-md">
                      {user.name ? user.name[0] : 'U'}
                    </div>
                    <span className="text-xs font-semibold max-w-[80px] truncate hidden lg:inline">
                      {user.name}
                    </span>
                    <FiChevronDown size={14} className={`transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-[#111122] border border-gray-200 dark:border-[#8B5CF6]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(139,92,246,0.1)] py-2 text-gray-800 dark:text-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {role}
                        </span>
                      </div>
                      
                      <Link 
                        href="/profile" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium transition-colors"
                      >
                        <FiUser size={16} className="text-[#8B5CF6]" />
                        <span>Profile</span>
                      </Link>

                      <Link 
                        href="/dashboard" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium transition-colors"
                      >
                        <FiLayout size={16} className="text-[#EC4899]" />
                        <span>Dashboard</span>
                      </Link>

                      <hr className="my-1 border-gray-100 dark:border-gray-800" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 text-sm font-medium transition-colors text-left"
                      >
                        <FiLogOut size={16} />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:brightness-110 text-white rounded-xl text-xs font-extrabold tracking-wide transition-all shadow-[0_4px_15px_rgba(236,72,153,0.2)]"
                >
                  <FiUser size={14} /> Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Actions Container */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle (Mobile) */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-xl text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              {theme === 'dark' ? <FiSun size={18} className="text-yellow-400" /> : <FiMoon size={18} className="text-indigo-600" />}
            </button>

            {/* Cart (Mobile) */}
            <Link href="/cart" className="relative p-2 text-gray-600 dark:text-gray-300">
              <FiShoppingCart size={18} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                2
              </span>
            </Link>

            {/* User Dropdown or Login (Mobile Icon) */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-xs uppercase shadow-md"
                >
                  {user.name ? user.name[0] : 'U'}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white dark:bg-[#111122] border border-gray-200 dark:border-[#8B5CF6]/20 shadow-lg py-2 text-gray-800 dark:text-gray-200">
                    <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-800 text-xs">
                      <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <span className="text-[9px] font-bold text-[#8B5CF6] uppercase">{role}</span>
                    </div>
                    <Link href="/profile" onClick={() => setDropdownOpen(false)} className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 text-xs">Profile</Link>
                    <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 text-xs">Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-left block px-3 py-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 text-xs">Log Out</button>
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
              className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#16162a]/60 focus:outline-none transition-colors"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Links Sidebar/Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#06060C] border-b border-gray-200 dark:border-[#8B5CF6]/20 absolute w-full left-0 transition-all duration-300 ease-in-out shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="relative my-2">
              <input
                type="text"
                placeholder="Search gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#16162a]/60 border border-gray-300 dark:border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-2 text-gray-900 dark:text-white placeholder-gray-500 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={16} />
              </button>
            </form>

            {/* Mobile Links */}
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-[#8B5CF6]/10 text-[#EC4899] font-bold' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#16162a]/60 hover:text-[#EC4899]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            {!user && (
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex items-center justify-between px-3">
                <span className="text-xs font-semibold text-gray-400">Join Techwave</span>
                <Link 
                  href="/auth/signin" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-xl text-xs font-extrabold shadow-md"
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