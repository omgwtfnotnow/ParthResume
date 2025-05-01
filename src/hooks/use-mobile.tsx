// src/hooks/use-mobile.tsx
"use client"; // Ensure this runs only on the client

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize state to undefined to represent the server/initial state
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // This effect runs only on the client after hydration
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initial check
    checkDevice();

    // Listener for window resize
    const handleResize = () => checkDevice();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs only once on mount

  return isMobile; // Return undefined initially, then boolean value
}
