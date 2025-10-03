import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { aboutEs } from "../../../data/windowsAbout/about.es";
import { aboutEn } from "../../../data/windowsAbout/about.en";
import { AboutData } from "../../../data/windowsAbout/aboutTypes";

/** Paleta y helpers comunes */
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
        <h2 className="text-[1.75rem] font-bold tracking-wide">{title}</h2> 
        <div className="flex items-center gap-2">{right}</div>
      </header>
      <div className={ui.content}>{children}</div>
    </section>
  );
}

/** Título de sección interna (group box) */
function Win98Section({ label }: { label: string }) {
  return (
    <div className="relative mt-12 mb-6">
      <div className="absolute -top-6 left-4 bg-gray-300 px-2 text-2xl font-bold"> 
        {label}
      </div>
      <div className={`${ui.bevel} ${ui.inset} h-0.5`} /> 
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
      className={`${ui.surface} ${ui.bevel} ${ui.font} px-6 py-2 text-[1.75rem] leading-none active:translate-x-0.5 active:translate-y-0.5 ${className}`}
    >  
      {children}
    </button>
  );
}

export default function About() {
  const { language } = useLanguage();
  const about: AboutData = language === "es" ? aboutEs : aboutEn;

  return (
    <div className="w-full p-0">
      <Win98Window
        title="About"
        right={<Win98Button aria-label="Opciones">…</Win98Button>}
      >
        {/* Header principal */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Avatar */}
          <div
            className={`${ui.bevel} ${ui.inset} w-60 h-60 mx-auto md:mx-0 overflow-hidden`}
            aria-hidden
          >
            <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#d9d9d9_0_24px,#e5e5e5_24px_48px)]"></div>
          </div>

          {/* Intro */}
          <div className="space-y-4">
            <h1 className="text-[2.5rem] font-bold">{about.name}</h1>
            {about.bio.map((paragraph, i) => (
              <p key={i} className="text-[1.75rem] leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="flex gap-4 pt-2">
              <Win98Button>CV</Win98Button>
              <Win98Button>Portfolio</Win98Button>
            </div>
          </div>
        </div>

        {/* Sección Perfil */}
        <Win98Section label="Perfil" />
        <div className="grid md:grid-cols-3 gap-4">
          <ul className={`${ui.bevel} ${ui.inset} p-6 text-[1.75rem] space-y-2`}>
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

          <div className={`${ui.bevel} ${ui.inset} p-6 text-[1.75rem] md:col-span-2`}>
            <p className="leading-relaxed">{about.profile.texto}</p>
          </div>
        </div>

        {/* Sección Habilidades */}
        <Win98Section label="Habilidades clave" />
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`${ui.bevel} ${ui.inset} p-6`}>
            <h3 className="text-[1.75rem] font-bold mb-4">Tecnologías</h3>
            <ul className="list-disc pl-10 text-[1.75rem] space-y-2">
              {about.skills.tecnologias.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className={`${ui.bevel} ${ui.inset} p-6`}>
            <h3 className="text-[1.75rem] font-bold mb-4">Colaboración</h3>
            <ul className="list-disc pl-10 text-[1.75rem] space-y-2">
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
