import { ProjectsData } from "./projectsTypes";

export const projectsEs: ProjectsData = {
  uiText: {
    title: "Base_de_Datos_Proyectos",
    searchPlaceholder: "Buscar proyectos...",
    filterAll: "Todos",
    projectsFound: "Proyectos encontrados:",
    systemOnline: "Sistema: ONLINE",
    year: "Año",
    project: "Proyecto",
    agency: "Agencia",
    type: "Tipo",
    status: "Estado",
    previous: "< Anterior",
    next: "Siguiente >",
    noResults: "No se encontraron proyectos que coincidan con tu búsqueda.",
    visitProject: "Visitar Proyecto",
    close: "Cerrar",
    readMore: "Leer más...",
    readLess: "Leer menos",
    loading: "Accediendo a la base de datos",
    statusCompleted: "Completado",
    statusInProgress: "En progreso",
    statusPlanned: "Planificado",
    clearFilters: "Limpiar filtros"
  },
  projects: [
    { 
      id: "3dportfolio", 
      year: '2025', 
      name: 'Portfolio 3D', 
      agency: 'Personal', 
      type: 'Desarrollo & Diseño',
      image: '/projects/3dweb.png',
      url: 'https://github.com/adrian161103/3DPortfolio',
      description: 'Portfolio interactivo en 3D desarrollado con React Three Fiber y Three.js. Presenta animaciones fluidas con GSAP y modelos tridimensionales para una experiencia inmersiva.',
      technologies: ['React', 'Three.js', 'R3F', 'GSAP', 'TypeScript', 'tailwind', 'Vercel'],
      status: 'in-progress'
    },
    { 
      id: "adrianweb", 
      year: '2025', 
      name: 'AdrianWeb', 
      agency: 'Personal', 
      type: 'Portfolio',
      image: '/projects/adrianweb.png',
      url: 'https://adrian161103.github.io/AdrianWeb/',
      description: 'Mi primer portfolio personal. Desarrollado con React, Framer Motion y React Router. Implementado en GitHub Pages con animaciones fluidas y diseño responsive.',
      technologies: ['React', 'Framer Motion', 'javascript', 'Github Pages'],
      status: 'completed'
    },
    { 
      id: "andrea-dorado", 
      year: '2025', 
      name: 'LandingPage – Andrea Dorado', 
      agency: 'Freelance', 
      type: 'Landing Page',
      image: '/projects/andrea.png',
      url: 'https://www.andreadorado.com.ar/',
      description: 'Landing page profesional optimizada para SEO y Core Web Vitals. Construida con React, Tailwind CSS y Vite, implementando mejores prácticas para accesibilidad y rendimiento.',
      technologies: ['React', 'Tailwind', 'SEO', 'Vercel'],
      status: 'completed'
    },
    { 
      id: "aura", 
      year: '2025', 
      name: 'Aura', 
      agency: 'Proyecto en Equipo', 
      type: 'Aplicación Web',
      image: '/projects/aura.jpeg',
      url: 'https://github.com/adrian161103/Aura',
      description: 'Aplicación web moderna desarrollada en equipo con React y React Router. Interfaz elegante con Tailwind CSS y arquitectura escalable utilizando TypeScript.',
      technologies: ['React', 'TypeScript', 'Tailwind', 'Router', 'Postman', 'Netlify'],
      status: 'completed'
    },
    { 
      id: "tienda-fitness", 
      year: '2025', 
      name: 'Tienda Fitness – Pedro Lamanna', 
      agency: 'Freelance', 
      type: 'Aplicación Full-Stack',
      image: '/projects/pedro.png',
      url: 'https://www.pedrolamanna.com/',
      description: 'Aplicación full-stack con React, Node.js y MongoDB. Incluye autenticación JWT, API REST, animaciones con GSAP y Framer Motion, e interfaz dinámica responsive.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Full Stack', 'javascript', 'Postman', 'Vercel'],
      status: 'completed'
    }
  ]
};