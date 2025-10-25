'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Globe from 'react-globe.gl';
import GitHubCalendar from 'react-github-calendar';

import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 28.5355, lng: 77.3910, altitude: 1.5 }, 0);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(' rastogi.sarang19@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about" >
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <Image src="/assets/me.png" alt="grid-1" width={500} height={276} className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hi, I&apos;m Sarang Rastogi</p>
              <p className="grid-subtext">
                I specialize in building dynamic, responsive websites with expertise in both frontend and backend development, delivering seamless user experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <div>
              <p className="grid-headtext">Education</p>
              <p className="grid-subtext mb-2">
                <strong>Bachelor of Technology</strong> – Computer Science<br />
                <span className="text-white/80">Amity University, Noida</span><br />
                <span className="text-sm text-gray-400">Expected Graduation: June 2026</span><br />
                <strong>Current CGPA:</strong> 8.60
              </p>
              <ul className="list-disc pl-5 text-white/90 space-y-2 text-[15px] leading-relaxed">
                <li className="relative group">
                  Tech Lead of the <strong>Trigger Mind Club</strong> – Developed the official club
                  <a
                    href="https://trigger-mind.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline font-bold cursor-pointer ml-1 relative"
                  >
                    website
                    <div className="absolute bottom-full left-0 z-30 hidden group-hover:block mb-3">
                      <div className="w-[400px] h-[250px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 p-[2px]">
                        <div className="w-full h-full bg-black rounded-[10px] overflow-hidden">
                          <iframe
                            src="https://trigger-mind.vercel.app"
                            title="Trigger Mind Preview"
                            className="w-full h-full"
                            style={{
                              border: 'none',
                              overflow: 'auto',
                              scrollbarWidth: 'none'
                            }}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </a>, and played a key role in executing all major events.
                </li>



                <li>Developed impactful projects like:
                  <ul className="list-disc pl-5 mt-1">
                    <li>🔤 Sign Language Recognition using ML</li>
                    <li>😴 IoT-based Sleep Tracker (CyberCup 2024)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                ref={globeRef}
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 28.5355, lng: 77.3910, text: 'Noida, India', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">I&apos;m very flexible with time zone communications & locations</p>
              <p className="grid-subtext">I&apos;m based in Noida, India and open to remote work worldwide.</p>
              <a href="#contact">
                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
              </a>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <Image src="/assets/grid3.png" alt="grid-3" width={800} height={266} className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I thrive on solving challenges and bringing ideas to life through code. For me, programming is more than a career, it&apos;s a deeply fulfilling pursuit. I&apos;m passionate about exploring emerging technologies, constantly learning, and honing my craft to create impactful solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="grid-headtext">
                My GitHub Contributions
              </p>
              <GitHubCalendar
                username="Sarang19114"
                blockSize={14}
                blockMargin={4}
                fontSize={16}
                colorScheme="dark"
                hideTotalCount={true}
                weeks={5}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;