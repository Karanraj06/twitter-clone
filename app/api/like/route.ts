import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  try {
    const likes = await prisma.like.count({
      where: {
        postId: postId as string,
      },
    });

    let responseData = { likes: likes, isLiked: false };

    if (session) {
      const like = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: postId as string,
          },
        },
      });

      responseData.isLiked = !!like;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { userId, postId, isLiked } = z
      .object({
        userId: z.string(),
        postId: z.string(),
        isLiked: z.boolean(),
      })
      .parse(body);

    if (!isLiked) {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
    } else {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    }

    return new NextResponse('Ok', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
