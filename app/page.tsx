import { prisma } from '@/lib/db';
import { PostForm } from '@/components/post';
import PostFeed from '@/components/post-feed';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Page() {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
  });

  return (
    <>
      <PostForm />
      <PostFeed initialPosts={posts} userId='' />
    </>
  );
}
