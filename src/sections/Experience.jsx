'use client';

import React from "react";
import Image from "next/image";
import { Timeline } from "../components/ui/timeline";

const ExperienceSection = ({ experiences = [] }) => {
  // Transform experience data into timeline format
  const timelineData = experiences.map((card) => ({
    title: card.date,
    content: (
      <div className="pb-8 md:pb-16">
        {/* Dark card matching website theme */}
        <div className="card-border rounded-xl p-5 md:p-8">
          {/* Role & Company Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border border-black-300 bg-black-100">
              <Image
                src={card.logoPath}
                alt={card.title}
                fill
                className="object-cover p-1.5"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-white-500 mt-1">
                📆 {card.date}
              </p>
            </div>
          </div>

          {/* Key Responsibilities - FIRST */}
          <div className="mb-6">
            <p className="text-[#839cb5] text-sm font-semibold uppercase tracking-wider mb-3 italic">
              Key Responsibilities
            </p>
            <ul className="list-none space-y-3">
              {card.responsibilities.map((responsibility, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white-50"
                >
                  <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#62e0ff] to-[#6d45ce]" />
                  <span className="text-sm md:text-[15px] leading-relaxed text-white-600">
                    {responsibility}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Boss Quote - AFTER responsibilities */}
          {card.review && (
            <div className="mb-6 relative">
              <div className="pl-4 border-l-2 border-blue-500/30">
                <svg className="w-5 h-5 text-blue-500/40 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.998 2.151c-2.436.917-3.998 3.638-3.998 5.849h4v10h-9.983z" />
                </svg>
                <p className="text-sm md:text-[15px] text-white-600 leading-relaxed italic">
                  {card.review}
                </p>
              </div>
            </div>
          )}

          {/* Boss / Colleague Section */}
          {card.bosses && card.bosses.length > 0 && (
            <div className="pt-5 border-t border-black-300/50">
              <p className="text-xs text-white-500 mb-3 font-medium uppercase tracking-wider">
                Worked with
              </p>
              <div className="flex flex-wrap gap-3">
                {card.bosses.map((boss, i) => (
                  <a
                    key={i}
                    href={boss.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group/boss bg-black-100 rounded-full pr-4 pl-1 py-1 border border-black-300/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="relative">
                      <Image
                        src={boss.photo}
                        alt={boss.name}
                        width={36}
                        height={36}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover grayscale group-hover/boss:grayscale-0 transition-all duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/boss:opacity-100 transition-opacity duration-300 bg-black/40 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.05c.5-.9 1.75-1.85 3.6-1.85 3.85 0 4.55 2.45 4.55 5.65V24h-4v-7.9c0-1.9-.03-4.3-2.6-4.3s-3 2.05-3 4.15V24h-4V8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-semibold text-white">
                        {boss.name}
                      </span>
                      <span className="text-[10px] md:text-xs text-white-500">
                        {boss.position}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <section
      id="experience"
      className="w-full md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <p className="sm:text-4xl text-3xl font-semibold relative z-10 mb-8 md:mb-0">
          <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Professional Work Experience
          </span>
        </p>
      </div>

      <div className="relative w-full">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default ExperienceSection;