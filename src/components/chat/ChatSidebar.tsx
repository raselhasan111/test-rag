import React from 'react';
import { Button } from "@/components/ui/button";
import { CustomChatHook } from '@/hooks/useCustomChat';

interface ChatSidebarProps {
  chatHook: CustomChatHook;
}

export function ChatSidebar({ chatHook }: ChatSidebarProps) {
  const { 
    isSidebarOpen,
    handleNewChat,
    chatHistory,
    loadChat,
    activeChat
  } = chatHook;

  return (
    <aside className={`bg-[#f8f8f8] border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} flex flex-col`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-primary">Chat History</h2>
      </div>
      <div className="p-4">
        <Button 
          onClick={handleNewChat} 
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          New Chat
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto mt-2">
        <ul className="space-y-1">
          {chatHistory.map(chat => (
            <li 
              key={chat.id} 
              onClick={() => loadChat(chat.id)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                activeChat === chat.id ? 'bg-gray-200 border-l-4 border-primary' : ''
              }`}
            >
              <span className="text-sm truncate block">{chat.title}</span>
            </li>
          ))}
        </ul>
      </nav>
      {/* Powered by branding */}
      <div className="p-4 border-t border-gray-200 mt-auto text-center">
        <p className="text-xs text-gray-500">Powered by <span className="font-semibold text-primary">Banglalink AI</span></p>
      </div>
    </aside>
  );
}