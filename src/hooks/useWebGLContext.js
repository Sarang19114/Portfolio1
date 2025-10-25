import { useEffect, useRef, useState } from 'react';

/**
 * Shared WebGL Renderer Manager
 * Reduces GPU context overhead by reusing renderer instances
 * Only allows one heavy context at a time
 */

class RendererPool {
  constructor() {
    this.activeContexts = new Set();
    this.maxActiveContexts = 2; // Maximum simultaneous WebGL contexts
    this.pendingContexts = [];
  }

  /**
   * Request a WebGL context slot
   * @param {string} componentId - Unique identifier for the component
   * @returns {boolean} - Whether the context can be activated
   */
  requestContext(componentId) {
    if (this.activeContexts.size < this.maxActiveContexts) {
      this.activeContexts.add(componentId);
      return true;
    }
    
    // Queue if limit reached
    if (!this.pendingContexts.includes(componentId)) {
      this.pendingContexts.push(componentId);
    }
    return false;
  }

  /**
   * Release a WebGL context slot
   * @param {string} componentId - Unique identifier for the component
   */
  releaseContext(componentId) {
    this.activeContexts.delete(componentId);
    
    // Activate next pending context
    if (this.pendingContexts.length > 0) {
      const nextId = this.pendingContexts.shift();
      this.activeContexts.add(nextId);
      
      // Notify via custom event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('webgl-context-available', { detail: { componentId: nextId } })
        );
      }
    }
  }

  /**
   * Get active context count for debugging
   */
  getActiveCount() {
    return this.activeContexts.size;
  }

  /**
   * Check if a specific context is active
   */
  isActive(componentId) {
    return this.activeContexts.has(componentId);
  }
}

// Singleton instance
const rendererPool = typeof window !== 'undefined' ? new RendererPool() : null;

/**
 * Hook to manage WebGL context lifecycle
 * Ensures only N contexts are active simultaneously to reduce GPU pressure
 * 
 * @param {string} componentId - Unique identifier for this component
 * @param {boolean} isVisible - Whether component is in viewport
 * @returns {Object} { canRender, activeContextCount }
 */
export function useWebGLContext(componentId, isVisible) {
  const [canRender, setCanRender] = useState(false);
  const canRenderRef = useRef(false);

  useEffect(() => {
    if (!rendererPool || !isVisible) {
      if (canRenderRef.current) {
        rendererPool?.releaseContext(componentId);
        canRenderRef.current = false;
        setCanRender(false);
      }
      return;
    }

    // Request context when visible
    const granted = rendererPool.requestContext(componentId);
    canRenderRef.current = granted;
    setCanRender(granted);

    // Listen for context becoming available
    const handleContextAvailable = (event) => {
      if (event.detail.componentId === componentId) {
        canRenderRef.current = true;
        setCanRender(true);
      }
    };

    window.addEventListener('webgl-context-available', handleContextAvailable);

    return () => {
      rendererPool.releaseContext(componentId);
      window.removeEventListener('webgl-context-available', handleContextAvailable);
    };
  }, [componentId, isVisible]);

  return {
    canRender: canRender && isVisible,
    activeContextCount: rendererPool?.getActiveCount() || 0,
    isWaiting: isVisible && !canRender
  };
}

// Export for debugging
export const getRendererPoolStats = () => {
  if (!rendererPool) return null;
  return {
    active: rendererPool.getActiveCount(),
    max: rendererPool.maxActiveContexts
  };
};
