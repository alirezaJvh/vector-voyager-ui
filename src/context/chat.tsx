'use client';

import { Message } from '@/components/chat/message';
import React, { createContext, useContext, useState } from 'react';

interface ChatContextProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

const Context = createContext<ChatContextProps | undefined>(undefined);

function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const contextProvider = {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
  };

  return <Context.Provider value={contextProvider}>{children}</Context.Provider>;
}

function useChatContext(): ChatContextProps {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useChatContext must be used within an ChatProvider');
  }
  return context;
}

export { ChatProvider, useChatContext };
