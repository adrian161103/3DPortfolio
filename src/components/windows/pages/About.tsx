import React from "react";

/** Paleta y helpers comunes */
const ui = {
  surface: "bg-[#c0c0c0] text-[#111]",
  bevel:
    // Borde “3D” Win98: luz arriba/izq, sombra abajo/der
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
            {/* Placeholder cuadrícula suave */}
            <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#d9d9d9_0_12px,#e5e5e5_12px_24px)]"></div>
          </div>

          {/* Intro */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold">Adrián Alejos Garcia</h1>
            <p className="text-sm leading-6">
              Desarrollador orientado a producto con foco en accesibilidad,
              rendimiento y detalle. Me motiva diseñar experiencias retro que se
              sienten modernas por dentro: arquitectura clara, buenas prácticas
              y DX agradable.
            </p>
            <p className="text-sm leading-6">
              Actualmente trabajo con <strong>React + TypeScript + Tailwind</strong>
              , animaciones con GSAP/Framer y patrones de estado simples.
              También documento, maqueto y mantengo UI kits livianos para
              equipos pequeños.
            </p>

            <div className="flex gap-2 pt-1">
              <Win98Button>Descargar CV</Win98Button>
              <Win98Button>Portafolio</Win98Button>
            </div>
          </div>
        </div>

        {/* Secciones */}
        <Win98Section label="Perfil">
          {/* Solo separador visual */}
        </Win98Section>
        <div className="grid md:grid-cols-3 gap-4">
          <ul className={`${ui.bevel} ${ui.inset} p-3 text-sm space-y-1`}>
            <li>
              <span className="font-bold">Rol:</span> Full-Stack / Front-end
              Developer
            </li>
            <li>
              <span className="font-bold">Stack:</span> React, TS, Tailwind,
              Vite
            </li>
            <li>
              <span className="font-bold">Intereses:</span> UI retro, DX, 3D
            </li>
          </ul>

          <div className={`${ui.bevel} ${ui.inset} p-3 text-sm md:col-span-2`}>
            <p className="leading-6">
              Me enfoco en construir interfaces que comuniquen con claridad.
              Priorizo estados vacíos útiles, micro-interacciones discretas y
              layouts que escalen. Creo que una app “rápida” es aquella que
              explica qué está pasando, no solo la que carga en milisegundos.
            </p>
          </div>
        </div>

        <Win98Section label="Habilidades clave" />
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`${ui.bevel} ${ui.inset} p-3`}>
            <h3 className="text-sm font-bold mb-2">Front-end</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Componentes desacoplados y estados predecibles.</li>
              <li>Diseño responsivo sin romper el estilo retro.</li>
              <li>Accesibilidad: navegación por teclado y roles ARIA.</li>
            </ul>
          </div>
          <div className={`${ui.bevel} ${ui.inset} p-3`}>
            <h3 className="text-sm font-bold mb-2">Colaboración</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Docs vivas, changelogs y convenciones claras.</li>
              <li>Revisiones de código enfocadas en intent y DX.</li>
              <li>Diseño por tokens: colores, espaciados y capas.</li>
            </ul>
          </div>
        </div>
      </Win98Window>
    </div>
  );
}
