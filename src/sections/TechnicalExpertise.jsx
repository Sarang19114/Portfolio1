"use client";

import React, { useRef, useState, useCallback } from 'react';

const skillsData = [
  {
    id: "SERVER_CORE",
    status: "ACTIVE",
    title: "Backend & API Development",
    completion: 92,
    description: "Designing robust RESTful APIs and distributed backend systems with Node.js, managing data across both NoSQL and SQL databases.",
    techStack: ["Node.js", "Express.js", "MongoDB", "SQL", "Firebase"],
    accent: { from: "#06b6d4", to: "#3b82f6", glow: "rgba(59,130,246,0.35)" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "CORE_SYSTEM",
    status: "ACTIVE",
    title: "Frontend Development",
    completion: 90,
    description: "Building dynamic, responsive, and modern user interfaces with React and Tailwind CSS for a seamless user experience.",
    techStack: ["React", "JavaScript", "Tailwind CSS", "Vite", "Next.JS"],
    accent: { from: "#a855f7", to: "#ec4899", glow: "rgba(168,85,247,0.35)" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "CLOUD_OPS",
    status: "ACTIVE",
    title: "DevTools & Deployment",
    completion: 80,
    description: "Utilizing containerization with Docker and deploying applications to modern cloud platforms like Vercel and Render for scalable delivery.",
    techStack: ["Docker", "GitHub", "Vercel", "Render", "CI/CD"],
    accent: { from: "#f97316", to: "#eab308", glow: "rgba(249,115,22,0.35)" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "DATA_ANALYSIS",
    status: "ACTIVE",
    title: "Data Science",
    completion: 75,
    description: "Proficient in Python for data analysis and scientific computing, recognized with Silver Elite Status in NPTEL's 'Python for Data Science'.",
    techStack: ["Python", "Java"],
    accent: { from: "#10b981", to: "#06b6d4", glow: "rgba(16,185,129,0.35)" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-8 4 5 5-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ---------- Skill Card ---------- */
const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 50, y: 50 }); }}
      className="flex-shrink-0 w-80 h-80 expertise-card relative group rounded-2xl cursor-pointer select-none"
    >
      {/* ---- Animated gradient border ---- */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `linear-gradient(135deg, ${skill.accent.from}, ${skill.accent.to}, ${skill.accent.from})`,
          backgroundSize: '200% 200%',
          animation: 'borderRotate 4s linear infinite',
        }}
      />

      {/* ---- Resting border ---- */}
      <div className="absolute -inset-[1px] rounded-2xl border border-white/[0.08] group-hover:border-transparent transition-colors duration-500 z-0" />

      {/* ---- Main card body ---- */}
      <div className="relative z-10 rounded-2xl bg-[#0c0c14]/90 backdrop-blur-xl h-full flex flex-col overflow-hidden">

        {/* Spotlight glow that follows mouse */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, ${skill.accent.glow}, transparent 40%)`,
          }}
        />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 rounded-2xl opacity-[0.03] z-0"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
        />

        {/* ---- Top bar ---- */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white/90 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${skill.accent.from}30, ${skill.accent.to}20)` }}
            >
              {skill.icon}
            </div>
            <span
              className="text-[11px] font-mono tracking-widest uppercase font-medium"
              style={{ color: skill.accent.from }}
            >
              {skill.id}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: skill.accent.from }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: skill.accent.from }}
              />
            </span>
            <span className="text-[10px] font-mono text-white/50 tracking-wider">{skill.status}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* ---- Body ---- */}
        <div className="relative z-10 flex flex-col flex-grow px-6 pt-5 pb-6">
          <div className="mb-4">
            <h3 className="text-white text-lg font-semibold leading-snug tracking-tight">
              {skill.title}
            </h3>
          </div>

          <p className="text-white/55 text-[13px] leading-relaxed mb-auto">
            {skill.description}
          </p>

          {/* ---- Tech Stack ---- */}
          <div className="mt-5 pt-4 border-t border-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              {skill.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="tech-chip text-[11px] px-3 py-1.5 rounded-full font-medium tracking-wide transition-all duration-300 cursor-default"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${skill.accent.from}18, ${skill.accent.to}10)`
                      : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isHovered ? skill.accent.from + '30' : 'rgba(255,255,255,0.08)'}`,
                    color: isHovered ? skill.accent.from : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Section ---------- */
export default function TechnicalExpertise() {
  // Duplicate for seamless loop
  const allSkills = [...skillsData, ...skillsData];

  return (
    <section className="c-space my-20" id="expertise">
      <p className="sm:text-4xl text-3xl font-semibold relative z-10">
        <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          Technical Expertise
        </span>
      </p>

      <div className="relative mt-12 w-full" style={{ overflowX: 'hidden' }}>
        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

        <div className="flex gap-6 w-max expertise-marquee py-3">
          {allSkills.map((skill, index) => (
            <SkillCard key={`${skill.id}-${index}`} skill={skill} index={index % skillsData.length} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .expertise-marquee {
          animation: marqueeScroll 22s linear infinite;
        }
        .expertise-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes borderRotate {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
