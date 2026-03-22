"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatInputProps } from "../types/chat";

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-xl px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-700/60 rounded-2xl px-4 py-2 focus-within:border-zinc-500 transition-colors">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message…"
            disabled={disabled}
            rows={1}
            className="
              flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600
              resize-none outline-none py-2 max-h-[200px]
              disabled:opacity-50
            "
          />
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className="
              shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
              bg-blue-600 text-white transition-all
              hover:bg-blue-500 active:scale-95
              disabled:opacity-30 disabled:hover:bg-blue-600 disabled:active:scale-100
            "
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>
        <p className="text-[11px] text-zinc-600 text-center mt-2">
          Smart Chatbot can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
