'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * LazySection - Viewport-based lazy loading component
 * Only renders children when section enters viewport
 * 
 * @param {React.ReactNode} children - Content to lazy load
 * @param {React.ReactNode} fallback - Placeholder while not visible
 * @param {string} rootMargin - Margin before triggering load (default: 200px)
 */
export default function LazySection({ 
  children, 
  fallback = null,
  rootMargin = '200px' 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first intersection to save resources
          observer.disconnect();
        }
      },
      { 
        rootMargin,
        threshold: 0.01 // Trigger when even 1% is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className="min-h-[200px]">
      {isVisible ? children : (fallback || <div className="h-full w-full" />)}
    </div>
  );
}
