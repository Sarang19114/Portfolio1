"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function RotatingEarth({ width = 800, height = 600, className = "" }) {
    const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Set up responsive dimensions
        const containerWidth = Math.min(width, window.innerWidth - 40);
        const containerHeight = Math.min(height, (window.innerHeight || 1000) - 100);
        // Made the radius larger to fill more of the container based on user request to "adjust size accordingly"
        const radius = Math.min(containerWidth, containerHeight) / 2.1;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
        context.scale(dpr, dpr);

        // Create projection and path generator for Canvas
        const projection = d3
            .geoOrthographic()
            .scale(radius)
            .translate([containerWidth / 2, containerHeight / 2])
            .clipAngle(90);

        const path = d3.geoPath().projection(projection).context(context);

        const pointInPolygon = (point, polygon) => {
            const [x, y] = point;
            let inside = false;

            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const [xi, yi] = polygon[i];
                const [xj, yj] = polygon[j];

                if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
                    inside = !inside;
                }
            }

            return inside;
        };

        const pointInFeature = (point, feature) => {
            const geometry = feature.geometry;

            if (geometry.type === "Polygon") {
                const coordinates = geometry.coordinates;
                // Check if point is in outer ring
                if (!pointInPolygon(point, coordinates[0])) {
                    return false;
                }
                // Check if point is in any hole (inner rings)
                for (let i = 1; i < coordinates.length; i++) {
                    if (pointInPolygon(point, coordinates[i])) {
                        return false; // Point is in a hole
                    }
                }
                return true;
            } else if (geometry.type === "MultiPolygon") {
                // Check each polygon in the MultiPolygon
                for (const polygon of geometry.coordinates) {
                    // Check if point is in outer ring
                    if (pointInPolygon(point, polygon[0])) {
                        // Check if point is in any hole
                        let inHole = false;
                        for (let i = 1; i < polygon.length; i++) {
                            if (pointInPolygon(point, polygon[i])) {
                                inHole = true;
                                break;
                            }
                        }
                        if (!inHole) {
                            return true;
                        }
                    }
                }
                return false;
            }

            return false;
        };

        const generateDotsInPolygon = (feature, dotSpacing = 16) => {
            const dots = [];
            const bounds = d3.geoBounds(feature);
            const [[minLng, minLat], [maxLng, maxLat]] = bounds;

            const stepSize = dotSpacing * 0.08;
            let pointsGenerated = 0;

            for (let lng = minLng; lng <= maxLng; lng += stepSize) {
                for (let lat = minLat; lat <= maxLat; lat += stepSize) {
                    const point = [lng, lat];
                    if (pointInFeature(point, feature)) {
                        dots.push(point);
                        pointsGenerated++;
                    }
                }
            }
            return dots;
        };

        const allDots = [];
        let landFeatures;

        const render = () => {
            // Clear canvas
            context.clearRect(0, 0, containerWidth, containerHeight);

            const currentScale = projection.scale();
            const scaleFactor = currentScale / radius;

            // Draw ocean (globe background)
            context.beginPath();
            context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
            context.fillStyle = "#000000";
            context.fill();
            context.strokeStyle = "#ffffff";
            context.lineWidth = 2 * scaleFactor;
            context.stroke();

            if (landFeatures) {
                // Draw graticule
                const graticule = d3.geoGraticule();
                context.beginPath();
                path(graticule());
                context.strokeStyle = "#ffffff";
                context.lineWidth = 1 * scaleFactor;
                context.globalAlpha = 0.25;
                context.stroke();
                context.globalAlpha = 1;

                // Draw land outlines
                context.beginPath();
                landFeatures.features.forEach((feature) => {
                    path(feature);
                });
                context.strokeStyle = "#ffffff";
                context.lineWidth = 1 * scaleFactor;
                context.stroke();

                // Draw halftone dots
                allDots.forEach((dot) => {
                    const projected = projection([dot.lng, dot.lat]);
                    if (
                        projected &&
                        projected[0] >= 0 &&
                        projected[0] <= containerWidth &&
                        projected[1] >= 0 &&
                        projected[1] <= containerHeight
                    ) {
                        context.beginPath();
                        context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
                        context.fillStyle = "#999999";
                        context.fill();
                    }
                });
                // Draw Delhi marker
                const delhiLng = 77.2090;
                const delhiLat = 28.6139;
                const delhiProj = projection([delhiLng, delhiLat]);

                // Check if Delhi is visible (front side of the globe)
                // We recreate a little logic here, D3 handles clipping naturally if the point is clipped by checking if coords are finite, but testing visibility using geoPath point is safer
                const pathTest = d3.geoPath().projection(projection).context(null);
                const isVisible = !!pathTest({ type: "Point", coordinates: [delhiLng, delhiLat] });

                if (isVisible && delhiProj) {
                    // Pulse ring
                    context.beginPath();
                    context.arc(delhiProj[0], delhiProj[1], 8 * scaleFactor, 0, 2 * Math.PI);
                    context.fillStyle = "rgba(34, 197, 94, 0.4)"; // bg-green-500 with opacity
                    context.fill();

                    // Core dot
                    context.beginPath();
                    context.arc(delhiProj[0], delhiProj[1], 3 * scaleFactor, 0, 2 * Math.PI);
                    context.fillStyle = "#22c55e"; // bg-green-500
                    context.fill();
                }
            }
        };

        const loadWorldData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(
                    "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
                );
                if (!response.ok) throw new Error("Failed to load land data");

                landFeatures = await response.json();

                // Generate dots for all land features
                landFeatures.features.forEach((feature) => {
                    const dots = generateDotsInPolygon(feature, 16);
                    dots.forEach(([lng, lat]) => {
                        allDots.push({ lng, lat, visible: true });
                    });
                });

                render();
                setIsLoading(false);
            } catch (err) {
                console.error("Earth error:", err);
                setError("Failed to load land map data");
                setIsLoading(false);
            }
        };

        // Set up rotation and interaction
        // Initial rotation centers roughly on India/Delhi: [-Longitude, -Latitude]
        const rotation = [-77.2090, -20.0];
        let autoRotate = false; // Stopped auto-rotation
        const rotationSpeed = 0;

        // Apply initial rotation so Delhi is visible on first render
        projection.rotate(rotation);

        const rotate = () => {
            if (autoRotate) {
                rotation[0] += rotationSpeed;
                projection.rotate(rotation);
                render();
            }
        };

        // Auto-rotation timer
        const rotationTimer = d3.timer(rotate);

        const handleMouseDown = (event) => {
            autoRotate = false;
            const startX = event.clientX;
            const startY = event.clientY;
            const startRotation = [...rotation];

            const handleMouseMove = (moveEvent) => {
                const sensitivity = 0.5;
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;

                rotation[0] = startRotation[0] + dx * sensitivity;
                rotation[1] = startRotation[1] - dy * sensitivity;
                rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

                projection.rotate(rotation);
                render();
            };

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);

                setTimeout(() => {
                    autoRotate = true;
                }, 10);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        canvas.addEventListener("mousedown", handleMouseDown);

        // Load the world data
        loadWorldData();

        // Cleanup
        return () => {
            rotationTimer.stop();
            canvas.removeEventListener("mousedown", handleMouseDown);
        };
    }, [width, height]);

    if (error) {
        return (
            <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
                <div className="text-center">
                    <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
                    <p className="dark text-muted-foreground text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                className="rounded-2xl bg-transparent cursor-grab active:cursor-grabbing max-w-full"
            />
        </div>
    );
}
