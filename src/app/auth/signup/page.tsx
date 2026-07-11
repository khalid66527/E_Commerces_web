"use client"; // এই লাইনটি Next.js কে বলবে এটা একটা Client Component

import React, { useState } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { authClient, signUp } from '@/lib/auth-client';

export default function SignUp() {
  const router = useRouter();
  // ইনপুট ভ্যালু ট্র্যাক করার জন্য স্টেটসমূহ
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // পাসওয়ার্ড ভ্যালিডেশন চেক
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    
      await signUp.email({
        email: email,
        password: password,
        name: fullName,
        callbackURL: '/',
        fetchOptions: {
          onRequest: () => {
            setIsSubmitting(true);
          },
          onResponse: () => {
            setIsSubmitting(false);
          },
          onSuccess: () => {
            router.push('/');
            router.refresh();
          },
          onError: (ctx) => {
            setErrorMsg(ctx.error.message || 'An error occurred during sign up.');
          }
        }
      });
  
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google"
    })
  }

  return (
    <div className="relative min-h-screen bg-[#06060C] text-gray-300 font-sans flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient Vibrant Purple & Neon Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#EC4899]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">

        {/* Main Card Container */}
        <div className="bg-gradient-to-b from-[#111122]/80 to-[#07070F]/90 backdrop-blur-xl border border-[#8B5CF6]/20 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_50px_rgba(139,92,246,0.05)] relative overflow-hidden">

          {/* Top Border Gradient Glow */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#EC4899] to-[#F43F5E] tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm">Join the next generation electronics hub</p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E] text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Password</label>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#EC4899] text-xs font-medium"
                >
                  {isVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={isConfirmVisible ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={toggleConfirmVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#EC4899] text-xs font-medium"
                >
                  {isConfirmVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] hover:brightness-110 text-white font-bold tracking-wide rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(236,72,153,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-gray-800"></div>
            <span className="px-3 text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-[1px] bg-gray-800"></div>
          </div>

          {/* Social OAuth Buttons Container */}
          <div className="space-y-3">
            {/* Google Button */}
            <button
              onClick={handleGoogleSignin}
              type="button"
              className="w-full h-12 border border-gray-800 hover:border-[#EC4899]/50 bg-[#16162a]/40 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm text-white"
            >
              <FcGoogle />Continue with Google
            </button>

            {/* Facebook Button */}
            <button
              type="button"
              className="w-full h-12 border border-gray-800 hover:border-[#EC4899]/50 bg-[#16162a]/40 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm text-white"
            >
              <FaFacebookSquare />Continue with Facebook
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-[#EC4899] hover:underline font-medium">
              Sign In
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}