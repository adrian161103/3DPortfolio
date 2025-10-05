import React, { useMemo, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { projectsEs } from "../../../data/windowsProjects/projects.es";
import { projectsEn } from "../../../data/windowsProjects/projects.en";
import { ProjectsData } from "../../../data/windowsProjects/projectsTypes";

const ui = {
  surface: "bg-gray-300 text-gray-900",
  bevel:
    "border-t border-l border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600",
  inset:
    "shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] rounded-sm",
  titlebar:
    "bg-gradient-to-r from-blue-900 to-blue-500 text-white h-16 px-4 flex items-center justify-between select-none",
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
        <h2 className="text-[1.75rem] font-bold">{title}</h2>
        <div className="flex items-center gap-4">{right}</div>
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
      className={`${ui.surface} ${ui.bevel} ${ui.font} px-6 py-2 text-[1.75rem] leading-none active:translate-x-0.5 active:translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  );
}

function Tag({ t }: { t: string }) {
  return (
    <span
      className={`${ui.surface} ${ui.bevel} text-[1.375rem] px-4 py-1 mr-2 mb-2 inline-block`}
    >
      {t}
    </span>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const data: ProjectsData = language === "es" ? projectsEs : projectsEn;
  
  const [filter, setFilter] = useState<string>(data.filterAll);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const tags = useMemo(() => {
    const t = new Set<string>();
    data.projects.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return [data.filterAll, ...Array.from(t)];
  }, [data]);

  const projects = data.projects.filter(
    (p) => filter === data.filterAll || p.tags.includes(filter)
  );

  return (
    <div className="w-full p-0">
      <Win98Window
        title={data.title}
        right={
          <div className="flex items-center gap-1">
            <span className="text-[1.25rem] opacity-90">{data.filterLabel}</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`${ui.surface} ${ui.bevel} ${ui.font} text-[1.25rem] px-2 py-0.5 max-w-35 [transform-style:flat]`}
              aria-label={data.filterAriaLabel}
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'translateZ(0)'
              }}
            >
              {tags.map((t) => (
                <option key={t} style={{ fontSize: '12px' }}>{t}</option>
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
            <li key={p.id} className={`${ui.surface} ${ui.bevel} p-4`}>
              {/* Preview */}
              <div
                className={`${ui.inset} aspect-[4/3] mb-4 overflow-hidden bg-gray-200 cursor-pointer group`}
                aria-label={`${data.previewAlt} ${p.title}`}
              >
                {p.image ? (
                  <img 
                    src={p.image} 
                    alt={p.imageAlt || `${data.previewAlt} ${p.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  /* Placeholder "retro screenshot" */
                  <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#d9d9d9_0_16px,#e6e6e6_16px_32px)]" />
                )}
              </div>

              {/* Texto */}
              <h3 className="text-[1.75rem] font-bold mb-2">{p.title}</h3>
              <div
                className="relative cursor-pointer select-none"
                onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
              >
                <p className={`text-[1.75rem] leading-relaxed transition-all duration-300 ${
                  expandedProject === p.id ? '' : 'line-clamp-3'
                }`}>
                  {p.description}
                </p>
                {expandedProject !== p.id && p.description.length > 100 && (
                  <span className="text-blue-600 underline text-[1.375rem] mt-1 inline-block hover:text-blue-800">
                    Leer más...
                  </span>
                )}
                {expandedProject === p.id && p.description.length > 100 && (
                  <span className="text-blue-600 underline text-[1.375rem] mt-1 inline-block hover:text-blue-800">
                    Leer menos
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap">{p.tags.map((t) => (
                  <Tag key={t} t={t} />
                ))}
              </div>

              {/* Acción */}
              <div className="mt-6 flex items-center justify-between">
                <Win98Button
                  onClick={() => p.demo && window.open(p.demo, '_blank', 'noopener,noreferrer')}
                  disabled={!p.demo}
                  className={!p.demo ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                >
                  {data.viewDemo}
                </Win98Button>
                <span className="text-[1.375rem] opacity-75">{data.statusReady}</span>
              </div>
            </li>
          ))}
        </ul>
      </Win98Window>
    </div>
  );
}
