import { Metadata } from 'next';

import { prisma } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons';
import PostFeed from '@/components/post-feed';
import UserAvatar from '@/components/user-avatar';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      username: params.userId,
    },
  });

  return {
    title: user?.username,
    description: user?.bio,
  };
}

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.userId,
    },
  });

  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId: user?.id,
    },
    take: 10,
  });

  return (
    <div className='space-y-6'>
      <div>
        <div className='grid place-items-center text-lg font-medium'>
          <UserAvatar
            user={{
              name: user?.name || null,
              image: user?.image || null,
            }}
            className='h-20 w-20'
          />
          <div className='flex items-center'>
            <div>{user?.name}</div>
            <div>{user?.verified && <Icons.verified />}</div>
          </div>
          <p className='text-sm text-muted-foreground'>@{user?.username}</p>
          <p className='mt-2 text-sm'>{user?.bio}</p>
        </div>
      </div>
      <Separator />
      <PostFeed initialPosts={posts} userId={user?.id} />
    </div>
  );
}
