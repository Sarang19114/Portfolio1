export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Experience',
    href: '#experience',
  },
  {
    id: 5,
    name: 'Contact',
    href: '#contact',
  },
  {
    id: 6,
    name: 'Resume',
    href: 'assets/Sarang-Rastogi-Resume.pdf',
    target: '_blank',
  },
];

export const myProjects = [
  {
    title: 'Storer - Personal Storage and Sharing Platform',
    desc: 'Storer is a highly secure platform designed for individuals to store and share files effortlessly. With advanced features like access control, it offers a reliable solution for data management.',
    subdesc:
      'Built with Next.js, Tailwind CSS, Appwrite, and Typescript Storer ensures data security, scalability, and a smooth user experience for modern file-sharing needs.',
    href: 'https://storer.vercel.app', // Replace with the actual link
    texture: '/textures/project/project1.mp4',
    logo: '/assets/storerlogo.png',
    logoStyle: {
      backgroundColor: '#1B1D2C',
      border: '0.2px solid #2E3547',
      boxShadow: '0px 0px 60px 0px #5157A34D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { id: 1, name: 'NEXT.js', path: '/assets/next.png' },
      { id: 2, name: 'Appwrite', path: '/assets/appwrite.png' },
      { id: 3, name: 'Typescript', path: '/assets/typescript.png' },
      { id: 4, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
    ],
  },
  {
    title: 'AI Form Builder - Smart Form Creation Tool',
    desc: 'AI Form Builder simplifies form creation and management with AI-driven customization. It enables users to design shareable forms, collect data, and analyze it effortlessly.',
    subdesc:
      'Developed using Next.js, JavaScript, Stripe, and Gemini APIs, this project integrates advanced AI capabilities for form generation while maintaining a user-friendly interface.',
    href: 'https://ai-form-builder-s.vercel.app', // Replace with the actual link
    texture: '/textures/project/project2.mp4',
    logo: '/assets/aiflogo.png',
    logoStyle: {
      backgroundColor: '#2E1A47',
      border: '0.2px solid #4F2A69',
      boxShadow: '0px 0px 60px 0px #BF74F14D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'NEXT.js', path: '/assets/next.png' },
      { id: 2, name: 'Gemini', path: '/assets/gemini.png' },
      { id: 3, name: 'JavaScript', path: '/assets/javascript.png' },
      { id: 4, name: 'Stripe', path: '/assets/stripe.png' },
      { id: 5, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
    ],
  },
  {
    title: 'JBS Lounge Website - Dynamic Lounge Booking',
    desc: 'An elegant and functional website created for JBS Lounge in Agra, offering a beautiful interface to explore menus, galleries, and reservations.',
    subdesc:
      'Developed with Next.js and integrated with the WhatsApp API for real-time booking notifications, the JBS Lounge website provides a seamless experience for both users and staff.',
    href: 'https://jbsbar.com',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/jbslogo1.png',
    logoStyle: {
      backgroundColor: '#1A1A1A',
      border: '0.2px solid #333333',
      boxShadow: '0px 0px 60px 0px #5555554D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'Next.js', path: '/assets/next.png' },
      { id: 2, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'WhatsApp API', path: '/assets/whatsapp.png' },
    ],
  },
  {
    title: 'Sleep Tracker Website - Health Monitoring Platform',
    desc: 'A comprehensive health monitoring platform that tracks sleep patterns, environmental data, and heart rate, with a video call feature for consulting doctors.',
    subdesc:
      'Created with Next.js, Firebase, and the Gemini API, the Sleep Tracker Website delivers a user-friendly and data-driven solution for health monitoring.',
    href: 'https://github.com/Sarang19114/sleep-tracker', // Replace with the actual link
    texture: '/textures/project/project4.mp4',
    logo: '/assets/sleeplogo.png',
    logoStyle: {
      backgroundColor: '#1E2332',
      border: '0.2px solid #2F3B4F',
      boxShadow: '0px 0px 60px 0px #6BA4FF4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      { id: 1, name: 'NEXT.js', path: '/assets/next.png' },
      { id: 2, name: 'Firebase', path: '/assets/firebase.png' },
      { id: 3, name: 'Gemini API', path: '/assets/gemini.png' },
      { id: 4, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 5, name: 'JavaScript', path: '/assets/javascript.png' },
      { id: 6, name: 'Arduino', path: '/assets/ard.png' },
    ],
  },
  {
    title: 'iPhone 15 Website Clone - Visual Perfection',
    desc: 'A stunning recreation of the iPhone 15 website that showcases 3D animations and sleek visual design, delivering an immersive experience.',
    subdesc:
      'Developed using GSAP and Three.js, this clone project focuses on combining creative animations and cutting-edge web technologies to replicate a premium design.',
    href: 'https://apples-iphone15.vercel.app', // Replace with the actual link
    texture: '/textures/project/project5.mp4',
    logo: '/assets/applelogo.png',
    logoStyle: {
      backgroundColor: '#121212',
      border: '0.2px solid #1F1F1F',
      boxShadow: '0px 0px 60px 0px #CCCCCC4D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      { id: 1, name: 'React.js', path: '/assets/react.svg' },
      { id: 2, name: 'tailwindcss', path: '/assets/tailwindcss.png' },
      { id: 1, name: 'GSAP', path: '/assets/gsap.png' },
      { id: 2, name: 'Three.js', path: '/assets/threejs.png' },
    ],
  },
];


export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Essentia.Dev',
    pos: 'SDE Intern',
    duration: 'May 2025 - Jul 2025',
    title: "As an SDE Intern at Essentia.Dev, I'm working on a real-time buoy tracking system using Elixir, Phoenix, and LiveView. My contributions include integrating MapLibre with LiveView Hooks to display and update buoy positions on an interactive map, and helping build the admin dashboard for managing vessels, buoys, and user assignments.",
    icon: '/assets/essentia.png',
    imgPath: '/assets/essentia.png', // Added for GlowCard compatibility
    logoPath: '/assets/essentia.png', // Added for timeline logo
    shortDescription: 'Real-time buoy tracking system development', // Added for GlowCard
    responsibilities: [
      "Developed real-time buoy tracking system using Elixir, Phoenix, and LiveView",
      "Integrated MapLibre with LiveView Hooks for interactive map displays",
      "Built admin dashboard for managing vessels, buoys, and user assignments",
      "Implemented real-time position updates and tracking features"
    ]
  },
  {
    id: 2,
    name: 'TriggerMind',
    pos: 'Technical Lead',
    duration: 'Mar 2024 - Present',
    title: "As the Technical Lead of TriggerMind, I was responsible for organizing and leading technical events, workshops, and coding competitions. I guided teams in project development, mentored juniors in various technologies, and contributed to fostering a strong tech culture within the club. My role involved collaborating with peers to drive innovation, manage technical challenges, and ensure smooth execution of club activities.",
    icon: '/assets/TriggerMind1.png',
    imgPath: '/assets/TriggerMind1.png', // Added for GlowCard compatibility
    logoPath: '/assets/TriggerMind1.png', // Added for timeline logo
    shortDescription: 'Technical leadership and mentoring', // Added for GlowCard
    responsibilities: [
      "Organized and led technical events, workshops, and coding competitions",
      "Guided teams in project development and technical decision-making",
      "Mentored junior members in various technologies and best practices",
      "Fostered strong tech culture and drove innovation within the club",
      "Managed technical challenges and ensured smooth execution of activities"
    ]
  },
  {
    id: 3,
    name: 'Unsaidtalks',
    pos: 'Design Intern',
    duration: 'Oct 2024 - Dec 2024',
    title: "At Unsaid Talks, I designed posters, carousels, and social media graphics using Canva, helping enhance the brand's digital presence. I worked on event promotions, announcements, and marketing materials, ensuring visually appealing and engaging content. Collaborating with the team, I maintained a consistent brand aesthetic and improved audience engagement through creative design strategies.",
    icon: '/assets/UsT.png',
    imgPath: '/assets/UsT.png', // Added for GlowCard compatibility
    logoPath: '/assets/UsT.png', // Added for timeline logo
    shortDescription: 'Digital design and brand enhancement', // Added for GlowCard
    responsibilities: [
      "Designed posters, carousels, and social media graphics using Canva",
      "Enhanced brand's digital presence through creative visual content",
      "Created event promotions, announcements, and marketing materials",
      "Maintained consistent brand aesthetic across all design materials",
      "Improved audience engagement through strategic design approaches"
    ]
  },
];

