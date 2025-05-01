import type { Metadata } from 'next';
// Correctly import Geist fonts from the 'geist' package
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/layout/header'; // Import Header
import { Toaster } from '@/components/ui/toaster'; // Import Toaster


export const metadata: Metadata = {
  title: 'Personal Zenith', // Updated title
  description: 'A personal portfolio and resume site.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Apply font variables directly to the body */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground font-sans`}>
        <Header /> {/* Add Header */}
        <main className="pt-16"> {/* Add padding-top to avoid content overlap with fixed header */}
          {children}
        </main>
        <Toaster /> {/* Add Toaster for potential notifications */}
      </body>
    </html>
  );
}
