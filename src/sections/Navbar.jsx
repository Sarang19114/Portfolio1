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
            className={`nav-li_a transition-all duration-300 ${isActive ? 'text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' : ''}`}
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
      rootMargin: '-20% 0px -70% 0px', // Adjust to trigger when section is in the upper part of viewport
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

    // IDs to observe based on navLinks
    const sectionIds = ['home', 'about', 'work', 'experience', 'contact'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
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

          <nav className="sm:flex hidden">
            <NavItems activeSection={activeSection} />
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${isOpen ? 'max-h-96 opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'}`}>
          <nav className="p-6">
            <NavItems onClick={closeMenu} activeSection={activeSection} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
