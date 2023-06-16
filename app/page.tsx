import { prisma } from '@/lib/db';
import { PostForm } from '@/components/post';
import PostFeed from '@/components/post-feed';

export default async function Page() {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <PostForm />
      <PostFeed posts={posts} />
    </>
  );
}
