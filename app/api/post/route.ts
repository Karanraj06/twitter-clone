import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  try {
    const { limit, page, userId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        userId: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
        userId: url.searchParams.get('userId'),
      });

    let whereClause: Prisma.PostWhereInput = {};

    if (userId) {
      whereClause = {
        userId,
      };
    }

    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: whereClause,
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  const { body } = await request.json();

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const postBody = z.string().parse(body);
    const post = await prisma.post.create({
      data: {
        userId: session.user.id,
        body: postBody,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
