import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from 'react-icons/fa';
import { CustomChatHook } from '@/hooks/useCustomChat';

interface ChatInputProps {
  chatHook: CustomChatHook;
}

export function ChatInput({ chatHook }: ChatInputProps) {
  const { input, handleInputChange, handleSubmit } = chatHook;

  return (
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
  );
}