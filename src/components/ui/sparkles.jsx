"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/components/lib/utils";

/**
 * Custom canvas-based sparkle particles — zero external dependencies.
 * Renders floating, twinkling particles with configurable color, density, and size.
 */
export const SparklesCore = ({
    id,
    className,
    background = "transparent",
    minSize = 0.6,
    maxSize = 1.4,
    particleDensity = 100,
    particleColor = "#FFFFFF",
    speed = 1,
}) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const rafRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    const initParticles = useCallback((width, height) => {
        const count = Math.min(particleDensity, 500);
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: minSize + Math.random() * (maxSize - minSize),
                speedX: (Math.random() - 0.5) * 0.3 * speed,
                speedY: (Math.random() - 0.5) * 0.3 * speed,
                opacity: Math.random(),
                opacitySpeed: (0.002 + Math.random() * 0.008) * speed,
                opacityDir: Math.random() > 0.5 ? 1 : -1,
            });
        }
        particles.current = arr;
    }, [minSize, maxSize, particleDensity, speed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            const parent = canvas.parentElement;
            const w = parent ? parent.clientWidth : window.innerWidth;
            const h = parent ? parent.clientHeight : window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            ctx.scale(dpr, dpr);
            initParticles(w, h);
        };

        const handleMouse = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;
            // Spawn a few extra particles on click
            for (let i = 0; i < 4; i++) {
                particles.current.push({
                    x: cx + (Math.random() - 0.5) * 20,
                    y: cy + (Math.random() - 0.5) * 20,
                    size: minSize + Math.random() * (maxSize - minSize),
                    speedX: (Math.random() - 0.5) * 1.5 * speed,
                    speedY: (Math.random() - 0.5) * 1.5 * speed,
                    opacity: 1,
                    opacitySpeed: (0.002 + Math.random() * 0.008) * speed,
                    opacityDir: -1,
                });
            }
        };

        resize();
        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", handleMouse);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("click", handleClick);

        // Parse color once
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                }
                : { r: 255, g: 255, b: 255 };
        };
        const rgb = hexToRgb(particleColor);

        const animate = () => {
            const parent = canvas.parentElement;
            const w = parent ? parent.clientWidth : canvas.width;
            const h = parent ? parent.clientHeight : canvas.height;
            ctx.clearRect(0, 0, w, h);

            const pts = particles.current;
            for (let i = pts.length - 1; i >= 0; i--) {
                const p = pts[i];

                // Update position
                p.x += p.speedX;
                p.y += p.speedY;

                // Update opacity (twinkle)
                p.opacity += p.opacitySpeed * p.opacityDir;
                if (p.opacity >= 1) {
                    p.opacity = 1;
                    p.opacityDir = -1;
                } else if (p.opacity <= 0.05) {
                    p.opacity = 0.05;
                    p.opacityDir = 1;
                }

                // Wrap around edges
                if (p.x < -5) p.x = w + 5;
                if (p.x > w + 5) p.x = -5;
                if (p.y < -5) p.y = h + 5;
                if (p.y > h + 5) p.y = -5;

                // Remove extra click-spawned particles once they fade
                if (i >= particleDensity && p.opacity <= 0.06) {
                    pts.splice(i, 1);
                    continue;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        // Fade-in effect
        canvas.style.opacity = "0";
        canvas.style.transition = "opacity 1s ease-in";
        requestAnimationFrame(() => {
            canvas.style.opacity = "1";
        });

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouse);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            canvas.removeEventListener("click", handleClick);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [particleColor, initParticles, minSize, maxSize, speed, particleDensity]);

    return (
        <canvas
            ref={canvasRef}
            id={id}
            className={cn("w-full h-full", className)}
            style={{ background }}
        />
    );
};
