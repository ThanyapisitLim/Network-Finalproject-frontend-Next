"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/api/auth";

export default function RegisterPage() {
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleRegister = async () => {
    if (!session?.user?.email || !accountName.trim()) return;
    setIsLoading(true);
    await createUser(session.user.email, accountName);
    router.push("/chatbot");
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] font-sans">
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

          <div className="space-y-6">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 ml-1">
                Account Name / Alias
              </label>

              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full rounded-2xl border px-5 py-4"
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-blue-600 rounded-2xl px-6 py-4 text-white"
            >
              Register Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
