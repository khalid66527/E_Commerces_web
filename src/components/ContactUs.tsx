"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { getUserContacts, ContactMessage } from '@/lib/api/contacts';
import { submitContactMessage } from '@/lib/actions/contacts';
import { 
  FiMail, 
  FiUser, 
  FiMessageSquare, 
  FiSend, 
  FiCheckCircle, 
  FiAlertCircle,
  FiClock,
  FiCornerDownRight,
  FiCalendar,
  FiLock
} from 'react-icons/fi';

export default function ContactUs() {
  const { data: session, isPending } = useSession();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Message history state
  const [history, setHistory] = useState<ContactMessage[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  // Notification state
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Sync session details to form
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  // Load history of inquiries
  const loadHistory = async () => {
    if (!session?.user?.email) {
      setLoadingHistory(false);
      return;
    }
    try {
      const data = await getUserContacts(session.user.email);
      // Sort: newest first
      const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setHistory(sorted);
    } catch (err) {
      console.error("Error loading contacts history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      loadHistory();
    }
  }, [session, isPending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) {
      showToast('error', 'Email and message fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitContactMessage({
        name,
        email,
        subject: subject || 'No Subject',
        message
      });

      if (res.success) {
        showToast('success', 'Your inquiry was sent! Admin will respond shortly.');
        setMessage('');
        setSubject('');
        await loadHistory();
      } else {
        showToast('error', res.message || 'Failed to submit contact message.');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">
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

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] drop-shadow-[0_0_30px_rgba(236,72,153,0.15)]">
            Contact Support
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Have questions or issues? Send us a message and track our admin responses below in your live comments feed.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submit Message Card (Left Column) */}
          <div className="lg:col-span-5 border border-white/[0.06] rounded-[2.5rem] p-6 sm:p-8 bg-white/[0.01] backdrop-blur-md space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <h3 className="text-lg font-black uppercase tracking-wider pb-3 border-b border-white/[0.06] text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
              Send Inquiries
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <FiUser className="text-[#8B5CF6]" /> Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0c0c14]/40 border border-white/[0.08] focus:border-[#8B5CF6]/60 rounded-2xl px-5 py-3 text-white placeholder-gray-600 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <FiMail className="text-[#8B5CF6]" /> Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Your contact email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0c0c14]/40 border border-white/[0.08] focus:border-[#8B5CF6]/60 rounded-2xl px-5 py-3 text-white placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                  disabled={!!session?.user}
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <FiMessageSquare className="text-[#EC4899]" /> Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject of message"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0c0c14]/40 border border-white/[0.08] focus:border-[#8B5CF6]/60 rounded-2xl px-5 py-3 text-white placeholder-gray-600 outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain your problem or questions in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0c0c14]/40 border border-white/[0.08] focus:border-[#8B5CF6]/60 rounded-2xl px-5 py-4 text-white placeholder-gray-600 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-[#EC4899]/20 hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <FiSend size={14} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Comments / Timeline History Card (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-white/[0.06] rounded-[2.5rem] p-6 sm:p-8 bg-white/[0.01] backdrop-blur-md shadow-xl min-h-[400px] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider pb-3 border-b border-white/[0.06] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
                  Live Support Feed
                </h3>

                {!session?.user ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-[#8B5CF6]">
                      <FiLock size={24} />
                    </div>
                    <p className="text-gray-400 text-xs font-extrabold uppercase tracking-widest">Sign In to See Message History</p>
                    <p className="text-gray-500 text-xs max-w-xs mx-auto leading-relaxed">
                      You can send a contact message above anonymously, but you must be logged in to view response comment feeds.
                    </p>
                  </div>
                ) : loadingHistory ? (
                  <div className="py-16 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-4 border-t-transparent border-[#8B5CF6] animate-spin" />
                    <p className="mt-3 text-gray-500 text-xs font-bold uppercase tracking-wider animate-pulse">Syncing timeline...</p>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center space-y-3">
                    <FiMessageSquare className="text-gray-600 text-3xl" />
                    <p className="text-gray-400 text-sm font-bold">No message history</p>
                    <p className="text-gray-500 text-xs max-w-xs mx-auto leading-relaxed">
                      Your historical contact requests and admin responses will load here as a live comment feed thread.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {history.map((msg) => {
                      const formattedDate = new Date(msg.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      return (
                        <div key={msg._id} className="space-y-3 border-l-2 border-white/[0.08] pl-4 ml-2 relative">
                          {/* Dot indicator */}
                          <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1 border-2 border-[#06060C] ${msg.reply ? 'bg-green-400' : 'bg-yellow-400'}`} />

                          {/* User Message comment bubble */}
                          <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 space-y-1.5 shadow-md">
                            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 tracking-wider">
                              <span className="text-[#8B5CF6] font-black uppercase text-[9px]">{msg.subject}</span>
                              <span className="flex items-center gap-1">
                                <FiCalendar size={11} /> {formattedDate}
                              </span>
                            </div>
                            <p className="text-white text-sm whitespace-pre-wrap">{msg.message}</p>
                          </div>

                          {/* Admin Reply comment bubble */}
                          {msg.reply ? (
                            <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/15 rounded-2xl p-4 space-y-1.5 ml-6 shadow-md relative">
                              <div className="absolute w-2 h-2 bg-[#8B5CF6]/15 rounded-full -left-[14px] top-4" />
                              <div className="flex justify-between items-center text-[10px] font-bold text-[#A78BFA] tracking-wider">
                                <span className="flex items-center gap-1.5 font-black uppercase text-[9px]">
                                  <FiCornerDownRight /> Support Agent Reply
                                </span>
                                {msg.repliedAt && (
                                  <span className="text-gray-500 font-medium">
                                    {new Date(msg.repliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-200 text-sm leading-relaxed">{msg.reply}</p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold tracking-wider ml-6 italic">
                              <FiClock size={11} className="text-yellow-500" /> Waiting for admin reply...
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
