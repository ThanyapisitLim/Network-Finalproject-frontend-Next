import { useState, useRef, useEffect } from "react";
import { Message, Conversation } from "@/app/types/chat";
import {
  getMessages,
  chatWithAI,
  deleteConversationGroup,
} from "@/app/api/message";

const uid = () => Math.random().toString(36).slice(2, 10);

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isTyping]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const result = await getMessages();
        const dbMessages: Record<string, unknown>[] = result.data || [];

        if (dbMessages.length > 0) {
          const grouped: Record<string, Message[]> = {};

          dbMessages.forEach((m) => {
            const gId = m.group_id !== undefined && m.group_id !== null ? String(m.group_id) : "legacy_chat";
            if (!grouped[gId]) grouped[gId] = [];

            grouped[gId].push({
              id: m.message_id !== undefined && m.message_id !== null ? String(m.message_id) : uid(),
              role: m.role as "user" | "assistant",
              content: m.context as string,
              timestamp: new Date(m.created_at as string | number | Date),
            });
          });

          const loadedConversations: Conversation[] = Object.entries(
            grouped,
          ).map(([gId, msgs]) => {
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
          loadedConversations.sort(
            (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
          );

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
        setConversations((prev) =>
          prev.map((c) => (c.id === oldConvId ? { ...c, id: realGroupId } : c)),
        );
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
        content:
          "ขออภัย เกิดข้อผิดพลาดในการสื่อสารกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง",
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
    setConversations((prev) => prev.filter((c) => c.id !== groupId));

    try {
      await deleteConversationGroup(groupId);
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  return {
    conversations,
    activeConvId,
    activeConversation,
    isTyping,
    sidebarOpen,
    isLoadingHistory,
    messagesEndRef,
    setSidebarOpen,
    setActiveConvId,
    handleSend,
    handleNewChat,
    handleDeleteGroup,
  };
}
