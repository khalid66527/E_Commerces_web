"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiShield,
  FiHeart,
  FiShoppingBag,
  FiTruck,
  FiEdit,
  FiX,
  FiImage,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

export default function ProfileDetails() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  
  // Submit states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sync state when session changes
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setImage(session.user.image || '');
    }
  }, [session]);

  // Redirect if not signed in
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/signin');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] bg-transparent flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-[#EC4899] animate-spin"></div>
          <p className="mt-4 text-[#A78BFA] text-sm font-semibold tracking-wider animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;
  const role = user.role || 'user';

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Update name and image
      const updateRes = await authClient.updateUser({
        name,
        image
      });

      if (updateRes.error) {
        setErrorMsg(updateRes.error.message || "Failed to update profile details");
        setLoading(false);
        return;
      }

      // 2. Update email if it changed
      if (email !== user.email) {
        const emailRes = await authClient.changeEmail({
          newEmail: email,
          callbackURL: window.location.origin + '/profile'
        });

        if (emailRes.error) {
          setErrorMsg(emailRes.error.message || "Updated name and image, but failed to update email address.");
          setLoading(false);
          return;
        }
        setSuccessMsg("Profile updated! A verification link has been sent to your new email address.");
      } else {
        setSuccessMsg("Profile updated successfully!");
      }

      // Refresh the session state inside Better Auth react store
      await authClient.getSession();
      router.refresh();
      setTimeout(() => {
        setIsOpen(false);
        setSuccessMsg('');
      }, 2000);

    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full text-gray-850 dark:text-gray-200 font-sans overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#EC4899]/5 dark:bg-[#EC4899]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-150 dark:border-gray-800 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
              Account Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account information and preferences</p>
          </div>
          
        </div>

        {/* Profile Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main User Info Card */}
          <div className="md:col-span-1 bg-gray-50 dark:bg-gradient-to-b from-[#111122]/90 to-[#07070F]/95 border border-gray-200 dark:border-[#8B5CF6]/20 rounded-[2.5rem] p-6 text-center shadow-lg relative overflow-hidden">
            {/* Ambient Card Glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"></div>
            
            {/* Avatar Ring */}
            <div className="relative w-28 h-28 mx-auto mt-4 mb-6 rounded-full p-1 bg-gradient-to-tr from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] shadow-xl overflow-hidden flex items-center justify-center">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-full h-full object-cover rounded-full" 
                  onError={(e) => {
                    // Fallback in case of broken image URL
                    (e.target as HTMLImageElement).src = '';
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : null}
              {/* Show fallback text if no image or if image load fails */}
              {!user.image ? (
                <div className="w-full h-full rounded-full bg-white dark:bg-[#111122] flex items-center justify-center text-4xl font-black text-[#EC4899] uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
              ) : null}
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">{user.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-4">{user.email}</p>
            
            <span className="inline-block px-4 py-1.5 bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              {role}
            </span>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-2 text-left space-y-4">
              <div className="flex items-center space-x-3 text-xs">
                <FiMail className="text-[#EC4899] w-4 h-4" />
                <span className="text-gray-600 dark:text-gray-400 truncate">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <FiShield className="text-[#8B5CF6] w-4 h-4" />
                <span className="text-gray-600 dark:text-gray-400 capitalize">Role: {role}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <FiCalendar className="text-[#F43F5E] w-4 h-4" />
                <span className="text-gray-600 dark:text-gray-400">Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</span>
              </div>
              <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setName(user.name || '');
                setEmail(user.email || '');
                setImage(user.image || '');
                setErrorMsg('');
                setSuccessMsg('');
                setIsOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:opacity-90 active:scale-95 text-white rounded-xl text-xs font-extrabold tracking-wide transition-all shadow-md shadow-[#EC4899]/20"
            >
              <FiEdit size={14} /> Edit Profile
            </button>
          </div>
            </div>
          </div>

          {/* Quick stats and details */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-[#111122]/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center">
                <FiShoppingBag className="mx-auto w-6 h-6 text-[#8B5CF6] mb-2" />
                <div className="text-2xl font-black text-gray-900 dark:text-white">0</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Orders</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#111122]/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center">
                <FiHeart className="mx-auto w-6 h-6 text-[#EC4899] mb-2" />
                <div className="text-2xl font-black text-gray-900 dark:text-white">0</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Wishlist</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#111122]/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center">
                <FiTruck className="mx-auto w-6 h-6 text-[#F43F5E] mb-2" />
                <div className="text-2xl font-black text-gray-900 dark:text-white">0</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Shipped</div>
              </div>
            </div>

            {/* Profile Preferences */}
            <div className="bg-gray-50 dark:bg-gradient-to-b from-[#111122]/60 to-[#07070F]/80 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-850 pb-3">Personal Settings</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-150 dark:border-gray-800/40">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Display Name</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{user.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-150 dark:border-gray-800/40">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Email Address</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-150 dark:border-gray-800/40">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Verification Status</span>
                  <span className="text-emerald-500 font-bold uppercase text-xs tracking-wider">Verified</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Authentication Type</span>
                  <span className="text-gray-900 dark:text-white font-semibold capitalize">Email & Password</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4 py-6 transition-all duration-300">
          
          {/* Backdrop Click Closes Modal */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-gradient-to-b from-[#111122] to-[#07070F] border border-gray-250 dark:border-[#8B5CF6]/30 rounded-3xl p-6 md:p-8 shadow-[0_10px_50px_rgba(139,92,246,0.15)] overflow-hidden transition-colors">
            
            {/* Top Pink Line Glow */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"></div>

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-4 mb-6">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <FiEdit className="text-[#EC4899] text-sm" /> Edit Profile
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Feedback Messages */}
            {successMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
                <FiCheckCircle size={16} className="flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E] text-xs flex items-center gap-2.5">
                <FiAlertCircle size={16} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#8B5CF6] dark:text-[#A78BFA] ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your display name"
                  className="w-full bg-gray-50 dark:bg-[#16162a]/60 border border-gray-300 dark:border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#8B5CF6] dark:text-[#A78BFA] ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="w-full bg-gray-50 dark:bg-[#16162a]/60 border border-gray-300 dark:border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                />
              </div>

              {/* Image URL Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#8B5CF6] dark:text-[#A78BFA] ml-1">Profile Image URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full bg-gray-50 dark:bg-[#16162a]/60 border border-gray-300 dark:border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                  />
                  <FiImage className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-150 dark:border-gray-800 mt-6 justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-[#16162a] border border-gray-250 dark:border-gray-800 hover:brightness-95 text-gray-700 dark:text-gray-300 font-semibold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] hover:brightness-110 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-[#EC4899]/20 disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
