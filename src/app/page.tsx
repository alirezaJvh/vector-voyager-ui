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
  // const data = await fetch("http://localhost:3000/api/upload", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     name: "test",
  //     content: "test",
  //   }),
  // });
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
