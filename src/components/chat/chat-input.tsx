import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';
import { Message } from './message';
import { useChatContext } from '@/context/chat';

function ChatInput() {
  const { setMessages, setIsLoading } = useChatContext();

  const [input, setInput] = useState('');
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

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

  return (
    <div className="p-4">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <div className="bg-background relative rounded-xl border shadow-sm">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="max-h-[200px] min-h-[60px] resize-none rounded-xl p-3 pr-10 text-base focus-visible:ring-offset-0"
              rows={1}
            />
          </div>
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
            className="absolute right-3 bottom-3 h-8 w-8"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ChatInput };
