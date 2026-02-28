'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

// Unique accent color per project index
const projectAccents = [
  '#5157A3', // Storer — indigo
  '#BF74F1', // AI Form Builder — purple
  '#888888', // JBS Lounge — neutral silver
  '#6BA4FF', // Sleep Tracker — sky blue
  '#CCCCCC', // iPhone 15 Clone — warm white
];

const Projects = ({ projects = [] }) => {
  const projectCount = projects.length;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [fullscreen, setFullscreen] = useState(false);

  const openFullscreen = () => {
    setFullscreen(true);
    document.documentElement.classList.add('fullscreen-active');

    // Request native browser fullscreen for a "really" full screen experience
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => { });
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }

    // Try to auto-rotate to landscape on mobile
    try {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => { });
      }
    } catch (e) { }
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    document.documentElement.classList.remove('fullscreen-active');

    // Exit native browser fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => { });
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }

    // Unlock orientation
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (e) { }
    document.body.style.overflow = '';
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeFullscreen(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      '.project-animate',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
    );
  }, [selectedProjectIndex]);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const currentProject = projects[selectedProjectIndex];
  const accent = projectAccents[selectedProjectIndex % projectAccents.length];

  return (
    <section className="c-space my-20" id="work">
      <p className="sm:text-4xl text-3xl font-semibold relative z-10">
        <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          My Projects
        </span>
      </p>

      {/* Main project showcase */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative mt-12 rounded-2xl overflow-hidden group"
      >
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[1px] rounded-2xl transition-opacity duration-700 z-0"
          style={{
            opacity: 0.25,
            background: `linear-gradient(135deg, ${accent}50, transparent, ${accent}30)`,
            backgroundSize: '200% 200%',
            animation: 'projectBorderShift 6s ease infinite',
          }}
        />

        {/* Card body — matching site bg */}
        <div
          className="relative z-10 rounded-2xl border border-black-300 bg-black-200/95 backdrop-blur-xl overflow-hidden transition-colors duration-500"
        >
          {/* Mouse-following spotlight — tinted per project */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, ${accent}12, transparent 40%)`,
            }}
          />

          <div className="grid lg:grid-cols-2 grid-cols-1">
            {/* ═══════ Left — Details ═══════ */}
            <div className="relative z-10 p-8 lg:p-10 flex flex-col">
              {/* Project number chip */}
              <div className="project-animate flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: `${accent}15`,
                      color: accent,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    {String(selectedProjectIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
                  </span>
                </div>

                {/* Mobile-only quick navigation */}
                <div className="flex md:hidden items-center gap-2">
                  <button
                    onClick={() => handleNavigation('previous')}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black-300 border border-white/10 text-white/70 active:scale-90 transition-all"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleNavigation('next')}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black-300 border border-white/10 text-white/70 active:scale-90 transition-all"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Logo + Title */}
              <div className="project-animate flex items-start gap-4 mb-5">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    ...currentProject.logoStyle,
                    boxShadow: `0 0 30px ${accent}30`,
                  }}
                >
                  <Image
                    src={currentProject.logo}
                    alt="logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-2xl text-white font-semibold leading-tight mt-1">
                  {currentProject.title}
                </h3>
              </div>

              {/* Description */}
              <p className="project-animate text-white/65 text-[14px] leading-relaxed mb-3">
                {currentProject.desc}
              </p>
              <p className="project-animate text-white/45 text-[13px] leading-relaxed mb-6">
                {currentProject.subdesc}
              </p>

              {/* Tech tags */}
              <div className="project-animate flex flex-wrap gap-2 mb-8">
                {currentProject.tags.map((tag, i) => (
                  <span
                    key={`${tag.name}-${i}`}
                    className="flex items-center gap-1.5 text-[11px] pl-2 pr-3 py-1.5 rounded-full font-medium tracking-wide transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    <Image
                      src={tag.path}
                      alt={tag.name}
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 object-contain"
                    />
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Spacer */}
              <div className="flex-grow" />

              {/* Actions */}
              <div className="project-animate flex flex-wrap items-center gap-3 pt-5 border-t border-black-300">
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: `linear-gradient(135deg, ${accent}cc, ${accent}90)`,
                    color: '#fff',
                    boxShadow: `0 4px 20px ${accent}30`,
                  }}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l5.47-5.47H12.25a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View Live
                </a>
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white/70 border border-white/10 hover:border-white/25 hover:text-white/90 transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Source Code
                </a>
              </div>
            </div>

            {/* ═══════ Right — Preview ═══════ */}
            <div className="relative min-h-[420px] lg:min-h-[500px] flex items-stretch overflow-hidden bg-black-200 border-l border-black-300">
              {/* Ambient gradient tinted per-project */}
              <div
                className="absolute inset-0 opacity-20 transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at 50% 40%, ${accent}30, transparent 70%)`,
                }}
              />

              {/* Browser mockup — fills the panel */}
              <div className="project-animate relative w-full h-full flex flex-col overflow-hidden">
                {/* Browser top bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-black-300/80 border-b border-black-300 flex-shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-black-200 text-[10px] text-white/30 font-mono truncate border border-black-300">
                    {currentProject.href}
                  </div>
                </div>
                {/* Preview area — fixed, fills rest of panel */}
                <div className="relative flex-1 bg-black-100 overflow-hidden">
                  {currentProject.video ? (
                    <video
                      key={currentProject.video}
                      src={currentProject.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : currentProject.spotlight ? (
                    <Image
                      src={currentProject.spotlight}
                      alt="preview"
                      width={800}
                      height={500}
                      className="absolute inset-0 w-full h-full object-contain opacity-80"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-sm">
                      Preview
                    </div>
                  )}

                  {/* Fullscreen button — all devices */}
                  <button
                    onClick={openFullscreen}
                    className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 text-white/80 text-[11px] font-medium active:scale-95 transition-all hover:bg-black/80 hover:border-white/40"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M3 3h5v1.5H4.5V8H3V3zm9 0h5v5h-1.5V4.5H12V3zM3 12h1.5v3.5H8V17H3v-5zm13.5 3.5H13V17h5v-5h-1.5v3.5z" />
                    </svg>
                    Full Screen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ Fullscreen Modal (using Portal to cover ALL sections) ═══════ */}
      {fullscreen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-0"
          onClick={closeFullscreen}
        >
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 hover:bg-white/20 transition-all shadow-2xl"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Content */}
          <div className="w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {currentProject.video ? (
              <video
                src={currentProject.video}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-contain"
              />
            ) : currentProject.spotlight ? (
              <Image
                src={currentProject.spotlight}
                alt="preview"
                width={1600}
                height={900}
                className="w-full h-full object-contain"
              />
            ) : null}
          </div>
        </div>,
        document.body
      )}

      {/* ═══════ Bottom navigation ═══════ */}
      <div className="flex items-center justify-center gap-6 mt-10">
        {/* Prev button */}
        <button
          onClick={() => handleNavigation('previous')}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 hover:border-white/30"
          style={{
            background: '#0c0c14',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.7)',
          }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white/80">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-3">
          {projects.map((_, index) => {
            const dotAccent = projectAccents[index % projectAccents.length];
            const isActive = index === selectedProjectIndex;
            return (
              <button
                key={index}
                onClick={() => setSelectedProjectIndex(index)}
                className="relative rounded-full transition-all duration-500 ease-out"
                style={{
                  width: isActive ? '2.5rem' : '0.65rem',
                  height: '0.65rem',
                  background: isActive
                    ? `linear-gradient(90deg, ${dotAccent}, ${dotAccent}99)`
                    : 'rgba(255,255,255,0.35)',
                  boxShadow: isActive ? `0 0 14px ${dotAccent}80` : '0 0 4px rgba(255,255,255,0.2)',
                }}
              />
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => handleNavigation('next')}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 hover:border-white/30"
          style={{
            background: '#0c0c14',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.7)',
          }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white/80">
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes projectBorderShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
