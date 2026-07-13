"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/lib/api/products";
import { FiHeart, FiShoppingCart, FiEye, FiShoppingBag, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { addToWishlist } from "@/lib/actions/wishlist";
import { addToCartBackend } from "@/lib/actions/cart";
import ScrollReveal from "@/components/ScrollReveal";

interface FeaturedProductsProps {
  products: Product[];
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fb-1",
    _id: "fb-1",
    title: "CyberKey Pro RGB Keyboard",
    brand: "CyberType",
    price: 149,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
    category: "Keyboards",
    description: "Ultra-responsive mechanical gaming keyboard with hot-swappable tactile linear switches and dynamic custom rgb lighting controls.",
  },
  {
    id: "fb-2",
    _id: "fb-2",
    title: "AeroSound Pro ANC Earbuds",
    brand: "AeroAudio",
    price: 89,
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    category: "Audio",
    description: "Experience premium active noise cancelling wireless audio with intelligent ambient transparency mode and 32-hour extended battery life.",
  },
  {
    id: "fb-3",
    _id: "fb-3",
    title: "Viper Precision Wireless Mouse",
    brand: "ViperTech",
    price: 69,
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Superlight ergonomic wireless gaming mouse boasting an ultra-accurate 26K DPI optical sensor and 120 hours of continuous gaming battery life.",
  },
  {
    id: "fb-4",
    _id: "fb-4",
    title: "VividView 27\" 165Hz Monitor",
    brand: "ApexDisplay",
    price: 279,
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
    category: "Monitors",
    description: "Vibrant IPS gaming monitor with super fast refresh rate, 1ms response time, HDR400 color depth, and fully adjustable ergonomic stand.",
  },
  {
    id: "fb-5",
    _id: "fb-5",
    title: "Strix GeForce RTX 4080 Super",
    brand: "ROG",
    price: 1149,
    stock: 5,
    imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop",
    category: "GPU",
    description: "Next-gen ray tracing graphics card optimized for high frame rate 4K gaming, featuring AI-powered DLSS 3 frame generation.",
  },
  {
    id: "fb-6",
    _id: "fb-6",
    title: "Spectra Flow Mid-Tower Case",
    brand: "NeoBuild",
    price: 139,
    stock: 14,
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop",
    category: "Cases",
    description: "Premium high-airflow PC case with tempered glass panels, integrated magnetic dust filters, and four addressable RGB case fans.",
  },
  {
    id: "fb-7",
    _id: "fb-7",
    title: "StudioMic USB Condenser Microphone",
    brand: "VocalStream",
    price: 119,
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
    category: "Audio",
    description: "Professional studio-quality USB microphone featuring adjustable cardioid polar pattern, built-in pop filter, and desktop boom arm.",
  },
  {
    id: "fb-8",
    _id: "fb-8",
    title: "HexaGlow LED Modular Panels",
    brand: "AuraLight",
    price: 99,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop",
    category: "Lighting",
    description: "Modular smart LED lighting panels that react to music, sync with PC screen colors, and offer millions of vibrant hues.",
  },
  {
    id: "fb-9",
    _id: "fb-9",
    title: "HyperCool 360 Liquid Cooler",
    brand: "CoolerPeak",
    price: 159,
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1562975088-7e9c6a2ee35a?q=80&w=600&auto=format&fit=crop",
    category: "Cooling",
    description: "All-in-one CPU liquid cooler featuring dynamic custom LCD block display, premium radiator fans, and braided sleeved tubing.",
  },
  {
    id: "fb-10",
    _id: "fb-10",
    title: "PowerHub 140W Multi-Charger",
    brand: "VoltSync",
    price: 49,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
    category: "Power",
    description: "High-speed multi-port desktop GaN charger delivering up to 140W total output to charge multiple laptops, tablets, and phones simultaneously.",
  },
  {
    id: "fb-11",
    _id: "fb-11",
    title: "Quest VR Headset Horizon",
    brand: "Oculus",
    price: 449,
    stock: 6,
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop",
    category: "VR",
    description: "All-in-one standalone virtual reality headset featuring high-density displays, hand tracking, and rich immersive game library.",
  },
  {
    id: "fb-12",
    _id: "fb-12",
    title: "Apex Desk Mount Monitor Arm",
    brand: "NeoDesk",
    price: 79,
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Heavy-duty mechanical spring single monitor arm mount supporting screens up to 34 inches, offering full tilt, swivel, and height adjustments.",
  }
];

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return displayProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [displayProducts, currentPage]);

  const { data: session } = useSession();
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleAddToCart = async (product: Product) => {
    if (!session?.user) {
      showToast("error", "Please log in to add to cart!");
      return;
    }

    try {
      const productId = product.id || product._id;
      const res = await addToCartBackend(
        session.user.email || "",
        session.user.name || "",
        session.user.id || "",
        productId,
        product,
        1
      );
      if (res.success) {
        showToast("success", `${product.title} added to cart!`);
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    if (!session?.user?.email) {
      showToast("error", "Please log in to add to wishlist!");
      return;
    }

    const productId = product.id || product._id;
    setLoadingProductId(productId);
    try {
      const res = await addToWishlist(session.user.email, productId, {
        id: productId,
        _id: productId,
        title: product.title,
        brand: product.brand,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        description: product.description || "",
        specifications: product.specifications || {},
      });
      if (res.success) {
        showToast("success", res.message);
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong.");
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div id="featured-products" className="py-12 bg-transparent text-foreground relative z-10 w-full space-y-12 transition-colors duration-300">
      {/* Header section */}
      <ScrollReveal direction="bottom">
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="px-3 py-1 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-full text-[11px] font-black text-[#8B5CF6] uppercase tracking-widest">
            🔥 Top Selections
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-foreground">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_15px_rgba(139,92,246,0.35)]">Products</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full"></div>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base font-medium">
            Explore our bestselling next-level hardware, high-end components, and ultimate tech gear setup choices.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product, idx) => {
          const direction = idx % 4 === 0 ? "left" : idx % 4 === 1 || idx % 4 === 3 ? "bottom" : "right";
          
          return (
            <ScrollReveal 
              key={product.id} 
              direction={direction} 
              delay={idx * 75} 
              className="h-full"
            >
              <div className="group relative flex flex-col justify-between h-full rounded-3xl bg-card border border-border dark:bg-[#0c0c14]/40 dark:border-white/[0.06] hover:border-[#8B5CF6]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,92,246,0.12)] overflow-hidden shadow-sm">
                {/* Glowing hover accent */}
                <span className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/3 to-[#EC4899]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></span>

                <div className="relative z-10">
                  {/* Image Container with Actions */}
                  <div className="relative aspect-square bg-muted dark:bg-[#0a0a12] overflow-hidden rounded-t-3xl border-b border-border dark:border-white/[0.04]">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <FiShoppingBag size={40} />
                      </div>
                    )}

                    {/* Brand Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-muted/90 border border-border dark:bg-black/60 dark:border-white/[0.1] rounded-full text-[9px] font-bold text-foreground dark:text-gray-300 uppercase tracking-widest group-hover:border-[#8B5CF6]/50 transition-all duration-300 shadow-md">
                        {product.brand || "Premium"}
                      </span>
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-background/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      {/* Wishlist Button */}
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        disabled={loadingProductId === (product.id || product._id)}
                        className="p-3 bg-card dark:bg-[#0c0c14]/80 hover:bg-[#EC4899] border border-border dark:border-white/[0.08] hover:border-transparent rounded-full text-foreground hover:text-white dark:text-gray-200 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 ease-out flex items-center justify-center"
                      >
                        <FiHeart size={16} className={loadingProductId === (product.id || product._id) ? "animate-spin" : ""} />
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-3 bg-card dark:bg-[#0c0c14]/80 hover:bg-[#8B5CF6] border border-border dark:border-white/[0.08] hover:border-transparent rounded-full text-foreground hover:text-white dark:text-gray-200 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 ease-out flex items-center justify-center"
                      >
                        <FiShoppingCart size={16} />
                      </button>

                      {/* Details View Button */}
                      <Link
                        href={`/shop/${product.id}`}
                        className="p-3 bg-card dark:bg-[#0c0c14]/80 hover:bg-white/20 border border-border dark:border-white/[0.08] hover:border-transparent rounded-full text-foreground hover:text-white dark:text-gray-200 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 ease-out flex items-center justify-center"
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </Link>
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="p-5 space-y-2">
                    <span className="text-[9px] font-extrabold text-[#8B5CF6] uppercase tracking-wider block">
                      {product.category || "Gear"}
                    </span>
                    <h3 className="font-bold text-foreground text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-transparent bg-clip-text bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom detail row */}
                <div className="p-5 pt-0 border-t border-border dark:border-transparent relative z-10 space-y-3 mt-auto">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold block">Price</span>
                      <span className="text-lg font-black text-foreground group-hover:text-transparent bg-clip-text bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#EC4899] transition-all duration-300 drop-shadow-[0_0_10px_rgba(236,72,153,0)] group-hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.25)]">
                        ${product.price}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded uppercase">
                      In Stock
                    </span>
                  </div>

                  <Link
                    href={`/shop/${product.id}`}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-muted hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] hover:shadow-lg hover:shadow-[#EC4899]/10 border border-border hover:border-transparent rounded-xl text-xs font-bold text-foreground hover:text-white dark:text-white transition-all duration-300 active:scale-95"
                  >
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Pagination controls with the exact pagination bar formatting */}
      {totalPages > 1 && (
        <ScrollReveal direction="bottom">
          <div className="flex justify-center items-center gap-3 pt-6">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <React.Fragment key={pageNum}>
                  {idx > 0 && <span className="text-border dark:text-gray-800 font-black">|</span>}
                  <button
                    onClick={() => {
                      setCurrentPage(pageNum);
                      const section = document.getElementById("featured-products");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all border ${
                      isActive
                        ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white border-transparent shadow-lg shadow-[#EC4899]/20 scale-110"
                        : "bg-card dark:bg-white/[0.02] border-border dark:border-white/[0.08] text-muted-foreground hover:text-foreground hover:border-[#8B5CF6]"
                    }`}
                  >
                    {pageNum}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </ScrollReveal>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${
          toast.type === "success" 
            ? "bg-green-500/10 border-green-500/20 text-green-400" 
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}>
          {toast.type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
