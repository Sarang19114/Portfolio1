'use client';

import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 1.5 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1500);

    // Completely remove after 2 seconds (giving time for fade out)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h1 
        className="text-5xl md:text-7xl lg:text-9xl font-black text-white animate-blink"
        style={{ fontFamily: "'Orbitron', 'Rajdhani', 'Arial Black', sans-serif" }}
      >
        Sarang Rastogi
      </h1>
      
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        .animate-blink {
          animation: blink 1.2s ease-in-out infinite;
          letter-spacing: 0.05em;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
