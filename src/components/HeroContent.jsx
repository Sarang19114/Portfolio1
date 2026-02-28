'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const roles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'UI/UX Designer', 'Problem Solver'];

const HeroContent = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect for rotating roles
    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && displayText === currentRole) {
            // Pause before deleting
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === '') {
            // Move to next role
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText(currentRole.substring(0, displayText.length - 1));
            }, 40);
        } else {
            timeout = setTimeout(() => {
                setDisplayText(currentRole.substring(0, displayText.length + 1));
            }, 80);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    return (
        <>
            {/* Main content container */}
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-24 c-space gap-1 sm:gap-3 relative z-10">

                {/* Greeting */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2.4 }}
                    className="text-center text-white text-base sm:text-2xl font-generalsans font-medium">
                    Hi, I am <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent font-bold">Sarang</span>
                </motion.p>

                {/* Main heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="text-center"
                >
                    <h1 className="hero_tag text-white">
                        Final Year B. Tech CSE Student &{' '}
                    </h1>
                    <h1 className="hero_tag text-white">
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                                {displayText}
                            </span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                                className="inline-block w-[3px] h-[0.8em] bg-blue-400 ml-1 align-baseline translate-y-[0.1em]"
                            />
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 3.0 }}
                    className="flex justify-center mt-2 sm:mt-4"
                >
                    <p className="text-center text-white/80 text-xs sm:text-lg max-w-2xl font-generalsans leading-relaxed px-4 sm:px-6">
                        Building performant web experiences with modern technologies.
                        <br className="hidden sm:block" />
                        Passionate about clean code and creative interfaces.
                    </p>
                </motion.div>

                {/* Tech stack pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 3.2 }}
                    className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-2 sm:mt-6"
                >
                    {['React', 'Next.js', 'Node.js', 'Three.js', 'Python'].map((tech, i) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 3.3 + i * 0.1 }}
                            className="px-3 py-1.5 text-xs sm:text-sm rounded-full border border-white/10 bg-black/40 text-white-600 backdrop-blur-md hover:border-blue-500/40 hover:text-blue-300 transition-all duration-300 cursor-default"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.6 }}
                className="relative left-0 right-0 w-full z-20 c-space mt-6 sm:mt-16"
            >
                <a href="#contact" className="group w-fit mx-auto block">
                    <div className="relative flex items-center justify-center gap-4 sm:w-fit w-full sm:min-w-96 mx-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-500/30 backdrop-blur-md bg-black/30 hover:border-blue-400/60 hover:from-blue-600/30 hover:to-blue-400/20 transition-all duration-500 cursor-pointer active:scale-95 overflow-hidden">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                        {/* Beam indicator */}
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                        </span>

                        <span className="text-white font-semibold text-base sm:text-lg tracking-wide relative z-10">
                            Let&apos;s work together
                        </span>

                        {/* Arrow */}
                        <svg
                            className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>

                        {/* Glow */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
                    </div>
                </a>
            </motion.div>


        </>
    );
};

export default HeroContent;
