"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiClock, FiPercent, FiArrowRight, FiVolume2, FiMusic, FiBatteryCharging } from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";

export default function PromoDeal() {
  // Setup countdown target (e.g. 3 days from current time)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-transparent relative z-10 w-full">
      <ScrollReveal direction="bottom">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-card/90 via-card/75 to-card/90 dark:from-[#0c0c14]/90 dark:via-[#0a0515]/90 dark:to-[#120722]/90 border border-border dark:border-white/[0.08] p-8 md:p-14 lg:p-20 flex flex-col lg:flex-row gap-16 items-center shadow-2xl backdrop-blur-xl group hover:border-[#8B5CF6]/50 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(139,92,246,0.15)]">
          
          {/* Inner futuristic glows */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#EC4899]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#EC4899]/15 transition-all duration-500 dark:block hidden"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#8B5CF6]/15 transition-all duration-500 dark:block hidden"></div>

          {/* Left Grid: Copy & Countdown */}
          <div className="flex-grow space-y-10 text-left w-full lg:w-3/5">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EC4899]/8 border border-[#EC4899]/20 rounded-2xl text-xs font-black text-[#EC4899] uppercase tracking-widest shadow-md">
              <FiPercent className="animate-bounce" /> Limited Tech Deal of the Week
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground leading-none">
                Sony XM5 <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] bg-[size:200%_auto] animate-gradient-shift drop-shadow-[0_0_15px_rgba(139,92,246,0.35)] dark:drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  ANC Audiophile Edition
                </span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl font-medium">
                Indulge in industry-leading active noise cancelling, dynamic custom smart EQ, and breathtaking soundstage clarity. Over 30 hours of continuous playback on a single charge.
              </p>
            </div>

            {/* Countdown Nodes */}
            <div className="grid grid-cols-4 gap-4 max-w-md w-full">
              {[
                { label: "Days", val: timeLeft.days },
                { label: "Hours", val: timeLeft.hours },
                { label: "Mins", val: timeLeft.minutes },
                { label: "Secs", val: timeLeft.seconds },
              ].map((time, idx) => (
                <div 
                  key={idx} 
                  className="bg-muted border border-border dark:bg-white/[0.015] dark:border-white/[0.06] rounded-2xl p-4 sm:p-5 text-center hover:border-[#8B5CF6]/40 transition-all duration-300 shadow-inner group-hover:-translate-y-1"
                >
                  <span className="block text-3xl sm:text-5xl font-black text-foreground tabular-nums drop-shadow-[0_0_10px_rgba(139,92,246,0.15)] dark:drop-shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                    {time.val.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-xs text-muted-foreground font-black uppercase tracking-widest mt-2 block">
                    {time.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA and Clock Info */}
            <div className="flex flex-wrap gap-5 items-center">
              <Link 
                href="/shop" 
                className="group inline-flex items-center gap-3 px-8 py-4.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-black rounded-2xl hover:shadow-[0_0_25px_rgba(236,72,153,0.35)] dark:hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider shadow-lg"
              >
                <span>Claim 40% Off</span>
                <FiArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-extrabold text-muted-foreground bg-muted border border-border px-4 py-2 rounded-xl">
                <FiClock className="text-[#8B5CF6] animate-pulse" />
                <span>Timer ends soon</span>
              </div>
            </div>

          </div>

          {/* Right Grid: Visual 3D Orbiting Product Display */}
          <div className="relative w-full lg:w-2/5 flex items-center justify-center">
            
            {/* Spinning radar graphic behind */}
            <div className="absolute w-72 h-72 rounded-full border border-border dark:border-[#8B5CF6]/10 animate-spin-slow"></div>
            
            {/* Main Image Container */}
            <div className="relative w-full max-w-[350px] aspect-square flex items-center justify-center bg-muted border border-border dark:bg-[#07070d]/60 dark:border-white/[0.06] p-8 overflow-hidden group-hover:border-[#8B5CF6]/30 transition-all duration-500 shadow-2xl z-10">
              
              {/* Radial gradient backing */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0,transparent_60%)]"></div>
              
              {/* Product Headphone Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                alt="Sony WH-1000XM5 Studio Headset"
                className="w-[85%] h-[85%] object-cover rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 shadow-2xl relative z-10"
              />

              {/* Glowing Save Banner */}
              <div className="absolute bottom-5 right-5 z-20 shadow-lg">
                <span className="px-4 py-1.5 bg-black/90 border border-white/[0.1] rounded-full text-[10px] font-black text-[#EC4899] uppercase tracking-wider">
                  Save $120
                </span>
              </div>

            </div>

            {/* Orbiting micro tag 1: Active Noise Cancelling */}
            <div className="absolute top-[-10px] right-[10%] bg-card border border-border px-3 py-2 rounded-xl flex items-center gap-2 shadow-xl backdrop-blur-md animate-float z-20">
              <FiVolume2 className="text-[#8B5CF6] text-sm" />
              <span className="text-[9px] font-black text-foreground uppercase tracking-wider">Active ANC</span>
            </div>

            {/* Orbiting micro tag 2: Hi-Res Audio */}
            <div className="absolute bottom-[20%] left-[-20px] bg-card border border-border px-3 py-2 rounded-xl flex items-center gap-2 shadow-xl backdrop-blur-md animate-float-delayed z-20">
              <FiMusic className="text-[#EC4899] text-sm" />
              <span className="text-[9px] font-black text-foreground uppercase tracking-wider">Hi-Res Audio</span>
            </div>

            {/* Orbiting micro tag 3: Battery Charge */}
            <div className="absolute top-[40%] right-[-20px] bg-card border border-border px-3 py-2 rounded-xl flex items-center gap-2 shadow-xl backdrop-blur-md animate-float z-20">
              <FiBatteryCharging className="text-[#8B5CF6] text-sm" />
              <span className="text-[9px] font-black text-foreground uppercase tracking-wider">30H Charge</span>
            </div>

          </div>

        </div>
      </ScrollReveal>
      
      {/* Dynamic inline gradient shifts */}
      <style>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradientShift 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
