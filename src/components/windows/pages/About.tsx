import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { aboutEs } from "../../../data/about.es";
import { aboutEn } from "../../../data/about.en";
import { AboutData } from "../../../data/aboutTypes";

/** Paleta y helpers comunes */
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

/** Contenedor de ventana Win98 */
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
        <h2 className="text-sm font-bold tracking-wide">{title}</h2>
        <div className="flex items-center gap-1">{right}</div>
      </header>
      <div className={ui.content}>{children}</div>
    </section>
  );
}

/** Título de sección interna (group box) */
function Win98Section({ label }: { label: string }) {
  return (
    <div className="relative mt-6 mb-3">
      <div className="absolute -top-3 left-2 bg-[#c0c0c0] px-1 text-[12px] font-bold">
        {label}
      </div>
      <div className={`${ui.bevel} ${ui.inset} h-[1px]`} />
    </div>
  );
}

/** Botón Win98 */
function Win98Button({
  children,
  className = "",
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      type={type}
      className={`${ui.surface} ${ui.bevel} ${ui.font} px-3 py-1 text-sm leading-none active:translate-x-[1px] active:translate-y-[1px] ${className}`}
    >
      {children}
    </button>
  );
}

export default function About() {
  const { language } = useLanguage();
  const about: AboutData = language === "es" ? aboutEs : aboutEn;

  return (
    <div className="w-full h-full p-0">
      <Win98Window
        title="About"
        right={<Win98Button aria-label="Opciones">…</Win98Button>}
      >
        {/* Header principal */}
        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4">
          {/* Avatar */}
          <div
            className={`${ui.bevel} ${ui.inset} w-[120px] h-[120px] mx-auto md:mx-0 overflow-hidden`}
            aria-hidden
          >
            <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#d9d9d9_0_12px,#e5e5e5_12px_24px)]"></div>
          </div>

          {/* Intro */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold">{about.name}</h1>
            {about.bio.map((paragraph, i) => (
              <p key={i} className="text-sm leading-6">
                {paragraph}
              </p>
            ))}

            <div className="flex gap-2 pt-1">
              <Win98Button>CV</Win98Button>
              <Win98Button>Portfolio</Win98Button>
            </div>
          </div>
        </div>

        {/* Sección Perfil */}
        <Win98Section label="Perfil" />
        <div className="grid md:grid-cols-3 gap-4">
          <ul className={`${ui.bevel} ${ui.inset} p-3 text-sm space-y-1`}>
            <li>
              <span className="font-bold">Rol:</span> {about.profile.rol}
            </li>
            <li>
              <span className="font-bold">Stack:</span> {about.profile.stack}
            </li>
            <li>
              <span className="font-bold">Intereses:</span>{" "}
              {about.profile.intereses}
            </li>
          </ul>

          <div className={`${ui.bevel} ${ui.inset} p-3 text-sm md:col-span-2`}>
            <p className="leading-6">{about.profile.texto}</p>
          </div>
        </div>

        {/* Sección Habilidades */}
        <Win98Section label="Habilidades clave" />
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`${ui.bevel} ${ui.inset} p-3`}>
            <h3 className="text-sm font-bold mb-2">Tecnologías</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {about.skills.tecnologias.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className={`${ui.bevel} ${ui.inset} p-3`}>
            <h3 className="text-sm font-bold mb-2">Colaboración</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {about.skills.colaboracion.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </Win98Window>
    </div>
  );
}
