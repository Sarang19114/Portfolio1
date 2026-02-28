'use client';

import React from 'react';
import { SparklesCore } from '@/components/ui/sparkles';

/**
 * Wraps a section with a sparkle particle background.
 * Uses absolute positioning so sparkles sit behind the section content.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} [props.particleColor] - Color of the sparkle particles
 * @param {number} [props.particleDensity] - Number of particles
 * @param {number} [props.minSize] - Minimum particle size
 * @param {number} [props.maxSize] - Maximum particle size
 * @param {number} [props.speed] - Animation speed of particles
 * @param {string} [props.id] - Unique id for the particle instance
 * @param {string} [props.className] - Additional classes for the outer wrapper
 */
const SectionSparkles = ({
    children,
    particleColor = '#ffffff',
    particleDensity = 40,
    minSize = 0.4,
    maxSize = 1.2,
    speed = 2,
    id,
    className = '',
}) => {
    return (
        <div className={`relative ${className}`}>
            {/* Sparkles background layer */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <SparklesCore
                    id={id}
                    background="transparent"
                    minSize={minSize}
                    maxSize={maxSize}
                    particleDensity={particleDensity}
                    className="w-full h-full"
                    particleColor={particleColor}
                    speed={speed}
                />
            </div>
            {/* Content layer above sparkles */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default SectionSparkles;
