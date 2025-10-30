import { ProjectsData } from "./projectsTypes";

export const projectsEn: ProjectsData = {
  title: "Projects",
  filterLabel: "Filter:",
  filterAll: "All",
  filterAriaLabel: "Filter by tag",
  previewAlt: "Preview of",
  viewDemo: "View demo",
  statusReady: "status: Ready",
  projects: [
    {
      id: "3dportfolio",
      title: "3D Portfolio",
      description:
        "Interactive 3D portfolio developed with React Three Fiber and Three.js. Features smooth animations with GSAP and three-dimensional models for an immersive experience.",
      tags: ["React", "Three.js", "R3F", "GSAP", "TypeScript", "tailwind", "Vercel"],
      demo: "https://github.com/adrian161103/3DPortfolio",
      image: "/projects/3dweb.png",
      imageAlt: "Screenshot of 3dweb portfolio",

    },
    {
      id: "adrianweb",
      title: "AdrianWeb",
      description:
        "My first personal portfolio. Developed with React, Framer Motion and React Router. Deployed on GitHub Pages with fluid animations and responsive design.",
      tags: ["React", "Framer Motion", "javascript", "Github Pages"],
      demo: "https://adrian161103.github.io/AdrianWeb/",
      image: "/projects/adrianweb.png",
      imageAlt: "Screenshot of AdrianWeb portfolio",
    },
    {
      id: "andrea-dorado",
      title: "LandingPage – Andrea Dorado",
      description:
        "Professional landing page optimized for SEO and Core Web Vitals. Built with React, Tailwind CSS and Vite, implementing best practices for accessibility and performance.",
      tags: ["React", "Tailwind", "SEO", "Vercel"],
      demo: "https://www.andreadorado.com.ar/",
      image: "/projects/andrea.png",
      imageAlt: "Screenshot of Andrea Dorado landing page",
    },
    {
      id: "aura",
      title: "Aura",
      description:
        "Modern web application developed in a team with React and React Router. Elegant interface with Tailwind CSS and scalable architecture using TypeScript.",
      tags: ["React", "TypeScript", "Tailwind", "Router","Postman", "Netlify"],
      demo: "https://github.com/adrian161103/Aura",
      image: "/projects/aura.jpeg",
      imageAlt: "Screenshot of Aura application",
    },
    {
      id: "tienda-fitness",
      title: "Tienda Fitness – Pedro Lamanna",
      description:
        "Full-stack application with React, Node.js and MongoDB. Includes JWT authentication, REST API, animations with GSAP and Framer Motion, and dynamic responsive interface.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Full Stack", "javascript", "Postman", "Vercel"],
      demo: "https://www.pedrolamanna.com/",
      image: "/projects/pedro.png",
      imageAlt: "Screenshot of Pedro Lamanna fitness store",
    },
  ],
};
