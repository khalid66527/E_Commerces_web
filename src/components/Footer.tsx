"use client";

import React from 'react';
import { 
  FiGithub, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiArrowRight,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiMessageSquare
} from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#06060C] via-[#080814] to-[#04040A] text-gray-400 border-t border-white/[0.06] overflow-hidden pt-20 pb-8 font-sans">
      
      {/* Decorative Glow Blobs */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#EC4899]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#8B5CF6]/3 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
       

        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 py-16 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-widest text-white flex items-center gap-1">
                TECHWAVE<span className="text-[#EC4899] animate-pulse">.</span>
              </h2>
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mt-2 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Experience the future of tech shopping with our next-gen digital marketplace. Uncompromising quality, curated premium products, and bleeding-edge customer service.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FiTwitter size={18} />, link: "#", color: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40" },
                { icon: <FiInstagram size={18} />, link: "#", color: "hover:text-[#E1306C] hover:border-[#E1306C]/40" },
                { icon: <FiGithub size={18} />, link: "#", color: "hover:text-white hover:border-white/40" },
                { icon: <FiLinkedin size={18} />, link: "#", color: "hover:text-[#0077B5] hover:border-[#0077B5]/40" },
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.link} 
                  className={`p-3 bg-white/[0.02] border border-white/[0.06] text-gray-400 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-lg ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:ps-8">
            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-[#8B5CF6] ps-3">Shop Link</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'All Products', href: '/shop' },
                  { name: 'Featured Items', href: '/#featured-products' },
                  { name: 'New Arrivals', href: '/shop' },
                  { name: 'Special Discounts', href: '/shop' }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-[#8B5CF6] hover:translate-x-1 flex items-center gap-1 transition-all duration-300">
                      <span className="text-[10px] text-gray-700">▶</span> {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-[#EC4899] ps-3">Support</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'FAQ & Help', href: '/#faq' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Terms & Privacy', href: '/about' }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-[#EC4899] hover:translate-x-1 flex items-center gap-1 transition-all duration-300">
                      <span className="text-[10px] text-gray-700">▶</span> {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-5 lg:ps-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-[#8B5CF6] ps-3">Newsletter Subscription</h4>
            <p className="text-sm text-gray-400 leading-relaxed">Get first dibs on exclusive product drops, tech reviews, and private subscriber sales.</p>
            <form className="relative flex items-center mt-2 group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full h-12 pl-4 pr-12 bg-white/[0.02] border border-white/[0.08] focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 shadow-[inner_0_2px_4px_rgba(0,0,0,0.3)]"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 p-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#EC4899]/20"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Section: Contact Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 text-sm text-gray-500 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/10 rounded-xl"><FiMapPin size={16} /></div>
            <span className="text-gray-400">123 Cyber Street, Tech City, BD</span>
          </div>
          <div className="flex items-center gap-3 md:justify-center">
            <div className="p-2.5 bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/10 rounded-xl"><FiPhone size={16} /></div>
            <span className="text-gray-400">+880 1234 567890</span>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <div className="p-2.5 bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/10 rounded-xl"><FiMail size={16} /></div>
            <span className="text-gray-400">support@techwave.com</span>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} TECHWAVE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/about" className="hover:text-[#8B5CF6] transition-colors duration-300">Privacy Policy</a>
            <a href="/about" className="hover:text-[#EC4899] transition-colors duration-300">Terms of Service</a>
            <a href="/about" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}