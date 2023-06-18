'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import { Post, User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { Loader2 } from 'lucide-react';

import LikeButton from '@/components/like-button';
import UserAvatar from '@/components/user-avatar';

interface PostsProps {
  initialPosts: (Post & {
    user: User;
  })[];
}

const PostFeed: FC<PostsProps> = ({ initialPosts }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const lastPostRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection<HTMLDivElement>({
    root: lastPostRef.current,
    threshold: 1,
  });
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    (Post & { user: User })[]
  >(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/api/post?limit=6&page=${pageParam}`);
      return data as (Post & { user: User })[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (!hydrated) {
    return null;
  }

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <>
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`my-10 ${
            index !== posts.length - 1 ? 'border-b' : ''
          } pb-2`}
          ref={index === posts.length - 1 ? ref : undefined}
        >
          <div className='flex flex-col items-start gap-4'>
            <div className='flex items-center justify-start gap-2'>
              <UserAvatar
                user={{
                  name: post.user.name || null,
                  image: post.user.image || null,
                }}
                className='h-8 w-8'
              />
              <div>{post.user.name}</div>
              <div className='ml-4 text-sm text-slate-500'>
                {formatDistanceToNowStrict(new Date(post.createdAt))}
              </div>
            </div>
            <p className='whitespace-pre-wrap'>{post.body}</p>
            <LikeButton postId={post.id} />
          </div>
        </div>
      ))}
      {isFetchingNextPage && (
        <div className='flex justify-center'>
          <Loader2 className='h-6 w-6 animate-spin text-zinc-500' />
        </div>
      )}
    </>
  );
};

export default PostFeed;
