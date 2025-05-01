import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/layout/header'; // Import the Header
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Personal Zenith - Parth Vasave',
  description: 'Portfolio showcasing projects and experience of Parth Vasave',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased', // Ensure font-sans is applied
        )}
      >
        <Header /> {/* Add the Header component */}
        <main className="pt-16"> {/* Add padding-top to prevent content from being hidden behind the fixed header */}
            {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
