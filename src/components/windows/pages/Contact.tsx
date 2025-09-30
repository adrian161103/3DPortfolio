import React from "react";

export default function Contact() {
  return (
    <div className="bg-[#fdfaf4] text-black font-serif text-[14px] leading-relaxed p-6 border border-[#8b5e3c] shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#5a3825]">✉️ Contacto</h1>

      <p className="mb-4">
        Si querés ponerte en contacto conmigo, aquí tenés varias formas de hacerlo.
        No dudes en escribirme, ya sea para charlar sobre proyectos, colaborar o
        simplemente compartir un buen recuerdo retro 💾.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          📧 Email:{" "}
          <a
            href="mailto:adriankeomaa@gmail.com"
            className="text-blue-700 underline"
          >
            adriankeomaa@gmail.com
          </a>
        </li>
        <li>
          🐙 GitHub:{" "}
          <a
            href="https://github.com/adrian161103"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline"
          >
            github.com/adrian161103
          </a>
        </li>
        <li>
          💼 LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/adrianalejosgarcia"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline"
          >
            linkedin.com/in/adrianalejosgarcia
          </a>
        </li>
        <li>
          🌐 Portafolio:{" "}
          <a
            href="https://adrian161103.github.io/AdrianWeb"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline"
          >
            adrian161103.github.io/AdrianWeb
          </a>
        </li>
      </ul>

      <hr className="border-t-2 border-[#8b5e3c] my-4" />

      <p className="italic text-[#5a3825]">
        © 2025 — Este sitio retro fue creado con cariño por la nostalgia ✨
      </p>
    </div>
  );
}
