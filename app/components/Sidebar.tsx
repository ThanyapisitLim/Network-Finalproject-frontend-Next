"use client";

import { useEffect, useState } from "react";
import { Conversation } from "../types/chat";
import { getUser } from "../api/user";
import LogoutButton from "./LogoutButton"; 

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onDelete,
  onNew,
  isOpen,
  onClose,
}: SidebarProps) {
  const [user, setUser] = useState<any>(null);
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
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-72 bg-zinc-950 border-r border-zinc-800
          flex flex-col transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* New chat button */}
        <div className="p-4 border-b border-zinc-800">
          <button
            onClick={onNew}
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60
              text-sm font-medium text-zinc-200 transition-all
              hover:border-zinc-600 active:scale-[0.98]
            "
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Chat
          </button>
        </div>

        {/* Conversations list */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin">
          {conversations.length === 0 && (
            <p className="text-xs text-zinc-600 px-3 py-6 text-center">
              No conversations yet
            </p>
          )}
          {conversations.map((conv) => (
            <div key={conv.id} className="relative group">
              <button
                onClick={() => {
                  onSelect(conv.id);
                  onClose();
                }}
                className={`
                  w-full text-left px-3 py-2.5 pr-10 rounded-lg text-sm truncate transition-colors
                  ${
                    activeId === conv.id
                      ? "bg-zinc-800 text-white font-medium"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  }
                `}
              >
                {conv.title}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conv.id);
                }}
                className={`
                  absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md
                  text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 transition-colors
                  ${activeId === conv.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                `}
                title="Delete chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </nav>

        {/* Bottom branding - ปรับปรุงตรงนี้ */}
        <div className="p-4 border-t border-zinc-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
              {firstLetter}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">
                {user?.[0]?.name}
              </p>
              <p className="text-xs text-zinc-500 truncate">{user?.[0]?.gmail}</p>
            </div>
          </div>
          
          {}
          <div className="pt-2">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
} 