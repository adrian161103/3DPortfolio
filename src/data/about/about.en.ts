import { AboutPageData } from './aboutTypes';

export const aboutEn: AboutPageData = {
  hero: {
    kickerLeft: 'ABOUT / FULL STACK WEB DEVELOPER',
    kickerRight: 'EST. 2025',
    titleTop: 'FULL STACK',
    titleBottom: 'DEVELOPER',
    subtitle:
        'React, TypeScript, Tailwind, Node.js and MongoDB. Performance and UX first. Systems (UTN) + Software Development (IFTS No.29).',
    ctaLabel: 'View Projects',
    stats: [
      { label: 'Stack', value: 'React · TS · Tailwind · Node · Mongo' },
      { label: 'Education', value: 'UTN + IFTS No.29' },
      { label: 'Projects', value: 'Personal sites + freelance' }
    ]
  },
  bio: {
    kicker: 'About me / Professional',
    heading: ['I\'m Adrián Alejos García,', ' Full Stack Web Developer', ' and Systems student (UTN)'],
    paragraphs: [
      'I work with React, TypeScript, Tailwind, Node.js and MongoDB to build modern, scalable interfaces with a focus on performance and user experience.',
        'I\'m currently complementing my training with Software Development (IFTS No.29), strengthening fundamentals and good practices.',
      'I develop personal projects—such as a website in the psychology field—blending design and technology to build trust and closeness.',
      'I\'m passionate about innovation, optimization, and creating digital products with real impact.'
    ],
    columns: [
      {
        title: 'Focus',
        items: [
          'Performance and accessibility',
          'Clear user experience',
          'Scalable, maintainable code',
          'Continuous value delivery'
        ]
      },
      {
        title: 'Values',
        items: [
          'Clear, simple communication',
          'Continuous learning',
          'Collaboration and respect',
          'Results-oriented'
        ]
      },
      {
        title: 'Beyond code',
        items: [
          'Interest in UX/UI',
          'Exploring new technologies',
          'Projects with real-world impact',
          'Optimization and innovation'
        ]
      }
    ],
    sidebar: {
      stats: [
        { value: 'UTN', label: 'Systems Engineering' },
        { value: 'IFTS No.29', label: 'Software Dev. Technician (2025)' },
        { value: 'Full Stack', label: 'React · TS · Node · Mongo' }
      ],
      photo: { initials: 'AA', alt: 'Adrián Alejos García - Full Stack Web Developer' },
      availability: 'Available for remote work',
      status: 'Open to opportunities'
    },
    quote: {
      text:
        'Technology should bring people closer: simple, fast and purposeful.',
      author: 'Adrián Alejos García'
    }
  },
  skills: {
    headerKicker: 'Skills & Expertise',
    headerTitleTop: 'Technical',
    headerTitleBottom: 'Excellence',
    headerSubtitle: 'Frontend and backend with focus on performance, DX and quality.',
    categories: [
      {
        title: 'Frontend',
        description: 'Modern, accessible and scalable interfaces',
        skills: [
          { name: 'React', level: 90, category: 'framework', icon: '⚛️' },
          { name: 'JavaScript', level: 90, category: 'language', icon: '🟨' },
          { name: 'TypeScript', level: 88, category: 'language', icon: '🔷' },
          { name: 'Tailwind CSS', level: 90, category: 'styling', icon: '🎨' },
          { name: 'Vite', level: 85, category: 'build', icon: '⚡' },
          { name: 'GSAP', level: 86, category: 'animation', icon: '✨' },
          { name: 'Three.js', level: 84, category: '3d', icon: '🌐' }
        ],
        color: 'from-green-400 to-emerald-600',
        accent: 'green'
      },
      {
        title: 'Backend',
        description: 'Reliable and simple APIs',
        skills: [
          { name: 'Node.js', level: 85, category: 'backend', icon: '🟢' },
          { name: 'Express', level: 82, category: 'backend', icon: '🚀' },
          { name: 'MongoDB', level: 80, category: 'database', icon: '🍃' },
          { name: 'MySQL', level: 78, category: 'database', icon: '🐬' },
          { name: 'TypeScript', level: 82, category: 'language', icon: '🔷' }
        ],
        color: 'from-blue-400 to-indigo-600',
        accent: 'blue'
      },
      {
        title: 'Tooling',
        description: 'Ecosystem and workflow',
        skills: [
          { name: 'Git', level: 90, category: 'tools', icon: '📦' },
          { name: 'Postman', level: 85, category: 'tools', icon: '📫' },
          { name: 'REST', level: 85, category: 'api', icon: '🔌' }
        ],
        color: 'from-cyan-400 to-blue-600',
        accent: 'cyan'
      },
      {
        title: 'Design & UX',
        description: 'Function with clear aesthetics',
        skills: [
          { name: 'Figma', level: 80, category: 'design', icon: '🎨' },
          { name: 'UI/UX', level: 82, category: 'design', icon: '💡' },
          { name: 'Blender', level: 78, category: 'design', icon: '🧊' }
        ],
        color: 'from-purple-400 to-pink-600',
        accent: 'purple'
      }
    ]
  },
  timeline: {
    headerTitle: 'Journey Timeline',
    headerSubtitle:
      'A path of learning and building with a focus on real impact',
    items: [
      {
        id: 'interest-2023',
        year: '2023-',
        title: 'Interest and start',
        description:
          'Late 2023 I become interested in technology and get into UTN.',
        skills: ['Exploration', 'Self‑learning', 'UTN Admission'],
        side: 'left'
      },
      {
        id: 'start-2024',
        year: '2024',
        title: 'Getting started in Web Dev',
        description:
          'First projects and foundations in HTML, CSS and JavaScript. Growing interest in building useful and well‑designed products.',
        skills: ['HTML', 'CSS', 'JavaScript'],
        side: 'right'
      },
      {
        id: 'frontend-2024',
        year: '2024',
        title: 'Modern Frontend',
        description:
          'Deepening React, TypeScript and Tailwind to craft fast, clear and scalable interfaces.',
        skills: ['React', 'TypeScript', 'Tailwind'],
        side: 'left'
      },
      {
        id: 'backend-2025',
        year: '2025',
        title: 'Full Stack',
        description:
          'Adding Node.js, Express and MongoDB to deliver simple and maintainable end‑to‑end solutions.',
        skills: ['Node.js', 'Express', 'MongoDB'],
        side: 'right'
      },
      {
        id: 'education-2025',
        year: '2025',
        title: 'Ongoing education',
        description:
          'Start of Software Development (IFTS No.29) and continuation of Systems Engineering (UTN).',
        skills: ['Fundamentals', 'Best practices', 'Architecture'],
        side: 'left'
      }
    ]
  },
  cta: {
    kicker: 'Let\'s collaborate',
    titleLines: ['Ready to build', 'something with real impact?'],
    paragraphs: [
      'I\'m looking to contribute to teams that value quality, clarity and impact. I enjoy designing simple solutions that work well and scale without friction.',
      'If you\'re interested in working together, I can help turn ideas into products while keeping performance and user experience as top priorities.'
    ],
    buttons: { primary: 'View Projects', secondary: 'Download CV' },
    stats: [
      { value: 'Full Stack', label: 'React · TS · Node · Mongo' },
      { value: 'UX', label: 'Clarity and trust' },
      { value: 'Learning', label: 'Continuous training' }
    ],
    quote:
      'I aim to build software people actually want to use: useful, clear and fast.'
  }
};
