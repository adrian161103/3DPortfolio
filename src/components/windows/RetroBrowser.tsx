import { useState } from "react";

type Page = "home" | "about" | "projects" | "contact";

export default function RetroBrowser() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = () => {
    switch (page) {
      case "about":
        return <p>Bienvenido a la página About 🌐</p>;
      case "projects":
        return (
          <ul className="list-disc pl-6">
            <li>Proyecto 1</li>
            <li>Proyecto 2</li>
            <li>Proyecto 3</li>
          </ul>
        );
      case "contact":
        return (
          <div>
            <p>Podés contactarme en:</p>
            <p>
              <a href="mailto:adrian@example.com" className="text-blue-600 underline">
                adrian@example.com
              </a>
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <p>
              <button onClick={() => setPage("about")} className="text-blue-600 underline cursor-pointer">
                About
              </button>
            </p>
            <p>
              <button onClick={() => setPage("projects")} className="text-blue-600 underline cursor-pointer">
                Projects
              </button>
            </p>
            <p>
              <button onClick={() => setPage("contact")} className="text-blue-600 underline cursor-pointer">
                Contact
              </button>
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-[#c0c0c0] p-1 flex items-center gap-1 border-b-2 border-[#808080]">
        <button className="bg-[#c0c0c0] border-2 border-white px-2 text-sm" onClick={() => window.history.go(-1)}>🏠</button>
        <button className="bg-[#c0c0c0] border-2 border-white px-2 text-sm" onClick={() => setPage("home")}>
          ⟳
        </button>
        <input
          type="text"
          readOnly
          value={`http://retro.local/${page}`}
          className="flex-1 px-2 py-0.5 border-2 border-white bg-white text-[13px] font-[Tahoma]"
        />
      </div>

      {/* Contenido */}
      <div className="p-2 bg-white flex-1 overflow-y-auto text-[14px]">{renderPage()}</div>
    </div>
  );
}
