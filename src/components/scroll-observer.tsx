// src/components/scroll-observer.tsx
"use client";

import React, { useEffect, useRef, useCallback } from 'react';

interface ScrollObserverProps {
  children: React.ReactNode;
}

const ScrollObserver: React.FC<ScrollObserverProps> = ({ children }) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        entry.target.classList.remove('opacity-0'); // Ensure opacity is set to 1
        observer.current?.unobserve(entry.target); // Optional: Stop observing after animation
      }
    });
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    const targets = document.querySelectorAll('.scroll-target');
    targets.forEach(target => {
      // Initially hide elements to prepare for fade-in
      target.classList.add('opacity-0');
      observer.current?.observe(target);
    });

    return () => {
      targets.forEach(target => observer.current?.unobserve(target));
      observer.current?.disconnect();
    };
  }, [handleIntersection, children]); // Re-run if children change, though likely unnecessary if structure is static

  return <>{children}</>;
};

export default ScrollObserver;
