"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] font-sans">
      {/* Left Panel - Branding (ใช้ชุดเดียวกับ Login เพื่อความต่อเนื่อง) */}
      {/* <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900 dark:bg-zinc-950 items-center justify-center border-r border-zinc-800">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative z-10 max-w-md px-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-8 shadow-lg shadow-blue-600/30">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Join COSCI AI</h1>
          <p className="text-zinc-400 text-lg">
            Create your unique identity and start exploring our intelligent chatbot.
          </p>
        </div>
      </div> */}

      {/* Right Panel - Register Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white dark:bg-[#09090b]">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
              Get Started
            </h2>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
              Create Account
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Identify yourself. Please provide your real name for account
              verification.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Account Name Input */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <label
                htmlFor="name"
                className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 ml-1"
              >
                Account Name / Alias
              </label>
              <input
                id="name"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter Your Name"
                required
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-5 py-4 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
              />
            </div>

            {/* Google Link Button
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white rounded-2xl px-6 py-4 text-sm font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="currentColor"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" fillOpacity="0.8"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button> */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 dark:bg-blue-500 rounded-2xl px-6 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-[0.98] shadow-lg shadow-blue-600/20 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Register Account</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
