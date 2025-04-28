import { cn } from '@/lib/utils';
import { BotIcon, UserIcon } from 'lucide-react';
import { TypingEffect } from './typing-effect';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

interface MessageProps {
  message: Message;
}

function MessageComponent({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full select-none">
          <BotIcon className="h-5 w-5" />
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] rounded-lg p-4',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'bg-muted rounded-tl-none',
        )}
      >
        {isUser ? message.content : <TypingEffect text={message.content} />}
      </div>

      {isUser && (
        <div className="bg-muted-foreground text-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full select-none">
          <UserIcon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}

export { MessageComponent };
export type { Message };
