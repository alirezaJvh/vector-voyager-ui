'use client';

import { useState } from 'react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';
import { uploadFile } from '@/lib/uploadFile';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

const formSchema = z.object({
  reviewColumn: z.string().min(1, { message: 'Review column is required' }),
  productIdColumn: z.string().min(1, { message: 'Product ID column is required' }),
});

function FileUploader() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reviewColumn: '',
      productIdColumn: '',
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (selectedFile) {
        setIsUploading(true);
        await uploadFile({
          file: selectedFile,
          reviewColumn: values.reviewColumn,
          productId: values.productIdColumn,
        });
        toast.success('File uploaded successfully');
      } else {
        toast.error('Please select a file');
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
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
      <div className="mt-4 space-y-4"></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="reviewColumn"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Review Column</FormLabel>
                  <FormControl>
                    <Input placeholder="review column" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="productIdColumn"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Product ID Column</FormLabel>
                  <FormControl>
                    <Input placeholder="product id column" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div className="">
            <Input type="file" onChange={handleFileUpload} />
          </div>
          <Button
            disabled={isUploading}
            type="submit"
            className="w-full cursor-pointer justify-start gap-2"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload
          </Button>
        </form>
      </Form>
    </>
  );
}

export { FileUploader };
