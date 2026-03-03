"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid password");
        return;
      }

      // Redirect to admin page on success
      router.push("/admin");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-slate-900/80 z-10"></div>
        <img 
          src="/admin-bg.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content with frosted glass effect */}
      <div className="relative z-10 w-full max-w-[400px] p-10 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-white/30 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-base text-white placeholder-gray-400"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0067b8] text-white font-semibold py-2.5 px-4 rounded hover:bg-[#005a9e] transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-300">
          <Link
            href="/"
            className="text-cyan-300 hover:underline"
          >
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
