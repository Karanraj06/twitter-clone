'use client';

import * as React from 'react';
import { FC } from 'react';
import { signIn } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthForm: FC<AuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn('google');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className='mr-2 h-4 w-4' />}
        Google
      </Button>
    </div>
  );
};

export default AuthForm;
