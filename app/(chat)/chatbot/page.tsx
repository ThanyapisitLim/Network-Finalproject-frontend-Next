"use client";

import { useState, useRef, useEffect } from "react";
import { Message, Conversation } from "../../types/chat";
import Sidebar from "../../components/Sidebar";
import MessageBubble from "../../components/MessageBubble";
import TypingIndicator from "../../components/TypingIndicator";
import WelcomeScreen from "../../components/WelcomeScreen";
import ChatInput from "../../components/ChatInput";
import { getUser } from "@/app/api/user";

// ─── Helpers ────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);

// ─── Main Page ──────────────────────────────────────────────────────
export default function ChatbotPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isTyping]);

  useEffect(() => {
    async function fetchUserData(){
      const user = await getUser()
      console.log(user)
    }
    fetchUserData()  
  }, []);

  const createConversation = (firstMessage: string): string => {
    const id = uid();
    const title =
      firstMessage.length > 40 ? firstMessage.slice(0, 40) + "…" : firstMessage;
    const newConv: Conversation = {
      id,
      title,
      messages: [],
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(id);
    return id;
  };

  const addMessage = (convId: string, message: Message) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, message], updatedAt: new Date() }
          : c,
      ),
    );
  };

  const handleSend = async (text: string) => {
    let convId = activeConvId;

    // Create new conversation if none active
    if (!convId) {
      convId = createConversation(text);
    }

    // Add user message
    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    addMessage(convId, userMsg);

    // TODO: Replace with your API call
    // Example:
    // setIsTyping(true);
    // const response = await fetch("/api/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message: text, conversationId: convId }),
    // });
    // const data = await response.json();
    // const assistantMsg: Message = {
    //   id: uid(),
    //   role: "assistant",
    //   content: data.reply,
    //   timestamp: new Date(),
    // };
    // addMessage(convId, assistantMsg);
    // setIsTyping(false);
  };

  const handleNewChat = () => {
    setActiveConvId(null);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeConvId}
        onSelect={(id) => setActiveConvId(id)}
        onNew={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
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
            onClick={handleNewChat}
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

        {/* Messages area or Welcome screen */}
        {!activeConversation || activeConversation.messages.length === 0 ? (
          <WelcomeScreen onSelect={handleSend} />
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin">
            <div className="max-w-3xl mx-auto space-y-6">
              {activeConversation.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
