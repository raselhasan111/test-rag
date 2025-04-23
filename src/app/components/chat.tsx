'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChat } from "ai/react"
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaPaperPlane, FaRegComment } from 'react-icons/fa'

export function Chat() {
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<{id: string, title: string, messages: any[]}[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
        api: 'api/ex4',
        onError: (e) => {
            console.log(e)
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

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
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

            {/* Main content */}
            <main className="flex flex-col flex-1 h-full overflow-hidden bg-background">
                {/* Topbar */}
                <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={toggleSidebar}
                            className="p-1 rounded-md hover:bg-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-primary">Banglalink AI Chat</h1>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Navigation Links with modern styling */}
                        <a 
                            href="/documents" 
                            className="px-3 py-2 text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-gray-300 transition-all duration-200"
                        >
                            Documents
                        </a>
                        <a 
                            href="/" 
                            className="px-3 py-2 text-primary font-medium border-b-2 border-primary transition-all duration-200"
                        >
                            Chat
                        </a>
                        
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button className="flex items-center space-x-1 p-1 rounded-full border border-gray-300">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Chat area - now 70% wide and centered */}
                <section className="flex-1 overflow-hidden flex flex-col items-center">
                    <div className="w-[70%] h-full flex flex-col">
                        <ul ref={chatParent} className="flex-1 p-4 bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4">
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <FaRegComment className="text-6xl mb-4" />
                                    <p className="text-lg">No messages yet. Start the conversation!</p>
                                </div>
                            ) : (
                                messages.map((m, index) => (
                                    <div key={index}>
                                        {m.role === 'user' ? (
                                            <li key={m.id} className="flex flex-row">
                                                <div className="rounded-xl p-4 bg-background shadow-md flex max-w-[75%]">
                                                    <p className="text-foreground">{m.content}</p>
                                                </div>
                                            </li>
                                        ) : (
                                            <li key={m.id} className="flex flex-row-reverse">
                                                <div className="rounded-xl p-4 bg-primary shadow-md flex max-w-[75%]">
                                                    <p className="text-primary-foreground">{m.content}</p>
                                                </div>
                                            </li>
                                        )}
                                    </div>
                                ))
                            )}
                        </ul>
                    </div>
                </section>

                {/* Input area - now 70% wide and centered */}
                <section className="p-4 bg-white border-t flex justify-center">
                    <form onSubmit={handleSubmit} className="flex w-[70%] items-center mx-auto">
                        <Input 
                            className="flex-1 min-h-[48px] rounded-full border-primary/30 focus-visible:ring-primary" 
                            placeholder="Type your message here..." 
                            type="text" 
                            value={input} 
                            onChange={handleInputChange} 
                        />
                        <Button 
                            className="ml-2 w-12 h-12 aspect-square flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105" 
                            type="submit"
                            aria-label="Send message"
                        >
                            <FaPaperPlane className="text-lg" />
                        </Button>
                    </form>
                </section>
            </main>
        </div>
    )
}
