// Hero Section - Server Component (text is server-rendered)
// Only BlackHole loads client-side for better performance
import dynamic from 'next/dynamic';
import Button from '../components/Button.jsx';
import { Spotlight } from '../components/ui/spotlight-new.jsx';

// Dynamically import BlackHole - it's heavy (~600KB with Three.js)
// ssr: false = don't render on server (Three.js needs browser)
// loading = placeholder while JS loads
const BlackHole = dynamic(() => import('../components/BlackHole.jsx'), {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-black" />
});

const Hero = () => {
    return (
        <div className="w-[calc(100%-4rem)] mx-auto rounded-md overflow-hidden relative">
            {/* Black Hole Background - Full Viewport */}
            <BlackHole />

            <section className="h-[50vh] sm:h-screen w-full flex flex-col relative" id="home">
                <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 relative z-10">

                    <p className="hero_tag text-gray_gradient drop-shadow-lg">
                        Final Year B. Tech CSE Student & <br />
                        <span className="bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent">
                            Full-Stack Developer
                        </span>
                    </p>
                </div>

                <div className="hidden sm:flex flex-col items-center justify-center mt-5 ml-10 sm:mb-0 relative z-10">
                </div>

                <div className="relative left-0 right-0 w-full z-20 c-space mt-20 sm:mt-20">
                    <a href="#contact" className="w-fit">
                        <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Hero;
