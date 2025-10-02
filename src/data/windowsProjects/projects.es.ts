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
      id: "retrofolio",
      title: "Retrofolio",
      description:
        "Portfolio minimal con estética Win98. Incluye router simple, ventanas apilables y loader estilo IE.",
      tags: ["React", "TS", "Tailwind"],
    },
    {
      id: "termux",
      title: "TermUX",
      description:
        "Terminal web con comandos ficticios, autocompletado y temas monocromos. Ideal para demos.",
      tags: ["UI", "A11y", "DX"],
    },
    {
      id: "aura-lite",
      title: "Aura Lite",
      description:
        "Kit de componentes retro: botones, inputs, cards y barras de estado con tokens y variantes.",
      tags: ["Design System", "Tokens"],
    },
    {
      id: "sprite-studio",
      title: "Sprite Studio",
      description:
        "Editor simple de sprites 16×16 con export PNG y atajos de teclado. Perfecto para íconos pixel-art.",
      tags: ["Canvas", "Tools"],
    },
    {
      id: "winmail",
      title: "WinMail",
      description:
        "Cliente de correo ficticio con bandeja, lectura, filtros y estado offline simulado.",
      tags: ["UX", "State"],
    },
    {
      id: "mines98",
      title: "Mines 98",
      description:
        "Clon accesible de Buscaminas con teclado, focus ring visible y escalado nítido.",
      tags: ["Game", "Accessibility"],
    },
  ],
};
