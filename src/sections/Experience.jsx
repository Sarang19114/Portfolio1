'use client';

import React, { useEffect, useRef } from "react";
import GlowCard from "../components/GlowCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = ({ experiences = [] }) => {
  const timelineLineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Clear all previous ScrollTriggers to avoid conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animate the timeline line progressively as user scrolls
    if (timelineLineRef.current && sectionRef.current) {
      gsap.fromTo(
        timelineLineRef.current,
        {
          scaleY: 0,
          transformOrigin: "top center"
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "bottom 70%",
            scrub: 1,
            markers: false
          }
        }
      );
    }

    // Animate timeline cards
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.fromTo(
        card,
        {
          xPercent: -100,
          opacity: 0,
          transformOrigin: "left left",
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate experience text
    setTimeout(() => {
      gsap.utils.toArray(".expText").forEach((text) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, 100);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <p className="sm:text-4xl text-3xl font-semibold relative z-10">
          <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Professional Work Experience
          </span>
        </p>

        <div className="mt-32 relative">
          <div className="relative z-50 flex flex-col gap-40 md:gap-48 xl:gap-32">
            {experiences.map((card, index) => (
              <div className="exp-card-wrapper w-full relative" key={card.title} style={{ zIndex: experiences.length - index }}>
                <div className="w-full xl:w-2/6 timeline-card mb-16 xl:mb-0 relative" style={{ zIndex: experiences.length - index + 10 }}>
                  <GlowCard card={card} index={index}>
                    <div className="flex flex-col items-start gap-3">
                      {/* Boss section with hover effects */}
                      {card.bosses && (
                        <div className="flex flex-wrap gap-6 mt-4">
                          {card.bosses.map((boss, i) => (
                            <div key={i} className="flex flex-col items-start gap-1">
                              <a
                                href={boss.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group"
                              >
                                <img
                                  src={boss.photo}
                                  alt={boss.name}
                                  title={`View ${boss.name} on LinkedIn`}
                                  className="w-16 h-16 rounded-full object-cover border border-white grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.05c.5-.9 1.75-1.85 3.6-1.85 3.85 0 4.55 2.45 4.55 5.65V24h-4v-7.9c0-1.9-.03-4.3-2.6-4.3s-3 2.05-3 4.15V24h-4V8z" />
                                  </svg>
                                </div>
                              </a>
                              <p className="text-white font-semibold text-sm mt-1">{boss.name}</p>
                              <span className="text-sm text-white-80 italic">{boss.position}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlowCard>
                </div>

                <div className="w-full xl:w-4/6">
                  <div className="flex items-start mt-16 xl:mt-0">
                    <div className="timeline-wrapper">
                      <div 
                        ref={index === 0 ? timelineLineRef : null}
                        className="gradient-line h-full"
                        style={index === 0 ? { transformOrigin: "top center" } : {}}
                      />
                    </div>

                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" className="rounded-full" />
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        <p className="my-5 text-white-50">📆 {card.date}</p>
                        <p className="text-[#839cb5] italic">Responsibilities</p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map((responsibility, i) => (
                            <li key={i} className="text-lg">
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;