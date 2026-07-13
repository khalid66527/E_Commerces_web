"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { getCartBackend, updateCartQuantity, removeFromCartBackend } from '@/lib/actions/cart';
import { 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiShoppingBag, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiCreditCard, 
  FiArrowLeft,
  FiArrowRight
} from 'react-icons/fi';

interface CartItem {
  _id: string;
  productId: string;
  title: string;
  brand: string;
  price: string | number;
  imageUrl: string;
  category: string;
  description?: string;
  quantity: number;
  addedAt?: string;
}

interface AddToCardProps {
  isDrawer?: boolean;
}

export default function AddToCard({ isDrawer = false }: AddToCardProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
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
    async function loadCart() {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await getCartBackend(session.user.email);
        if (res.success && res.data) {
          setItems(res.data);
        } else {
          showToast('error', res.message || 'Failed to load cart.');
        }
      } catch (err) {
        console.error(err);
        showToast('error', 'Error loading cart.');
      } finally {
        setLoading(false);
      }
    }
    if (!isPending) {
      loadCart();
    }
  }, [session, isPending]);

  const handleQtyChange = async (itemId: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    setActionLoadingId(itemId);
    try {
      const res = await updateCartQuantity(itemId, newQty);
      if (res.success) {
        setItems(prev => prev.map(item => item._id === itemId ? { ...item, quantity: newQty } : item));
        window.dispatchEvent(new Event('cart-updated'));
        showToast('success', 'Quantity updated!');
      } else {
        showToast('error', res.message || 'Failed to update quantity.');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Error updating quantity.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (itemId: string) => {
    setActionLoadingId(itemId);
    try {
      const res = await removeFromCartBackend(itemId);
      if (res.success) {
        setItems(prev => prev.filter(item => item._id !== itemId));
        window.dispatchEvent(new Event('cart-updated'));
        showToast('success', 'Product removed from cart!');
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

  const handleCheckout = async () => {
    if (!session?.user) {
      showToast('error', 'Please log in to proceed with payment.');
      router.push('/auth/signin');
      return;
    }
    if (items.length === 0) {
      showToast('error', 'Your cart is empty.');
      return;
    }

    setActionLoadingId('checkout');
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          userEmail: session.user.email,
          userName: session.user.name || session.user.email,
          userId: session.user.id,
        }),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        showToast('error', data.error || 'Failed to initiate checkout.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const cartSubtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);

  // Render Login Prompt
  if (!isPending && !session?.user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#06060C] text-white">
        <div className="p-5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full animate-pulse mb-8">
          <FiShoppingBag className="text-6xl text-[#8B5CF6]" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
          Access Shopping Cart
        </h1>
        <p className="text-gray-500 mt-4 max-w-sm leading-relaxed">
          Please sign in to view and manage your shopping cart items.
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
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Cart...</p>
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
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mt-4 max-w-sm leading-relaxed">
          You haven&apos;t added any products to your cart yet. Let&apos;s start shopping!
        </p>
        <Link 
          href="/shop"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#EC4899]/20 hover:brightness-110 transition-all duration-300"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className={isDrawer ? "text-white font-sans w-full" : "min-h-screen bg-[#06060C] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans"}>
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

      <div className={isDrawer ? "space-y-6 w-full animate-fade-in" : "max-w-7xl mx-auto space-y-12"}>
        {/* Header */}
        {!isDrawer && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.06] pb-6">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
                Shopping Cart
              </h1>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                You have {items.length} unique item{items.length > 1 ? 's' : ''} in your cart
              </p>
            </div>
            
            <Link 
              href="/shop"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft /> Back to Shop
            </Link>
          </div>
        )}

        {/* Cart Contents */}
        <div className={isDrawer ? "flex flex-col gap-6" : "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"}>
          {/* Products Table (Left Column) */}
          <div className={isDrawer ? "w-full space-y-4" : "lg:col-span-2 space-y-4"}>
            <div className="border border-white/[0.06] rounded-3xl overflow-hidden shadow-inner bg-white/[0.01] backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white/[0.02] text-xs font-extrabold text-gray-500 uppercase tracking-wider border-b border-white/[0.06]">
                    <tr>
                      <th scope="col" className="px-6 py-4">Product</th>
                      <th scope="col" className="px-6 py-4 text-center">Quantity</th>
                      <th scope="col" className="px-6 py-4 text-right">Price</th>
                      <th scope="col" className="px-6 py-4 text-right">Subtotal</th>
                      <th scope="col" className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {items.map((item) => {
                      const itemSubtotal = (Number(item.price) || 0) * (item.quantity || 1);
                      return (
                        <tr key={item._id} className="hover:bg-white/[0.02] transition-colors duration-200">
                          {/* Product Info */}
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
                                <h4 className="font-bold text-white text-sm truncate max-w-[200px]">{item.title}</h4>
                                <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{item.brand}</span>
                              </div>
                            </div>
                          </td>

                          {/* Quantity selector */}
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex items-center justify-center border border-white/[0.08] rounded-xl bg-white/[0.02] p-1 gap-3">
                              <button 
                                onClick={() => handleQtyChange(item._id, item.quantity, -1)}
                                disabled={item.quantity <= 1 || actionLoadingId === item._id}
                                className="p-1 hover:bg-white/[0.05] rounded-md text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                              >
                                <FiMinus size={12} />
                              </button>
                              <span className="text-xs font-bold text-white w-6">{item.quantity}</span>
                              <button 
                                onClick={() => handleQtyChange(item._id, item.quantity, 1)}
                                disabled={actionLoadingId === item._id}
                                className="p-1 hover:bg-white/[0.05] rounded-md text-gray-400 hover:text-white transition-all"
                              >
                                <FiPlus size={12} />
                              </button>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4 text-right font-semibold text-gray-300">
                            ${Number(item.price).toFixed(2)}
                          </td>

                          {/* Subtotal */}
                          <td className="px-6 py-4 text-right font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
                            ${itemSubtotal.toFixed(2)}
                          </td>

                          {/* Delete Action */}
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDelete(item._id)}
                              disabled={actionLoadingId === item._id}
                              className="p-2 bg-white/[0.02] border border-white/[0.08] hover:border-red-500 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all active:scale-95 flex items-center justify-center mx-auto cursor-pointer"
                              title="Delete Item"
                            >
                              <FiTrash2 size={14} className={actionLoadingId === item._id ? 'animate-spin' : ''} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cart Summary Card (Right Column) */}
          <div className="space-y-6">
            <div className="border border-white/[0.06] rounded-3xl p-6 bg-white/[0.01] backdrop-blur-md space-y-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest pb-3 border-b border-white/[0.06]">
                Order Summary
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between font-semibold text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400">Free Express</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-400">
                  <span>Estimated Tax</span>
                  <span className="text-white">$0.00</span>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex justify-between items-center text-gray-900 dark:text-white uppercase tracking-wider font-bold">
                  <span>Total Amount</span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_10px_rgba(236,72,153,0.25)]">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={actionLoadingId === 'checkout' || items.length === 0}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-sm font-extrabold uppercase tracking-widest rounded-2xl shadow-lg shadow-[#EC4899]/20 hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoadingId === 'checkout' ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <FiCreditCard size={18} /> Proceed to Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
