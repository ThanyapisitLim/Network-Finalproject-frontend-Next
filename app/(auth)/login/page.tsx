"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // TODO: เชื่อมต่อ Backend Google Auth
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] font-sans">
      {/* Left panel — Branding (คงเดิมแต่ปรับสีให้ละมุนขึ้น) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900 dark:bg-zinc-950 items-center justify-center border-r border-zinc-800">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full bg-blue-500/10 blur-3xl" />
        
        <div className="relative z-10 max-w-md px-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-8 shadow-lg shadow-blue-600/30">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
            Cozy Chatbot
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Your AI assistant for all COSCI inquiries and support.
          </p>
          
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              { icon: "🧠", label: "COSCI SWU" },
              { icon: "⚡", label: "News" },
              { icon: "🔍", label: "Program" },
              { icon: "🗄️", label: "Admission" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-300">
                <span className="text-lg">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — ปรับปรุงใหม่ให้ไม่โล่ง */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12 bg-white dark:bg-[#09090b]">
        <div className="w-full max-w-sm">
          {/* ส่วนหัวที่ทำให้ดูเต็มขึ้น */}
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-6 shadow-lg shadow-blue-600/30">
              <span className="text-2xl">🤖</span>
            </div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
              Authentication
            </h2>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
              Sign in to Cozy 
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Sign in with Google to access the Chatbot
            </p>
          </div>

          {/* Google Login Card — ปรับให้ดูเป็น Card เพื่อให้พื้นที่ดูมีมิติ */}
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 mb-8 shadow-sm">
            <button
              onClick={() => signIn("google")}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-700 dark:text-zinc-200 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-blue-400 dark:hover:border-blue-500/50 active:scale-[0.98] shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-zinc-300 border-t-blue-600 rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="tracking-tight">Sign in with Google</span>
                </>
              )}
            </button>
            
            <div className="mt-6 flex items-center gap-2 text-[11px] text-zinc-400 justify-center uppercase tracking-[0.1em] font-bold">
              <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
              Secure Infrastructure
              <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="space-y-6 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-bold transition-colors underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
            
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-loose">
                Final Project — Smart Chatbot System<br />
                © 2026 Tech Stack: Next.js, Node.js, MySQL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}