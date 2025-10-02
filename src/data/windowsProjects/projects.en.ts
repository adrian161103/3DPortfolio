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
      id: "retrofolio",
      title: "Retrofolio",
      description:
        "Minimal portfolio with Win98 aesthetics. Includes simple router, stackable windows and IE-style loader.",
      tags: ["React", "TS", "Tailwind"],
    },
    {
      id: "termux",
      title: "TermUX",
      description:
        "Web terminal with dummy commands, autocomplete and monochrome themes. Ideal for demos.",
      tags: ["UI", "A11y", "DX"],
    },
    {
      id: "aura-lite",
      title: "Aura Lite",
      description:
        "Retro component kit: buttons, inputs, cards and status bars with tokens and variants.",
      tags: ["Design System", "Tokens"],
    },
    {
      id: "sprite-studio",
      title: "Sprite Studio",
      description:
        "Simple 16×16 sprite editor with PNG export and keyboard shortcuts. Perfect for pixel-art icons.",
      tags: ["Canvas", "Tools"],
    },
    {
      id: "winmail",
      title: "WinMail",
      description:
        "Fictional email client with inbox, reading, filters and simulated offline state.",
      tags: ["UX", "State"],
    },
    {
      id: "mines98",
      title: "Mines 98",
      description:
        "Accessible Minesweeper clone with keyboard, visible focus ring and crisp scaling.",
      tags: ["Game", "Accessibility"],
    },
  ],
};
