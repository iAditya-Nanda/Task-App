import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Toaster } from 'sonner';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
});

export const metadata: Metadata = {
  title: 'TaskFlow | Pro Task Management',
  description: 'A premium, high-performance task management system built with Next.js, TanStack Query, and Node.js.',
  keywords: 'task management, productivity, next.js, react, node.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body className={`${ubuntu.className} antialiased selection:bg-purple-100 selection:text-purple-900`}>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'rounded-2xl border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] font-sans',
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
