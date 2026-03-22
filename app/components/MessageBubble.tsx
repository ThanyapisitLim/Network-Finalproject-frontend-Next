"use client";

import { Message } from "../types/chat";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 max-w-3xl ${
        isUser ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
          ${
            isUser
              ? "bg-zinc-700 text-zinc-300"
              : "bg-gradient-to-br from-blue-500 to-violet-600 text-white"
          }
        `}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Content */}
      <div
        className={`
          py-3 px-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap max-w-[80%]
          ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-md"
              : "bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 rounded-tl-md"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}
