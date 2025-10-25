import Head from 'next/head';
import dynamic from 'next/dynamic';
import { navLinks, myProjects, workExperiences, expCards } from '../lib/portfolioData';
import LazySection from '../lib/LazySection';

// Import server-side components normally (no 'use client')
import Navbar from '../src/sections/Navbar';
import Footer from '../src/sections/Footer';
import LoadingScreen from '../src/components/LoadingScreen';

// Hero is now server-rendered (text) with dynamic BlackHole
import Hero from '../src/sections/Hero';

// Dynamic import for client-side heavy sections
// ssr: false = don't render on server
// These load only when user scrolls near them
const About = dynamic(() => import('../src/sections/About'), { 
  ssr: false,
  loading: () => (
    <section className="c-space my-20" id="about">
      <p className="head-text">About Me</p>
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid-container animate-pulse bg-black-200" />
        ))}
      </div>
    </section>
  )
});

const Projects = dynamic(() => import('../src/sections/Projects'), { 
  ssr: false,
  loading: () => (
    <section className="c-space my-20" id="work">
      <p className="head-text">My Selected Work</p>
      <div className="h-96 bg-black-200 rounded-lg animate-pulse mt-12" />
    </section>
  )
});

const ExperienceSection = dynamic(() => import('../src/sections/Experience'), { 
  ssr: false,
  loading: () => (
    <section className="c-space my-20" id="experience">
      <p className="head-text">My Work Experience</p>
      <div className="h-96 bg-black-200 rounded-lg animate-pulse mt-12" />
    </section>
  )
});

const TechnicalExpertise = dynamic(() => import('../src/sections/TechnicalExpertise'), { 
  ssr: false,
  loading: () => (
    <section className="c-space my-20" id="expertise">
      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs text-white/60 font-mono tracking-wider">TECHNICAL_EXPERTISE:</span>
          <div className="h-px bg-gradient-to-r from-white/40 to-transparent flex-1"></div>
        </div>
      </div>
      <div className="flex gap-6 overflow-hidden py-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-80 h-96 bg-black/40 border border-white/20 animate-pulse" />
        ))}
      </div>
    </section>
  )
});

const Contact = dynamic(() => import('../src/sections/Contact'), { 
  ssr: false,
  loading: () => (
    <section className="c-space my-20" id="contact">
      <p className="head-text">Let&apos;s Connect</p>
      <div className="h-96 bg-black-200 rounded-lg animate-pulse mt-12" />
    </section>
  )
});

export default function Home({ projects, experiences, experienceCards }) {
  return (
    <>
      <Head>
        <title>Sarang Rastogi - Full-Stack Developer Portfolio</title>
        <meta name="description" content="Final Year B. Tech CSE Student & Full-Stack Developer specializing in Next.js, React, and modern web technologies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Sarang Rastogi - Full-Stack Developer" />
        <meta property="og:description" content="Explore my portfolio featuring modern web applications built with Next.js, React, and Three.js" />
        <meta property="og:type" content="website" />
      </Head>
      <LoadingScreen />
      <main className="mx-auto relative overflow-hidden">
        <Navbar />
        <Hero />
        
        <LazySection>
          <About />
        </LazySection>
        
        <LazySection>
          <Projects projects={projects} />
        </LazySection>
        
        <LazySection>
          <ExperienceSection experiences={experienceCards} />
        </LazySection>
        
        <LazySection>
          <TechnicalExpertise />
        </LazySection>
        
        <LazySection>
          <Contact />
        </LazySection>
        
        <Footer />
      </main>
    </>
  );
}

// This function runs at BUILD TIME (Static Site Generation)
// Data is pre-rendered and served as static HTML
export async function getStaticProps() {
  // In a real app, you might fetch from a CMS or API
  // For now, we're using static data from our lib folder
  return {
    props: {
      projects: myProjects,
      experiences: workExperiences,
      experienceCards: expCards,
    },
    // Optionally, you can add revalidation for Incremental Static Regeneration
    // revalidate: 3600, // Regenerate page every hour
  };
}
