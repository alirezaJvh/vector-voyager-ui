import { BotIcon } from 'lucide-react';

function MessageLoading() {
  return (
    <div className="flex items-start justify-start gap-3">
      <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full select-none">
        <BotIcon className="h-5 w-5" />
      </div>
      <div className="bg-muted max-w-[80%] rounded-lg rounded-tl-none p-4">
        <div className="flex space-x-2">
          <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"></div>
          <div
            className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export { MessageLoading };
