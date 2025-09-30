import React from "react";

export default function About() {
  return (
    <div className="bg-[#fdfaf4] text-black font-serif text-[14px] leading-relaxed p-6 border border-[#8b5e3c] shadow-md">
      {/* Encabezado retro */}
      <h1 className="text-3xl font-bold mb-2 text-[#5a3825]">✨ Bienvenido ✨</h1>
      <h2 className="text-xl font-bold mb-4">Soy Adrián Keoma Alejos García</h2>

      {/* Intro narrativa */}
      <p className="mb-4">
        Hola! Soy <b>Full-Stack Web Developer</b> de Buenos Aires y estudiante de{" "}
        <b>Ingeniería en Sistemas en la UTN</b>. También curso la{" "}
        <b>Tecnicatura en Desarrollo de Software en el IFTS Nº29</b> y finalicé
        la <b>Certificación Full Stack Web en la UTN</b> en 2025.
      </p>

      <p className="mb-4">
        Este sitio está inspirado en las viejas páginas web de los 90s, cuando
        los fondos eran texturas, los botones parecían de Windows 98 y los
        visitantes encontraban gifs de “Under Construction 🚧”.
      </p>

      <hr className="border-t-2 border-[#8b5e3c] my-4" />

      {/* Habilidades narradas */}
      <h3 className="text-lg font-bold text-[#5a3825]">💾 Mis herramientas</h3>
      <p className="mb-4">
        Me especializo en <b>React, TypeScript y Tailwind</b>, con animaciones en{" "}
        <b>GSAP y Framer Motion</b>. En backend uso <b>Node.js</b> y{" "}
        <b>Express</b>, junto con bases de datos <b>MySQL</b> y <b>MongoDB</b>.  
        También aplico <i>SEO, accesibilidad</i> y <i>performance</i>.
      </p>

      <ul className="list-disc pl-6 mb-4">
        <li>Frontend: React.js, Tailwind CSS, Vite</li>
        <li>Animaciones: GSAP, Framer Motion</li>
        <li>Backend: Node.js, Express.js</li>
        <li>DB: MongoDB y MySQL</li>
        <li>Herramientas: GitHub, Postman, GitFlow</li>
      </ul>

      <hr className="border-t-2 border-[#8b5e3c] my-4" />

      {/* Bloque personal */}
      <h3 className="text-lg font-bold text-[#5a3825]">🎮 Más sobre mí</h3>
      <p className="mb-4">
        Además de programar, me gusta crear <b>modelos 3D en Blender</b>,
        experimentar con <i>diseños retro</i> y jugar videojuegos clásicos.
        Siempre busco combinar lo mejor del pasado con las tecnologías actuales.
      </p>

      <p className="mb-4">
        Mi objetivo es seguir creciendo como desarrollador y mantener vivo el
        espíritu de la web clásica ✨.
      </p>

      <hr className="border-t-2 border-[#8b5e3c] my-4" />

      {/* Contacto retro */}
      <h3 className="text-lg font-bold text-[#5a3825]">✉️ Contacto</h3>
      <ul className="list-disc pl-6">
        <li>
          📧{" "}
          <a href="mailto:adriankeomaa@gmail.com" className="text-blue-700 underline">
            adriankeomaa@gmail.com
          </a>
        </li>
        <li>
          🐙{" "}
          <a href="https://github.com/adrian161103" target="_blank" className="text-blue-700 underline">
            github.com/adrian161103
          </a>
        </li>
        <li>
          💼{" "}
          <a
            href="https://www.linkedin.com/in/adrianalejosgarcia"
            target="_blank"
            className="text-blue-700 underline"
          >
            linkedin.com/in/adrianalejosgarcia
          </a>
        </li>
      </ul>

      <p className="mt-6 italic text-[#5a3825]">
        © 2025 — Construido con espíritu retro 🖥️
      </p>
    </div>
  );
}
