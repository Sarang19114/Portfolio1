import { useEffect, useRef } from 'react';
import { useInView } from './useInView';

/**
 * Hook to manage GSAP timeline lifecycle based on viewport visibility
 * Creates animations when visible, kills them when hidden to reduce CPU usage
 * 
 * Usage:
 * const { containerRef, isActive } = useGSAPTimeline((gsap) => {
 *   const tl = gsap.timeline();
 *   tl.to('.element', { opacity: 1 });
 *   return tl; // Return timeline for cleanup
 * });
 * 
 * @param {Function} createTimeline - Function that creates and returns GSAP timeline
 * @param {Array} deps - Dependency array for recreation
 * @param {Object} options - Configuration options
 * @returns {Object} { containerRef, isActive, isInView }
 */
export function useGSAPTimeline(createTimeline, deps = [], options = {}) {
  const {
    rootMargin = '100px',
    threshold = 0.1
  } = options;

  const { ref: containerRef, isInView } = useInView({
    rootMargin,
    threshold,
    triggerOnce: false
  });

  const timelineRef = useRef(null);
  const isInitializedRef = useRef(false);
  
  // Store createTimeline in ref to avoid re-running effect when it changes
  const createTimelineRef = useRef(createTimeline);
  
  useEffect(() => {
    createTimelineRef.current = createTimeline;
  }, [createTimeline]);

  // Store deps as a string to avoid spread element warning
  const depsString = JSON.stringify(deps);

  useEffect(() => {
    // Only create timeline when in view
    if (isInView && !timelineRef.current) {
      // Defer heavy animation setup to avoid blocking scroll
      const timeoutId = setTimeout(() => {
        if (typeof window !== 'undefined' && window.gsap) {
          try {
            const timeline = createTimelineRef.current(window.gsap);
            timelineRef.current = timeline;
            isInitializedRef.current = true;
          } catch (error) {
            console.error('Error creating GSAP timeline:', error);
          }
        }
      }, 50); // Small delay to let scroll settle

      return () => clearTimeout(timeoutId);
    }
    
    // Pause timeline when out of view
    if (!isInView && timelineRef.current) {
      timelineRef.current.pause();
    }
    
    // Resume timeline when back in view
    if (isInView && timelineRef.current && isInitializedRef.current) {
      timelineRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, depsString]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  return {
    containerRef,
    isActive: isInView,
    isInView,
    timeline: timelineRef.current
  };
}

/**
 * Hook to defer heavy operations to idle periods
 * Prevents blocking main thread during scroll/interaction
 * 
 * @param {Function} callback - Heavy operation to defer
 * @param {Array} deps - Dependencies
 */
export function useIdleCallback(callback, deps = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let idleCallbackId;
    let timeoutId;

    // Use requestIdleCallback if available, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(
        () => {
          callback();
        },
        { timeout: 2000 } // Maximum wait time
      );
    } else {
      // Fallback for browsers without requestIdleCallback
      timeoutId = setTimeout(() => {
        callback();
      }, 100);
    }

    return () => {
      if (idleCallbackId) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, deps);
}
