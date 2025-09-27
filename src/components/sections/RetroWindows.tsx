import { useState, useRef, useEffect } from "react";
import RetroWindow from "../windows/RetroWindow";
import RetroBrowser from "../windows/RetroBrowser";

type WindowType =
  | "about"
  | "experience"
  | "projects"
  | "technologies"
  | "minesweeper"
  | "internet"
  | null;

export default function RetroWindows() {
  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleSelect = (icon: string) => {
    setSelectedIcon(icon);
  };
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowStartMenu(false);
      }
    };
    if (showStartMenu)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showStartMenu]);

  const openWindow = (type: WindowType) => {
    if (type && !openWindows.includes(type)) {
      setOpenWindows((prev) => [...prev, type]);
    }
    setShowStartMenu(false);
  };

  const closeWindow = (type: WindowType) => {
    setOpenWindows((prev) => prev.filter((w) => w !== type));
  };

  return (
    <div
      className="retro-desktop"
      onClick={(e) => {
        // Si clickeás en el fondo (no en un ícono)
        if (e.target === e.currentTarget) {
          setSelectedIcon(null);
        }
      }}
    >
      {/* Barra de tareas (se mantiene con CSS clásico) */}
      <div className="taskbar">
        <div className="start-btn ">
        <img src="/icons/windows.png" alt="logo-Windows" className="w-4 h-4" />
        <button
          className="text-[0.65rem]" 
          onClick={() => setShowStartMenu((prev) => !prev)}
        >
          {""}Inicio
        </button>
        </div>
        <div className="taskbar-clock text-xs">12:00</div>
      </div>

      {/* Menú de Inicio (Tailwind) */}
      {showStartMenu && (
        <div
          ref={menuRef}
          className="absolute bottom-6.5 left-0 w-[200px] bg-[#c0c0c0] border-2 border-[#808080] shadow-[4px_4px_0_#00000044] font-[Tahoma] z-[9999]"
        >
          {/* Programas con submenú */}
          <div className="relative group px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white">
            <div className="flex items-center justify-between">
              <span>Programas</span>
              <span className="ml-2">▸</span>
            </div>

            {/* Submenú */}
            <div className="hidden group-hover:block absolute top-0 left-full w-[180px] bg-[#c0c0c0] border-2 border-[#808080] shadow-[4px_4px_0_#00000044]">
              <div
                className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("about")}
              >
                About
              </div>
              <div
                className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("experience")}
              >
                Experience
              </div>
              <div
                className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("projects")}
              >
                Projects
              </div>
              <div
                className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("technologies")}
              >
                Technologies
              </div>
              <div className="h-0.5 bg-[#808080] my-1" />
              <div
                className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("minesweeper")}
              >
                Buscaminas
              </div>
            </div>
          </div>

          <div className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white">
            Documentos
          </div>
          <div className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white">
            Configuración
          </div>
          <div className="h-0.5 bg-[#808080] my-1" />
          <div className="px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white">
            Apagar...
          </div>
        </div>
      )}

      {/* Íconos de escritorio (Tailwind) */}
      <div className="flex flex-col gap-8 p-5 text-white">
        {/* Mi PC */}
        <div
          className="flex flex-col items-center w-12 cursor-pointer"
          onClick={(e) => {
  e.stopPropagation();
  handleSelect("pc");
}}
        >
          <img src="/icons/my-computer.png" alt="Mi PC" className="w-6 h-6" />
          <span
            className={`mt-1 text-[0.65rem] text-center font-[Tahoma,sans-serif] leading-tight drop-shadow-[1px_1px_0px_black] px-0.5 ${
              selectedIcon === "pc" ? "bg-[#000080] text-white" : "text-white"
            }`}
          >
            Mi PC
          </span>
        </div>

        {/* Papelera */}
        <div
          className="flex flex-col items-center w-12 cursor-pointer"
          onClick={() => handleSelect("bin")}
        >
          <img src="/icons/bin.png" alt="Papelera" className="w-6 h-6" />
          <span
            className={`mt-1 text-[0.65rem] text-center font-[Tahoma,sans-serif] leading-tight drop-shadow-[1px_1px_0px_black] px-0.5 ${
              selectedIcon === "bin" ? "bg-[#000080] text-white" : "text-white"
            }`}
          >
            Papelera
          </span>
        </div>

        {/* Mis Documentos */}
        <div
          className="flex flex-col items-center w-12 cursor-pointer"
          onClick={() => handleSelect("docs")}
        >
          <img
            src="/icons/my-documents.png"
            alt="Mis Docs"
            className="w-6 h-6"
          />
          <span
            className={`mt-1 text-[0.65rem] text-center font-[Tahoma,sans-serif] leading-tight drop-shadow-[1px_1px_0px_black] px-0.5 ${
              selectedIcon === "docs" ? "bg-[#000080] text-white" : "text-white"
            }`}
          >
            Mis Docs
          </span>
        </div>

        {/* Internet */}
        <div
          className="flex flex-col items-center w-12 cursor-pointer"
          onClick={() => handleSelect("internet")}
          onDoubleClick={() => openWindow("internet")}
        >
          <img src="/icons/internet.png" alt="Internet" className="w-6 h-6" />
          <span
            className={`mt-1 text-[0.65rem] text-center font-[Tahoma,sans-serif] leading-tight drop-shadow-[1px_1px_0px_black] px-0.5 ${
              selectedIcon === "internet"
                ? "bg-[#000080] text-white"
                : "text-white"
            }`}
          >
            Internet
          </span>
        </div>
      </div>

      {/* Ventanas abiertas */}
      {openWindows.includes("about") && (
        <RetroWindow title="About" onClose={() => closeWindow("about")}>
          <p>Tu biografía retro aquí...</p>
        </RetroWindow>
      )}

      {openWindows.includes("experience") && (
        <RetroWindow
          title="Experience"
          onClose={() => closeWindow("experience")}
        >
          <p>Tu experiencia retro aquí...</p>
        </RetroWindow>
      )}

      {openWindows.includes("projects") && (
        <RetroWindow title="Projects" onClose={() => closeWindow("projects")}>
          <p>Lista de proyectos retro aquí...</p>
        </RetroWindow>
      )}

      {openWindows.includes("technologies") && (
        <RetroWindow
          title="Technologies"
          onClose={() => closeWindow("technologies")}
        >
          <p>Listado de tecnologías retro aquí...</p>
        </RetroWindow>
      )}

      {openWindows.includes("minesweeper") && (
        <RetroWindow
          title="Buscaminas"
          onClose={() => closeWindow("minesweeper")}
        >
          <p>Próximamente: Buscaminas 🎮</p>
        </RetroWindow>
      )}

      {openWindows.includes("internet") && (
        <RetroWindow
          title="Internet Explorer"
          onClose={() => closeWindow("internet")}
        >
          <RetroBrowser />
        </RetroWindow>
      )}
    </div>
  );
}
