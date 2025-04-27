'use client';

import { useState, useRef } from 'react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PaperclipIcon } from 'lucide-react';

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <SidebarMenu>
        {selectedFile && (
          <SidebarMenuItem>
            <SidebarMenuButton>{selectedFile.name}</SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
      <div className="mt-4">
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        <Button onClick={triggerFileInput} className="w-full justify-start gap-2" variant="outline">
          <PaperclipIcon className="h-4 w-4" />
          Upload File
        </Button>
      </div>
    </>
  );
}

export { FileUploader };
