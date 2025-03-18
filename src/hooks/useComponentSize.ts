import ResizeObserver from "resize-observer-polyfill";
import { useState, useEffect, useRef } from "react";

export default function useComponentSize(
  ref
): { width: number; height: number } {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  
  // Properly type the timeout reference
  const timeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    // Initial size measurement
    setSize({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight
    });
    
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = window.setTimeout(() => {
        entries.forEach(({ target }) => {
          if (
            size.width !== (target as HTMLElement).clientWidth ||
            size.height !== (target as HTMLElement).clientHeight
          ) {
            setSize({ 
              width: (target as HTMLElement).clientWidth, 
              height: (target as HTMLElement).clientHeight 
            });
          }
        });
      }, 20); // 20ms debounce
    };
    
    const sizeObserver = new ResizeObserver(handleResize);
    sizeObserver.observe(ref.current);
    
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      sizeObserver.disconnect();
    };
  }, [ref]);
  
  return size;
}
