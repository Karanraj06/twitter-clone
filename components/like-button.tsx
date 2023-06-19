'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { Icons } from '@/components/icons';

interface LikeButtonProps {
  postId: string;
}

const LikeButton: FC<LikeButtonProps> = ({ postId }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/like', {
        params: { postId: postId, userId: session?.user.id },
      });
      const data = response.data;
      if ('likes' in data) setLikes(data.likes as number);
      if ('isLiked' in data) setIsLiked(data.isLiked as boolean);
    })();
  });

  async function handleOnLike() {
    if (status !== 'authenticated') {
      router.push('/sign-in');
      return;
    }

    await axios.post('/api/like', {
      userId: session.user.id,
      postId: postId,
      isLiked: isLiked,
    });

    setLikes(likes + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  }

  return (
    <button
      type='button'
      onClick={handleOnLike}
      className='flex items-center justify-start gap-2'
    >
      <Icons.heart
        className={isLiked ? 'fill-[#f91880] stroke-[#f91880]' : 'fill-none'}
      />
      <span className={isLiked ? 'text-[#f91880]' : 'text-slate-500'}>
        {likes}
      </span>
    </button>
  );
};

export default LikeButton;
