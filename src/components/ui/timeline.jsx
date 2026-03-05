"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

function TimelineItem({ item, isFirst, outerDotRef, innerDotRef }) {
    const itemRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = itemRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            className={`flex justify-start md:gap-10 ${isFirst ? "pt-6 md:pt-4" : "pt-6 md:pt-16"}`}
        >
            {/* Sticky dot + title — desktop */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start md:max-w-xs lg:max-w-sm md:w-full">
                <div
                    ref={outerDotRef}
                    className="h-8 w-8 md:h-10 md:w-10 absolute left-0 md:left-3 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800"
                    style={{ transition: "border-color 0.3s ease" }}
                >
                    <div
                        ref={innerDotRef}
                        className="h-3 w-3 md:h-4 md:w-4 rounded-full"
                        style={{
                            background: "rgba(39,39,42,1)",
                            border: "1px solid rgba(82,82,91,1)",
                            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                        }}
                    />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                    {item.title}
                </h3>
            </div>

            {/* Content */}
            <div className="relative pl-12 md:pl-4 w-full">
                <h3 className="md:hidden block text-xl mb-3 text-left font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                    {item.title}
                </h3>
                {item.content}
            </div>
        </motion.div>
    );
}

export const Timeline = ({ data }) => {
    const contentRef = useRef(null);
    const containerRef = useRef(null);
    const beamRef = useRef(null);
    const heightRef = useRef(0);
    const [height, setHeight] = useState(0);

    const outerDotRefs = useRef(data.map(() => React.createRef()));
    const innerDotRefs = useRef(data.map(() => React.createRef()));

    // Measure height — retry several times as 3D/image content loads
    useEffect(() => {
        const measure = () => {
            if (!contentRef.current) return;
            const h = contentRef.current.getBoundingClientRect().height;
            if (h > 0) { heightRef.current = h; setHeight(h); }
        };
        measure();
        window.addEventListener("resize", measure);
        const t1 = setTimeout(measure, 300);
        const t2 = setTimeout(measure, 1000);
        const t3 = setTimeout(measure, 2500);
        return () => {
            window.removeEventListener("resize", measure);
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
        };
    }, []);

    // rAF loop — reads getBoundingClientRect every frame, works with ANY scroll container
    // (window, body, html, custom) — no scroll events needed
    useEffect(() => {
        let rafId;
        const tick = () => {
            const h = heightRef.current;
            if (h > 0 && containerRef.current && beamRef.current && contentRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const vh = window.innerHeight;
                const start = rect.top - vh * 0.9;
                const end   = rect.bottom - vh * 0.5;
                const range = end - start;
                const progress = range === 0 ? 0 : Math.min(Math.max(-start / range, 0), 1);
                const beamH = progress * h;

                beamRef.current.style.height  = `${beamH}px`;
                beamRef.current.style.opacity = progress > 0.01 ? "1" : "0";

                const contTop = contentRef.current.getBoundingClientRect().top;
                innerDotRefs.current.forEach((innerRef, i) => {
                    const outerRef = outerDotRefs.current[i];
                    if (!innerRef.current || !outerRef.current) return;
                    const dotRect   = outerRef.current.getBoundingClientRect();
                    const dotOffset = dotRect.top - contTop + dotRect.height / 2;
                    const active    = beamH >= dotOffset;
                    if (active) {
                        innerRef.current.style.background  = "rgba(59,130,246,0.6)";
                        innerRef.current.style.borderColor = "rgba(96,165,250,1)";
                        innerRef.current.style.boxShadow   = "0 0 8px rgba(147,197,253,0.9), 0 0 18px rgba(59,130,246,0.6)";
                        outerRef.current.style.borderColor = "rgba(59,130,246,0.7)";
                    } else {
                        innerRef.current.style.background  = "rgba(39,39,42,1)";
                        innerRef.current.style.borderColor = "rgba(82,82,91,1)";
                        innerRef.current.style.boxShadow   = "none";
                        outerRef.current.style.borderColor = "rgba(63,63,70,1)";
                    }
                });
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []); // empty — all reads via refs, zero stale closure risk

    return (
        <div className="w-full font-sans px-4 md:px-10" ref={containerRef}>
            <div ref={contentRef} className="relative max-w-7xl mx-auto pb-4 md:pb-8">
                {data.map((item, index) => (
                    <TimelineItem
                        key={index}
                        item={item}
                        index={index}
                        isFirst={index === 0}
                        outerDotRef={outerDotRefs.current[index]}
                        innerDotRef={innerDotRefs.current[index]}
                    />
                ))}

                {/* Dim static track */}
                <div
                    className="absolute left-4 md:left-8 top-0 w-[2px] overflow-hidden"
                    style={{
                        height: `${height}px`,
                        background: "linear-gradient(to bottom, transparent 0%, rgba(113,113,122,0.35) 10%, rgba(113,113,122,0.35) 90%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                    }}
                >
                    {/* Glowing beam — height driven by scroll, shrinks on scroll-up */}
                    <div
                        ref={beamRef}
                        className="absolute inset-x-0 top-0 w-full rounded-full"
                        style={{
                            height: 0,
                            opacity: 0,
                            background: "linear-gradient(to bottom, #93c5fd, #3b82f6, #06b6d4)",
                            boxShadow: "0 0 8px #93c5fd, 0 0 20px rgba(59,130,246,0.7), 0 0 40px rgba(59,130,246,0.3)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
