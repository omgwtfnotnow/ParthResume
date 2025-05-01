"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code, Briefcase } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

export function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#portfolio', label: 'Portfolio', icon: <Code className="mr-2 h-4 w-4" /> },
    { href: '#resume', label: 'Resume', icon: <Briefcase className="mr-2 h-4 w-4" /> },
    // { href: '#contact', label: 'Contact', icon: <Mail className="mr-2 h-4 w-4" /> }, // Optional
  ];

  const NavContent = () => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4 p-4' : 'space-x-4'}`}>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className={`justify-start ${isMobile ? 'w-full text-left' : ''} hover:bg-accent/10 hover:text-accent-foreground`}
          onClick={() => isMobile && setIsOpen(false)}
        >
          <Link href={link.href} className="flex items-center">
            {isMobile && link.icon}
            {link.label}
          </Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-xl font-bold text-primary hover:text-accent transition-colors">
          Personal Zenith
        </Link>

        {isMobile === undefined ? ( // Render placeholder or nothing during initial check
          <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
        ) : isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="pt-8">
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <NavContent />
        )}
      </div>
    </header>
  );
}
