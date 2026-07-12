"use client";

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { addToWishlist } from '@/lib/actions/wishlist';
import { addToCartBackend } from '@/lib/actions/cart';
import { FiShoppingCart, FiHeart, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface ProductActionsProps {
  product: {
    id: string;
    _id: string;
    title: string;
    brand: string;
    price: string | number;
    stock: string | number;
    imageUrl: string;
    category: string;
    description?: string;
    specifications?: Record<string, string>;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleAddToCart = async () => {
    if (!session?.user) {
      showToast('error', 'Please log in to add to cart!');
      return;
    }

    setLoading(true);
    try {
      const productId = product.id || product._id;
      const res = await addToCartBackend(
        session.user.email || '',
        session.user.name || '',
        session.user.id || '',
        productId,
        product,
        1
      );
      if (res.success) {
        showToast('success', 'Added to cart successfully!');
        window.dispatchEvent(new Event('cart-updated'));
      } else {
        showToast('error', res.message);
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Failed to add to cart.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!session?.user?.email) {
      showToast('error', 'Please log in to add to wishlist!');
      return;
    }

    setLoading(true);
    try {
      const productId = product.id || product._id;
      const res = await addToWishlist(session.user.email, productId, product);
      if (res.success) {
        showToast('success', res.message);
      } else {
        showToast('error', res.message);
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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

      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:shadow-lg hover:shadow-[#EC4899]/20 text-sm font-extrabold uppercase tracking-widest text-white rounded-2xl hover:brightness-110 transition-all duration-300 active:scale-[0.98]"
        >
          <FiShoppingCart size={18} className="animate-bounce" /> Add to Cart
        </button>
        
        <button 
          onClick={handleAddToWishlist}
          disabled={loading}
          className={`px-5 py-4 bg-white/[0.02] border border-white/[0.08] hover:border-[#EC4899] hover:bg-[#EC4899]/10 rounded-2xl text-gray-300 hover:text-white transition-all duration-300 active:scale-95 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FiHeart size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
    </div>
  );
}
