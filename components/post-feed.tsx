import { FC } from 'react';
import { Post, User } from '@prisma/client';
import { formatDistanceToNowStrict } from 'date-fns';

import { prisma } from '@/lib/db';
import LikeButton from '@/components/like-button';
import UserAvatar from '@/components/user-avatar';

interface PostsProps {
  posts: (Post & {
    user: User;
  })[];
}

const PostFeed: FC<PostsProps> = ({ posts }) => {
  return posts.map((post, index) => (
    <div
      key={post.id}
      className={`my-10 ${index != posts.length - 1 ? 'border-b' : ''} pb-2`}
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
  ));
};

export default PostFeed;
