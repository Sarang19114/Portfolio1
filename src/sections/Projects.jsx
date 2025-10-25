'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState } from 'react';
import Image from 'next/image';

const Projects = ({ projects = [] }) => {
  const projectCount = projects.length;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

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
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  const currentProject = projects[selectedProjectIndex];

  return (
    <section className="c-space my-20" id="work">
      <p className="sm:text-4xl text-3xl font-semibold relative z-10">
        <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          My Projects
        </span>
      </p>

      {/* Main project card */}
      <div className="relative border border-black-300 bg-black-200/90 backdrop-blur-md rounded-lg shadow-lg shadow-black/50 mt-12">
        {/* Top bar */}
        <div className="border-b border-black-300 px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-white/80 font-mono">
            PROJECT [{String(selectedProjectIndex + 1).padStart(2, '0')}/{String(projectCount).padStart(2, '0')}]
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => handleNavigation('previous')}
              className="px-4 py-1 border border-black-300 hover:border-white/40 hover:bg-white/5 transition-all duration-200 flex items-center gap-2">
              <span className="text-white/60">&lt;</span>
              <span className="text-xs text-white/60 font-mono">PREV</span>
            </button>
            <button
              onClick={() => handleNavigation('next')}
              className="px-4 py-1 border border-black-300 hover:border-white/40 hover:bg-white/5 transition-all duration-200 flex items-center gap-2">
              <span className="text-xs text-white/60 font-mono">NEXT</span>
              <span className="text-white/60">&gt;</span>
            </button>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1">
          {/* Left side - Project details */}
          <div className="p-8 flex flex-col border-r border-black-300">
            {/* Project header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 border border-black-300 bg-black-200" style={currentProject.logoStyle}>
                  <Image src={currentProject.logo} alt="logo" width={32} height={32} className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-white/40 font-mono block mb-1">
                    PROJECT_ID: {String(selectedProjectIndex + 1).padStart(4, '0')}
                  </span>
                  <h3 className="text-xl text-white font-semibold animatedText leading-tight">
                    {currentProject.title}
                  </h3>
                </div>
              </div>
              <div className="h-px bg-white/20 mb-4"></div>
            </div>

            {/* Description section */}
            <div className="mb-6 flex-grow">
              <span className="text-xs text-white/60 font-mono mb-3 block">DESCRIPTION:</span>
              <p className="text-white/80 text-sm leading-relaxed mb-4 animatedText">
                {currentProject.desc}
              </p>
              <p className="text-white/60 text-sm leading-relaxed animatedText">
                {currentProject.subdesc}
              </p>
            </div>

            {/* Tech stack */}
            <div className="mb-6">
              <span className="text-xs text-white/60 font-mono mb-3 block">TECH_STACK:</span>
              <div className="flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="px-3 py-1 border border-black-300 bg-black-200 hover:bg-black-300 transition-colors duration-200 flex items-center gap-2">
                    <Image src={tag.path} alt={tag.name} width={16} height={16} className="w-4 h-4" />
                    <span className="text-xs text-white/80 font-mono">{tag.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black-300">
              <a
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 border border-black-300 hover:border-white/40 hover:bg-black-300 transition-all duration-200 text-center">
                <span className="text-sm text-white/80 font-mono">VIEW LIVE</span>
              </a>
              <a
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 border border-black-300 hover:border-white/40 hover:bg-black-300 transition-all duration-200 text-center">
                <span className="text-sm text-white/80 font-mono">VIEW CODE</span>
              </a>
            </div>
          </div>

          {/* Right side - Preview area */}
          <div className="relative bg-black-200 min-h-[500px] flex items-center justify-center p-8">
            {/* Preview placeholder with terminal aesthetic */}
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center mb-8">
                <div className="text-6xl text-white/10 font-mono mb-4">[ ]</div>
                <p className="text-white/40 font-mono text-sm">PROJECT PREVIEW</p>
              </div>
              
              {/* Spotlight image as preview */}
              {currentProject.spotlight && (
                <div className="relative w-full max-w-md aspect-video">
                  <Image 
                    src={currentProject.spotlight} 
                    alt="project preview" 
                    width={800}
                    height={450}
                    className="w-full h-full object-cover opacity-30 border border-black-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="border-t border-black-300 px-6 py-2 flex items-center justify-between bg-black-200">
          <span className="text-xs text-white/40 font-mono">
            STATUS: DEPLOYED | UPTIME: 99.9%
          </span>
          <span className="text-xs text-white/40 font-mono">
            LAST_UPDATED: {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* Project counter dots */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedProjectIndex(index)}
            className={`w-2 h-2 transition-all duration-300 ${
              index === selectedProjectIndex
                ? 'bg-white/80 w-8'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
