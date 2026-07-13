"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { getWishlist, removeFromWishlist } from '@/lib/actions/wishlist';
import { addToCartBackend } from '@/lib/actions/cart';
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

  const handleAddToCart = async (item: WishlistItem) => {
    if (!session?.user) {
      showToast('error', 'Please log in to add to cart!');
      return;
    }

    setActionLoadingId(item._id);
    try {
      const resCart = await addToCartBackend(
        session.user.email || '',
        session.user.name || '',
        session.user.id || '',
        item.productId,
        item,
        1
      );

      if (resCart.success) {
        const resWish = await removeFromWishlist(item._id);
        if (resWish.success) {
          setItems(prev => prev.filter(p => p._id !== item._id));
          window.dispatchEvent(new Event('cart-updated'));
          showToast('success', `${item.title} moved to cart successfully!`);
        } else {
          window.dispatchEvent(new Event('cart-updated'));
          showToast('success', `${item.title} added to cart!`);
        }
      } else {
        showToast('error', resCart.message || 'Failed to add to cart.');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Failed to move item to cart.');
    } finally {
      setActionLoadingId(null);
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-background text-foreground transition-colors duration-300">
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
      <div className="min-h-[70vh] flex items-center justify-center bg-background text-foreground transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#8B5CF6] border-t-transparent animate-spin" />
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Loading Wishlist...</p>
        </div>
      </div>
    );
  }

  // Render Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-background text-foreground animate-fade-in transition-colors duration-300">
        <div className="p-5 bg-muted border border-border rounded-full mb-8">
          <FiShoppingBag className="text-6xl text-gray-600 animate-bounce" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
          Your Wishlist is Empty
        </h1>
        <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed font-medium">
          Looks like you haven&apos;t added any items to your wishlist yet. Check out our latest products!
        </p>
        <Link 
          href="/shop"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-muted hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] border border-border hover:border-transparent rounded-xl text-sm font-bold transition-all duration-300 text-foreground hover:text-white dark:text-white"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
              My Wishlist
            </h1>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
              You have {items.length} item{items.length > 1 ? 's' : ''} in your wishlist
            </p>
          </div>
          
          <Link 
            href="/shop"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue Shopping <FiArrowRight />
          </Link>
        </div>

        {/* Wishlist Items Table */}
        <div className="border border-white/[0.06] rounded-3xl overflow-hidden shadow-inner bg-white/[0.01] backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/[0.02] text-xs font-extrabold text-gray-500 uppercase tracking-wider border-b border-white/[0.06]">
                <tr>
                  <th scope="col" className="px-6 py-4">Product</th>
                  <th scope="col" className="px-6 py-4">Brand</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4 text-right">Price</th>
                  <th scope="col" className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors duration-200">
                    {/* Product Image & Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c0c16] to-[#06060c] border border-white/[0.06] flex-shrink-0 flex items-center justify-center">
                          {item.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <FiShoppingBag className="text-gray-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm truncate max-w-[250px]">{item.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="px-6 py-4 font-semibold text-gray-400">
                      {item.brand || 'Premium'}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest shadow-md">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-right font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-base">
                      ${item.price}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Add to Cart */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="p-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:shadow-lg hover:shadow-[#EC4899]/20 text-white rounded-xl hover:brightness-110 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
                          title="Add to Cart"
                        >
                          <FiShoppingCart size={14} />
                        </button>

                        {/* Remove */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={actionLoadingId === item._id}
                          className="p-3 bg-white/[0.02] border border-white/[0.08] hover:border-red-500 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
                          title="Remove Item"
                        >
                          <FiTrash2 size={14} className={actionLoadingId === item._id ? 'animate-spin' : ''} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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