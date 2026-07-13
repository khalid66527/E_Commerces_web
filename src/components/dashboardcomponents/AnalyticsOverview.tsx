"use client";

import React, { useState, useEffect } from 'react';
import { getProducts, Product } from '@/lib/api/products';
import { getUsers, User } from '@/lib/api/users';
import { getAllPurchases, Purchase } from '@/lib/api/purchases';
import { 
  FiTrendingUp, 
  FiDollarSign, 
  FiShoppingBag, 
  FiUsers, 
  FiBox, 
  FiArrowRight, 
  FiActivity,
  FiAward
} from 'react-icons/fi';

interface TopProduct {
  product: Product | null;
  productId: string;
  totalSold: number;
  totalRevenue: number;
}

export default function AnalyticsOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    productsCount: 0,
    customersCount: 0
  });
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentSales, setRecentSales] = useState<Purchase[]>([]);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const [products, users, purchases] = await Promise.all([
          getProducts(),
          getUsers(),
          getAllPurchases()
        ]);

        // Calculate Revenue (paid only)
        const paidPurchases = purchases.filter(p => p.paymentStatus === 'paid');
        const totalRev = paidPurchases.reduce((sum, p) => sum + p.totalAmount, 0);

        setStats({
          revenue: totalRev,
          orders: purchases.length,
          productsCount: products.length,
          customersCount: users.length
        });

        // Recent sales: sorted by date, slice top 5
        const sortedPurchases = purchases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecentSales(sortedPurchases.slice(0, 5));

        // Calculate Top Selling Products
        const productSalesMap: Record<string, { totalSold: number; totalRev: number }> = {};
        
        paidPurchases.forEach(p => {
          p.items?.forEach(item => {
            if (!productSalesMap[item.productId]) {
              productSalesMap[item.productId] = { totalSold: 0, totalRev: 0 };
            }
            productSalesMap[item.productId].totalSold += item.quantity;
            productSalesMap[item.productId].totalRev += (Number(item.price) * item.quantity);
          });
        });

        const topSelling = Object.keys(productSalesMap).map(id => {
          const match = products.find(prod => prod._id === id || prod.id === id) || null;
          return {
            productId: id,
            product: match,
            totalSold: productSalesMap[id].totalSold,
            totalRevenue: productSalesMap[id].totalRev
          };
        })
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 5);

        setTopProducts(topSelling);
      } catch (err) {
        console.error("Error loading analytics overview:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin"></div>
        <p className="mt-4 text-[#A78BFA] text-xs font-bold tracking-widest uppercase animate-pulse">Computing metrics dashboard...</p>
      </div>
    );
  }

  // Cards metadata
  const metricCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'from-[#10B981]/20 to-[#059669]/10 border-[#10B981]/20 text-[#10B981]'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: FiShoppingBag,
      color: 'from-[#8B5CF6]/20 to-[#7C3AED]/10 border-[#8B5CF6]/20 text-[#8B5CF6]'
    },
    {
      title: 'Active Products',
      value: stats.productsCount,
      icon: FiBox,
      color: 'from-[#EC4899]/20 to-[#DB2777]/10 border-[#EC4899]/20 text-[#EC4899]'
    },
    {
      title: 'Customers',
      value: stats.customersCount,
      icon: FiUsers,
      color: 'from-[#3B82F6]/20 to-[#2563EB]/10 border-[#3B82F6]/20 text-[#3B82F6]'
    }
  ];

  return (
    <div className="space-y-8 relative">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="pb-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
            Dashboard Analytics
          </h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">
            Real-time business indicators, product velocity, and transactional intelligence summary.
          </p>
        </div>
        <div className="p-3 bg-white/[0.01] border border-white/[0.06] text-gray-400 rounded-2xl flex items-center gap-2 text-xs font-bold">
          <FiActivity className="text-[#EC4899] animate-pulse" /> Live Status
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx}
              className={`border bg-gradient-to-tr rounded-[2rem] p-6 flex items-center justify-between shadow-lg hover:-translate-y-1 transition-all duration-300 ${card.color}`}
            >
              <div className="space-y-1">
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block">{card.title}</span>
                <span className="text-2xl font-black text-white">{card.value}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-inner">
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Grid: Top Selling & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Top Selling Products */}
        <div className="lg:col-span-5 border border-white/[0.06] rounded-[2.5rem] p-6 bg-white/[0.01] backdrop-blur-md shadow-xl space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
              <FiAward /> Top Selling Products
            </h3>
            <span className="text-[10px] font-bold text-gray-500">By Qty Sold</span>
          </div>

          {topProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-xs font-semibold">No sales logged to determine best sellers.</p>
          ) : (
            <div className="divide-y divide-white/[0.04] text-xs">
              {topProducts.map((tp, idx) => (
                <div key={tp.productId} className="flex justify-between items-center py-4.5 gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center font-bold text-[#8B5CF6] text-[10px]">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-extrabold text-white truncate text-sm">{tp.product?.title || 'Unknown Product'}</p>
                      <p className="text-gray-500 font-semibold mt-0.5">{tp.product?.brand || 'Brand'}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-white text-sm">{tp.totalSold} Units</p>
                    <p className="text-[#EC4899] font-bold mt-0.5">${tp.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transactions List */}
        <div className="lg:col-span-7 border border-white/[0.06] rounded-[2.5rem] p-6 bg-white/[0.01] backdrop-blur-md shadow-xl space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#EC4899] flex items-center gap-2">
              <FiActivity /> Recent Order Velocity
            </h3>
            <span className="text-[10px] font-bold text-gray-500">Latest 5 checkouts</span>
          </div>

          {recentSales.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-xs font-semibold">No checkout transactions verified in database.</p>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {recentSales.map((sale) => {
                const formattedDate = new Date(sale.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={sale._id} className="py-4.5 flex justify-between items-center text-xs gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-black uppercase text-[10px] flex-shrink-0">
                        {sale.user?.name ? sale.user.name[0] : 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate text-sm">{sale.user?.name || 'Customer'}</p>
                        <p className="text-[10px] text-gray-500 truncate mt-0.5 font-bold">{sale.user?.email}</p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-black text-white text-sm">${sale.totalAmount.toFixed(2)}</p>
                      <p className="text-gray-500 font-bold mt-0.5">{formattedDate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}