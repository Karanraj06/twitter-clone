'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';

interface LikeButtonProps {
  postId: string;
  toggleLike: (postId: string, liked: boolean) => Promise<void>;
}

const LikeButton: FC<LikeButtonProps> = ({ postId, toggleLike }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  return (
    <button type='button'>
      <Icons.heart
        className={liked ? 'fill-pink-500' : 'fill-none'}
        onClick={async () => {
          await toggleLike(postId, liked);
          setLiked(!liked);
          router.refresh();
        }}
      />
    </button>
  );
};

export default LikeButton;
