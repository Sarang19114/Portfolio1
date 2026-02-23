"use client";

import React, { useEffect, useRef } from 'react';

const skillsData = [
  {
    id: "SERVER_CORE",
    status: "ACTIVE",
    title: "Backend & API Development",
    completion: 92,
    description: "Designing robust RESTful APIs and distributed backend systems with Node.js, managing data across both NoSQL and SQL databases.",
    techStack: ["Node.js", "Express.js", "MongoDB", "SQL", "Firebase"],
  },
  {
    id: "CORE_SYSTEM",
    status: "ACTIVE",
    title: "Frontend Development",
    completion: 90,
    description: "Building dynamic, responsive, and modern user interfaces with React and Tailwind CSS for a seamless user experience.",
    techStack: ["React", "JavaScript", "Tailwind CSS", "Vite", "Next.JS"],
  },

  {
    id: "CLOUD_OPS",
    status: "ACTIVE",
    title: "DevTools & Deployment",
    completion: 80,
    description: "Utilizing containerization with Docker and deploying applications to modern cloud platforms like Vercel and Render for scalable delivery.",
    techStack: ["Docker", "GitHub", "Vercel", "Render", "CI/CD"],
  },
  {
    id: "DATA_ANALYSIS",
    status: "ACTIVE",
    title: "Data Science",
    completion: 75,
    description: "Proficient in Python for data analysis and scientific computing, recognized with Silver Elite Status in NPTEL&apos;s &apos;Python for Data Science&apos;.",
    techStack: ["Python", "Java"],
  },
];

const SkillCard = ({ skill, index }) => {

  return (
    <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer select-none">
      <div className="relative w-full h-full bg-black-200/90 backdrop-blur-md border border-black-300 hover:border-white/40 transition-all duration-300 shadow-lg shadow-black/50">
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
          <svg className="w-full h-full" width="100%" height="100%">
            <defs>
              <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`}></rect>
          </svg>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className="absolute top-1 left-1 w-6 h-1 bg-white/60"></div>
          <div className="absolute top-1 left-1 w-1 h-6 bg-white/60"></div>
        </div>
        <div className="absolute top-0 right-0 w-8 h-8">
          <div className="absolute top-1 right-1 w-6 h-1 bg-white/60"></div>
          <div className="absolute top-1 right-1 w-1 h-6 bg-white/60"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div className="absolute bottom-1 left-1 w-6 h-1 bg-white/60"></div>
          <div className="absolute bottom-1 left-1 w-1 h-6 bg-white/60"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div className="absolute bottom-1 right-1 w-6 h-1 bg-white/60"></div>
          <div className="absolute bottom-1 right-1 w-1 h-6 bg-white/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/60 font-mono tracking-wider">{skill.id}</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${skill.status === "ACTIVE" ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span className="text-xs text-white/60 font-mono">{skill.status}</span>
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">{skill.title}</h3>

          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-6 flex-grow">{skill.description}</p>
          <div className="space-y-3">
            <span className="text-xs text-white/60 font-mono tracking-wider block">TECH_STACK:</span>
            <div className="flex flex-wrap gap-2">
              {skill.techStack.map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-black-200 border border-black-300 text-white/80 font-mono hover:bg-black-300 transition-colors duration-200">{tech}</span>
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Scanline effect */}
        <div className="scanline absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-8 opacity-0 group-hover:opacity-100"></div>
      </div>
    </div>
  );
};

export default function TechnicalExpertise() {
  const marqueeRef = useRef(null);

  // Double the skills array for seamless infinite scroll
  const allSkills = [...skillsData, ...skillsData];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed (pixels per frame)

    const animate = () => {
      scrollPosition += scrollSpeed;

      // Reset position for infinite loop
      // Each card is 320px (w-80) + 24px gap = 344px
      const cardWidth = 344;
      const resetPoint = skillsData.length * cardWidth;

      if (scrollPosition >= resetPoint) {
        scrollPosition = 0;
      }

      marquee.style.transform = `translateX(-${scrollPosition}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section className="c-space my-20" id="expertise">
      <p className="sm:text-4xl text-3xl font-semibold relative z-10">
        <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          Technical Expertise
        </span>
      </p>

      <div className="w-full relative mt-12">
        <div className="w-full py-8">
          <div className="overflow-hidden py-4">
            <div ref={marqueeRef} className="flex gap-6 will-change-transform">
              {allSkills.map((skill, index) => (
                <SkillCard key={`${skill.id}-${index}`} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Gradient fade on edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }
        .scanline {
          animation: scanline 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
