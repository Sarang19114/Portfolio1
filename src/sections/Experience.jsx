import React, { useEffect } from "react";
import { expCards } from "../constants";
import GlowCard from "../components/GlowCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  useEffect(() => {
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
            start: "top 60%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

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
  }, []);

  return (
    <section
      id="experience"
      className="w-full md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <p className="head-text">Professional Work Experience</p>

        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, index) => (
              <div className="exp-card-wrapper" key={card.title}>
                <div className="xl:w-2/6 timeline-card">
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

                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>

                    <div className="expText flex xl:gap20 md:gap-10 gap-5 relative z-20">
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
