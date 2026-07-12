"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { getWishlist, removeFromWishlist } from '@/lib/actions/wishlist';
import { 
  FiHeart, 
  FiTrash2, 
  FiShoppingCart, 
  FiArrowRight, 
  FiShoppingBag,
  FiCheckCircle, 
  FiAlertCircle 
} from 'react-icons/fi';

interface WishlistItem {
  _id: string;
  productId: string;
  title: string;
  brand: string;
  price: string | number;
  imageUrl: string;
  category: string;
  description?: string;
  specifications?: Record<string, string>;
  addedAt?: string;
}

export default function WishList() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    async function loadWishlist() {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await getWishlist(session.user.email);
        if (res.success && res.data) {
          setItems(res.data);
        } else {
          showToast('error', res.message || 'Failed to load wishlist.');
        }
      } catch (err) {
        console.error(err);
        showToast('error', 'Error loading wishlist.');
      } finally {
        setLoading(false);
      }
    }
    if (!isPending) {
      loadWishlist();
    }
  }, [session, isPending]);

  const handleAddToCart = (item: WishlistItem) => {
    try {
      const currentCartRaw = localStorage.getItem('cart');
      const cart = currentCartRaw ? JSON.parse(currentCartRaw) : [];
      
      const existing = cart.find((cartItem: any) => cartItem.id === item.productId || cartItem._id === item.productId);
      
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({
          id: item.productId,
          _id: item.productId,
          title: item.title,
          brand: item.brand,
          price: item.price,
          imageUrl: item.imageUrl,
          category: item.category,
          quantity: 1,
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      showToast('success', `${item.title} added to cart!`);
    } catch (error) {
      console.error(error);
      showToast('error', 'Failed to add to cart.');
    }
  };

  const handleDelete = async (itemId: string) => {
    setActionLoadingId(itemId);
    try {
      const res = await removeFromWishlist(itemId);
      if (res.success) {
        setItems(prev => prev.filter(item => item._id !== itemId));
        showToast('success', 'Removed from wishlist successfully!');
      } else {
        showToast('error', res.message || 'Failed to remove item.');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Error removing item.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Render Login Prompt Screen
  if (!isPending && !session?.user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#06060C] text-white">
        <div className="p-5 bg-[#EC4899]/10 border border-[#EC4899]/20 rounded-full animate-pulse mb-8">
          <FiHeart className="text-6xl text-[#EC4899]" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
          Access Wishlist
        </h1>
        <p className="text-gray-500 mt-4 max-w-sm leading-relaxed">
          Please sign in to your account to view your personalized wishlist items.
        </p>
        <Link 
          href="/auth/signin"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] border border-transparent rounded-xl text-sm font-bold shadow-lg shadow-[#EC4899]/20 hover:brightness-110 transition-all duration-300"
        >
          Sign In Now <FiArrowRight />
        </Link>
      </div>
    );
  }

  // Render Loading State
  if (loading || isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#06060C] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#8B5CF6] border-t-transparent animate-spin" />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Wishlist...</p>
        </div>
      </div>
    );
  }

  // Render Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#06060C] text-white animate-fade-in">
        <div className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-full mb-8">
          <FiShoppingBag className="text-6xl text-gray-600 animate-bounce" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
          Your Wishlist is Empty
        </h1>
        <p className="text-gray-500 mt-4 max-w-sm leading-relaxed">
          Looks like you haven&apos;t added any items to your wishlist yet. Check out our latest products!
        </p>
        <Link 
          href="/shop"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-white/[0.04] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] border border-white/[0.08] hover:border-transparent rounded-xl text-sm font-bold transition-all duration-300"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06060C] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
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

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
              My Wishlist
            </h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
              You have {items.length} item{items.length > 1 ? 's' : ''} in your wishlist
            </p>
          </div>
          
          <Link 
            href="/shop"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Continue Shopping <FiArrowRight />
          </Link>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div 
              key={item._id} 
              className="wishlist-card group relative bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.06] hover:border-[#8B5CF6]/30 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)] transition-all duration-500 flex flex-col h-full"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-video sm:aspect-square bg-gradient-to-b from-[#0c0c16] to-[#06060c] overflow-hidden border-b border-white/[0.04]">
                <div className="absolute inset-0 bg-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <FiShoppingBag size={48} />
                  </div>
                )}

                {/* Brand Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 border border-white/[0.1] rounded-full text-[10px] font-bold text-gray-300 uppercase tracking-widest shadow-md">
                    {item.brand || 'Premium'}
                  </span>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest shadow-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.description || 'Premium design with flagship performance and cutting-edge specifications.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                  <div>
                    <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">Price</span>
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_10px_rgba(236,72,153,0.15)]">
                      ${item.price}
                    </span>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center gap-2">
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="p-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:shadow-lg hover:shadow-[#EC4899]/20 text-white rounded-2xl hover:brightness-110 transition-all duration-300 active:scale-95 flex items-center justify-center"
                      title="Add to Cart"
                    >
                      <FiShoppingCart size={16} />
                    </button>

                    {/* Delete/Remove Button */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={actionLoadingId === item._id}
                      className="p-3 bg-white/[0.02] border border-white/[0.08] hover:border-red-500 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center"
                      title="Remove Item"
                    >
                      <FiTrash2 size={16} className={actionLoadingId === item._id ? 'animate-spin' : ''} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wishlist-card {
          opacity: 0;
          animation: fadeInUpWishlist 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUpWishlist {
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