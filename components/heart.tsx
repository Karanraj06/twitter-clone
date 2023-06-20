'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useSession } from 'next-auth/react';

interface HeartProps {
  postId: string;
}

const Heart: FC<HeartProps> = ({ postId }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const initialRender = useRef<boolean>(true);

  const router = useRouter();
  const { data: session, status } = useSession();

  const checkboxId = useMemo(() => nanoid(), []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;

      (async () => {
        const { data } = await axios.get('/api/like', {
          params: { postId: postId, userId: session?.user.id },
        });

        if ('likes' in data) setLikes(data.likes as number);
        if ('liked' in data) setLiked(data.liked as boolean);

        setHydrated(true);
      })();
    } else {
      const onLike = setTimeout(() => {
        axios.post('/api/like', {
          userId: session?.user.id,
          postId: postId,
          liked: liked,
        });
      }, 2000);

      return () => clearTimeout(onLike);
    }
  }, [count]);

  if (!hydrated) {
    return (
      <div className='flex h-[36.5px] items-start justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-zinc-500' />
      </div>
    );
  }

  async function handleClick() {
    if (status !== 'authenticated') {
      router.push('/sign-in');
      return;
    }

    setLikes((prevLikes) => prevLikes + (liked ? -1 : 1));
    setLiked(!liked);
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <style jsx>{`
        svg {
          overflow: visible;
          width: 30px;
          height: 30px;

          .heart {
            transform-origin: center;
            animation: animate-heart-out 0.3s linear forwards;
          }

          .main-circle {
            transform-origin: 29.5px 29.5px;
          }
        }

        .checkbox {
          display: none;
        }

        .checkbox:checked + label svg {
          stroke-width: 0;

          .heart {
            transform: scale(0.2);
            fill: #ff1180;
            animation: animate-heart 0.3s linear forwards 0.25s;
          }

          .main-circle {
            transition: all 2s;
            animation: animate-circle 0.3s linear forwards;
            opacity: 1;
          }

          .grp1 {
            opacity: 1;
            transition: 0.1s all 0.3s;

            .oval1 {
              transform: scale(0) translate(0, -30px);
              transform-origin: 0 0 0;
              transition: 0.5s transform 0.3s;
            }

            .oval2 {
              transform: scale(0) translate(10px, -50px);
              transform-origin: 0 0 0;
              transition: 1.5s transform 0.3s;
            }
          }

          .grp2 {
            opacity: 1;
            transition: 0.1s all 0.3s;

            .oval1 {
              transform: scale(0) translate(30px, -15px);
              transform-origin: 0 0 0;
              transition: 0.5s transform 0.3s;
            }

            .oval2 {
              transform: scale(0) translate(60px, -15px);
              transform-origin: 0 0 0;
              transition: 1.5s transform 0.3s;
            }
          }

          .grp3 {
            opacity: 1;
            transition: 0.1s all 0.3s;

            .oval1 {
              transform: scale(0) translate(30px, 0px);
              transform-origin: 0 0 0;
              transition: 0.5s transform 0.3s;
            }

            .oval2 {
              transform: scale(0) translate(60px, 10px);
              transform-origin: 0 0 0;
              transition: 1.5s transform 0.3s;
            }
          }

          .grp4 {
            opacity: 1;
            transition: 0.1s all 0.3s;

            .oval1 {
              transform: scale(0) translate(30px, 15px);
              transform-origin: 0 0 0;
              transition: 0.5s transform 0.3s;
            }

            .oval2 {
              transform: scale(0) translate(40px, 50px);
              transform-origin: 0 0 0;
              transition: 1.5s transform 0.3s;
            }
          }

          .grp5 {
            opacity: 1;
            transition: 0.1s all 0.3s;

            .oval1 {
              transform: scale(0) translate(-10px, 20px);
              transform-origin: 0 0 0;
              transition: 0.5s transform 0.3s;
            }

            .oval2 {
              transform: scale(0) translate(-60px, 30px);
              transform-origin: 0 0 0;
              transition: 1.5s transform 0.3s;
            }
          }

          .grp6 {
            opacity: 1;
            transition: 0.1s all 0.3s;

            .oval1 {
              transform: scale(0) translate(-30px, 0px);
              transform-origin: 0 0 0;
              transition: 0.5s transform 0.3s;
            }

            .oval2 {
              transform: scale(0) translate(-60px, -5px);
              transform-origin: 0 0 0;
              transition: 1.5s transform 0.3s;
            }
          }

          .grp7 {
            opacity: 1;
            transition: 0.1s all 0.3s;

            .oval1 {
              transform: scale(0) translate(-30px, -15px);
              transform-origin: 0 0 0;
              transition: 0.5s transform 0.3s;
            }

            .oval2 {
              transform: scale(0) translate(-55px, -30px);
              transform-origin: 0 0 0;
              transition: 1.5s transform 0.3s;
            }
          }

          .grp2 {
            opacity: 1;
            transition: 0.1s opacity 0.3s;
          }

          .grp3 {
            opacity: 1;
            transition: 0.1s opacity 0.3s;
          }

          .grp4 {
            opacity: 1;
            transition: 0.1s opacity 0.3s;
          }

          .grp5 {
            opacity: 1;
            transition: 0.1s opacity 0.3s;
          }

          .grp6 {
            opacity: 1;
            transition: 0.1s opacity 0.3s;
          }

          .grp7 {
            opacity: 1;
            transition: 0.1s opacity 0.3s;
          }
        }

        label:hover > div {
          background-color: rgba(255, 17, 128, 0.1);
        }

        label:active > div {
          background-color: rgba(255, 17, 128, 0.2);
        }

        label:hover > svg {
          stroke: #ff1180;
        }

        label:hover > span {
          color: #ff1180;
        }

        @keyframes animate-circle {
          40% {
            transform: scale(10);
            opacity: 1;
            fill: #dd4688;
          }

          55% {
            transform: scale(11);
            opacity: 1;
            fill: #d46abf;
          }

          65% {
            transform: scale(12);
            opacity: 1;
            fill: #cc8ef5;
          }

          75% {
            transform: scale(13);
            opacity: 1;
            fill: transparent;
            stroke: #cc8ef5;
            stroke-width: 0.5;
          }

          85% {
            transform: scale(17);
            opacity: 1;
            fill: transparent;
            stroke: #cc8ef5;
            stroke-width: 0.2;
          }

          95% {
            transform: scale(18);
            opacity: 1;
            fill: transparent;
            stroke: #cc8ef5;
            stroke-width: 0.1;
          }

          100% {
            transform: scale(19);
            opacity: 1;
            fill: transparent;
            stroke: #cc8ef5;
            stroke-width: 0;
          }
        }

        @keyframes animate-heart {
          0% {
            transform: scale(0.2);
          }
          40% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes animate-heart-out {
          0% {
            transform: scale(1.4);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      <input
        type='checkbox'
        className='checkbox'
        id={checkboxId}
        checked={liked}
        onClick={handleClick}
      />
      <label
        htmlFor={checkboxId}
        className='relative inline-flex items-center justify-start gap-1'
      >
        <div className='absolute z-10 h-[30px] w-[30px] rounded-full transition'></div>
        <svg
          className='heart-svg transition'
          viewBox='467 392 58 57'
          xmlns='http://www.w3.org/2000/svg'
          stroke='#64748b'
          strokeWidth='1.5'
        >
          <g
            className='Group'
            fill='none'
            fillRule='evenodd'
            transform='translate(467 392)'
          >
            <path
              d='M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z'
              className='heart'
              fill={liked ? '#ff1180' : '#fff'}
            />
            <circle
              className='main-circle'
              fill='#E2264D'
              opacity={0}
              cx='29.5'
              cy='29.5'
              r='1.5'
            />
            <g className='grp7' opacity={0} transform='translate(7 6)'>
              <circle className='oval1' fill='#9CD8C3' cx={2} cy={6} r={2} />
              <circle className='oval2' fill='#8CE8C3' cx={5} cy={2} r={2} />
            </g>
            <g className='grp6' opacity={0} transform='translate(0 28)'>
              <circle className='oval1' fill='#CC8EF5' cx={2} cy={7} r={2} />
              <circle className='oval2' fill='#91D2FA' cx={3} cy={2} r={2} />
            </g>
            <g className='grp3' opacity={0} transform='translate(52 28)'>
              <circle className='oval2' fill='#9CD8C3' cx={2} cy={7} r={2} />
              <circle className='oval1' fill='#8CE8C3' cx={4} cy={2} r={2} />
            </g>
            <g className='grp2' opacity={0} transform='translate(44 6)'>
              <circle className='oval2' fill='#CC8EF5' cx={5} cy={6} r={2} />
              <circle className='oval1' fill='#CC8EF5' cx={2} cy={2} r={2} />
            </g>
            <g className='grp5' opacity={0} transform='translate(14 50)'>
              <circle className='oval1' fill='#91D2FA' cx={6} cy={5} r={2} />
              <circle className='oval2' fill='#91D2FA' cx={2} cy={2} r={2} />
            </g>
            <g className='grp4' opacity={0} transform='translate(35 50)'>
              <circle className='oval1' fill='#F48EA7' cx={6} cy={5} r={2} />
              <circle className='oval2' fill='#F48EA7' cx={2} cy={2} r={2} />
            </g>
            <g className='grp1' opacity={0} transform='translate(24)'>
              <circle className='oval1' fill='#9FC7FA' cx='2.5' cy={3} r={2} />
              <circle className='oval2' fill='#9FC7FA' cx='7.5' cy={2} r={2} />
            </g>
          </g>
        </svg>
        <span className='text-sm text-slate-500 transition'>{likes}</span>
      </label>
    </div>
  );
};

export default Heart;
