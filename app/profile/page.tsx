"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser } from "../api/user"; // สมมติว่ามีฟังก์ชันนี้ดึงข้อมูลชื่อ/อีเมล

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "", status: "", major: "" });

  useEffect(() => {
    async function init() {
      // ดึงข้อมูลพื้นฐานจาก API
      const user = await getUser();
      
      // ดึงค่า "สถานะ" และ "เอก" ที่เลือกไว้จาก LocalStorage (ที่เซ็ตมาจากหน้า Sign-in)
      const status = localStorage.getItem("userStatus") || "ไม่ได้ระบุ";
      const major = localStorage.getItem("userMajor") || "ไม่ได้ระบุ";
      
      setUserData({
        name: user?.[0]?.name || "Visitor",
        status: status,
        major: major
      });
    }
    init();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* ออกไปหน้า Chatbot เท่านั้น (ใช้ Path ของหน้า Chat ของคุณ) */}
        <Link href="/chatbot" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 mb-8 text-sm transition-colors group">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Chatbot
        </Link>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-8 border-b border-zinc-800 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{userData.name}</h1>
              <p className="text-zinc-500 text-sm">COMSCI Visitor Member</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* แสดงสถานะแบบแก้ไขไม่ได้ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">สถานะผู้ใช้งาน</p>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-300">
                  {userData.status}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">เอกที่สนใจ (COMSCI)</p>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-300">
                  {userData.major}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-600 italic text-center pt-4">
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}