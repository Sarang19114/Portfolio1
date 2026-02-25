// Hero Section - Server-rendered text with dynamic BlackHole
// Enhanced with animated text and visual flair
import dynamic from 'next/dynamic';
import HeroContent from '../components/HeroContent.jsx';

// Dynamically import BlackHole - it's heavy (~600KB with Three.js)
const BlackHole = dynamic(() => import('../components/BlackHole.jsx'), {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-black" />
});

const Hero = () => {
    return (
        <div className="w-[calc(100%-4rem)] mx-auto rounded-md overflow-hidden relative">
            {/* Black Hole Background - Full Viewport */}
            <BlackHole />

            <section className="h-auto sm:h-screen w-full flex flex-col relative pb-10 sm:pb-0" id="home">
                <HeroContent />
            </section>
        </div>
    );
};

export default Hero;
