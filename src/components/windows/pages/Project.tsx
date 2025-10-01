import React, { useMemo, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageAlt?: string;
};

const ui = {
  surface: "bg-[#c0c0c0] text-[#111]",
  bevel:
    "border-t border-l border-white border-b-2 border-r-2 border-b-[#7a7a7a] border-r-[#7a7a7a]",
  inset:
    "shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] rounded-[2px]",
  titlebar:
    "bg-gradient-to-r from-[#000080] to-[#1b89d6] text-white h-8 px-2 flex items-center justify-between select-none",
  content: "p-4 md:p-5",
  font: "font-sans [font-family:Tahoma,Segoe_UI,Arial,sans-serif]",
};

function Win98Window({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section
      className={`${ui.surface} ${ui.bevel} ${ui.font} rounded-[3px] overflow-hidden`}
      role="region"
      aria-label={title}
    >
      <header className={ui.titlebar}>
        <h2 className="text-sm font-bold">{title}</h2>
        <div className="flex items-center gap-2">{right}</div>
      </header>
      <div className={ui.content}>{children}</div>
    </section>
  );
}

function Win98Button({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`${ui.surface} ${ui.bevel} ${ui.font} px-3 py-1 text-sm leading-none active:translate-x-[1px] active:translate-y-[1px] ${className}`}
    >
      {children}
    </button>
  );
}

function Tag({ t }: { t: string }) {
  return (
    <span
      className={`${ui.surface} ${ui.bevel} text-[11px] px-2 py-[2px] mr-1`}
    >
      {t}
    </span>
  );
}

const ALL_PROJECTS: Project[] = [
  {
    id: "retrofolio",
    title: "Retrofolio",
    description:
      "Portfolio minimal con estética Win98. Includes router simple, ventanas apilables y loader estilo IE.",
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
];

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const tags = useMemo(() => {
    const t = new Set<string>();
    ALL_PROJECTS.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return ["All", ...Array.from(t)];
  }, []);

  const projects = ALL_PROJECTS.filter(
    (p) => filter === "All" || p.tags.includes(filter)
  );

  return (
    <div className="w-full h-full p-0">
      <Win98Window
        title="Projects"
        right={
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-90">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`${ui.surface} ${ui.bevel} ${ui.font} text-xs px-1 py-[2px]`}
              aria-label="Filtrar por etiqueta"
            >
              {tags.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        }
      >
        <ul
          role="list"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
        >
          {projects.map((p) => (
            <li key={p.id} className={`${ui.surface} ${ui.bevel} p-2`}>
              {/* Preview */}
              <div
                className={`${ui.inset} aspect-[4/3] mb-2 overflow-hidden`}
                aria-label={`Vista previa de ${p.title}`}
              >
                {/* Placeholder “retro screenshot” */}
                <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#d9d9d9_0_8px,#e6e6e6_8px_16px)]" />
              </div>

              {/* Texto */}
              <h3 className="text-sm font-bold mb-1">{p.title}</h3>
              <p className="text-sm leading-6 line-clamp-4">{p.description}</p>

              {/* Tags */}
              <div className="mt-2">
                {p.tags.map((t) => (
                  <Tag key={t} t={t} />
                ))}
              </div>

              {/* Acción */}
              <div className="mt-3 flex items-center justify-between">
                <Win98Button>Ver demo</Win98Button>
                <span className="text-[11px] opacity-75">status: Ready</span>
              </div>
            </li>
          ))}
        </ul>
      </Win98Window>
    </div>
  );
}
