import { useState, useRef, useEffect } from "react";
import RetroWindow from "../windows/RetroWindow";
import RetroBrowser from "../windows/RetroBrowser";

type AppId =
  | "about"
  | "experience"
  | "projects"
  | "technologies"
  | "minesweeper"
  | "internet";

type WinState = {
  open: boolean;
  minimized: boolean;
  title: string;
  icon: string;
};

const initialWindows: Record<AppId, WinState> = {
  about: {
    open: false,
    minimized: false,
    title: "About",
    icon: "/icons/my-documents.png",
  },
  experience: {
    open: false,
    minimized: false,
    title: "Experience",
    icon: "/icons/my-documents.png",
  },
  projects: {
    open: false,
    minimized: false,
    title: "Projects",
    icon: "/icons/my-documents.png",
  },
  technologies: {
    open: false,
    minimized: false,
    title: "Technologies",
    icon: "/icons/my-documents.png",
  },
  minesweeper: {
    open: false,
    minimized: false,
    title: "Buscaminas",
    icon: "/icons/minesweeper.png",
  },
  internet: {
    open: false,
    minimized: false,
    title: "Internet Explorer",
    icon: "/icons/internet.png",
  },
};

export default function RetroWindows() {
  const [windows, setWindows] = useState<Record<AppId, WinState>>(initialWindows);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // cerrar menú si hago click fuera
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

  const openWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: true, minimized: false },
    }));
    setShowStartMenu(false);
  };

  const closeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false },
    }));
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
  };

  const toggleTaskbar = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: !prev[id].minimized, open: true },
    }));
  };

  const handleSelect = (icon: string) => setSelectedIcon(icon);

  return (
 <div
  className="retro-desktop"
  onClick={(e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null); 
    }
  }}
>
      {/* Barra de tareas */}
      <div className="taskbar">
        {/* Botón inicio */}
        <div
          className="start-btn flex items-center gap-1"
          onClick={() => setShowStartMenu((prev) => !prev)}
        >
          <img
            src="/icons/windows.png"
            alt="logo-Windows"
            className="w-4 h-4"
          />
          <p className="text-[0.65rem]">Inicio</p>
        </div>

        {/* Botones de ventanas abiertas */}
<div className="flex flex-1 items-center gap-1 ml-2 overflow-hidden">
  {(Object.keys(windows) as AppId[])
    .filter((id) => windows[id].open)
    .map((id) => {
      const win = windows[id];
      return (
        <button
          key={id}
          onClick={() => toggleTaskbar(id)}
          className={`flex items-center gap-1 px-2 py-0.5 text-[11px] font-[Tahoma] bg-[#c0c0c0] truncate flex-1 min-w-[80px] max-w-[100px] ${
            win.minimized
              ? "border-2 border-[#808080] border-t-white border-l-white"
              : "border-2 border-white border-b-[#808080] border-r-[#808080]"
          }`}
        >
          <img src={win.icon} alt="" className="w-4 h-4 shrink-0" />
          <span className="truncate">{win.title}</span>
        </button>
      );
    })}
</div>

        {/* Reloj */}
        <div className="taskbar-clock text-xs">12:00</div>
      </div>

      {/* Menú de Inicio */}
      {showStartMenu && (
        <div
          ref={menuRef}
          className="absolute bottom-6.5 left-0 w-[200px] bg-[#c0c0c0] border-2 border-[#808080] shadow-[4px_4px_0_#00000044] font-[Tahoma] z-[9999]"
        >
          <div className="relative group px-2.5 py-1.5 text-[14px] cursor-pointer hover:bg-[#000080] hover:text-white">
            <div className="flex items-center justify-between">
              <span>Programas</span>
              <span className="ml-2">▸</span>
            </div>

            <div className="hidden group-hover:block absolute top-0 left-full w-[180px] bg-[#c0c0c0] border-2 border-[#808080] shadow-[4px_4px_0_#00000044]">
              <div
                className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("about")}
              >
                About
              </div>
              <div
                className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("experience")}
              >
                Experience
              </div>
              <div
                className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("projects")}
              >
                Projects
              </div>
              <div
                className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("technologies")}
              >
                Technologies
              </div>
              <div className="h-0.5 bg-[#808080] my-1" />
              <div
                className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white"
                onClick={() => openWindow("minesweeper")}
              >
                Buscaminas
              </div>
            </div>
          </div>
          <div className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white">
            Documentos
          </div>
          <div className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white">
            Configuración
          </div>
          <div className="h-0.5 bg-[#808080] my-1" />
          <div className="px-2.5 py-1.5 hover:bg-[#000080] hover:text-white">
            Apagar...
          </div>
        </div>
      )}

      {/* Íconos de escritorio */}
      <div className="flex flex-col gap-8 p-5 text-white">
        {[
          { id: "pc", icon: "/icons/my-computer.png", label: "Mi PC" },
          { id: "bin", icon: "/icons/bin.png", label: "Papelera" },
          { id: "docs", icon: "/icons/my-documents.png", label: "Mis Docs" },
          {
            id: "internet",
            icon: "/icons/internet.png",
            label: "Internet",
            dbl: () => openWindow("internet"),
          },
        ].map(({ id, icon, label, dbl }) => (
          <div
            key={id}
            className="flex flex-col items-center w-12 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(id);
            }}
            onDoubleClick={dbl}
          >
            <img src={icon} alt={label} className="w-10 h-10" />
            <span
              className={`mt-1 text-[0.7rem] text-center font-[Tahoma,sans-serif] leading-tight drop-shadow-[1px_1px_0px_black]  ${
                selectedIcon === id
                  ? "bg-[#000080] text-white  outline-1 outline-dotted outline-white"
                  : "text-white"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Ventanas */}
      {windows.about.open && !windows.about.minimized && (
        <RetroWindow
          title={windows.about.title}
          onClose={() => closeWindow("about")}
          onMinimize={() => minimizeWindow("about")}
        >
          <p>Tu biografía retro aquí...</p>
        </RetroWindow>
      )}

      {windows.experience.open && !windows.experience.minimized && (
        <RetroWindow
          title={windows.experience.title}
          onClose={() => closeWindow("experience")}
          onMinimize={() => minimizeWindow("experience")}
        >
          <p>Tu experiencia retro aquí...</p>
        </RetroWindow>
      )}

      {windows.projects.open && !windows.projects.minimized && (
        <RetroWindow
          title={windows.projects.title}
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
        >
          <p>Lista de proyectos retro aquí...</p>
        </RetroWindow>
      )}

      {windows.technologies.open && !windows.technologies.minimized && (
        <RetroWindow
          title={windows.technologies.title}
          onClose={() => closeWindow("technologies")}
          onMinimize={() => minimizeWindow("technologies")}
        >
          <p>Listado de tecnologías retro aquí...</p>
        </RetroWindow>
      )}

      {windows.minesweeper.open && !windows.minesweeper.minimized && (
        <RetroWindow
          title={windows.minesweeper.title}
          onClose={() => closeWindow("minesweeper")}
          onMinimize={() => minimizeWindow("minesweeper")}
        >
          <p>Próximamente: Buscaminas 🎮</p>
        </RetroWindow>
      )}

      {windows.internet.open && !windows.internet.minimized && (
        <RetroWindow
          title={windows.internet.title}
          onClose={() => closeWindow("internet")}
          onMinimize={() => minimizeWindow("internet")}
        >
          <RetroBrowser />
        </RetroWindow>
      )}
    </div>
  );
}
