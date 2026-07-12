"use client";

import React, { useState } from 'react';
import { deleteProduct } from '@/lib/actions/products';
import { 
  FiSearch, 
  FiTrash2, 
  FiBox, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiFilter, 
  FiDollarSign, 
  FiTrendingDown,
  FiX
} from 'react-icons/fi';

interface Product {
  id: string;
  _id: string;
  title: string;
  brand: string;
  price: string | number;
  stock: string | number;
  imageUrl: string;
  description?: string;
  category: string;
}

interface ManageAllProductProps {
  initialProducts: Product[];
}

export default function ManageAllProduct({ initialProducts = [] }: ManageAllProductProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Feedback states
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleProductDelete = async () => {
    if (!productToDelete) return;
    const productId = productToDelete.id;
    setActionLoading(productId);
    setProductToDelete(null);
    try {
      const result = await deleteProduct(productId);
      if (result.success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        showToast('success', result.message);
      } else {
        showToast('error', result.message);
      }
    } catch (error: any) {
      showToast('error', error?.message || "Failed to delete product");
    } finally {
      setActionLoading(null);
    }
  };

  // Get distinct categories dynamically
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  // Filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      (product.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (product.brand || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#06060c] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${
          toast.type === 'success' 
            ? 'bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981]' 
            : 'bg-[#EF4444]/15 border-[#EF4444]/30 text-[#EF4444]'
        }`}>
          {toast.type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111122] border border-[#8B5CF6]/20 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4 mx-auto">
              <FiAlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">Delete Product</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Are you sure you want to delete <span className="text-white font-semibold">{productToDelete.title}</span>? This item will be removed permanently from the inventory.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-3 bg-[#16162a] hover:bg-[#1f1f3a] text-gray-300 rounded-xl transition-all font-semibold text-sm border border-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleProductDelete}
                className="flex-1 py-3 bg-gradient-to-r from-red-650 to-red-500 hover:brightness-110 text-white rounded-xl transition-all font-semibold text-sm shadow-[0_4px_15px_rgba(239,68,68,0.25)]"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/40 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
              MANAGE PRODUCTS
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Monitor inventory stock, check pricing structure, and delete listed products from the store.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-[#111122]/60 border border-[#8B5CF6]/15 rounded-xl px-4 py-2 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse"></span>
            <span className="text-gray-400 font-medium">Total listed items: <strong className="text-white">{products.length}</strong></span>
          </div>
        </div>

        {/* Filters Controls */}
        <div className="flex flex-col sm:flex-row gap-4 bg-[#111122]/40 backdrop-blur-md p-4 rounded-2xl border border-gray-800/40">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by title or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/15 focus:border-[#EC4899] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
            />
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[180px]">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/15 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0c0c14]">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#0c0c14]">{cat}</option>
              ))}
            </select>
            <FiFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
          </div>
        </div>

        {/* Products Grid/Table */}
        <div className="bg-[#111122]/40 border border-gray-800/40 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#16162a] flex items-center justify-center text-gray-500 mb-4 border border-gray-800">
                <FiBox size={28} />
              </div>
              <h3 className="text-lg font-semibold text-white">No Products Found</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-xs">
                We couldn't find any products matching your query. Try resetting your search filter.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800/60 bg-[#16162a]/30">
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">Product Info</th>
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">Category</th>
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">Price</th>
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">Stock Qty</th>
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/40">
                    {filteredProducts.map((product) => {
                      const stockCount = Number(product.stock || 0);
                      const isLoading = actionLoading === product.id;

                      // Stock status styling
                      let stockBadge = 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20';
                      let stockText = 'In Stock';
                      if (stockCount === 0) {
                        stockBadge = 'bg-[#EF4444]/10 text-red-400 border-red-500/20';
                        stockText = 'Out of Stock';
                      } else if (stockCount < 10) {
                        stockBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                        stockText = `Low Stock (${stockCount})`;
                      } else {
                        stockText = `${stockCount} available`;
                      }

                      return (
                        <tr key={product.id} className="hover:bg-[#16162a]/20 transition-all duration-150">
                          {/* Image & Title */}
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-4">
                              {product.imageUrl ? (
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.title} 
                                  className="w-12 h-12 rounded-xl object-cover border border-[#8B5CF6]/15 bg-[#16162a]/55"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200';
                                  }}
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8B5CF6]/20 to-[#EC4899]/20 flex items-center justify-center border border-[#8B5CF6]/20 text-[#EC4899]">
                                  <FiBox size={18} />
                                </div>
                              )}
                              <div className="max-w-md">
                                <h4 className="text-sm font-bold text-white truncate leading-snug" title={product.title}>
                                  {product.title}
                                </h4>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{product.brand}</p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="px-6 py-4.5">
                            <span className="text-xs font-bold text-[#A78BFA] px-2.5 py-1 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                              {product.category || 'Gadget'}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4.5 font-bold text-white text-sm">
                            ${Number(product.price).toFixed(2)}
                          </td>

                          {/* Stock Qty */}
                          <td className="px-6 py-4.5">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${stockBadge}`}>
                              {stockCount < 10 && <FiTrendingDown size={12} />}
                              {stockText}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4.5 text-right">
                            <button
                              disabled={isLoading}
                              onClick={() => setProductToDelete(product)}
                              className="inline-flex items-center justify-center p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 disabled:opacity-30 transition-all"
                              title="Delete Product Listing"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="block md:hidden divide-y divide-gray-800/40">
                {filteredProducts.map((product) => {
                  const stockCount = Number(product.stock || 0);
                  const isLoading = actionLoading === product.id;

                  let stockBadge = 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20';
                  let stockText = 'In Stock';
                  if (stockCount === 0) {
                    stockBadge = 'bg-[#EF4444]/10 text-red-400 border-red-500/20';
                    stockText = 'Out of Stock';
                  } else if (stockCount < 10) {
                    stockBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                    stockText = `Low (${stockCount})`;
                  } else {
                    stockText = `${stockCount} available`;
                  }

                  return (
                    <div key={product.id} className="p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="w-12 h-12 rounded-xl object-cover border border-[#8B5CF6]/15 bg-[#16162a]"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-[#16162a] flex items-center justify-center border border-gray-800 text-gray-500">
                            <FiBox size={18} />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-white truncate leading-tight">{product.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500 font-bold uppercase">{product.brand}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-800"></span>
                            <span className="text-[10px] text-[#A78BFA] font-bold">{product.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-800/20">
                        <div>
                          <p className="text-gray-500 font-semibold mb-0.5">Price</p>
                          <p className="text-white font-bold">${Number(product.price).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-semibold mb-0.5">Inventory</p>
                          <span className={`inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full border ${stockBadge}`}>
                            {stockText}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2 border-t border-gray-800/20">
                        <button
                          disabled={isLoading}
                          onClick={() => setProductToDelete(product)}
                          className="flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold disabled:opacity-30 transition-all"
                        >
                          <FiTrash2 size={13} />
                          <span>Delete Listing</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}