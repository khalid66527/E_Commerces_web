"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/api/products';
import { FiSearch, FiHeart, FiShoppingCart, FiShoppingBag, FiEye, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';
import { addToWishlist } from '@/lib/actions/wishlist';

interface ShopCartProps {
  products: Product[];
  categories: string[];
  initialSearch?: string;
  initialCategory?: string;
}

export default function ShopCart({ products, initialSearch = "" }: ShopCartProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams ? (searchParams.get('category') || "") : "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | ''>('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: session } = useSession();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    try {
      const currentCartRaw = localStorage.getItem('cart');
      const cart = currentCartRaw ? JSON.parse(currentCartRaw) : [];
      
      const productId = product.id || product._id;
      const existing = cart.find((item: any) => item.id === productId || item._id === productId);
      
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({
          id: productId,
          _id: productId,
          title: product.title,
          brand: product.brand,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          quantity: 1,
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      showToast('success', `${product.title} added to cart!`);
    } catch (error) {
      console.error(error);
      showToast('error', 'Failed to add to cart.');
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    if (!session?.user?.email) {
      showToast('error', 'Please log in to add to wishlist!');
      return;
    }

    const productId = product.id || product._id;
    setLoadingProductId(productId);
    try {
      const res = await addToAddToWishlist(session.user.email, productId, product);
      if (res.success) {
        showToast('success', res.message);
      } else {
        showToast('error', res.message);
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Something went wrong.');
    } finally {
      setLoadingProductId(null);
    }
  };

  const addToAddToWishlist = async (email: string, productId: string, product: Product) => {
    return await addToWishlist(email, productId, {
      id: productId,
      _id: productId,
      title: product.title,
      brand: product.brand,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      description: product.description || '',
      specifications: product.specifications || {},
    });
  };

  useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceSort]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query
        ? product.title.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query)
        : true;

      return matchesCategory && matchesSearch;
    });

    if (priceSort === 'asc') {
      result = [...result].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (priceSort === 'desc') {
      result = [...result].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceSort]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="py-2 font-sans w-full space-y-12">
      {/* Header and Controls Row */}
      <div className="space-y-6">
        {/* Title */}
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-white uppercase">
            TechWave <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">Shop</span>
          </h1>
          <div className="h-[2px] w-16 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mt-2 rounded-full"></div>
        </div>

        {/* Central Search Bar & Sort Dropdown aligned side-by-side */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
          {/* Search Input wrapper */}
          <div className="relative group flex-1 w-full">
            <input
              type="text"
              placeholder="Search premium tech products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0c0c14]/40 border border-white/[0.08] focus:border-[#8B5CF6]/60 focus:ring-2 focus:ring-[#8B5CF6]/10 rounded-2xl pl-5 pr-12 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 shadow-md"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-[#EC4899] transition-colors text-lg" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-52 shrink-0">
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="w-full bg-[#0c0c14]/40 border border-white/[0.08] focus:border-[#8B5CF6]/60 text-gray-300 text-sm rounded-2xl px-5 py-3 outline-none transition-all duration-300 shadow-md appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#0c0c14] text-white">Default Sort</option>
              <option value="asc" className="bg-[#0c0c14] text-white">Price: Low to High</option>
              <option value="desc" className="bg-[#0c0c14] text-white">Price: High to Low</option>
            </select>
            {/* Styled arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 text-xs">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white/[0.01] border border-white/[0.04] rounded-3xl backdrop-blur-md">
            <FiShoppingBag className="mx-auto text-5xl text-gray-600 animate-bounce" />
            <p className="text-gray-400 mt-4 text-lg">No products match your search filters.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setPriceSort("");
              }} 
              className="mt-6 px-5 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between rounded-3xl bg-[#0c0c14]/20 border border-white/[0.06] hover:border-[#8B5CF6]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,92,246,0.12)] overflow-hidden product-card"
                  style={{
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  {/* Glowing background */}
                  <span className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/3 to-[#EC4899]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></span>

                  <div className="relative z-10">
                    {/* Image Container with Hover Actions Overlay */}
                    <div className="relative aspect-square bg-[#0a0a12] overflow-hidden rounded-t-3xl border-b border-white/[0.04]">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <FiShoppingBag size={48} />
                        </div>
                      )}

                      {/* Top Brand overlay tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/60 border border-white/[0.1] rounded-full text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:border-[#8B5CF6]/50 group-hover:text-white transition-all duration-300 shadow-md">
                          {product.brand || 'Premium'}
                        </span>
                      </div>

                      {/* Glassmorphic Actions Overlay on Hover with Staggered Animations */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        {/* Wishlist Button */}
                        <button 
                          onClick={() => handleAddToWishlist(product)}
                          disabled={loadingProductId === (product.id || product._id)}
                          className="p-3 bg-[#0c0c14]/80 hover:bg-[#EC4899] border border-white/[0.08] hover:border-transparent rounded-full text-gray-200 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 ease-out delay-75 disabled:opacity-50 flex items-center justify-center"
                        >
                          <FiHeart size={18} className={loadingProductId === (product.id || product._id) ? 'animate-spin' : ''} />
                        </button>
                        
                        {/* Add to Cart Button */}
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="p-3 bg-[#0c0c14]/80 hover:bg-[#8B5CF6] border border-white/[0.08] hover:border-transparent rounded-full text-gray-200 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 ease-out delay-100 flex items-center justify-center"
                        >
                          <FiShoppingCart size={18} />
                        </button>
                        
                        {/* Details View Button */}
                        <Link 
                          href={`/shop/${product.id}`}
                          className="p-3 bg-[#0c0c14]/80 hover:bg-white/20 border border-white/[0.08] hover:border-transparent rounded-full text-gray-200 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 ease-out delay-150 flex items-center justify-center"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </Link>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 space-y-3">
                      <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-wider block">
                        {product.category || 'Gear'}
                      </span>
                      <h3 className="font-bold text-white text-base line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom - Details Button and Price */}
                  <div className="p-6 pt-0 border-t border-transparent relative z-10 space-y-4 mt-auto">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Price</span>
                        <span className="text-xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#EC4899] transition-all duration-300 drop-shadow-[0_0_10px_rgba(236,72,153,0)] group-hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                          ${product.price}
                        </span>
                      </div>
                      
                      {/* Highlighted Stock badge */}
                      <span className="text-[10px] font-bold text-gray-400 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-md uppercase">
                        In Stock
                      </span>
                    </div>

                    {/* Details Button */}
                    <Link 
                      href={`/shop/${product.id}`}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] hover:shadow-lg hover:shadow-[#EC4899]/10 border border-white/[0.06] hover:border-transparent rounded-xl text-xs font-bold text-white transition-all duration-300 active:scale-95"
                      title="View Details"
                    >
                      <span>Details</span>
                    </Link>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-6">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = pageNum === currentPage;
                  return (
                    <React.Fragment key={pageNum}>
                      {idx > 0 && <span className="text-gray-800 font-black">|</span>}
                      <button
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all border ${
                          isActive
                            ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white border-transparent shadow-lg shadow-[#EC4899]/20 scale-110"
                            : "bg-white/[0.02] border-white/[0.08] text-gray-500 hover:text-white hover:border-[#8B5CF6]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${
          toast.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toast.type === 'success' ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}
      </div>

      <style>{`
        .product-card {
          opacity: 0;
          animation: fadeInUpProduct 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUpProduct {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
