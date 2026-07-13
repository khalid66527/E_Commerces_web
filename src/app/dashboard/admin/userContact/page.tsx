"use client";

import React, { useState, useEffect } from 'react';
import { getAllContacts, ContactMessage } from '@/lib/api/contacts';
import { replyToContact } from '@/lib/actions/contacts';
import { 
  FiMail,
  FiCheckCircle, 
  FiAlertCircle, 
  FiSend, 
  FiCornerDownRight,
  FiCalendar,
  FiUser
} from 'react-icons/fi';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchContacts = async () => {
    try {
      const data = await getAllContacts();
      // Sort: unreplied first, then newest first
      const sorted = data.sort((a, b) => {
        const aReplied = !!a.reply;
        const bReplied = !!b.reply;
        if (aReplied !== bReplied) {
          return aReplied ? 1 : -1;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setMessages(sorted);
    } catch (err) {
      console.error("Error fetching messages:", err);
      showToast('error', 'Failed to load user messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleReplyChange = (id: string, val: string) => {
    setReplyTexts(prev => ({ ...prev, [id]: val }));
  };

  const handleSendReply = async (id: string) => {
    const text = replyTexts[id]?.trim();
    if (!text) {
      showToast('error', 'Please enter a reply message.');
      return;
    }

    setSubmittingId(id);
    try {
      const res = await replyToContact(id, text);
      if (res.success) {
        showToast('success', 'Reply sent successfully!');
        setReplyTexts(prev => ({ ...prev, [id]: '' }));
        await fetchContacts();
      } else {
        showToast('error', res.message || 'Failed to submit reply.');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'An error occurred while sending reply.');
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin"></div>
        <p className="mt-4 text-[#A78BFA] text-xs font-bold tracking-widest uppercase animate-pulse">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${
          toast.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toast.type === 'success' ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
          <span className="text-xs font-extrabold tracking-wider">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-white/[0.06]">
        <h2 className="text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
          User Inquiries & Contacts
        </h2>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          Review queries submitted by store customers and send replies directly to their portal.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.01] border border-white/[0.04] rounded-3xl backdrop-blur-md px-6">
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-full inline-flex text-gray-400 mb-6">
            <FiMail size={32} />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">No Messages Available</h3>
          <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
            No contact queries or user messages have been submitted yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => {
            const formattedDate = new Date(msg.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            const hasReply = !!msg.reply;

            return (
              <div 
                key={msg._id} 
                className={`border rounded-3xl p-6 bg-white/[0.01] backdrop-blur-md transition-all duration-300 ${
                  hasReply 
                    ? 'border-white/[0.04] opacity-80' 
                    : 'border-[#8B5CF6]/30 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:border-[#8B5CF6]/50'
                }`}
              >
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/[0.04] mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-extrabold text-xs uppercase shadow-md">
                      {msg.name ? msg.name[0] : <FiUser />}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{msg.name || 'Anonymous User'}</h4>
                      <p className="text-[10px] text-gray-400 font-bold">{msg.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-gray-500 font-bold">
                      <FiCalendar size={13} className="text-[#8B5CF6]" />
                      {formattedDate}
                    </span>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      hasReply
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400 animate-pulse'
                    }`}>
                      {hasReply ? 'Replied' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Subject</span>
                    <p className="font-extrabold text-white text-sm">{msg.subject}</p>
                  </div>

                  <div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Message</span>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>

                  {/* Reply timeline / input */}
                  <div className="pt-4 border-t border-white/[0.04] mt-4">
                    {hasReply ? (
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-gray-500 font-extrabold uppercase tracking-wider border-b border-white/[0.04] pb-2">
                          <span className="flex items-center gap-1 text-green-400">
                            <FiCornerDownRight /> Admin Response
                          </span>
                          {msg.repliedAt && (
                            <span>{new Date(msg.repliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{msg.reply}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-[#8B5CF6] uppercase tracking-widest block">Write a Reply</label>
                        <div className="relative">
                          <textarea
                            rows={3}
                            placeholder="Type your response to send back to the user..."
                            value={replyTexts[msg._id] || ''}
                            onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                            className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.08] focus:border-[#8B5CF6]/50 rounded-2xl p-4 text-sm text-white placeholder-gray-500 outline-none transition-all resize-none"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSendReply(msg._id)}
                            disabled={submittingId === msg._id}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg shadow-[#EC4899]/10 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {submittingId === msg._id ? (
                              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            ) : (
                              <>
                                <FiSend /> Send Reply
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
