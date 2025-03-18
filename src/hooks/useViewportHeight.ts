import { useLayoutEffect, useState, useRef } from "react";

export default function useViewportHeight(): number | void {
  // Get initial height from visualViewport or fallback to innerHeight
  const [height, setHeight] = useState<number>(
    () => window.visualViewport?.height || window.innerHeight
  );
  
  const timeoutRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    // Debounced resize handler
    const handleResize = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      // Set a new timeout
      timeoutRef.current = window.setTimeout(() => {
        const newHeight = window.visualViewport?.height || window.innerHeight;
        setHeight(newHeight);
      }, 16); // Roughly one frame at 60fps
    };

    // Add event listener
    window.visualViewport?.addEventListener("resize", handleResize);
    // Also listen to window resize as a fallback
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return height;
}
