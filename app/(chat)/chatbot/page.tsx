"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Message, Conversation } from "../../types/chat";
import Sidebar from "../../components/Sidebar";
import MessageBubble from "../../components/MessageBubble";
import TypingIndicator from "../../components/TypingIndicator";
import WelcomeScreen from "../../components/WelcomeScreen";
import ChatInput from "../../components/ChatInput";
import { getUser } from "@/app/api/user";
import { getMessages, deleteMessages, chatWithAI, deleteConversationGroup } from "@/app/api/message";

// ─── Helpers ────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);

// ─── Main Page ──────────────────────────────────────────────────────
export default function ChatbotPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isTyping]);

  // Load chat history from DB on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const result = await getMessages();
        const dbMessages: any[] = result.data || [];

        if (dbMessages.length > 0) {
          // Group DB messages by group ID
          const grouped: Record<string, Message[]> = {};

          dbMessages.forEach((m: any) => {
            // Group ID is stored in the 'group_id' column. 
            // In case there is legacy data without group, fallback to a single group
            const gId = m.group_id?.toString() || "legacy_chat";
            if (!grouped[gId]) grouped[gId] = [];

            grouped[gId].push({
              id: m.message_id?.toString() || uid(),
              role: m.role as "user" | "assistant",
              content: m.context,
              timestamp: new Date(m.created_at),
            });
          });

          const loadedConversations: Conversation[] = Object.entries(grouped).map(([gId, msgs]) => {
            const firstUserMsg = msgs.find((m) => m.role === "user");
            const title = firstUserMsg
              ? firstUserMsg.content.length > 40
                ? firstUserMsg.content.slice(0, 40) + "…"
                : firstUserMsg.content
              : "Chat History";

            return {
              id: gId,
              title,
              messages: msgs,
              updatedAt: msgs[msgs.length - 1]?.timestamp || new Date(),
            };
          });

          // Sort descending based on last message timestamp
          loadedConversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

          setConversations(loadedConversations);
          
          // Set the most recent conversation as active
          setActiveConvId(loadedConversations[0].id);
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    }
    loadHistory();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUser();
      console.log(user);
    }
    fetchUserData();
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
    const isNewChat = !activeConvId;
    let convId = activeConvId || "temp_" + uid();

    // Create a temporary conversation immediately so user feels fast feedback
    if (isNewChat) {
      const title = text.length > 40 ? text.slice(0, 40) + "…" : text;
      setConversations((prev) => [
        { id: convId, title, messages: [], updatedAt: new Date() },
        ...prev,
      ]);
      setActiveConvId(convId);
    }

    // Add user message to UI
    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    addMessage(convId, userMsg);

    // Call backend endpoint to handle the full chat flow
    setIsTyping(true);
    try {
      // Pass convId only if it's not a temp one
      const result = await chatWithAI(text, isNewChat ? undefined : convId);

      if (!result || result.groupId === undefined) {
        throw new Error("Invalid response from AI server: missing groupId");
      }

      const realGroupId = result.groupId.toString();

      // If it was a new chat, swap the temp ID with the real DB ID
      if (isNewChat) {
        const oldConvId = convId;
        setConversations(prev => prev.map(c => 
           c.id === oldConvId ? { ...c, id: realGroupId } : c
        ));
        setActiveConvId(realGroupId);
        convId = realGroupId;
      }

      const assistantMsg: Message = {
        id: result.assistantMessage?.message_id?.toString() || uid(),
        role: "assistant",
        content: result.answer,
        timestamp: new Date(),
      };
      
      addMessage(convId, assistantMsg);

    } catch (error) {
      console.error("Chat error:", error);

      const errorMsg: Message = {
        id: uid(),
        role: "assistant",
        content: "ขออภัย เกิดข้อผิดพลาดในการสื่อสารกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง",
        timestamp: new Date(),
      };
      addMessage(convId, errorMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    // Just deselect the active conversation to clear the UI, don't delete from DB
    setActiveConvId(null);
    setSidebarOpen(false);
  };

  const handleDeleteGroup = async (groupId: string) => {
    // Optimistically remove from UI
    if (activeConvId === groupId) {
      setActiveConvId(null);
    }
    setConversations(prev => prev.filter(c => c.id !== groupId));

    try {
      await deleteConversationGroup(groupId);
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeConvId}
        onSelect={(id) => setActiveConvId(id)}
        onDelete={handleDeleteGroup}
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

        {/* Loading state */}
        {isLoadingHistory ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-sm text-zinc-500">Loading chat history...</p>
            </div>
          </div>
        ) : !activeConversation || activeConversation.messages.length === 0 ? (
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
        <ChatInput onSend={handleSend} disabled={isTyping || isLoadingHistory} />
      </div>
    </div>
  );
}
