"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiShoppingBag, FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      
      {/* Background glow meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,rgba(139,92,246,0)_70%)] blur-[100px] pointer-events-none dark:opacity-80 opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.1)_0%,rgba(236,72,153,0)_70%)] blur-[100px] pointer-events-none dark:opacity-80 opacity-50"></div>

      <div className="relative z-10 text-center max-w-xl space-y-8 flex flex-col items-center">
        
        {/* Animated Icon Container */}
        <div className="p-5 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-lg animate-bounce">
          <FiAlertTriangle size={36} />
        </div>

        {/* 404 Title */}
        <div className="space-y-2">
          <h1 className="text-8xl sm:text-9xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] bg-[size:200%_auto] animate-gradient-shift drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            404
          </h1>
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-wider">
            Sector Not Found
          </h2>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
          The digital pathway you are seeking does not exist, has been shifted in the cyber grid, or is temporarily offline. Return to the storefront to resume your exploration.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 items-center justify-center pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-black rounded-xl hover:shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider shadow-lg"
          >
            <FiHome size={15} />
            <span>Return to Base</span>
          </Link>
          
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-card border border-border text-foreground hover:bg-muted hover:border-[#8B5CF6]/50 rounded-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider shadow-md"
          >
            <FiShoppingBag size={15} />
            <span>Browse Products</span>
          </Link>
        </div>

      </div>

      {/* Background Radar Line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <style>{`
        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradientShift 4s linear infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>

    </div>
  );
}
