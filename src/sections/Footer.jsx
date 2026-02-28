// Server component - no 'use client' needed
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex md:justify-between justify-center items-center flex-wrap gap-5 text-center">
      <div className="text-white flex gap-2 font-light opacity-80 md:order-1 order-2">
        <p className="hover:text-white transition-colors cursor-pointer text-sm">Terms & Conditions</p>
        <p>|</p>
        <p className="hover:text-white transition-colors cursor-pointer text-sm">Privacy Policy</p>
      </div>

      <div className="flex gap-3 md:order-2 order-1">
        <a href="https://calendly.com/rastogi-sarang19" target="_blank" rel="noopener noreferrer" className="social-icon group hover:bg-white/10 transition-all duration-300 border-white/10" title="Schedule a Meeting">
          {/* SVG content... */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="w-5 h-5 brightness-200 transition-all group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" viewBox="0 0 16 16">
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
        </a>
        <a href="https://buymeacoffee.com/sarang19" target="_blank" rel="noopener noreferrer" className="social-icon group hover:bg-[#FFDD00]/20 transition-all duration-300 border-white/10" title="Buy me a coffee">
          <Image src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="coffee" width={24} height={24} className="w-5 h-5 brightness-200 transition-all group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(255,165,0,0.4)]" />
        </a>
        <a href="https://github.com/Sarang19114" target="_blank" rel="noopener noreferrer" className="social-icon group hover:bg-white/10 transition-all duration-300 border-white/10">
          <Image src="/assets/github.svg" alt="github" width={24} height={24} className="w-6 h-6 brightness-200 transition-all group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </a>
        <a href="https://www.linkedin.com/in/sarang-rastogi-498948249/" target="_blank" rel="noopener noreferrer" className="social-icon group hover:bg-white/10 transition-all duration-300 border-white/10">
          <Image src="/assets/linkedin.svg" alt="linkedin" width={24} height={24} className="w-6 h-6 brightness-200 transition-all group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </a>
        <a href="https://www.instagram.com/sarang_rs19/" target="_blank" rel="noopener noreferrer" className="social-icon group hover:bg-white/10 transition-all duration-300 border-white/10">
          <Image src="/assets/instagram.svg" alt="instagram" width={24} height={24} className="w-6 h-6 brightness-200 transition-all group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </a>
      </div>

      <p className="text-white opacity-80 md:order-3 order-3 w-full md:w-auto text-sm">© {new Date().getFullYear()} Sarang Rastogi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
