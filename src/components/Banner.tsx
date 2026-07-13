"use client";

import React from "react";
import Link from "next/link";
import { FiShoppingBag, FiArrowRight, FiZap, FiCpu, FiLayout } from "react-icons/fi";

export default function Banner() {
  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 border-b border-border transition-colors duration-300">
      
      {/* 1. Dynamic Mesh Glow Gradients (Dark vs Light theme specific) */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,rgba(139,92,246,0)_70%)] blur-[120px] pointer-events-none animate-pulse-slow dark:block hidden"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.15)_0%,rgba(236,72,153,0)_70%)] blur-[120px] pointer-events-none animate-pulse-slow dark:block hidden"></div>
      
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,rgba(139,92,246,0)_70%)] blur-[110px] pointer-events-none animate-pulse-slow dark:hidden block"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.05)_0%,rgba(236,72,153,0)_70%)] blur-[110px] pointer-events-none animate-pulse-slow dark:hidden block"></div>
      
      {/* Background Cyber Radar Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none"></div>

      {/* Floating Accent Shapes */}
      <div className="absolute top-[15%] right-[50%] w-20 h-20 rounded-full bg-gradient-to-tr from-[#8B5CF6]/8 to-[#EC4899]/8 border border-border dark:border-white/[0.04] backdrop-blur-sm pointer-events-none animate-float shadow-sm"></div>

      {/* Main Grid Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Heading and info */}
        <div className="lg:col-span-7 text-left space-y-8 flex flex-col justify-center">
          
          {/* Tagline Badge */}
          <div className="line-anim-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-muted/80 dark:bg-white/[0.02] border border-border dark:border-white/[0.06] text-xs font-black text-muted-foreground dark:text-gray-300 uppercase tracking-widest hover:border-[#8B5CF6]/40 transition-all duration-300 shadow-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC4899] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EC4899]"></span>
              </span>
              🔥 Premium E-Sports Grade Accessories
            </span>
          </div>

          {/* Core Headings */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] overflow-hidden">
              <span className="block line-anim-2 text-foreground">
                Next-Gen Custom
              </span>
              <span className="block line-anim-3 mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] bg-[size:200%_auto] animate-gradient-shift drop-shadow-[0_0_15px_rgba(139,92,246,0.25)] dark:drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                Cyber Hardware
              </span>
            </h1>
          </div>

          {/* Paragraph */}
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed font-medium line-anim-4">
            Indulge in ultra-responsive tactile inputs, pristine acoustic clarity, and gorgeous custom designs engineered to elevate your daily digital setup.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-5 items-center line-anim-5 pt-2">
            <Link 
              href="/shop" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-black rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] dark:hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] hover:scale-105 active:scale-95 text-base shadow-xl"
            >
              <span>Shop Cyber Gear</span>
              <FiArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link 
              href="#featured-products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4.5 bg-card hover:bg-muted border border-border text-foreground font-black rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-base shadow-lg"
            >
              <span>Explore Offers</span>
            </Link>
          </div>

          {/* Counter statistics */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border max-w-xl line-anim-6">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">15k+</p>
              <p className="text-xs text-muted-foreground font-extrabold uppercase tracking-widest mt-1">Setup Builds</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">99.8%</p>
              <p className="text-xs text-muted-foreground font-extrabold uppercase tracking-widest mt-1">Uptime Speed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">4.97★</p>
              <p className="text-xs text-muted-foreground font-extrabold uppercase tracking-widest mt-1">Review Rating</p>
            </div>
          </div>

        </div>

        {/* Right Column: Premium Generated Keyboard Image Visual */}
        <div className="lg:col-span-5 relative flex justify-center items-center line-anim-right">
          
          {/* Orbit Radar Circles */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-border dark:border-[#8B5CF6]/5 animate-radar-slow pointer-events-none"></div>
          <div className="absolute w-[360px] h-[360px] rounded-full border border-border dark:border-[#EC4899]/5 animate-radar-delayed pointer-events-none"></div>

          {/* Main Visual Image Card container */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[40px] bg-card border border-border dark:border-white/[0.08] p-5 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl group hover:border-[#8B5CF6]/50 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_30px_60px_rgba(139,92,246,0.2)]">
            
            {/* Corner Light glow */}
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#8B5CF6]/25 transition-all duration-500"></div>

            {/* Top specification row */}
            <div className="flex justify-between items-center z-10 px-3 pt-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#EC4899] uppercase tracking-widest block">Pro Edition</span>
                <h3 className="font-extrabold text-foreground text-xl tracking-wide">CyberBoard RGB</h3>
              </div>
              <div className="p-3 bg-muted border border-border rounded-xl text-[#8B5CF6]">
                <FiLayout size={20} className="animate-pulse" />
              </div>
            </div>

            {/* Center Product Image Box (using the generated asset) */}
            <div className="relative my-5 flex-1 bg-muted border border-border rounded-[28px] overflow-hidden group-hover:border-[#EC4899]/30 transition-all duration-500 shadow-inner flex items-center justify-center">
              {/* Overlay Mesh */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 to-[#EC4899]/5 z-10 opacity-30"></div>
              
              {/* Generated Asset Keyboard Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/premium_mechanical_keyboard.png" 
                alt="CyberBoard Custom RGB Keyboard"
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom pricing specifications and buttons */}
            <div className="space-y-4 z-10 px-3 pb-3">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest block">Exclusive price</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_8px_rgba(236,72,153,0.15)]">$149.00</span>
                </div>
                <div className="flex gap-2 text-[10px] font-black text-muted-foreground bg-muted border border-border px-3 py-2 rounded-xl uppercase items-center">
                  <FiCpu className="text-[#8B5CF6] animate-spin-slow" />
                  <span>Tactile Linear</span>
                </div>
              </div>

              <Link 
                href="/shop"
                className="w-full py-4 bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 hover:from-[#8B5CF6] hover:to-[#EC4899] border border-[#8B5CF6]/30 hover:border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-foreground hover:text-white dark:text-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-sm"
              >
                <FiShoppingBag size={14} />
                <span>Add to Cart</span>
              </Link>
            </div>

          </div>

          {/* Micro Orbiting Spec tag: Latency */}
          <div className="absolute top-[35%] left-[-35px] bg-card border border-border p-3.5 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md animate-float-delayed hover:border-[#EC4899]/50 transition-all duration-300 z-20">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-[#8B5CF6]">
              <FiZap size={16} />
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground font-black uppercase tracking-wider">Interface</p>
              <p className="text-xs font-extrabold text-foreground leading-tight">0.1ms Latency</p>
            </div>
          </div>

        </div>

      </div>

      {/* Embed local style animations */}
      <style>{`
        .line-anim-1, .line-anim-2, .line-anim-3, .line-anim-4, .line-anim-5, .line-anim-6, .line-anim-right {
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .line-anim-1 {
          animation: bannerFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }
        .line-anim-2 {
          animation: bannerFadeRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
        }
        .line-anim-3 {
          animation: bannerFadeLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }
        .line-anim-4 {
          animation: bannerFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
        }
        .line-anim-5 {
          animation: bannerScaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
        }
        .line-anim-6 {
          animation: bannerFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.85s forwards;
        }
        .line-anim-right {
          animation: bannerFadeLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
        }

        @keyframes bannerFadeDown {
          from {
            opacity: 0;
            transform: translateY(-25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bannerFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bannerFadeRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bannerFadeLeft {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bannerScaleUp {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Radar animations */
        @keyframes radar {
          0% { transform: scale(0.85); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.4; }
          100% { transform: scale(0.85); opacity: 0.2; }
        }

        .animate-radar-slow {
          animation: radar 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-radar-delayed {
          animation: radar 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 4s;
        }

        /* Floating elements */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.04); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-spin-slow {
          animation: spin 16s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }

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
