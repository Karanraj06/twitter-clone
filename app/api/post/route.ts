import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {}

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
