"use client";

import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState("บุคคลทั่วไป");
  const [interest, setInterest] = useState("ยังไม่ได้ระบุ");

  useEffect(() => {
    async function fetchUserData() {
      const data = await getUser();
      setUser(data);
    }
    fetchUserData();
  }, []);

  const statusOptions = ["นักเรียน ม.6", "เด็กซิ่ว", "ผู้ปกครอง", "ศิษย์เก่า", "บุคคลทั่วไป"];
  const majorOptions = [
    "การจัดการธุรกิจไซเบอร์ (CB)",
    "คอมพิวเตอร์เพื่อการสื่อสาร (CP)",
    "การออกแบบสื่อปฏิสัมพันธ์และมัลติมีเดีย (IM)",
    "ภาพยนตร์และสื่อดิจิทัล",
    "นวัตกรรมสื่อสารสังคม (วิชาเอกต่างๆ)"
  ];

  return (
    // ใช้ bg-zinc-950 ให้เหมือน Sidebar
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation - ใช้สี zinc-500 แบบเดิม */}
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 mb-8 text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Chat
        </Link>

        {/* Header - ปรับให้เหลี่ยมขึ้นและใช้สี zinc-900/border-zinc-800 */}
        <div className="bg-zinc-900/50 p-8 border border-zinc-800 rounded-xl mb-6">
          <div className="flex items-center gap-6">
            {/* Avatar ใช้ Gradient เดิมที่คุณชอบ แต่ลดความมนลงเป็น rounded-2xl */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg">
              {user?.[0]?.name?.charAt(0).toUpperCase() || "C"}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-zinc-100 truncate">
                {user?.[0]?.name || "Loading..."}
              </h1>
              <p className="text-sm text-zinc-500 truncate">{user?.[0]?.gmail}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ส่วนการเลือกสถานะ - ใช้สไตล์เดียวกับปุ่ม New Chat */}
          <section className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl space-y-4">
            <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Personalization</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-500 block mb-1.5">สถานะผู้ใช้งาน</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                >
                  {statusOptions.map(opt => <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-500 block mb-1.5">เอกที่สนใจ (COMSCI SWU)</label>
                <select 
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                >
                  <option value="ยังไม่ได้ระบุ">เลือกวิชาเอก</option>
                  {majorOptions.map(opt => <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* ส่วนรายการที่บันทึก - ใช้สไตล์เดียวกับรายการแชทใน Sidebar */}
          <section className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl space-y-4">
            <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Saved Information</h2>
            <div className="space-y-2">
              <div className="w-full text-left px-3 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-400 flex items-center gap-3">
                <span className="text-zinc-600">📄</span>
                เกณฑ์รับสมัคร TCAS
              </div>
              <div className="w-full text-left px-3 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-400 flex items-center gap-3">
                <span className="text-zinc-600">🎥</span>
                แนะนำหลักสูตรวิทยาลัย
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}