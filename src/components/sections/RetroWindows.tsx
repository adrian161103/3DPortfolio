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

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowStartMenu(false);
      }
    };
    if (showStartMenu) document.addEventListener("mousedown", handleClickOutside);
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
    <div className="retro-desktop">
      {/* Barra de tareas (se mantiene con CSS clásico) */}
      <div className="taskbar">
        <button
          className="start-btn"
          onClick={() => setShowStartMenu((prev) => !prev)}
        >
          Inicio
        </button>
        <div className="taskbar-clock text-xs">12:00</div>
      </div>

      {/* Menú de Inicio (Tailwind) */}
      {showStartMenu && (
        <div
          ref={menuRef}
          className="absolute bottom-10 left-0 w-[200px] bg-[#c0c0c0] border-2 border-[#808080] shadow-[4px_4px_0_#00000044] font-[Tahoma] z-[9999]"
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
      <div className="flex flex-col gap-5 p-5 text-white">
        <div className="flex flex-col items-center w-12 cursor-pointer">
          <img src="/icons/my-computer.png" alt="Mi PC" className="w-8 h-8" />
          <span className="mt-1 text-[11px] text-white text-center font-[Tahoma] leading-tight drop-shadow-[1px_1px_0px_black]">
            Mi PC
          </span>
        </div>

        <div className="flex flex-col items-center w-12 cursor-pointer">
          <img src="/icons/bin.png" alt="Papelera" className="w-8 h-8" />
          <span className="mt-1 text-[11px] text-white text-center font-[Tahoma] leading-tight drop-shadow-[1px_1px_0px_black]">
            Papelera
          </span>
        </div>

        <div className="flex flex-col items-center w-12 cursor-pointer">
          <img src="/icons/my-documents.png" alt="Mis Docs" className="w-8 h-8" />
          <span className="mt-1 text-[11px] text-white text-center font-[Tahoma] leading-tight drop-shadow-[1px_1px_0px_black]">
            Mis Docs
          </span>
        </div>

        {/* Internet: abre el navegador retro */}
        <div
          className="flex flex-col items-center w-12 cursor-pointer"
          onDoubleClick={() => openWindow("internet")}
        >
          <img src="/icons/internet.png" alt="Internet" className="w-8 h-8" />
          <span className="mt-1 text-[11px] text-white text-center font-[Tahoma] leading-tight drop-shadow-[1px_1px_0px_black]">
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
        <RetroWindow title="Experience" onClose={() => closeWindow("experience")}>
          <p>Tu experiencia retro aquí...</p>
        </RetroWindow>
      )}

      {openWindows.includes("projects") && (
        <RetroWindow title="Projects" onClose={() => closeWindow("projects")}>
          <p>Lista de proyectos retro aquí...</p>
        </RetroWindow>
      )}

      {openWindows.includes("technologies") && (
        <RetroWindow title="Technologies" onClose={() => closeWindow("technologies")}>
          <p>Listado de tecnologías retro aquí...</p>
        </RetroWindow>
      )}

      {openWindows.includes("minesweeper") && (
        <RetroWindow title="Buscaminas" onClose={() => closeWindow("minesweeper")}>
          <p>Próximamente: Buscaminas 🎮</p>
        </RetroWindow>
      )}

      {openWindows.includes("internet") && (
        <RetroWindow title="Internet Explorer" onClose={() => closeWindow("internet")}>
          <RetroBrowser />
        </RetroWindow>
      )}
    </div>
  );
}
