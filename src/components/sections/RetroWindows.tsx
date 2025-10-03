import { useState, useRef, useEffect, useMemo } from "react";
import RetroWindow from "../windows/RetroWindow";
import RetroBrowser from "../windows/RetroBrowser";
import { useLanguage } from "../../context/LanguageContext";
import { desktopEs } from "../../data/desktop/desktop.es";
import { desktopEn } from "../../data/desktop/desktop.en";
import { DesktopData } from "../../data/desktop/desktopTypes";
// import Minesweeper from "../minesweeper/Minesweeper";

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
    title: "Minesweeper",
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
  const { language } = useLanguage();
  const t: DesktopData = language === "es" ? desktopEs : desktopEn;

  // Actualizar títulos cuando cambie el idioma
  const windowTitles = useMemo(() => ({
    about: t.windows.about,
    experience: t.windows.experience,
    projects: t.windows.projects,
    technologies: t.windows.technologies,
    minesweeper: t.windows.minesweeper,
    internet: t.windows.internet,
  }), [t]);

  const [windows, setWindows] =
    useState<Record<AppId, WinState>>(initialWindows);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [windowZ, setWindowZ] = useState<Partial<Record<AppId, number>>>({});
  const [activeWindow, setActiveWindow] = useState<AppId | null>(null);
  const [openedOrder, setOpenedOrder] = useState<AppId[]>([]);

  const bringToFront = (id: AppId) => {
    setWindowZ((old) => {
      const currentMax = Object.values(old).length ? Math.max(...Object.values(old) as number[]) : 10;
      const newZ = currentMax + 1;
      return { ...old, [id]: newZ };
    });
    setActiveWindow(id);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  // Actualizar títulos de ventanas cuando cambie el idioma
  useEffect(() => {
    setWindows((prev) => {
      const updated = { ...prev };
      (Object.keys(windowTitles) as AppId[]).forEach((id) => {
        if (updated[id]) {
          updated[id] = { ...updated[id], title: windowTitles[id] };
        }
      });
      return updated;
    });
  }, [windowTitles]);

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

    setOpenedOrder((prev) =>
      prev.includes(id) ? prev : [...prev, id] // agrega al final si no estaba
    );

    bringToFront(id);
    setShowStartMenu(false);
  };

  const closeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false },
    }));
    setActiveWindow(null);
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
    if (activeWindow === id) setActiveWindow(null);
  };

  // Función para apagar (volver a la consola)
  const handleShutdown = () => {
    setShowStartMenu(false);
    // Disparar evento para volver a la consola
    window.dispatchEvent(new CustomEvent("setWindowsMode", { detail: false }));
  };

  const toggleTaskbar = (id: AppId) => {
    setWindows((prev) => {
      const win = prev[id];

      // Restaurar si está minimizada
      if (win.minimized) {
        bringToFront(id);
        return {
          ...prev,
          [id]: { ...win, minimized: false, open: true },
        };
      }

      // Minimizar si ya está activa
      if (activeWindow === id) {
        return {
          ...prev,
          [id]: { ...win, minimized: true },
        };
      }

      // Solo traer al frente
      bringToFront(id);
      return prev;
    });
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
          className="start-btn flex items-center gap-2"
          onClick={() => setShowStartMenu((prev) => !prev)}
        >
          <img
            src="/icons/windows.png"
            alt="logo-Windows"
            className="w-8 h-8"
          />
          <p className="text-[1.3rem]">{t.start}</p>
        </div>

        {/* Botones de ventanas abiertas */}
        <div className="flex flex-1 items-center gap-2 ml-4 overflow-hidden">
          {openedOrder
            .filter((id) => windows[id].open)
            .map((id) => {
              const win = windows[id];
              const isActive = id === activeWindow;

              return (
                <button
                  key={id}
                  onClick={() => toggleTaskbar(id)}
                  className={`flex items-center gap-2 px-4 py-1 text-xl font-[Tahoma] truncate flex-1 min-w-40 max-w-48
                    ${
                      isActive
                        ? "border-4 border-gray-600 border-t-gray-700 border-l-gray-700 bg-gray-300"
                        : win.minimized
                        ? "border-4 border-gray-600 border-t-white border-l-white bg-gray-300"
                        : "border-4 border-white border-b-gray-600 border-r-gray-600 bg-gray-300"
                    }`}
                >
                  <img src={win.icon} alt="" className="w-8 h-8 shrink-0" />
                  <span className="truncate">{win.title}</span>
                </button>
              );
            })}
        </div>

        {/* Reloj */}
        <div className="taskbar-clock text-2xl">12:00</div>
      </div>

      {/* Menú de Inicio */}
      {showStartMenu && (
        <div
          ref={menuRef}
          className="absolute bottom-12 left-0 w-96 bg-gray-300 border-4 border-gray-600 shadow-[8px_8px_0_#00000044] font-[Tahoma] z-[9999]"
        >
          <div 
            className="px-5 py-3 text-[1.75rem] hover:bg-blue-900 hover:text-white cursor-pointer"
            onClick={handleShutdown}
          >
            {t.shutdown}
          </div>
        </div>
      )}

      {/* Íconos de escritorio */}
      <div className="flex flex-col gap-12 p-8 text-white">
        {[
          { id: "pc", icon: "/icons/my-computer.png", label: t.icons.myPc },
          { id: "bin", icon: "/icons/bin.png", label: t.icons.bin },
          { id: "docs", icon: "/icons/my-documents.png", label: t.icons.myDocs },
          {
            id: "internet",
            icon: "/icons/internet.png",
            label: t.icons.internet,
            dbl: () => openWindow("internet"),
          },
          {
            id: "minesweeper",
            icon: "/icons/minesweeper.png",
            label: t.icons.minesweeper,
            dbl: () => openWindow("minesweeper"),
          },
        ].map(({ id, icon, label, dbl }) => (
          <div
            key={id}
            className="flex flex-col items-center w-20 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(id);
            }}
            onDoubleClick={dbl}
          >
            <img src={icon} alt={label} className="w-16 h-16" />
            <span
              className={`mt-1 text-[1.3rem] text-center font-[Tahoma,sans-serif] leading-tight drop-shadow-[1px_1px_0px_black]  ${
                selectedIcon === id
                  ? "bg-blue-900 text-white  outline-1 outline-dotted outline-white"
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
          id="about"
          title={windows.about.title}
          onClose={() => closeWindow("about")}
          onMinimize={() => minimizeWindow("about")}
          zIndex={windowZ.about || 10}
          onFocus={() => bringToFront("about")}
        >
          <p>Tu biografía retro aquí...</p>
        </RetroWindow>
      )}

      {windows.experience.open && !windows.experience.minimized && (
        <RetroWindow
          id="experience"
          title={windows.experience.title}
          onClose={() => closeWindow("experience")}
          onMinimize={() => minimizeWindow("experience")}
          zIndex={windowZ.experience || 10}
          onFocus={() => bringToFront("experience")}
        >
          <p>Tu experiencia retro aquí...</p>
        </RetroWindow>
      )}

      {windows.projects.open && !windows.projects.minimized && (
        <RetroWindow
          id="projects"
          title={windows.projects.title}
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          zIndex={windowZ.projects || 10}
          onFocus={() => bringToFront("projects")}
        >
          <p>Lista de proyectos retro aquí...</p>
        </RetroWindow>
      )}

      {windows.technologies.open && !windows.technologies.minimized && (
        <RetroWindow
          id="technologies"
          title={windows.technologies.title}
          onClose={() => closeWindow("technologies")}
          onMinimize={() => minimizeWindow("technologies")}
          zIndex={windowZ.technologies || 10}
          onFocus={() => bringToFront("technologies")}
        >
          <p>Listado de tecnologías retro aquí...</p>
        </RetroWindow>
      )}

      {/* {windows.minesweeper.open && !windows.minesweeper.minimized && (
        <RetroWindow
          id="minesweeper"
          title={windows.minesweeper.title}
          onClose={() => closeWindow("minesweeper")}
          onMinimize={() => minimizeWindow("minesweeper")}
          zIndex={windowZ.minesweeper || 10}
          onFocus={() => bringToFront("minesweeper")}
        >
          <Minesweeper />
        </RetroWindow>
      )} */}

      {windows.internet.open && !windows.internet.minimized && (
        <RetroWindow
          id="internet"
          title={windows.internet.title}
          onClose={() => closeWindow("internet")}
          onMinimize={() => minimizeWindow("internet")}
          zIndex={windowZ.internet || 10}
          onFocus={() => bringToFront("internet")}
        >
          <RetroBrowser />
        </RetroWindow>
      )}
    </div>
  );
}
