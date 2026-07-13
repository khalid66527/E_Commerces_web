"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { getPurchaseHistory, Purchase } from '@/lib/api/purchases';
import { 
  FiShoppingBag, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiChevronDown, 
  FiChevronUp,
  FiCalendar,
  FiCreditCard
} from 'react-icons/fi';

export default function PurcessHistory() {
  const { data: session, isPending } = useSession();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }
      try {
        const data = await getPurchaseHistory(session.user.email);
        // Sort by date descending
        const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPurchases(sorted);
      } catch (err) {
        console.error("Error loading purchase history:", err);
      } finally {
        setLoading(false);
      }
    }

    if (!isPending) {
      fetchHistory();
    }
  }, [session, isPending]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-transparent">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#EC4899] animate-spin"></div>
        <p className="mt-4 text-[#A78BFA] text-xs font-bold tracking-widest uppercase animate-pulse">Loading purchase records...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="text-center py-16 bg-white/[0.01] border border-white/[0.04] rounded-3xl backdrop-blur-md px-6">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full inline-flex text-red-400 mb-6">
          <FiAlertCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Authentication Required</h3>
        <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
          Please log in to view your account's purchase transactions.
        </p>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="text-center py-20 bg-white/[0.01] border border-white/[0.04] rounded-3xl backdrop-blur-md px-6">
        <div className="p-4 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full inline-flex text-[#8B5CF6] mb-6">
          <FiShoppingBag size={32} />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">No Purchases Found</h3>
        <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
          You haven't purchased any products yet. Visit our shop page to make your first purchase!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
            Purchase History
          </h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">
            Logged in as: <span className="text-gray-300 font-bold">{session.user.email}</span>
          </p>
        </div>
        <span className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-gray-300 rounded-full">
          Total Orders: {purchases.length}
        </span>
      </div>

      {/* Purchases Table (Desktop/Tablet) and Cards (Mobile) */}
      <div className="border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl bg-white/[0.01] backdrop-blur-md">
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-xs font-extrabold text-gray-500 uppercase tracking-widest border-b border-white/[0.06]">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-sm">
              {purchases.map((purchase) => {
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
                      <td className="px-6 py-5 whitespace-nowrap font-medium text-gray-300">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-[#8B5CF6]" />
                          <span>{formattedDate}</span>
                        </div>
                      </td>
                      
                      {/* Session ID */}
                      <td className="px-6 py-5 whitespace-nowrap font-mono text-xs text-gray-400">
                        {purchase.sessionId ? purchase.sessionId.slice(-15) : 'N/A'}...
                      </td>
                      
                      {/* Product Preview */}
                      <td className="px-6 py-5 text-gray-300 font-semibold max-w-[240px] truncate">
                        {purchase.items.length === 1 
                          ? purchase.items[0].title 
                          : `${purchase.items[0].title} & ${purchase.items.length - 1} more`}
                      </td>
                      
                      {/* Total Amount */}
                      <td className="px-6 py-5 text-right font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] whitespace-nowrap text-base">
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
                      
                      {/* Expand Action */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => toggleExpand(purchase._id)}
                          className="p-2 hover:bg-white/[0.05] rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
                        >
                          {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Collapsible details row */}
                    {isExpanded && (
                      <tr className="bg-white/[0.005]">
                        <td colSpan={6} className="px-8 py-6 border-b border-white/[0.06]">
                          <div className="space-y-4 max-w-4xl">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pb-2 border-b border-white/[0.04]">
                              Itemized Receipt Details
                            </h4>
                            
                            <div className="divide-y divide-white/[0.03]">
                              {purchase.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06] flex-shrink-0 flex items-center justify-center">
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
                                <p className="font-bold">Transaction Reference ID: <span className="font-mono text-gray-300 text-[11px]">{purchase.sessionId}</span></p>
                                {purchase.paymentIntentId && (
                                  <p className="font-bold mt-1">Payment Intent ID: <span className="font-mono text-gray-300 text-[11px]">{purchase.paymentIntentId}</span></p>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 self-end sm:self-auto font-black text-sm uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
                                <span>Paid Amount:</span>
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

        {/* Mobile View Cards */}
        <div className="md:hidden divide-y divide-white/[0.06]">
          {purchases.map((purchase) => {
            const isExpanded = expandedId === purchase._id;
            const formattedDate = new Date(purchase.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            
            return (
              <div key={purchase._id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                      <FiCalendar className="text-[#8B5CF6]" />
                      <span>{formattedDate}</span>
                    </div>
                    <p className="text-xs font-mono text-gray-500 mt-1">ID: {purchase.sessionId ? purchase.sessionId.slice(-12) : 'N/A'}...</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                    purchase.paymentStatus === 'paid'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                  }`}>
                    {purchase.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-300 font-semibold max-w-[180px] truncate">
                    {purchase.items.length === 1 
                      ? purchase.items[0].title 
                      : `${purchase.items[0].title} & ${purchase.items.length - 1} more`}
                  </div>
                  <div className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-base">
                    ${purchase.totalAmount.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => toggleExpand(purchase._id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  {isExpanded ? (
                    <>Hide Details <FiChevronUp /></>
                  ) : (
                    <>Show Details <FiChevronDown /></>
                  )}
                </button>

                {isExpanded && (
                  <div className="pt-4 border-t border-white/[0.06] space-y-4">
                    <div className="divide-y divide-white/[0.04]">
                      {purchase.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2.5 text-xs">
                          <div>
                            <p className="font-bold text-white line-clamp-1">{item.title}</p>
                            <p className="text-[10px] text-gray-500 font-semibold">{item.brand} • Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-gray-300 ml-2">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    {purchase.paymentIntentId && (
                      <p className="text-[10px] text-gray-500 font-mono break-all">Intent ID: {purchase.paymentIntentId}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}