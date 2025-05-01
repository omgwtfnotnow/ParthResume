import type { Metadata } from 'next';
import { Geist_Sans as GeistSans, Geist_Mono } from 'next/font/google'; // Corrected import name
import './globals.css';
import { Header } from '@/components/layout/header'; // Import Header
import { Toaster } from '@/components/ui/toaster'; // Import Toaster

const geistSans = GeistSans({ // Corrected variable name
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Header /> {/* Add Header */}
        <main className="pt-16"> {/* Add padding-top to avoid content overlap with fixed header */}
          {children}
        </main>
        <Toaster /> {/* Add Toaster for potential notifications */}
      </body>
    </html>
  );
}
