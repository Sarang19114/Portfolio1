// Static portfolio data that doesn't change often
// This data will be used for Static Site Generation (SSG)

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
    name: 'Expertise',
    href: '#expertise',
  },
  {
    id: 6,
    name: 'Contact',
    href: '#contact',
  },
  {
    id: 7,
    name: 'Resume',
    href: 'https://sarang19114.github.io/WebResume',
    target: '_blank',
  },
];

export const myProjects = [
  {
    title: 'Storer - Personal Storage and Sharing Platform',
    desc: 'Storer is a highly secure platform designed for individuals to store and share files effortlessly. With advanced features like access control, it offers a reliable solution for data management.',
    subdesc:
      'Built with Next.js, Tailwind CSS, Appwrite, and Typescript Storer ensures data security, scalability, and a smooth user experience for modern file-sharing needs.',
    href: 'https://storer.vercel.app',
    video: null,
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
    href: 'https://ai-form-builder-s.vercel.app',
    video: null,
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
    video: null,
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
    title: 'LegalSnap - AI-Powered Legal Consultation Platform',
    desc: 'LegalSnap addresses the challenge of accessible legal guidance by building an AI-driven app for voice-based legal consultations. Users can engage in automated client–lawyer interactions with intelligent AI assistance.',
    subdesc:
      'Built with Next.js, TypeScript, VAPI AI, and OpenRouter for voice integration and AI processing. Applied prompt engineering and context optimization techniques to refine AI responses, improving accuracy and relevance of legal guidance.',
    href: 'https://github.com/Sarang19114/legalsnap',
    video: null,
    logo: '/assets/legalsnaplogo.png',
    logoStyle: {
      backgroundColor: '#0F1B2E',
      border: '0.2px solid #1A2F4A',
      boxShadow: '0px 0px 60px 0px #3D7FD54D',
    },
    spotlight: '/assets/spotlight6.png',
    tags: [
      { id: 1, name: 'NEXT.js', path: '/assets/next.png' },
      { id: 2, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 3, name: 'VAPI AI', path: '/assets/vapi.png' },
      { id: 4, name: 'OpenRouter', path: '/assets/openrouter.png' },
      { id: 5, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
    ],
  },
  {
    title: 'Stocket - AI Stock Forecasting Dashboard',
    desc: 'Stocket is a highly accurate stock forecasting solution combining machine learning with real-time market data. It provides interactive dashboards with dynamic charts for comprehensive stock analysis and prediction.',
    subdesc:
      'Engineered using Next.js, TypeScript, Python backend with Pandas, NumPy, and TensorFlow for ML models. Achieved over 90% prediction accuracy on historical stock trend data. Established real-time data retrieval leveraging yfinance APIs for live market insights.',
    href: 'https://github.com/Sarang19114/stocket',
    video: '/assets/Stocket.mp4',
    logo: '/assets/project-logo5.png',
    logoStyle: {
      backgroundColor: '#1A1D2E',
      border: '0.2px solid #2E3B54',
      boxShadow: '0px 0px 60px 0px #00D9FF4D',
    },
    spotlight: '/assets/spotlight7.png',
    tags: [
      { id: 1, name: 'NEXT.js', path: '/assets/next.png' },
      { id: 2, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 3, name: 'Python', path: '/assets/python.png' },
      { id: 4, name: 'TensorFlow', path: '/assets/tensorflow.png' },
      { id: 5, name: 'Pandas', path: '/assets/pandas.png' },
      { id: 6, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
    ],
  },
  {
    title: 'Rastogi Electricals - Family Business E-commerce Platform',
    desc: 'A modern e-commerce platform for Rastogi Electricals, a renowned electrical shop in Delhi. Showcases product catalog, enables online ordering, and provides seamless customer communication.',
    subdesc:
      'Built with Next.js and Tailwind CSS for a responsive, fast-loading interface. Integrated Supabase for robust database management and Resend for automated email notifications. Designed to streamline customer ordering and business operations.',
    href: 'https://rastogi-electricals.vercel.app',
    video: null,
    logo: '/assets/rastogieleclogo.png',
    logoStyle: {
      backgroundColor: '#1a1a1a',
      border: '0.2px solid #333333',
      boxShadow: '0px 0px 60px 0px #FF99004D',
    },
    spotlight: '/assets/spotlight8.png',
    tags: [
      { id: 1, name: 'NEXT.js', path: '/assets/next.png' },
      { id: 2, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'Supabase', path: '/assets/supabase.png' },
      { id: 4, name: 'Resend', path: '/assets/resend.png' },
    ],
  },
];

export const workExperiences = [
  {
    id: 1,
    name: 'Essentia.Dev',
    pos: 'SDE Intern',
    duration: 'May 2025 - Jul 2025',
    title: "As an SDE Intern at Essentia.Dev, I'm working on a real-time buoy tracking system using Elixir, Phoenix, and LiveView. My contributions include integrating MapLibre with LiveView Hooks to display and update buoy positions on an interactive map, and helping build the admin dashboard for managing vessels, buoys, and user assignments.",
    icon: '/assets/essentia.png',
    imgPath: '/assets/essentia.png',
    logoPath: '/assets/essentia.png',
    shortDescription: 'Real-time buoy tracking system development',
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
    duration: 'Mar 2024 - October 2025',
    title: "As the Technical Lead of TriggerMind, I was responsible for organizing and leading technical events, workshops, and coding competitions. I guided teams in project development, mentored juniors in various technologies, and contributed to fostering a strong tech culture within the club. My role involved collaborating with peers to drive innovation, manage technical challenges, and ensure smooth execution of club activities.",
    icon: '/assets/TriggerMind1.png',
    imgPath: '/assets/TriggerMind1.png',
    logoPath: '/assets/TriggerMind1.png',
    shortDescription: 'Technical leadership and mentoring',
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
    imgPath: '/assets/UsT.png',
    logoPath: '/assets/UsT.png',
    shortDescription: 'Digital design and brand enhancement',
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
      "Sarang is actively researching and developing the Live Programmable Interface (LPI) framework for Personal Digital Twins (PDTs) at Winniio AB. His work focuses on creating intelligent peer matchmaking and explainable AI-driven decision support, enhancing system adaptability and connected care insights.",
    imgPath: "/assets/wii.png",
    logoPath: "/assets/wii.png",
    title: "Research & Development Intern - Winniio AB",
    date: "Oct 2025 – Present",
    responsibilities: [
      "Researching and developing the Live Programmable Interface (LPI) framework for Personal Digital Twins (PDTs).",
      "Designing algorithms for intelligent peer matchmaking to enhance connected care and patient recovery insights.",
      "Implementing explainable AI modules to provide interpretable decision support within the system.",
      "Documenting system design, architecture, and experimental results for internal review and publication.",
      "Collaborating with team members to integrate new modules and test simulation scenarios."
    ],
    bosses: [
      {
        photo: "/assets/ruq.png",
        name: "Ruqayya Shah",
        position: "Co-Researcher, Winniio AB",
        link: "https://www.linkedin.com/in/ruqayya-shah-92032923b"
      }
    ]
  },
  {
    review:
      "Sarang contributed significantly to our client's real-time buoy tracking system. His work with Phoenix LiveView enhanced system interactivity and responsiveness, while his implementation of robust authentication and comprehensive CRUD functionalities ensured smooth and secure data management across user roles.",
    imgPath: "/assets/essentia.png",
    logoPath: "/assets/essentia.png",
    title: "Software Intern - Essentia.dev",
    date: "May 2025 – July 2025",
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
    date: "March 2024 - Oct 2025",
    responsibilities: [
      "Developed and maintained the official club website to showcase events, projects, and member achievements.",
      "Organized and led technical events, coding competitions, DSA sessions, and hands-on workshops.",
      "Strengthened the club's technical culture through consistent collaboration, mentorship, and event execution.",
    ],
    bosses: [
      {
        photo: "/assets/jnv.png",
        name: "Janvi Chauhan",
        position: "Vice President, TriggerMind",
        link: "https://www.linkedin.com/in/janvi-chauhan-9297a92a1/"
      }
    ]
  }
];
