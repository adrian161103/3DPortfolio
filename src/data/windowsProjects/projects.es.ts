import { ProjectsData } from "./projectsTypes";

export const projectsEs: ProjectsData = {
  title: "Proyectos",
  filterLabel: "Filtro:",
  filterAll: "Todos",
  filterAriaLabel: "Filtrar por etiqueta",
  previewAlt: "Vista previa de",
  viewDemo: "Ver demo",
  statusReady: "estado: Listo",
  projects: [
    {
      id: "3dportfolio",
      title: "3D Portfolio",
      description:
        "Portafolio interactivo en 3D desarrollado con React Three Fiber y Three.js. Presenta animaciones suaves con GSAP y modelos tridimensionales para una experiencia inmersiva.",
      tags: ["React", "Three.js", "R3F", "GSAP", "TypeScript", "tailwind", "Vercel"],
      demo: "https://github.com/adrian161103/3DPortfolio",
      image: "/projects/3dweb.png",
      imageAlt: "Captura de pantalla del portafolio web 3d",
    },
    {
      id: "adrianweb",
      title: "AdrianWeb",
      description:
        "Mi primer portafolio personal. Desarrollado con React, Framer Motion y React Router. Desplegado en GitHub Pages con animaciones fluidas y diseño responsivo.",
      tags: ["React", "Framer Motion", "javascript", "Github Pages"],
      demo: "https://adrian161103.github.io/AdrianWeb/",
      image: "/projects/adrianweb.png",
      imageAlt: "Captura de pantalla del portafolio AdrianWeb",
    },
    {
      id: "andrea-dorado",
      title: "LandingPage – Andrea Dorado",
      description:
        "Landing page profesional optimizada para SEO y Core Web Vitals. Creada con React, Tailwind CSS y Vite, implementando buenas prácticas de accesibilidad y rendimiento.",
      tags: ["React", "Tailwind", "SEO", "Vercel"],
      demo: "https://www.andreadorado.com.ar/",
      image: "/projects/andrea.png",
      imageAlt: "Captura de pantalla de la landing page de Andrea Dorado",
    },
    {
      id: "aura",
      title: "Aura",
      description:
        "Aplicación web moderna desarrollada en equipo con React y React Router. Interfaz elegante con Tailwind CSS y arquitectura escalable usando TypeScript.",
      tags: ["React", "TypeScript", "Tailwind", "Router","Postman", "Netlify"],
      demo: "https://github.com/adrian161103/Aura",
      image: "/projects/aura.jpeg",
      imageAlt: "Captura de pantalla de la aplicación Aura",
    },
    {
      id: "tienda-fitness",
      title: "Tienda Fitness – Pedro Lamanna",
      description:
        "Aplicación full-stack con React, Node.js y MongoDB. Incluye autenticación JWT, API REST, animaciones con GSAP y Framer Motion, e interfaz dinámica y responsive.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Full Stack", "javascript", "Postman", "Vercel"],
      demo: "https://www.pedrolamanna.com/",
      image: "/projects/pedro.png",
      imageAlt: "Captura de pantalla de la tienda fitness de Pedro Lamanna",
    },
  ],
};
