import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();

    const { username, bio, verified } = z
      .object({
        username: z
          .string()
          .min(2, {
            message: 'Username must be at least 2 characters.',
          })
          .max(30, {
            message: 'Username must not be longer than 30 characters.',
          }),
        bio: z.string().max(160).min(4),
        verified: z.boolean(),
      })
      .parse(body);

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (user && user.id !== session.user.id) {
      return new NextResponse('Username is taken', { status: 409 });
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: username,
        bio: bio,
        verified: verified,
      },
    });

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    error;

    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }

    return new NextResponse(
      'Could not update username at this time. Please try later',
      { status: 500 }
    );
  }
}
