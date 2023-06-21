import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex items-start justify-center'>
      <Loader2 className='h-6 w-6 animate-spin text-zinc-500' />
    </div>
  );
}
