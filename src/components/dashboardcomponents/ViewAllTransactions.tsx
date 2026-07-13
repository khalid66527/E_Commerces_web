"use client";

import React, { useState, useEffect } from 'react';
import { getAllPurchases, Purchase } from '@/lib/api/purchases';
import { 
  FiCreditCard, 
  FiCalendar, 
  FiCheckCircle, 
  FiClock, 
  FiUser, 
  FiShoppingBag, 
  FiChevronDown, 
  FiChevronUp,
  FiTrendingUp,
  FiSearch
} from 'react-icons/fi';

export default function ViewAllTransactions() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      const data = await getAllPurchases();
      // Sort: newest first
      const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPurchases(sorted);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Filter transactions by user email, name, or transaction ID
  const filteredPurchases = purchases.filter(p => {
    const term = searchTerm.toLowerCase();
    return (
      (p.user?.email || '').toLowerCase().includes(term) ||
      (p.user?.name || '').toLowerCase().includes(term) ||
      (p.sessionId || '').toLowerCase().includes(term) ||
      (p.paymentIntentId || '').toLowerCase().includes(term)
    );
  });

  const totalSalesRevenue = purchases
    .filter(p => p.paymentStatus === 'paid')
    .reduce((sum, p) => sum + p.totalAmount, 0);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-transparent">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin"></div>
        <p className="mt-4 text-[#A78BFA] text-xs font-bold tracking-widest uppercase animate-pulse">Loading transaction history...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section with Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
            Transaction Records
          </h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">
            Displaying all stripe transaction details, payment captures, and item receipts.
          </p>
        </div>

        {/* Mini Revenue Card */}
        <div className="bg-white/[0.01] border border-white/[0.06] rounded-2xl px-5 py-3 flex items-center gap-4">
          <div className="p-2.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl">
            <FiTrendingUp size={18} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Gross Transaction Value</p>
            <p className="text-lg font-black text-white">${totalSalesRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-3.5 text-gray-500" size={16} />
        <input
          type="text"
          placeholder="Search by user email, name, or transaction ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.08] focus:border-[#8B5CF6]/50 rounded-2xl pl-11 pr-5 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all"
        />
      </div>

      {/* Desktop/Tablet Table & Mobile Cards */}
      <div className="border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl bg-white/[0.01] backdrop-blur-md">
        {filteredPurchases.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-full inline-flex text-gray-500 mb-6">
              <FiCreditCard size={32} />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">No Transactions Found</h3>
            <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
              We couldn't find any transaction matches in the system.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] text-xs font-extrabold text-gray-500 uppercase tracking-widest border-b border-white/[0.06]">
                    <th className="px-6 py-4">Transaction Date</th>
                    <th className="px-6 py-4">Customer Details</th>
                    <th className="px-6 py-4">Reference/Intent ID</th>
                    <th className="px-6 py-4 text-right">Captured Amount</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-sm">
                  {filteredPurchases.map((purchase) => {
                    const isExpanded = expandedId === purchase._id;
                    const formattedDate = new Date(purchase.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });

                    return (
                      <React.Fragment key={purchase._id}>
                        <tr className="hover:bg-white/[0.02] transition-colors duration-300">
                          {/* Date */}
                          <td className="px-6 py-5 whitespace-nowrap text-gray-300 font-medium">
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-[#8B5CF6]" />
                              <span>{formattedDate}</span>
                            </div>
                          </td>

                          {/* Customer Details */}
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-xs uppercase flex-shrink-0">
                                {purchase.user?.name ? purchase.user.name[0] : 'U'}
                              </div>
                              <div>
                                <p className="text-white font-bold">{purchase.user?.name || 'Anonymous'}</p>
                                <p className="text-[10px] text-gray-400 font-bold">{purchase.user?.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Reference ID */}
                          <td className="px-6 py-5 whitespace-nowrap font-mono text-xs text-gray-400">
                            <p>Ref: {purchase.sessionId ? purchase.sessionId.slice(-15) : 'N/A'}...</p>
                            {purchase.paymentIntentId && (
                              <p className="text-gray-500 mt-0.5">PI: {purchase.paymentIntentId.slice(-15)}...</p>
                            )}
                          </td>

                          {/* Total Amount */}
                          <td className="px-6 py-5 text-right font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-base whitespace-nowrap">
                            ${purchase.totalAmount.toFixed(2)}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-5 text-center whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                              purchase.paymentStatus === 'paid'
                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                            }`}>
                              {purchase.paymentStatus === 'paid' ? (
                                <>
                                  <FiCheckCircle size={10} /> Paid
                                </>
                              ) : (
                                <>
                                  <FiClock size={10} /> Pending
                                </>
                              )}
                            </span>
                          </td>

                          {/* Expand Trigger */}
                          <td className="px-6 py-5 text-center">
                            <button
                              onClick={() => toggleExpand(purchase._id)}
                              className="p-2 hover:bg-white/[0.05] rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
                            >
                              {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable details panel */}
                        {isExpanded && (
                          <tr className="bg-white/[0.005]">
                            <td colSpan={6} className="px-8 py-6 border-b border-white/[0.06]">
                              <div className="space-y-4 max-w-4xl">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pb-2 border-b border-white/[0.04]">
                                  Checkout Transaction Items Receipt
                                </h4>

                                <div className="divide-y divide-white/[0.03]">
                                  {purchase.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-3">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06] flex-shrink-0 flex items-center justify-center">
                                          {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                          ) : (
                                            <FiShoppingBag className="text-gray-600" />
                                          )}
                                        </div>
                                        <div>
                                          <p className="font-bold text-white text-sm">{item.title}</p>
                                          <p className="text-xs text-gray-400 font-semibold">{item.brand} • {item.category}</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-bold text-gray-300 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500 font-bold">${item.price.toFixed(2)} x {item.quantity}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between sm:items-center text-xs text-gray-400 gap-4">
                                  <div>
                                    <p className="font-bold">Full Stripe Session ID: <span className="font-mono text-gray-300 text-[11px] break-all">{purchase.sessionId}</span></p>
                                    {purchase.paymentIntentId && (
                                      <p className="font-bold mt-1">Stripe Payment Intent: <span className="font-mono text-gray-300 text-[11px] break-all">{purchase.paymentIntentId}</span></p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1.5 font-black text-sm uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] self-end sm:self-auto">
                                    <span>Total Captured Amount:</span>
                                    <span className="text-lg">${purchase.totalAmount.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-white/[0.06]">
              {filteredPurchases.map((purchase) => {
                const isExpanded = expandedId === purchase._id;
                const formattedDate = new Date(purchase.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div key={purchase._id} className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-xs uppercase flex-shrink-0">
                          {purchase.user?.name ? purchase.user.name[0] : 'U'}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">{purchase.user?.name || 'Anonymous'}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{purchase.user?.email}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                        purchase.paymentStatus === 'paid'
                          ? 'bg-green-500/10 border-green-500/20 text-green-400'
                          : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                      }`}>
                        {purchase.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <div className="text-gray-400 flex items-center gap-1 font-bold">
                        <FiCalendar className="text-[#8B5CF6]" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-base">
                        ${purchase.totalAmount.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(purchase._id)}
                      className="w-full flex items-center justify-center gap-1 py-2 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
                    >
                      {isExpanded ? (
                        <>Hide Details <FiChevronUp /></>
                      ) : (
                        <>Show Details <FiChevronDown /></>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="pt-4 border-t border-white/[0.06] space-y-4 text-xs">
                        <div className="divide-y divide-white/[0.04]">
                          {purchase.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-2.5">
                              <div>
                                <p className="font-bold text-white">{item.title}</p>
                                <p className="text-[10px] text-gray-500 font-semibold">{item.brand} • Qty: {item.quantity}</p>
                              </div>
                              <p className="font-bold text-gray-300 ml-2">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] text-gray-500 space-y-1 font-mono break-all">
                          <p>Session: {purchase.sessionId}</p>
                          {purchase.paymentIntentId && <p>Intent: {purchase.paymentIntentId}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}