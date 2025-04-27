'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaperclipIcon, SendIcon } from 'lucide-react';
import { MessageComponent, Message } from '@/components/chat/message';
import { MessageLoading } from '@/components/chat/message/loading';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '' && !selectedFile) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSelectedFile(null);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'This is a simulated response. In a real application, this would be the response from your AI model.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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

      <div className="border-t p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={triggerFileInput} className="shrink-0">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="pr-10"
              />
              {selectedFile && (
                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                  <PaperclipIcon className="h-3 w-3" />
                  <span className="truncate">{selectedFile.name}</span>
                </div>
              )}
            </div>
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={input.trim() === '' && !selectedFile}
              className="shrink-0"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
