
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Code, Briefcase, Mail, GraduationCap } from 'lucide-react'; // Removed Home icon
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Import cn for conditional classes

export function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated navigation links: Removed the explicit "Home" link
  const navLinks = [
    // { href: '#home', label: 'Home', icon: <Home className="mr-2 h-4 w-4" /> }, // Removed Home link
    { href: '#about', label: 'About', icon: <User className="mr-2 h-4 w-4" /> },
    { href: '#projects', label: 'Projects', icon: <Code className="mr-2 h-4 w-4" /> },
    { href: '#experience', label: 'Experience', icon: <Briefcase className="mr-2 h-4 w-4" /> },
    { href: '#education', label: 'Education', icon: <GraduationCap className="mr-2 h-4 w-4" /> },
    { href: '#contact', label: 'Contact', icon: <Mail className="mr-2 h-4 w-4" /> },
  ];

  const NavContent = () => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4 p-4' : 'space-x-4'}`}>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className={cn(
            'justify-start transition-colors text-foreground hover:text-accent hover:bg-accent/10',
            isMobile ? 'w-full text-left' : ''
          )}
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
    <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        (scrolled || (isMobile && isOpen)) ? 'bg-background/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Changed logo text to "Home" */}
        <Link href="#home" className={cn(
            "text-xl font-bold transition-colors text-primary hover:text-accent"
          )}>
          Home
        </Link>

        {isMobile === undefined ? (
          <div className="h-8 w-36 bg-muted rounded animate-pulse"></div>
        ) : isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(
                  'transition-colors text-foreground hover:text-accent hover:bg-accent/10'
              )}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="pt-8">
                 {/* Changed logo text in mobile sheet header as well */}
                 <Link href="#home" className="text-lg font-bold text-primary mb-6 block px-4" onClick={() => setIsOpen(false)}>
                    Home
                </Link>
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

