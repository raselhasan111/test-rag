import { useChat } from "ai/react";
import { useRef, useEffect, useState } from 'react';

interface ChatHistory {
  id: string;
  title: string;
  messages: any[];
}

export function useCustomChat() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: 'api/ex1',
    onError: (e) => {
      console.log(e);
    },
    id: activeChat || undefined
  });

  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  }, [messages]);

  // Create a new chat
  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: `New Chat ${chatHistory.length + 1}`,
      messages: []
    };
    
    setChatHistory([newChat, ...chatHistory]);
    setActiveChat(newChatId);
    setMessages([]);
  };

  // Generate a title from the first user message
  const getTitleFromMessages = (msgs: any[]) => {
    const firstUserMessage = msgs.find(m => m.role === 'user');
    if (firstUserMessage) {
      // Get the first 20 characters of the message or the full message if shorter
      return firstUserMessage.content.length > 20 
        ? `${firstUserMessage.content.substring(0, 20)}...` 
        : firstUserMessage.content;
    }
    return `New Chat ${chatHistory.length + 1}`;
  };

  // When messages change, update the chat history
  useEffect(() => {
    if (activeChat && messages.length > 0) {
      setChatHistory(prevHistory => 
        prevHistory.map(chat => 
          chat.id === activeChat 
            ? { ...chat, messages: messages, title: getTitleFromMessages(messages) }
            : chat
        )
      );
    }
  }, [messages, activeChat]);

  // When component mounts, create a new chat if none exists
  useEffect(() => {
    if (chatHistory.length === 0) {
      handleNewChat();
    }
  }, []);

  // Load a chat from history
  const loadChat = (chatId: string) => {
    setActiveChat(chatId);
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return {
    activeChat,
    chatHistory,
    messages,
    input,
    isSidebarOpen,
    chatParent,
    handleInputChange,
    handleSubmit,
    handleNewChat,
    loadChat,
    toggleSidebar
  };
}

export type CustomChatHook = ReturnType<typeof useCustomChat>;