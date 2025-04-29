'use client';

import { useRef, useEffect, useMemo } from 'react';
import { MessageComponent } from '@/components/chat/message';
import { MessageLoading } from '@/components/chat/message/loading';
import { ChatInput } from './chat-input/input';
import { useChatContext } from '@/context/chat';

export default function ChatInterface() {
  const { messages, isLoading } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const emptyState = useMemo(() => {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Vector Voyager</h1>
          <p className="text-muted-foreground mt-2">
            Start a conversation or upload a document to begin.
          </p>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="flex w-full flex-1 flex-col">
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-3xl">
          {!messages.length && emptyState}
          {!!messages.length && (
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageComponent key={message.id} message={message} />
              ))}
              {isLoading && <MessageLoading />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>
      <ChatInput />
    </div>
  );
}
