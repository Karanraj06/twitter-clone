'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const postFormSchema = z.object({
  body: z.string().min(2).max(400),
});

type PostFormValues = z.infer<typeof postFormSchema>;

const defaultValues: Partial<PostFormValues> = {
  body: '',
};

export function PostForm() {
  const { status } = useSession();
  const router = useRouter();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: PostFormValues) {
    try {
      await axios.post('/api/post', data);

      toast({
        title: 'Post created',
        description: 'Thanks for posting!',
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'Unknown error occurred',
      });
    }
  }

  if (status !== 'authenticated') return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder='What is happening?!'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant='twitter'>
          Tweet
        </Button>
      </form>
    </Form>
  );
}
