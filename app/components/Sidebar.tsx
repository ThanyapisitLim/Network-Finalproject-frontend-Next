"use client";

import { useEffect, useState } from "react";
import { Conversation } from "../types/chat";
import { getUser } from "../api/user";
import LogoutButton from "./LogoutButton"; // Import ปุ่ม Logout ที่เราทำไว้
import Link from "next/link"; // Import Link สำหรับไปหน้า Profile

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (groupId: string) => Promise<void>;
  onNew: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  isOpen,
  onClose,
}: SidebarProps) {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ควบคุมการเปิด/ปิดเมนู

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUser();
      setUser(user);
    }
    fetchUserData();
  }, []);

  const firstLetter = user?.[0]?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden" onClick={onClose} />
      )}
      
      <aside className={`
          fixed top-0 left-0 z-40 h-full w-72 bg-zinc-950 border-r border-zinc-800
          flex flex-col transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        
        {/* New Chat Button */}
        <div className="p-4 border-b border-zinc-800">
          <button onClick={onNew} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-sm font-medium text-zinc-200 transition-all active:scale-[0.98]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Conversations list */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {conversations.length === 0 && (
            <p className="text-xs text-zinc-600 px-3 py-6 text-center">No conversations yet</p>
          )}
          {conversations.map((conv) => (
            <button key={conv.id} onClick={() => { onSelect(conv.id); onClose(); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors ${
                activeId === conv.id ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900"
              }`}>
              {conv.title}
            </button>
          ))}
        </nav>

        {/* Bottom Section (User & Menu) */}
        <div className="p-4 border-t border-zinc-800 relative">
          
          {/* Dropdown Menu เด้งขึ้นมาเมื่อกดชื่อ */}
          {isMenuOpen && (
            <div className="absolute bottom-20 left-4 right-4 z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <Link href="/profile" onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors group">
                <div className="p-1.5 rounded-lg bg-zinc-800 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Your Profile
              </Link>
              <div className="h-[1px] bg-zinc-800 my-1 mx-1" />
              <LogoutButton />
            </div>
          )}

          {/* User Bar (คลิกที่นี่เพื่อเปิดเมนู) */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-full flex items-center gap-3 p-2 rounded-2xl transition-all text-left ${
              isMenuOpen ? 'bg-zinc-900 ring-1 ring-zinc-800' : 'hover:bg-zinc-900'
            }`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg">
              {firstLetter}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-200 truncate">{user?.[0]?.name}</p>
              <p className="text-[11px] text-zinc-500 truncate">{user?.[0]?.gmail}</p>
            </div>
            <svg className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-180 text-zinc-200' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}