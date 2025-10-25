import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook to track if an element is in the viewport
 * Returns visibility state for conditional rendering and performance optimization
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {string} options.rootMargin - Margin around root (default: '200px' for preloading)
 * @param {number} options.threshold - Percentage of visibility required (default: 0.01)
 * @param {boolean} options.triggerOnce - Only trigger once (default: false for pause/resume)
 * @param {boolean} options.unmountWhenHidden - Completely unmount when not visible (default: false)
 * @param {Function} options.callback - Optional callback when visibility changes
 * @returns {Object} { ref, isInView, hasBeenInView }
 */
export function useInView(options = {}) {
  const {
    rootMargin = '200px',
    threshold = 0.01,
    triggerOnce = false,
    unmountWhenHidden = false,
    callback
  } = options;

  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  // Memoize callback to prevent unnecessary re-renders
  const stableCallback = useCallback(callback || (() => {}), [callback]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already been in view, keep it visible
    if (triggerOnce && hasBeenInView) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        setIsInView(inView);
        
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }

        // Call callback if provided
        if (callback) {
          stableCallback(inView);
        }

        // If triggerOnce, disconnect after first view
        if (triggerOnce && inView) {
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, triggerOnce, hasBeenInView, stableCallback, callback]);

  return {
    ref,
    isInView,
    hasBeenInView,
    // For complete unmounting when not visible
    shouldRender: unmountWhenHidden ? isInView || !hasBeenInView : true
  };
}
