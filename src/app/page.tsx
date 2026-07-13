import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoDeal from "@/components/PromoDeal";
import ScrollReveal from "@/components/ScrollReveal";
import { getProducts } from "@/lib/api/products";
import { FiTruck, FiShield, FiPhoneCall, FiRefreshCw, FiMail, FiSend, FiStar } from "react-icons/fi";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden pb-20 transition-colors duration-300">
      
      {/* 1. Hero Banner Section */}
      <Banner />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 mt-20">
        
        {/* 2. Core Features Section */}
        <section className="py-12 relative">
          
          {/* Section Header */}
          <ScrollReveal direction="bottom">
            <div className="text-center space-y-4 mb-16">
              <span className="text-[11px] font-black tracking-widest text-[#8B5CF6] uppercase bg-[#8B5CF6]/5 px-4 py-1.5 rounded-full border border-[#8B5CF6]/15">
                🛡️ Guaranteed Quality
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider">
                Why Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">With Us</span>
              </h2>
              <div className="h-[2px] w-20 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          {/* Grid Layout of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiTruck className="text-4xl text-[#8B5CF6]" />,
                title: "Free Express Shipping",
                desc: "Enjoy quick and secure delivery to your doorstep, completely free on orders exceeding $99 value.",
              },
              {
                icon: <FiShield className="text-4xl text-[#EC4899]" />,
                title: "Ultra-Secure Payments",
                desc: "Your data is fully safe. We support multi-layer SSL encrypted card and modern crypto transactions.",
              },
              {
                icon: <FiPhoneCall className="text-4xl text-[#8B5CF6]" />,
                title: "Premium 24/7 Support",
                desc: "Reach out to our professional hardware support team at any hour for quick, personalized advice.",
              },
              {
                icon: <FiRefreshCw className="text-4xl text-[#EC4899]" />,
                title: "Hassle-Free Warranty",
                desc: "We stand by our quality. All items are backed by a simple 30-day refund policy and a 2-year warranty.",
              },
            ].map((feature, idx) => (
              <ScrollReveal 
                key={idx} 
                direction="bottom" 
                delay={idx * 100}
                className="h-full"
              >
                <div className="group relative rounded-3xl bg-card border border-border dark:bg-[#0c0c14]/50 dark:border-white/[0.06] p-8 hover:border-[#8B5CF6]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(139,92,246,0.12)] flex flex-col items-center text-center justify-between h-full overflow-hidden">
                  
                  {/* Subtle Background Accent */}
                  <span className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/2 to-[#EC4899]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                  <div className="space-y-6 flex flex-col items-center">
                    {/* Icon frame */}
                    <div className="p-5 bg-muted border border-border rounded-2xl group-hover:bg-[#8B5CF6]/10 group-hover:border-[#8B5CF6]/30 transition-all duration-500 shadow-md group-hover:scale-110">
                      {feature.icon}
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-foreground text-lg tracking-wide uppercase group-hover:text-transparent bg-clip-text bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {feature.desc}
                      </p>
                    </div>
                  </div>

                  {/* Decorative dot indicator */}
                  <div className="w-1.5 h-1.5 rounded-full bg-muted group-hover:bg-[#EC4899] mt-6 transition-colors duration-500"></div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 3. Featured Products Section (8 cards with pagination underneath) */}
        <section>
          <FeaturedProducts products={products} />
        </section>

        {/* 4. Promo Countdown Section */}
        <section>
          <PromoDeal />
        </section>

        {/* 5. Testimonials & Newsletter block (Redesigned & Beautified) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Testimonials (Wall of Love) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <ScrollReveal direction="left">
              <div className="space-y-3">
                <span className="text-[11px] font-black tracking-widest text-[#8B5CF6] uppercase bg-[#8B5CF6]/5 px-4 py-1.5 rounded-full border border-[#8B5CF6]/15 w-fit">
                  💬 Buyer Reviews
                </span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-foreground">
                  Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_15px_rgba(139,92,246,0.35)]">Elite Gamers</span>
                </h3>
                <p className="text-xs text-muted-foreground font-medium max-w-lg">
                  See how professional designers, e-sports enthusiasts, and code creators evaluate their hardware experiences with us.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 mt-6">
              {[
                {
                  quote: "Absolutely top tier equipment. The custom tactile feel of the typing response is premium. Delivery was surprisingly fast!",
                  author: "Rayhan Chowdhury",
                  role: "Software Developer",
                  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
                  rating: 5,
                },
                {
                  quote: "The active noise cancellation on these premium XM5 headphones is spectacular. Supportive team guided me to choose the best kit.",
                  author: "Sinthia Kabir",
                  role: "Visual Artist",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
                  rating: 5,
                },
              ].map((testi, idx) => (
                <ScrollReveal 
                  key={idx} 
                  direction="bottom" 
                  delay={idx * 150}
                  className="h-full"
                >
                  <div className="group relative rounded-3xl bg-card border border-border dark:bg-[#0c0c14]/40 dark:border-white/[0.06] hover:border-[#8B5CF6]/40 p-8 flex flex-col justify-between h-full hover:shadow-[0_15px_35px_rgba(139,92,246,0.06)] transition-all duration-300 overflow-hidden">
                    <span className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8B5CF6]/2 to-transparent rounded-full blur-2xl"></span>
                    
                    <div className="space-y-4 relative z-10">
                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: testi.rating }).map((_, i) => (
                          <FiStar key={i} className="text-[#EC4899] fill-[#EC4899] text-sm" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed font-medium">
                        &ldquo;{testi.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-4.5 mt-8 pt-5 border-t border-border relative z-10">
                      {/* Avatar */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={testi.avatar} 
                        alt={testi.author} 
                        className="w-11 h-11 rounded-full object-cover border border-[#8B5CF6]/30 group-hover:border-[#EC4899] transition-colors duration-500"
                      />
                      <div>
                        <h5 className="text-sm font-black text-foreground">{testi.author}</h5>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-extrabold">{testi.role}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Newsletter (Join the Wave) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right">
              <div className="rounded-[32px] bg-gradient-to-br from-[#120a24] via-card to-[#1a0826] dark:from-[#120a24] dark:via-[#0c0c14] dark:to-[#1a0826] border border-border dark:border-white/[0.08] p-8 md:p-10 flex flex-col justify-between h-full hover:border-[#EC4899]/50 transition-all duration-500 relative overflow-hidden shadow-2xl group">
                
                {/* Glowing glow orb */}
                <div className="absolute top-[-10%] right-[-10%] w-52 h-52 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#8B5CF6]/20 transition-all duration-500"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#EC4899]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="space-y-6 relative z-10">
                  <div className="p-4 bg-gradient-to-tr from-[#8B5CF6]/10 to-[#EC4899]/10 border border-[#8B5CF6]/20 rounded-2xl w-fit text-[#8B5CF6] group-hover:text-white dark:group-hover:text-white transition-all duration-300">
                    <FiMail size={28} className="animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-foreground">Join the Wave</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                      Subscribe to receive weekly early access alerts on custom tech releases, deep developer hardware reviews, and premium discount coupons.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-8 relative z-10">
                  <div className="relative group w-full">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-background border border-border dark:bg-[#07070d]/80 dark:border-white/[0.08] focus:border-[#8B5CF6]/80 focus:ring-2 focus:ring-[#8B5CF6]/15 rounded-2xl pl-5 pr-14 py-4 text-xs text-foreground placeholder-gray-500 outline-none transition-all duration-300"
                    />
                    <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EC4899] transition-colors p-2 flex items-center justify-center bg-white/[0.02] hover:bg-[#EC4899]/10 border border-border hover:border-[#EC4899]/20 rounded-xl">
                      <FiSend size={15} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/60 font-extrabold uppercase tracking-widest pt-2">
                    <span>🔒 Zero Spam</span>
                    <span>•</span>
                    <span>Unsubscribe Anytime</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </section>

      </div>
    </div>
  );
}
