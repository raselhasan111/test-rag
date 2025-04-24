import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { CustomChatHook } from '@/hooks/useCustomChat';

interface ChatMessagesProps {
  chatHook: CustomChatHook;
}

export function ChatMessages({ chatHook }: ChatMessagesProps) {
  const { messages, chatParent } = chatHook;

  return (
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
  );
}