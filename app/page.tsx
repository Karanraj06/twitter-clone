import { Metadata } from 'next';

import { prisma } from '@/lib/db';
import { PostForm } from '@/components/post';
import PostFeed from '@/components/post-feed';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  return (
    <>
      <PostForm />
      <PostFeed initialPosts={posts} userId='' />
    </>
  );
}
