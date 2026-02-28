// Hero Section - Server-rendered text with dynamic GLSLHills background
// Enhanced with animated terrain and visual flair
import dynamic from 'next/dynamic';
import HeroContent from '../components/HeroContent.jsx';

// Dynamically import GLSLHills - it uses Three.js
const GLSLHills = dynamic(() => import('../components/GLSLHills.jsx'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
});

// Dynamically import Sparkles for mobile fallback
const SparklesCore = dynamic(() => import('@/components/ui/sparkles').then(mod => mod.SparklesCore), {
    ssr: false,
    loading: () => null,
});

const Hero = () => {
    return (
        <div className="w-[calc(100%-4rem)] mx-auto rounded-md overflow-hidden relative min-h-[500px] h-auto sm:h-screen">
            {/* Mobile-only sparkles fallback */}
            <div className="absolute inset-0 z-0 sm:hidden">
                <SparklesCore
                    id="sparkles-hero-mobile"
                    background="transparent"
                    particleColor="#3B82F6"
                    particleDensity={150}
                    minSize={0.6}
                    maxSize={1.8}
                    speed={2}
                    className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* GLSL Hills Background - Desktop mainly */}
            <div className="absolute inset-0 z-0 hidden sm:block">
                <GLSLHills />
                {/* Gradient overlay for seamless text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-[1]" />
            </div>

            <section className="h-full w-full flex flex-col relative z-10 pb-10 sm:pb-0" id="home">
                <HeroContent />
            </section>
        </div>
    );
};

export default Hero;
