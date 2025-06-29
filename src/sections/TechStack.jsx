import React, { useEffect } from "react";
import { techStackIcons } from "../constants";
import TechIcon from "../components/Model/TechLogos/TechIcon";
import { gsap } from "gsap";

const TechStack = () => {
  useEffect(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top-center",
        },
      }
    );
  }, []);

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        {/* Changed TitleHeader to match WorkExperience heading style */}
        <p className="head-text">My Preferred Tech Stack</p>

        <div className="tech-grid">
          {techStackIcons.map((icon) => (
            <div
              key={icon.name}
              className="card-border tech-card overflow-hidden group max-sm:rounded-2xl md:rounded-full xl:rounded-full"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIcon model={icon} />
                </div>

                <div className="padding-x w-full pb-2">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
