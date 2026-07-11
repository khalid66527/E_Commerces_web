"use client"; // Next.js Client Component ডিরেক্টিভ

import Link from 'next/link';
import React, { useState } from 'react';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // এখানে আপনার সার্চ লজিক হবে
  };

  return (
    <nav className="relative w-full bg-[#06060C]/90 backdrop-blur-xl border-b border-[#8B5CF6]/20 z-50 sticky top-0">
      {/* Top Border Neon Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#EC4899] to-[#F43F5E]">
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
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EC4899] transition-colors">
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/shop" className="text-sm font-medium text-gray-300 hover:text-[#EC4899] transition-colors">Shop</a>
            <a href="/categories" className="text-sm font-medium text-gray-300 hover:text-[#EC4899] transition-colors">Categories</a>
            <a href="/deals" className="text-sm font-medium text-gray-300 hover:text-[#EC4899] transition-colors">Hot Deals</a>
            
            {/* Action Icons */}
            <div className="flex items-center space-x-4 border-l border-gray-800 pl-6">
              {/* Cart Button */}
              <a href="/cart" className="relative p-2 text-gray-300 hover:text-[#A78BFA] transition-colors">
                <FiShoppingCart size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                  3
                </span>
              </a>

              {/* Profile Button */}
              <a href="/auth/signin" className="p-2 text-gray-300 hover:text-[#A78BFA] transition-colors">
                <FiUser size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button & Action Icons */}
          <div className="md:hidden flex items-center space-x-4">
            <a href="/cart" className="relative p-2 text-gray-300 hover:text-[#A78BFA]">
              <FiShoppingCart size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                3
              </span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#16162a]/60 focus:outline-none transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Backdrop & Content */}
      {isOpen && (
        <div className="md:hidden bg-[#06060C] border-b border-[#8B5CF6]/20 absolute w-full left-0 transition-all duration-300 ease-in-out">
          <div className="px-4 pt-2 pb-6 space-y-4 shadow-2xl">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="relative my-2">
              <input
                type="text"
                placeholder="Search gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-2.5 text-white placeholder-gray-500 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={18} />
              </button>
            </form>

            {/* Mobile Links */}
            <a href="/shop" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-300 hover:bg-[#16162a]/60 hover:text-[#EC4899] transition-colors">Shop</a>
            <a href="/categories" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-300 hover:bg-[#16162a]/60 hover:text-[#EC4899] transition-colors">Categories</a>
            <a href="/deals" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-300 hover:bg-[#16162a]/60 hover:text-[#EC4899] transition-colors">Hot Deals</a>
            
            <div className="border-t border-gray-800 pt-4 flex items-center justify-between px-3">
              <span className="text-sm font-medium text-gray-400">Account</span>
              <a href="/auth/signin" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-xl text-sm font-bold">
                <FiUser size={16} /> Login
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}