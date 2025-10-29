import { AboutPageData } from './aboutTypes';

export const aboutEs: AboutPageData = {
  hero: {
    kickerLeft: 'ABOUT / FULL STACK WEB DEVELOPER',
    kickerRight: 'EST. 2025',
    titleTop: 'FULL STACK',
    titleBottom: 'DEVELOPER',
    subtitle:
      'React, TypeScript, Tailwind, Node.js y MongoDB. Enfoque en performance y UX. Sistemas (UTN) + Desarrollo de software (IFTS N°29).',
    ctaLabel: 'Ver Proyectos',
    stats: [
      { label: 'Stack', value: 'React · TS · Tailwind · Node · Mongo' },
      { label: 'Formación', value: 'UTN + IFTS N°29' },
      { label: 'Proyectos', value: 'Sitios personales + freelance' }
    ]
  },
  bio: {
    kicker: 'Sobre mí / Profesional',
    heading: ['Soy Adrián Alejos García,', ' Full Stack Web Developer'],
    paragraphs: [
      'Soy Desarrollador Web Full-Stack orientado a construir interfaces modernas, performantes y accesibles. Trabajo con React y TypeScript, Tailwind CSS y animaciones (GSAP/Framer Motion) para dar vida a productos que inspiran confianza y cercanía, manteniendo buenas prácticas de código (ESLint/Prettier, GitFlow) y una colaboración constante con producto, diseño y backend.',
      'Tengo experiencia creando landing pages orientadas a SEO/Core Web Vitals, e-commerce y paneles internos, integrando APIs REST, autenticación y bases de datos (MongoDB/MySQL), y desplegando en Vercel/Render. También trabajo con experiencias 3D inmersivas usando Three.js, React Three Fiber y Blender para modelado de assets.',
      'Actualmente continúo formándome en Ingeniería en Sistemas (UTN) y Desarrollo de Software (IFTS), mientras aporto en proyectos reales con foco en resultados medibles y experiencias que generen impacto positivo en los usuarios.'
    ],
    columns: [
      {
        title: 'Enfoque',
        items: [
          'Rendimiento y accesibilidad',
          'Experiencia de usuario clara',
          'Código escalable y mantenible',
          'Entrega continua de valor'
        ]
      },
      {
        title: 'Valores',
        items: [
          'Comunicación simple y directa',
          'Aprendizaje continuo',
          'Colaboración y respeto',
          'Orientación a resultados'
        ]
      },
      {
        title: 'Más allá del código',
        items: [
          'Interés por UX/UI',
          'Exploración de nuevas tecnologías',
          'Proyectos con impacto real',
          'Optimización e innovación'
        ]
      }
    ],
    sidebar: {
      stats: [
        { value: 'UTN', label: 'Ing. en Sistemas' },
        { value: 'IFTS N°29', label: 'Tec. en Des. de Software (2025)' },
        { value: 'Full Stack', label: 'React · TS · Node · Mongo' }
      ],
      photo: { src: '/Adrian.jpg', initials: 'AA', alt: 'Adrián Alejos García - Full Stack Web Developer' },
      availability: 'Disponible para trabajo remoto',
      status: 'Abierto a oportunidades'
    },
    quote: {
      text:
        'La tecnología debe acercar a las personas: simple, rápida y con propósito.',
      author: 'Adrián Alejos García'
    }
  },
  skills: {
    headerKicker: 'Skills & Expertise',
    headerTitleTop: 'Excelencia',
    headerTitleBottom: 'Técnica',
    headerSubtitle:
      'Frontend y backend con foco en performance, DX y calidad.',
    categories: [
      {
        title: 'Frontend',
        description: 'Interfaces modernas, accesibles y escalables',
        skills: [
          { name: 'React', level: 80, category: 'framework', icon: '⚛️' },
          { name: 'JavaScript', level: 70, category: 'language', icon: '🟨' },
          { name: 'TypeScript', level: 88, category: 'language', icon: '🔷' },
          { name: 'Tailwind CSS', level: 90, category: 'styling', icon: '🎨' },
          { name: 'Vite', level: 85, category: 'build', icon: '⚡' },
          { name: 'GSAP', level: 76, category: 'animation', icon: '✨' },
          { name: 'Three.js', level: 64, category: '3d', icon: '🌐' }
        ],
        color: 'from-green-400 to-emerald-600',
        accent: 'green'
      },
      {
        title: 'Backend',
        description: 'APIs confiables y simples',
        skills: [
          { name: 'Node.js', level: 75, category: 'backend', icon: '🟢' },
          { name: 'Express', level: 62, category: 'backend', icon: '🚀' },
          { name: 'MongoDB', level: 60, category: 'database', icon: '🍃' },
          { name: 'MySQL', level: 63, category: 'database', icon: '🐬' },
          { name: 'TypeScript', level: 82, category: 'language', icon: '🔷' }
        ],
        color: 'from-blue-400 to-indigo-600',
        accent: 'blue'
      },
      {
        title: 'Herramientas',
        description: 'Ecosistema y flujo de trabajo',
        skills: [
          { name: 'Git', level: 70, category: 'tools', icon: '📦' },
          { name: 'Postman', level: 85, category: 'tools', icon: '📫' },
          { name: 'REST', level: 85, category: 'api', icon: '🔌' }
        ],
        color: 'from-cyan-400 to-blue-600',
        accent: 'cyan'
      },
      {
        title: 'Diseño & UX',
        description: 'Funcionalidad con estética clara',
        skills: [
          { name: 'Figma', level: 55, category: 'design', icon: '🎨' },
          { name: 'UI/UX', level: 72, category: 'design', icon: '💡' },
          { name: 'Blender', level: 55, category: 'design', icon: '🧊' }
        ],
        color: 'from-purple-400 to-pink-600',
        accent: 'purple'
      }
    ]
  },
  timeline: {
    headerTitle: 'Línea de tiempo',
    headerSubtitle:
      'Explora mi recorrido',
    items: [
      {
        id: 'interest-2023',
        year: '2023-',
        title: 'Interés y comienzo',
        description:
          'A finales de 2023 me comienza a interesar la tecnología y consigo ingresar a la UTN.',
        skills: ['Exploración', 'Autodidacta', 'Ingreso UTN'],
        side: 'left'
      },
      {
        id: 'start-2024',
        year: '2024',
        title: 'Inicio en Desarrollo Web',
        description:
          'Primeros proyectos y bases en HTML, CSS y JavaScript. Nace el interés por crear productos útiles y bien diseñados.',
        skills: ['HTML', 'CSS', 'JavaScript'],
        side: 'right'
      },
      {
        id: 'frontend-2024',
        year: '2024',
        title: 'Frontend Moderno',
        description:
          'Profundizo en React, TypeScript y Tailwind para construir interfaces rápidas, claras y escalables.',
        skills: ['React', 'TypeScript', 'Tailwind'],
        side: 'left'
      },
      {
        id: 'backend-2025',
        year: '2025',
        title: 'Full Stack',
        description:
          'Incorporo Node.js, Express y MongoDB para desarrollar soluciones end‑to‑end simples y mantenibles.',
        skills: ['Node.js', 'Express', 'MongoDB'],
        side: 'right'
      },
      {
        id: 'education-2025',
        year: '2025',
        title: 'Formación en curso',
        description:
          'Inicio la Tecnicatura en Desarrollo de Software (IFTS N°29) y continúo Sistemas (UTN).',
        skills: ['Fundamentos', 'Buenas prácticas', 'Arquitectura'],
        side: 'left'
      }
    ]
  },
  cta: {
    kicker: 'Colaboremos',
    titleLines: ['¿Listos para construir', 'algo con impacto real?'],
    paragraphs: [
      'Busco aportar a equipos que valoren la calidad, la claridad y el impacto. Disfruto diseñar soluciones simples que funcionan bien y escalan sin fricción.',
      'Si te interesa trabajar conmigo, puedo ayudarte a transformar ideas en productos concretos, manteniendo performance y experiencia de usuario como prioridad.'
    ],
    buttons: { primary: 'Ver Proyectos', secondary: 'Descargar CV' },
    stats: [
      { value: 'Full Stack', label: 'React · TS · Node · Mongo' },
      { value: 'UX', label: 'Claridad y confianza' },
      { value: 'Aprendizaje', label: 'Formación continua' }
    ],
    quote:
      'Me interesa crear software que la gente quiera usar: útil, claro y rápido.'
  }
};
