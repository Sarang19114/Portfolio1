import Button from '../components/Button.jsx';
import { Spotlight } from '../components/ui/spotlight-new.jsx';
import { TextRevealCard } from '../components/ui/text-reveal-card';

const Hero = () => {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md overflow-hidden">
      <Spotlight />
      <section className="h-[50vh] sm:h-screen w-full flex flex-col relative" id="home">
        <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
          <p className="text-xl font-medium text-white text-center hero_tag text-gray_gradient md:text-6xl">
            Hi, I am{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Sarang</span>
          </p>

          <p className="hero_tag text-gray_gradient">
            Final Year B. Tech CSE Student & <br />
            <span className="bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent">
              Full-Stack Developer
            </span>
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center mt-5 ml-10 sm:mb-0">
          <TextRevealCard text="You create the concept," revealText="I write the logic for it..."></TextRevealCard>
        </div>

        <div className="relative bottom-7 left-0 right-0 w-full z-10 c-space mt-8 sm:mt-0">
          <a href="#contact" className="w-fit">
            <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Hero;
