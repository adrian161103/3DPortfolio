import React from "react";

export default function Projects() {
  return (
    <div className="bg-[#fdfaf4] text-black font-serif text-[14px] leading-relaxed p-6 border border-[#8b5e3c] shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#5a3825]">📂 Mis Proyectos</h1>

      <p className="mb-4">
        Aquí encontrarás algunos de mis proyectos más destacados. Todos fueron
        creados con tecnologías modernas, pero con una pizca de espíritu retro ✨.
      </p>

      <ul className="list-disc pl-6 space-y-3">
        <li>
          <b>Aura (Foo Talent Group):</b> Panel interno desarrollado en{" "}
          React + TypeScript + Tailwind.  
          <a
            href="https://github.com/AuraFTG/aura-frontend"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline ml-1"
          >
            Ver repositorio
          </a>
        </li>
        <li>
          <b>Tienda Fitness:</b> E-commerce con React, Node.js, Express y MongoDB.
          Incluye autenticación y animaciones con Framer Motion.  
          <a
            href="https://github.com/adrian161103/fitness-store"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline ml-1"
          >
            Ver repositorio
          </a>
        </li>
        <li>
          <b>LandingPage Andrea Dorado:</b> Landing profesional optimizada para SEO
          y Core Web Vitals. Deploy en Vercel.  
          <a
            href="https://github.com/adrian161103/LandingPage-AndreaDorado"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline ml-1"
          >
            Ver repositorio
          </a>
        </li>
        <li>
          <b>Andes Airlines Check-in API:</b> API REST con Node.js, Express, TypeScript
          y MySQL (Prisma). Reglas de asignación de asientos y validaciones con Zod.  
          <a
            href="https://github.com/Andes-checkin-api"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline ml-1"
          >
            Ver repositorio
          </a>
        </li>
        <li>
          <b>AdrianWeb — Portfolio:</b> Mi portafolio personal con estética retro y
          animaciones en GSAP + Framer Motion.  
          <a
            href="https://adrian161103.github.io/AdrianWeb/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline ml-1"
          >
            Ver sitio
          </a>
        </li>
      </ul>

      <p className="mt-6 italic text-[#5a3825]">
        Más proyectos e ideas en construcción vendrán pronto 🚧.
      </p>
    </div>
  );
}
