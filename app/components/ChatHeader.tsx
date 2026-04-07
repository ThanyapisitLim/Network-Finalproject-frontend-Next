import { Conversation } from "@/app/types/chat";

interface ChatHeaderProps {
  activeConversation: Conversation | undefined;
  onOpenSidebar: () => void;
  onNewChat: () => void;
}

export default function ChatHeader({
  activeConversation,
  onOpenSidebar,
  onNewChat,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl shrink-0">
      <button
        onClick={onOpenSidebar}
        className="md:hidden p-2 -ml-2 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        <svg
          className="w-5 h-5 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-zinc-200 truncate">
          {activeConversation ? activeConversation.title : "New Chat"}
        </h1>
      </div>

      <button
        onClick={onNewChat}
        className="
          hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
          text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors
        "
      >
        <svg
          className="w-3.5 h-3.5"
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
    </header>
  );
}
