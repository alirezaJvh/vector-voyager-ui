import { Suspense } from 'react';
import ChatInterface from '@/components/chat/chat-interface';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { FileUploader } from '@/components/file-uploader';

export default async function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <SidebarProvider>
          <Sidebar className="border-r">
            <SidebarContent className="px-2">
              <SidebarGroup>
                <SidebarGroupLabel>Uploaded Files</SidebarGroupLabel>
                <FileUploader />
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <ChatInterface />
        </SidebarProvider>
      </Suspense>
    </div>
  );
}
