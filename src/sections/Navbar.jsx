import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '../../lib/portfolioData';

const NavItems = ({ onClick = () => { }, activeSection = '' }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => {
      const isActive = activeSection === item.href.substring(1) && item.name !== 'Resume';
      return (
        <li key={item.id} className={item.name === 'Resume' ? 'nav-li-resume' : 'nav-li'}>
          <a
            href={item.href}
            className={`nav-li_a relative transition-all duration-300 ${isActive ? 'text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' : ''}`}
            onClick={onClick}
            target={item.target}
          >
            {item.name}
            {isActive && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 rounded-full animate-pulse" />
            )}
          </a>
        </li>
      );
    })}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -65% 0px', // Slightly adjusted for better sensitivity
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // IDs to observe based on index.js wrappers
    const sectionIds = ['home', 'about', 'work', 'experience', 'expertise', 'contact'];

    // We use a small timeout to ensure initial rendering is complete
    const timeoutId = setTimeout(() => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-5 md:px-10">
      <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300">
        <div className="flex justify-between items-center py-4 px-6 md:px-8">
          <Link href="/" className="text-white font-bold text-xl hover:text-blue-400 transition-colors tracking-tight group">
            Sarang <span className="text-blue-400 group-hover:text-white transition-colors">Rastogi</span>
          </Link>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex transition-all active:scale-90"
            aria-label="Toggle menu">
            <Image src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'} alt="toggle" width={24} height={24} className="w-6 h-6" />
          </button>

          <div className="sm:flex hidden items-center gap-6">
            <nav>
              <NavItems activeSection={activeSection} />
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <a
                href="https://github.com/Sarang19114"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Image src="/assets/github.svg" alt="GitHub" width={18} height={18} className="brightness-200 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/sarang-rastogi-498948249/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Image src="/assets/linkedin.svg" alt="LinkedIn" width={18} height={18} className="brightness-200 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`transition-all duration-300 ease-in-out sm:hidden ${isOpen ? 'max-h-[85vh] opacity-100 border-t border-white/5 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="p-6 pb-8">
            <NavItems onClick={closeMenu} activeSection={activeSection} />

            {/* Social Icons - Mobile */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-white/5">
              <a
                href="https://github.com/Sarang19114"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 active:scale-95"
                aria-label="GitHub"
              >
                <Image src="/assets/github.svg" alt="GitHub" width={22} height={22} className="brightness-200" />
              </a>
              <a
                href="https://www.linkedin.com/in/sarang-rastogi-498948249/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 active:scale-95"
                aria-label="LinkedIn"
              >
                <Image src="/assets/linkedin.svg" alt="LinkedIn" width={22} height={22} className="brightness-200" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
