"use client";

import { logout } from "../api/auth";
import { deleteCookie } from "../lib/cookie";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    deleteCookie("token");
    await logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="
        w-full flex items-center justify-center gap-2 px-4 py-2.5 
        text-sm font-medium text-red-400 
        bg-red-500/10 hover:bg-red-500/20 
        border border-red-500/20 hover:border-red-500/40 
        rounded-xl transition-all duration-200
        active:scale-[0.98]
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
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      Sign Out
    </button>
  );
}
