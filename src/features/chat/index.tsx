'use client'

import React from 'react';
import { useCustomChat } from '@/hooks/useCustomChat';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { Header } from '@/components/layout/Header';

export function Chat() {
  const chatHook = useCustomChat();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <ChatSidebar chatHook={chatHook} />

      {/* Main content */}
      <main className="flex flex-col flex-1 h-full overflow-hidden bg-background">
        {/* Topbar */}
        <Header 
          title="Banglalink AI Chat" 
          currentPage="chat" 
          toggleSidebar={chatHook.toggleSidebar} 
        />

        {/* Chat Messages */}
        <ChatMessages chatHook={chatHook} />

        {/* Chat Input */}
        <ChatInput chatHook={chatHook} />
      </main>
    </div>
  );
}