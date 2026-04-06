"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/api/auth";
import { setCookie } from "@/app/lib/cookie";

export default function RegisterPage() {
  const [accountName, setAccountName] = useState("");
  const [status, setStatus] = useState("นักเรียน ม.6");
  const [major, setMajor] = useState("การจัดการธุรกิจไซเบอร์ (CB)");

  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleRegister = async () => {
    if (!session?.user?.email || !accountName.trim()) return;
    setIsLoading(true);

    try {
      const data = await createUser(
        session.user.email,
        accountName,
        status,
        major,
      );
      setCookie(data.accessToken);

      localStorage.setItem("userStatus", status);
      localStorage.setItem("userMajor", major);

      router.push("/chatbot");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    "นักเรียน ม.6",
    "เด็กซิ่ว",
    "ผู้ปกครอง",
    "ศิษย์เก่า",
    "บุคคลทั่วไป",
  ];
  const majorOptions = [
    "การจัดการธุรกิจไซเบอร์ (CB)",
    "คอมพิวเตอร์เพื่อการสื่อสาร (CP)",
    "การออกแบบสื่อปฏิสัมพันธ์และมัลติมีเดีย (IM)",
    "ภาพยนตร์และสื่อดิจิทัล",
    "นวัตกรรมสื่อสารสังคม (วิชาเอกต่างๆ)",
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] font-sans relative overflow-hidden">
      {/* ส่วนเอฟเฟกต์แสงม่วงๆ ฟ้าๆ ด้านหลัง */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white dark:bg-[#09090b] relative z-10">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-sm font-bold tracking-[0.2em] text-purple-600 dark:text-purple-400 uppercase mb-3">
              Get Started
            </h2>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
              Create Account
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              ระบุตัวตนและเลือกข้อมูลที่คุณสนใจเพื่อเริ่มต้นใช้งานแชทบอทวิทยาลัยนวัตกรรมสื่อสังคม
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-5 Backdrop-blur-sm">
              {/* Account Name */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                  Account Name / Alias
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter Your Name"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-5 py-4 text-sm text-zinc-950 dark:text-zinc-200 outline-none focus:border-purple-500 dark:focus:border-purple-600 transition-all"
                />
              </div>

              {/* Status Select */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                  Status / สถานะ
                </label>
                <div className="relative group">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-sm text-zinc-950 dark:text-zinc-200 outline-none focus:border-purple-500 dark:focus:border-purple-600 cursor-pointer appearance-none transition-all"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  {/* ไอคอนลูกศร */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-purple-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Major Select */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                  Major / เอกที่สนใจ
                </label>
                <div className="relative group">
                  <select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-sm text-zinc-950 dark:text-zinc-200 outline-none focus:border-purple-500 dark:focus:border-purple-600 cursor-pointer appearance-none transition-all"
                  >
                    {majorOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  {/* ไอคอนลูกศร */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-purple-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={isLoading || !accountName.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-2xl px-6 py-4 text-white font-bold shadow-lg shadow-purple-600/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? "Creating Account..." : "Register Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}