export const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Tailwind CSS",
    modelPath: "/models/3.glb",
    scale: 1.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },

  //2nd 
  {
    name: "SQL",
    modelPath: "/models/sql.glb",
    scale: 1.4,
    rotation: [0, 0, 0],
  },
  {
    name: "Typescript",
    modelPath: "/models/ts.glb",
    scale: 1.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Javascript",
    modelPath: "/models/javascript_1.glb",
    scale: 0.2,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "HTML",
    modelPath: "/models/html.glb",
    scale: 6,
    rotation: [0, 0, 0],
  },
  {
    name: "CSS",
    modelPath: "/models/css.glb",
    scale: 7,
    rotation: [0, -Math.PI / 4, 0],
  },
];


export const expCards = [
  {
    review:
"Sarang contributed significantly to our client’s real-time buoy tracking system. His work with Phoenix LiveView enhanced system interactivity and responsiveness, while his implementation of robust authentication and comprehensive CRUD functionalities ensured smooth and secure data management across user roles.",

    imgPath: "/assets/essentia.png",
    logoPath: "/assets/essentia.png",
    title: "Software Intern - Essentia.dev",
    date: "May 2025 – Present",
responsibilities: [
  "Built a real-time buoy tracking system using Elixir, Phoenix, and LiveView with simulated telemetry via GenServers.",
  "Developed an admin dashboard with full CRUD functionality for devices, users, and logs.",
  "Implemented role-based authentication to manage access across admin, owner, and viewer views.",
  "Integrated MapLibre for live map visualizations with custom markers and JS hooks.",
  "Documented system architecture, user flows, and deployment steps for team onboarding and handover.",
],

    bosses: [
      {
        photo: "/assets/an.png",
        name: "Anuvrat Parashar",
        position: "CTO, Essentia.dev",
        link: "https://www.linkedin.com/in/anuvratparashar/"
      }
    ]
  },
  {
    review:
      "As the Technical Lead of TriggerMind, Sarang played a pivotal role in fostering a vibrant tech community. His leadership and technical mentorship impact can be seen through well-executed events.",
    imgPath: "/assets/trigger.png",
    logoPath: "/assets/TriggerMind1.png",
    title: "Technical Lead - TriggerMind",
    date: "March 2024 - Present",
responsibilities: [
  "Developed and maintained the official club website to showcase events, projects, and member achievements.",
  "Organized and led technical events, coding competitions, DSA sessions, and hands-on workshops.",
  "Strengthened the club’s technical culture through consistent collaboration, mentorship, and event execution.",
],
    bosses: [
      {
        photo: "/assets/jnv.png",
        name: "Janvi Chauhan",
        position: "Vice President, TriggerMind",
        link: "https://www.linkedin.com/in/janvi-chauhan-9297a92a1/"
      }
    ]
  },
  {
    review:
      "During his internship at UnsaidTalks, Sarang brought strong creative energy and visual consistency to our brand communications. His designs significantly improved engagement on our digital platforms.",
    imgPath: "/images/exp3.png",
    logoPath: "/assets/UsT.png",
    title: "Design Intern - UnsaidTalks",
    date: "October 2024 - December 2024",
    responsibilities: [
      "Designed promotional materials like posters, carousels, and social posts using Canva.",
      "Helped improve brand consistency and recognition through cohesive visual themes.",
      "Collaborated with the content team to enhance engagement through targeted design strategies.",
      "Optimized assets for different social media platforms to maximize reach and clarity.",
    ],
    bosses: [
      {
        photo: "/assets/kj.png",
        name: "Kajol Chopra",
        position: "Head of Analytics & Operations",
        link: "https://www.linkedin.com/in/kajol-ahuja/"
      }
    ]
  }
];





export const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];