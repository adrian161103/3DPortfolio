import { ProjectsData } from "./projectsTypes";

export const projectsEn: ProjectsData = {
  uiText: {
    title: "Project_Database",
    searchPlaceholder: "Search projects...",
    filterAll: "All",
    projectsFound: "Projects found:",
    systemOnline: "System: ONLINE",
    year: "Year",
    project: "Project",
    agency: "Agency",
    type: "Type",
    status: "Status",
    previous: "< Previous",
    next: "Next >",
    noResults: "No projects found matching your search.",
    visitProject: "Visit Project",
    close: "Close",
    readMore: "Read more...",
    readLess: "Read less",
    loading: "Accessing database",
    statusCompleted: "Completed",
    statusInProgress: "In Progress",
    statusPlanned: "Planned",
    clearFilters: "Clear filters"
  },
  projects: [
    { 
      id: "3dportfolio", 
      year: '2025', 
      name: '3D Portfolio', 
      agency: 'Personal', 
      type: 'Development & Design',
      image: '/projects/3dweb.png',
      url: 'https://github.com/adrian161103/3DPortfolio',
      description: 'Interactive 3D portfolio developed with React Three Fiber and Three.js. Features smooth animations with GSAP and three-dimensional models for an immersive experience.',
      technologies: ['React', 'Three.js', 'R3F', 'GSAP', 'TypeScript', 'tailwind', 'Vercel'],
      status: 'completed'
    },
    { 
      id: "adrianweb", 
      year: '2025', 
      name: 'AdrianWeb', 
      agency: 'Personal', 
      type: 'Portfolio',
      image: '/projects/adrianweb.png',
      url: 'https://adrian161103.github.io/AdrianWeb/',
      description: 'My first personal portfolio. Developed with React, Framer Motion and React Router. Deployed on GitHub Pages with fluid animations and responsive design.',
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
      description: 'Professional landing page optimized for SEO and Core Web Vitals. Built with React, Tailwind CSS and Vite, implementing best practices for accessibility and performance.',
      technologies: ['React', 'Tailwind', 'SEO', 'Vercel'],
      status: 'completed'
    },
    { 
      id: "aura", 
      year: '2025', 
      name: 'Aura', 
      agency: 'Team Project', 
      type: 'Web Application',
      image: '/projects/aura.jpeg',
      url: 'https://github.com/adrian161103/Aura',
      description: 'Modern web application developed in a team with React and React Router. Elegant interface with Tailwind CSS and scalable architecture using TypeScript.',
      technologies: ['React', 'TypeScript', 'Tailwind', 'Router', 'Postman', 'Netlify'],
      status: 'completed'
    },
    { 
      id: "tienda-fitness", 
      year: '2025', 
      name: 'Tienda Fitness – Pedro Lamanna', 
      agency: 'Freelance', 
      type: 'Full-Stack Application',
      image: '/projects/pedro.png',
      url: 'https://www.pedrolamanna.com/',
      description: 'Full-stack application with React, Node.js and MongoDB. Includes JWT authentication, REST API, animations with GSAP and Framer Motion, and dynamic responsive interface.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Full Stack', 'javascript', 'Postman', 'Vercel'],
      status: 'completed'
    }
  ]
};