"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export const Timeline = ({ data }) => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const beamRef = useRef(null);
    const [height, setHeight] = useState(0);

    // Measure height of the timeline content
    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) {
                setHeight(ref.current.getBoundingClientRect().height);
            }
        };
        updateHeight();

        // Recalculate on resize and after images load
        window.addEventListener("resize", updateHeight);
        const timer = setTimeout(updateHeight, 1000); // fallback re-measure
        return () => {
            window.removeEventListener("resize", updateHeight);
            clearTimeout(timer);
        };
    }, []);

    // Scroll-driven beam animation using native scroll listener
    const handleScroll = useCallback(() => {
        if (!containerRef.current || !beamRef.current || !height) return;

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress: 0 when top enters viewport, 1 when bottom reaches middle
        const start = rect.top - windowHeight * 0.1;
        const end = rect.bottom - windowHeight * 0.5;
        const progress = Math.min(Math.max((0 - start) / (end - start), 0), 1);

        const beamHeight = progress * height;
        beamRef.current.style.height = `${beamHeight}px`;
        beamRef.current.style.opacity = progress > 0.02 ? "1" : "0";
    }, [height]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="w-full" ref={containerRef}>
            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-32 md:gap-10"
                    >
                        {/* Sticky title column */}
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs md:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                                <div
                                    className="h-4 w-4 rounded-full border border-blue-400/60 bg-blue-500/20"
                                    style={{
                                        boxShadow:
                                            "0 0 8px rgba(98,224,255,0.6), 0 0 16px rgba(59,130,246,0.3)",
                                    }}
                                />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                                {item.title}
                            </h3>
                        </div>

                        {/* Content column */}
                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                                {item.title}
                            </h3>
                            {item.content}
                        </div>
                    </div>
                ))}

                {/* ===== GLOWING TIMELINE BEAM ===== */}
                <div
                    style={{ height: height + "px" }}
                    className="absolute md:left-8 left-8 top-0 w-[3px]"
                >
                    {/* Dim static track (always visible) */}
                    <div
                        className="absolute inset-0 w-full rounded-full"
                        style={{
                            background:
                                "linear-gradient(180deg, transparent 0%, rgba(100,100,120,0.3) 10%, rgba(100,100,120,0.3) 90%, transparent 100%)",
                        }}
                    />

                    {/* Animated glowing beam that grows on scroll */}
                    <div
                        ref={beamRef}
                        className="absolute inset-x-0 top-0 w-full rounded-full"
                        style={{
                            height: 0,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            background:
                                "linear-gradient(180deg, #6d45ce 0%, #fd5c79 30%, #52aeff 60%, #62e0ff 100%)",
                            boxShadow:
                                "0 0 6px #62e0ff, 0 0 15px rgba(98,224,255,0.5), 0 0 30px rgba(82,174,255,0.3), 0 0 50px rgba(109,69,206,0.2)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
