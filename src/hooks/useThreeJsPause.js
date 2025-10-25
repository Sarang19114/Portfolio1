import { useEffect, useRef } from 'react';
import { useInView } from './useInView';

/**
 * Hook to pause/resume Three.js render loops based on viewport visibility
 * Drastically reduces GPU usage for off-screen WebGL contexts
 * 
 * Usage:
 * const { canvasRef, isActive } = useThreeJsPause();
 * // In useFrame: if (!isActive) return;
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} options.unmountWhenHidden - Completely unmount canvas when not visible (default: true)
 * @param {string} options.rootMargin - Viewport margin for triggering (default: '100px')
 * @returns {Object} { canvasRef, isActive, isInView }
 */
export function useThreeJsPause(options = {}) {
  const {
    unmountWhenHidden = true,
    rootMargin = '100px'
  } = options;

  const { ref: canvasRef, isInView, hasBeenInView, shouldRender } = useInView({
    rootMargin,
    threshold: 0.01,
    triggerOnce: false,
    unmountWhenHidden
  });

  const frameRequestRef = useRef(null);

  // Clean up any pending animation frames when visibility changes
  useEffect(() => {
    if (!isInView && frameRequestRef.current) {
      cancelAnimationFrame(frameRequestRef.current);
      frameRequestRef.current = null;
    }
  }, [isInView]);

  return {
    canvasRef,
    isActive: isInView, // Use this to conditionally render in useFrame
    isInView,
    hasBeenInView,
    shouldRender, // Use this to conditionally render the entire canvas
    frameRequestRef
  };
}
