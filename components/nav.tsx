import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import UserNav from '@/components/user-nav';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className='fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-zinc-100 py-2'>
      <div className='container mx-auto flex h-full max-w-7xl items-center justify-between gap-2'>
        <Link href='/' className='flex items-center gap-2'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className='hidden text-sm font-medium text-zinc-700 md:block'>
            Twitter
          </p>
        </Link>
        {session?.user ? (
          <UserNav user={session.user} />
        ) : (
          <Link
            href='/sign-in'
            className={buttonVariants({ variant: 'twitter' })}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
