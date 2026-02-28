import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const BlackHole = dynamic(() => import('../src/components/BlackHole'), {
    ssr: false,
});

export default function Custom404() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <Head>
                <title>404 | Event Horizon</title>
            </Head>

            <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-generalsans selection:bg-blue-500/30">

                {/* Full Screen WebGL Blackhole Background */}
                <div className="absolute inset-0 z-0">
                    <BlackHole />
                </div>

                {/* Ambient Starlight (Stars getting pulled in - Spaghettification) */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    {isClient && Array.from({ length: 60 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-spaghettification"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                                opacity: Math.random() * 0.5 + 0.1
                            }}
                        />
                    ))}
                </div>

                {/* Shadow overlay to make text readable */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/50" />

                {/* Main Interface Content */}
                <div className="relative z-20 flex flex-col items-center px-6 w-full max-w-3xl pointer-events-auto mt-20 md:mt-40">

                    {/* UI HUD Line */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#62e0ff] mb-6 w-full justify-center"
                    >
                        <span className="w-12 h-[1px] bg-[#62e0ff]/30" />
                        SYS.ERR.404 :: EVENT_HORIZON_REACHED
                        <span className="w-12 h-[1px] bg-[#62e0ff]/30" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-[60px] md:text-[100px] lg:text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-tight leading-none mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-center mix-blend-screen"
                    >
                        Spaghettified.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="text-white/60 text-base md:text-lg text-center max-w-xl font-light leading-relaxed mb-10 backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/5"
                    >
                        The page you requested got too close to the singularity. It has been stretched into infinite dimensional space.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-[#62e0ff]/40 transition-all duration-500 overflow-hidden backdrop-blur-md"
                        >
                            {/* Hover Space Warp Effect */}
                            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-[#62e0ff]/20 to-[#6d45ce]/20 transition-transform duration-500 ease-in-out" />

                            <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wider text-sm uppercase text-white/90 group-hover:text-white transition-colors">
                                <span className="w-2 h-2 rounded-full bg-[#62e0ff] group-hover:animate-ping" />
                                Engage Warp Drive
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Scientific Coordinates HUD */}
                    {isClient && (
                        <div className="absolute bottom-[-100px] md:bottom-[-200px] left-0 right-0 justify-between px-10 text-[10px] text-white/20 font-mono hidden md:flex">
                            <span>GRAV_PULL: CRITICAL</span>
                            <span>X: {mousePos.x} Y: {mousePos.y} Z: ERROR</span>
                        </div>
                    )}
                </div>

                {/* Global Keyframes for the spaghettification effect */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes spaghettification {
                        0% { transform: scale(1) translate(0, 0); opacity: 0; }
                        20% { opacity: 0.8; }
                        80% { transform: scale(3, 0.1) translate(calc(50vw - 50%), calc(50vh - 50%)); opacity: 0.8; }
                        100% { transform: scale(10, 0.01) translate(calc(50vw - 50%), calc(50vh - 50%)); opacity: 0; }
                    }
                `}} />
            </div>
        </>
    );
}
