'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
  const session = useSession();

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
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'Unknown error occurred',
      });
    }
  }

  if (session.status !== 'authenticated') return null;

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
                  placeholder='What are you thinking?'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tweet your thoughts to the world
              </FormDescription>
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
