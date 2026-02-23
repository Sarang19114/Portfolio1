'use client';

import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const [lineRevealed, setLineRevealed] = useState(false);
  const [subtitleRevealed, setSubtitleRevealed] = useState(false);

  useEffect(() => {
    // Staggered reveal animation
    const lineTimer = setTimeout(() => setLineRevealed(true), 200);
    const textTimer = setTimeout(() => setTextRevealed(true), 400);
    const subtitleTimer = setTimeout(() => setSubtitleRevealed(true), 900);

    // Start exit animation
    const exitTimer = setTimeout(() => setIsExiting(true), 2200);

    // Remove from DOM
    const removeTimer = setTimeout(() => setIsVisible(false), 3200);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(textTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-1000 ${isExiting ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
        }`}
    >
      {/* Subtle background gradient pulse */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]" />
      </div>

      {/* Top decorative line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-700 ease-out"
        style={{
          width: lineRevealed ? '120px' : '0px',
          background: 'linear-gradient(90deg, transparent, rgba(98,224,255,0.6), transparent)',
        }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-3">
        {/* Initials — monogram accent */}
        <div
          className={`text-[10px] tracking-[0.5em] uppercase font-light transition-all duration-700 ease-out ${lineRevealed
              ? 'opacity-40 translate-y-0'
              : 'opacity-0 translate-y-2'
            }`}
          style={{ color: '#62e0ff' }}
        >
          Portfolio
        </div>

        {/* Name */}
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.06em] text-white transition-all duration-800 ease-out ${textRevealed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }`}
          style={{ fontFamily: "'General Sans', 'Inter', sans-serif" }}
        >
          <span className="font-light">Sarang</span>
          <span className="font-semibold ml-3 sm:ml-4 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
            Rastogi
          </span>
        </h1>

        {/* Divider line */}
        <div
          className="h-[1px] mt-2 transition-all duration-700 ease-out delay-200"
          style={{
            width: textRevealed ? '60px' : '0px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />

        {/* Subtitle */}
        <p
          className={`text-[11px] sm:text-xs tracking-[0.35em] uppercase transition-all duration-700 ease-out ${subtitleRevealed
              ? 'opacity-40 translate-y-0'
              : 'opacity-0 translate-y-2'
            }`}
          style={{ color: '#a0a0b0' }}
        >
          Full-Stack Developer
        </p>
      </div>

      {/* Loading indicator — minimal bar */}
      <div className="absolute bottom-12 sm:bottom-16 flex flex-col items-center gap-3">
        <div className="w-24 h-[1px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #62e0ff, #52aeff, #6d45ce)',
              animation: 'loadProgress 2s ease-in-out forwards',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loadProgress {
          0% {
            width: 0%;
          }
          60% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
