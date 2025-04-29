import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';
import { Message } from '../message';
import { useChatContext } from '@/context/chat';
import { sendMessage } from '@/lib/sendMessage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import './style.css';

function ChatInput() {
  const { setMessages, setIsLoading } = useChatContext();

  const [input, setInput] = useState('');
  const [kTop, setKTop] = useState<number>(10);

  const createMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    return {
      content,
      role,
    };
  }, []);

  const handleSendMessage = useCallback(async () => {
    const userMessage: Message = createMessage('user', input);

    try {
      setIsLoading(true);
      setInput('');
      setMessages((prev) => [...prev, userMessage]);
      const response = await sendMessage(input, kTop);
      const assistantMessage: Message = createMessage('assistant', response.response);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [input, kTop, createMessage, setMessages, setIsLoading]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <div className="p-4">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <div className="bg-background relative rounded-xl border shadow-sm">
            {input && (
              <div className="slide-in-from-bottom flex translate-y-0 transform items-center px-3 pt-3 pb-2 opacity-100 transition-all duration-300">
                <Select value={kTop.toString()} onValueChange={(value) => setKTop(Number(value))}>
                  <SelectTrigger className="h-5 w-[120px]">
                    <SelectValue placeholder="Top-k" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Top 10</SelectItem>
                    <SelectItem value="20">Top 20</SelectItem>
                    <SelectItem value="30">Top 30</SelectItem>
                    <SelectItem value="40">Top 40</SelectItem>
                    <SelectItem value="50">Top 50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground ml-2 text-xs">Top-k relevant documents</span>
              </div>
            )}
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
