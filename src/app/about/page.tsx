"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { 
  FiUsers, 
  FiAward, 
  FiCpu, 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiCode, 
  FiDatabase, 
  FiGlobe, 
  FiZap, 
  FiLayers,
  FiChevronDown,
  FiBox
} from 'react-icons/fi';

export default function AboutPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'mission' | 'values' | 'tech'>('mission');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stats = [
    { label: "Products Delivered", value: "150K+", icon: <FiBox className="text-[#8B5CF6]" /> },
    { label: "Positive Ratings", value: "99.4%", icon: <FiAward className="text-[#EC4899]" /> },
    { label: "Global Developers", value: "45K+", icon: <FiUsers className="text-[#8B5CF6]" /> },
    { label: "Response Rate", value: "24/7", icon: <FiZap className="text-[#EC4899]" /> }
  ];

  const team = [
    {
      name: "Tariqul Islam",
      role: "Founder & CEO",
      bio: "Hardware enthusiast with 12+ years of experience in electronics distribution and custom keyboards.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      github: "#",
      twitter: "#",
      linkedin: "#"
    },
    {
      name: "Sabrina Rahman",
      role: "Lead Platform Engineer",
      bio: "Next.js core expert specialized in designing high-concurrency Node APIs and low-latency database queries.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
      github: "#",
      twitter: "#",
      linkedin: "#"
    },
    {
      name: "Amit Sen",
      role: "Head of Product Design",
      bio: "Creator of premium digital experiences with a deep focus on keyboard ergonomics and desktop aesthetics.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      github: "#",
      twitter: "#",
      linkedin: "#"
    }
  ];

  const techStack = [
    { name: "Next.js 16", desc: "React framework for low-latency server rendering.", icon: <FiLayers className="text-[#8B5CF6]" /> },
    { name: "TypeScript", desc: "Type-safe system for reliable application updates.", icon: <FiCode className="text-[#EC4899]" /> },
    { name: "Tailwind CSS", desc: "Utility-first framework for responsive visual layouts.", icon: <FiZap className="text-[#8B5CF6]" /> },
    { name: "MongoDB", desc: "Scalable document database storing products data.", icon: <FiDatabase className="text-[#EC4899]" /> }
  ];

  const faqs = [
    {
      q: "Where does Techwave source its products?",
      a: "We procure our high-performance hardware and peripherals directly from authorized global developers and verified brand distributors to ensure 100% authenticity."
    },
    {
      q: "Do you offer international shipping?",
      a: "Yes, we ship globally using rapid carbon-neutral delivery networks. Real-time package tracking is accessible within your customer dashboard."
    },
    {
      q: "What is your hardware warranty policy?",
      a: "All Techwave catalog items are covered by our standard 1-year product warranty. We also provide a hassle-free 30-day return policy."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#06060C] text-gray-300 font-sans py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Dynamic Animated Glow Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#8B5CF6]/5 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#EC4899]/5 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[150px] pointer-events-none animate-float" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-28">
        
        {/* Section 1: Hero Banner */}
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-widest text-[#8B5CF6] uppercase bg-[#8B5CF6]/10 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20">
            🚀 The Next Generation E-Commerce Ecosystem
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white leading-tight">
            Designed for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              Tech Innovators
            </span>
          </h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-semibold">
            TechWave is more than a store. We are a specialized platform supplying elite mechanical keyboard peripherals, ergonomic upgrades, and computer system components for people who build the future.
          </p>
        </div>

        {/* Section 2: Animated Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="relative group bg-[#0c0c14]/40 border border-white/[0.06] rounded-[2rem] p-6 text-center space-y-3 hover:border-[#8B5CF6]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.1)]"
            >
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl w-fit mx-auto group-hover:scale-105 transition-all">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-white block tracking-tight">{stat.value}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Interactive Tabs Section (Mission, Values, Tech) */}
        <div className="border border-white/[0.06] rounded-[2.5rem] p-8 md:p-12 bg-white/[0.01] backdrop-blur-md space-y-8 relative overflow-hidden animate-slide-up">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/2 via-transparent to-[#EC4899]/2 opacity-50" />
          
          <div className="flex flex-wrap gap-4 border-b border-white/[0.06] pb-6 relative z-10">
            {[
              { id: 'mission', label: 'Our Mission', icon: <FiGlobe /> },
              { id: 'values', label: 'Core Values', icon: <FiAward /> },
              { id: 'tech', label: 'Stack Architecture', icon: <FiCpu /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white border-transparent shadow-lg shadow-[#8B5CF6]/20'
                    : 'bg-white/5 border-white/10 hover:border-[#8B5CF6]/40 text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative z-10 min-h-[160px] flex items-center">
            {activeTab === 'mission' && (
              <div className="space-y-4 animate-fade-in text-left">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Democratizing Hardware Excellence</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                  Our core mission is to bridge the gap between premium global manufacturers and regional hardware builders. We ensure that absolute peak-grade components are globally accessible without exorbitant markup rates, unreliable shipping partners, or verification concerns.
                </p>
                <p className="text-xs text-[#8B5CF6] font-bold">#VerifiedPerformance #AuthenticSource</p>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in w-full text-left">
                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-sm">Transparency First</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    We maintain accurate stock logs and publish direct supplier information. Real pricing with zero hidden handling costs.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-sm">Ergonomic Safety</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Every custom keyboard layout and keycap listing is carefully vetted to optimize typing angles and combat workplace stress.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in w-full text-left">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                    <div className="p-2 bg-white/5 border border-white/10 rounded-xl w-fit">
                      {tech.icon}
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-white text-xs uppercase">{tech.name}</h5>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{tech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Timeline Milestones (Scroll Animated Visual Style) */}
        <div className="space-y-12 animate-slide-up">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black tracking-widest text-[#EC4899] uppercase bg-[#EC4899]/10 px-3 py-1 rounded-full border border-[#EC4899]/20">
              📈 Scaling History
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wider">Milestones & Growth</h2>
            <p className="text-xs text-gray-500 font-semibold max-w-md mx-auto">Tracing the growth steps of the TechWave ecosystem model.</p>
          </div>

          <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/[0.06] hidden md:block space-y-16">
            {[
              {
                year: "2024",
                side: "left",
                title: "Launch & Switches",
                desc: "Founded as a specialized Switch store offering premium Gateron, Cherry, and custom lubed linear options to local keyboard builders."
              },
              {
                year: "2025",
                side: "right",
                title: "Database Upgrades",
                desc: "Integrated secure JWT authentication and scalable MongoDB endpoints to support larger checkout lists and secure data storage."
              },
              {
                year: "2026",
                side: "left",
                title: "TechWave E-Commerce",
                desc: "Rebranded to TechWave, deploying a Next.js client engine to support lightning-fast page loading and dashboard analytics."
              }
            ].map((milestone, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between w-full ${
                  milestone.side === 'left' ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Milestone card */}
                <div className="w-[45%] bg-[#0c0c14]/40 border border-white/[0.06] hover:border-[#8B5CF6]/40 p-6 rounded-[2rem] space-y-3 relative group transition-all duration-300 hover:-translate-y-1 text-left">
                  <span className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/2 to-[#EC4899]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" />
                  <span className="text-[10px] font-black tracking-widest text-[#EC4899] uppercase bg-[#EC4899]/10 px-3 py-1 rounded-full border border-[#EC4899]/15">
                    {milestone.year}
                  </span>
                  <h4 className="font-extrabold text-white text-base uppercase tracking-wide relative z-10">{milestone.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed relative z-10 font-medium">{milestone.desc}</p>
                </div>

                {/* Badge Center indicator */}
                <div className="w-10 h-10 rounded-full bg-[#06060c] border-4 border-gray-800 flex items-center justify-center relative z-20 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                </div>

                {/* Empty block to balance layout */}
                <div className="w-[45%]" />
              </div>
            ))}
          </div>

          {/* Fallback Mobile Timeline */}
          <div className="space-y-8 md:hidden before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/[0.06] relative text-left">
            {[
              { year: "2024", title: "Launch & Switches", desc: "Founded as a specialized Switch store offering premium custom components." },
              { year: "2025", title: "Database Upgrades", desc: "Integrated secure JWT authentication and scalable MongoDB endpoints." },
              { year: "2026", title: "TechWave E-Commerce", desc: "Rebranded to TechWave, deploying a Next.js client engine to support lightning-fast loading." }
            ].map((m, idx) => (
              <div key={idx} className="relative pl-10 space-y-2 group">
                <div className="absolute left-2 top-2 w-3.5 h-3.5 bg-[#06060c] border-2 border-gray-650 rounded-full group-hover:border-[#EC4899] transition-all" />
                <span className="text-[9px] font-black tracking-widest text-[#EC4899] uppercase bg-[#EC4899]/10 px-2 py-0.5 rounded-full border border-[#EC4899]/15">
                  {m.year}
                </span>
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">{m.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Team Members (Hover Animated Cards) */}
        <div className="space-y-12 animate-slide-up">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black tracking-widest text-[#8B5CF6] uppercase bg-[#8B5CF6]/10 px-3 py-1 rounded-full border border-[#8B5CF6]/20">
              👥 Behind the Core
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wider">Meet Our Team</h2>
            <p className="text-xs text-gray-500 font-semibold max-w-md mx-auto">The designers and engineering builders shaping the platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#0c0c14]/40 border border-white/[0.06] rounded-[2.5rem] p-6 text-center space-y-5 hover:border-[#8B5CF6]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(139,92,246,0.15)] overflow-hidden"
              >
                {/* Glow ring */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#8B5CF6]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Avatar image container */}
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-white/10 group-hover:border-[#EC4899] transition-colors duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="space-y-1 relative z-10">
                  <h4 className="font-extrabold text-white text-base uppercase tracking-wide">{member.name}</h4>
                  <span className="text-[9px] text-[#A78BFA] font-bold uppercase tracking-wider block">{member.role}</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-medium min-h-[48px] relative z-10">
                  "{member.bio}"
                </p>

                {/* Social media links */}
                <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/[0.04]">
                  <a href={member.github} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:text-white hover:bg-[#8B5CF6]/30 transition-all text-gray-500">
                    <FiGithub size={14} />
                  </a>
                  <a href={member.twitter} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:text-white hover:bg-[#EC4899]/30 transition-all text-gray-500">
                    <FiTwitter size={14} />
                  </a>
                  <a href={member.linkedin} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:text-white hover:bg-[#8B5CF6]/30 transition-all text-gray-500">
                    <FiLinkedin size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: FAQ Accordion Component */}
        <div className="space-y-8 max-w-3xl mx-auto animate-slide-up">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black tracking-widest text-[#EC4899] uppercase bg-[#EC4899]/10 px-3 py-1 rounded-full border border-[#EC4899]/20">
              💬 General Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wider">About FAQ</h2>
            <p className="text-xs text-gray-500 font-semibold">Everything you need to know about our listing operations.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#0c0c14]/40 border border-white/[0.06] rounded-3xl overflow-hidden hover:border-[#8B5CF6]/30 transition-all text-left"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                  >
                    <span className="font-extrabold text-white text-xs sm:text-sm uppercase tracking-wide">{faq.q}</span>
                    <FiChevronDown 
                      size={16} 
                      className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#EC4899]' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[150px] border-t border-white/[0.04]' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 text-xs sm:text-sm text-gray-400 leading-relaxed font-medium bg-white/[0.01] text-left">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 7: Animated Call to Action Banner */}
        <div className="relative border border-white/[0.08] bg-gradient-to-r from-[#0c0c14] to-[#120a22] rounded-[3rem] p-8 sm:p-14 text-center overflow-hidden space-y-6 shadow-2xl animate-slide-up">
          {/* Neon line decoration */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '1s' }} />

          <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wider">Ready to Upgrade Your Setup?</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-semibold">
            Explore our collections of premium mechanical keyboards, custom switches, keycaps, and desktop performance gadgets. Get verified authentic hardware delivered right to your desk.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link 
              href="/shop" 
              className="px-8 py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-[#8B5CF6]/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Shop Collections
            </Link>
            <Link 
              href={session?.user ? "/contact" : "auth/signin"} 
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Contact Team
            </Link>
          </div>
        </div>

      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: floatEffect 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
