
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, User, Code, Briefcase, Mail, GraduationCap } from 'lucide-react'; // Added GraduationCap and Briefcase
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Import cn for conditional classes

export function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true); // Track hero section visibility

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);

      // Check if hero section is (mostly) out of view
      const heroElement = document.getElementById('home');
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        // Consider hero not visible if its bottom edge is above the viewport top
        setIsHeroVisible(heroBottom > 50); // Adjust threshold as needed
      } else {
        setIsHeroVisible(scrollPosition < window.innerHeight * 0.5); // Fallback if element not found
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial checks
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine text color based on scroll position and hero visibility
  // Use white text when hero is visible and not scrolled far (over gradient)
  // Use default theme text (foreground) when scrolled or hero not visible
  const getTextColorClass = () => {
    if (!scrolled && isHeroVisible && !isMobile) {
       // Use white text on gradient hero background when not scrolled far
      return 'text-white hover:text-white/80 hover:bg-transparent';
    }
    return 'text-foreground hover:text-accent hover:bg-accent/10'; // Default theme text/hover
  };

  const getLogoTextColorClass = () => {
     if (!scrolled && isHeroVisible) {
        // Use white text on gradient hero background when not scrolled far
        return 'text-white hover:text-white/80';
     }
     return 'text-primary hover:text-accent'; // Default theme text/hover
  }

   const getMobileIconColorClass = () => {
     if (!scrolled && isHeroVisible) {
        // Use white text on gradient hero background when not scrolled far
        return 'text-white hover:text-white/80 hover:bg-transparent';
     }
     return 'text-foreground hover:text-accent hover:bg-accent/10'; // Default theme text/hover
   }

  // Updated navigation links for Experience and Education
  const navLinks = [
    { href: '#home', label: 'Home', icon: <Home className="mr-2 h-4 w-4" /> },
    { href: '#about', label: 'About', icon: <User className="mr-2 h-4 w-4" /> },
    { href: '#projects', label: 'Projects', icon: <Code className="mr-2 h-4 w-4" /> },
    { href: '#experience', label: 'Experience', icon: <Briefcase className="mr-2 h-4 w-4" /> }, // Changed from Resume
    { href: '#education', label: 'Education', icon: <GraduationCap className="mr-2 h-4 w-4" /> }, // Added Education
    { href: '#contact', label: 'Contact', icon: <Mail className="mr-2 h-4 w-4" /> },
  ];

  const NavContent = () => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4 p-4' : 'space-x-4'}`}>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          // Apply text color based on scroll state
          className={cn(
            'justify-start transition-colors',
            isMobile ? 'w-full text-left' : '',
            !isMobile ? getTextColorClass() : 'text-foreground hover:text-accent hover:bg-accent/10' // Mobile always uses default theme text
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
        // Apply background only when scrolled or mobile sheet is open
        (scrolled || (isMobile && isOpen)) ? 'bg-background/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Apply text color based on scroll state */}
        <Link href="#home" className={cn(
            "text-xl font-bold transition-colors",
            getLogoTextColorClass()
          )}>
          My Portfolio
        </Link>

        {isMobile === undefined ? ( // Render placeholder or nothing during initial check
          <div className="h-8 w-36 bg-muted rounded animate-pulse"></div> // Adjusted placeholder size
        ) : isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(
                  'transition-colors',
                  getMobileIconColorClass()
              )}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="pt-8">
                 <Link href="#home" className="text-lg font-bold text-primary mb-6 block px-4" onClick={() => setIsOpen(false)}>
                    My Portfolio
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

