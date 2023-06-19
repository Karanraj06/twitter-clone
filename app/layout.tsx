import { cn } from '@/lib/utils';
import Navbar from '@/components/nav';
import Provider from '@/components/provider';

import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Twitter',
    template: '%s | Twitter',
  },
  description: 'A Twitter clone built with Next.js',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='en' className='light bg-white text-slate-900 antialiased'>
      <body className={cn('min-h-screen pt-12 antialiased', inter.className)}>
        <Provider>
          <Navbar />
          {modal}
          <div className='container mx-auto h-full max-w-7xl pt-12'>
            {children}
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
