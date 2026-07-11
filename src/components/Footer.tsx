"use client"; // Next.js Client Component ডিরেক্টিভ

import React from 'react';
import { 
  FiGithub, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiArrowRight 
} from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#06060C] text-gray-400 border-t border-[#8B5CF6]/20 overflow-hidden pt-16 pb-8">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#EC4899]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-gray-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-black tracking-wider text-white">
              NEXT<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">MART</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Experience the future of shopping with our next-gen digital marketplace. Fast, secure, and built for tomorrow.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FiTwitter size={18} />, link: "#" },
                { icon: <FiInstagram size={18} />, link: "#" },
                { icon: <FiGithub size={18} />, link: "#" },
                { icon: <FiLinkedin size={18} />, link: "#" },
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.link} 
                  className="p-2.5 bg-[#111122]/50 border border-[#8B5CF6]/10 text-gray-400 hover:text-[#EC4899] hover:border-[#EC4899]/50 rounded-xl transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Shop</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">Featured Items</a></li>
                <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">Discounts</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Support</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-[#EC4899] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#EC4899] transition-colors">FAQ & Help</a></li>
                <li><a href="#" className="hover:text-[#EC4899] transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-[#EC4899] transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Subscribe to Newsletter</h4>
            <p className="text-sm text-gray-500">Get the latest updates on new product drops and exclusive offers.</p>
            <form className="relative flex items-center mt-2 group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full h-12 pl-4 pr-12 bg-[#111122]/40 border border-[#8B5CF6]/20 focus:border-[#EC4899]/60 rounded-xl text-sm text-white placeholder-gray-600 outline-none backdrop-blur-md transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 p-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-lg hover:brightness-110 transition-all shadow-lg"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Section: Contact Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 text-sm text-gray-500 border-b border-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg"><FiMapPin size={16} /></div>
            <span>123 Cyber Street, Tech City, BD</span>
          </div>
          <div className="flex items-center gap-3 md:justify-center">
            <div className="p-2 bg-[#EC4899]/10 text-[#EC4899] rounded-lg"><FiPhone size={16} /></div>
            <span>+880 1234 567890</span>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <div className="p-2 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg"><FiMail size={16} /></div>
            <span>support@nextmart.com</span>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} NextMart. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}