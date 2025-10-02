import { useState, useEffect } from "react";
import About from "./pages/About";
import Projects from "./pages/Project";
import Contact from "./pages/Contact";
import { useLanguage } from "../../context/LanguageContext";
import { browserEs } from "../../data/browser/browser.es";
import { browserEn } from "../../data/browser/browser.en";
import { BrowserData } from "../../data/browser/browserTypes";

type Page = "home" | "about" | "projects" | "contact";

export default function RetroBrowser() {
  const { language } = useLanguage();
  const t: BrowserData = language === "es" ? browserEs : browserEn;
  
  const [page, setPage] = useState<Page>("home");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulación de carga cuando cambia la página
  useEffect(() => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [page]);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex-1 bg-white text-center pt-10 text-gray-600">
          {t.loading}...
        </div>
      );
    }

    switch (page) {
      case "about":
        return <About />;
      case "projects":
        return (
      <Projects />
        );
      case "contact":
        return (
       <Contact />
        );
      default:
        return (
          <div className="space-y-2">
            <p>
              <span onClick={() => setPage("about")} className="win98-link">
                {t.pages.about}
              </span>
            </p>
            <p>
              <span onClick={() => setPage("projects")} className="win98-link">
                {t.pages.projects}
              </span>
            </p>
            <p>
              <span onClick={() => setPage("contact")} className="win98-link">
                {t.pages.contact}
              </span>
            </p>
          </div>
        );
    }
  };

  const toolbarButtons = [
    { icon: "/icons/ie/back.png", label: t.toolbar.back, action: () => setPage("home") },
    { icon: "/icons/ie/forward.png", label: t.toolbar.forward },
    { separator: true },
    { icon: "/icons/ie/stop.png", label: t.toolbar.stop },
    { icon: "/icons/ie/refresh.png", label: t.toolbar.refresh },
    { separator: true },
    { icon: "/icons/ie/home.png", label: t.toolbar.home, action: () => setPage("home") },
    { icon: "/icons/ie/search.png", label: t.toolbar.search },
    { icon: "/icons/ie/favorites.png", label: t.toolbar.favorites },
    { icon: "/icons/ie/history.png", label: t.toolbar.history },
    { icon: "/icons/ie/mail.png", label: t.toolbar.mail },
    { icon: "/icons/ie/print.png", label: t.toolbar.print },
  ];

  return (
    <div className="flex flex-col h-full w-full text-[22px] font-[Tahoma,'MS Sans Serif',sans-serif] bg-[#c0c0c0] border-2 border-[#808080]">
      {/* ===== Toolbar ===== */}
      <div className="win98-bar flex items-center h-14 px-2">
        {toolbarButtons.map((btn, i) =>
          btn.separator ? (
            <div key={i} className="win98-separator" />
          ) : (
            <button
              key={i}
              onClick={btn.action}
              className="win98-button"
            >
              <img src={btn.icon} alt={btn.label} className="retro-icon" />
              {btn.label}
            </button>
          )
        )}
      </div>

      {/* ===== Address Bar ===== */}
      <div className="win98-bar flex items-center gap-2 px-2 py-1">
        <span className="px-2 font-bold">Dirección</span>
        <input
          type="text"
          readOnly
          value={`http://retro.local/${page}`}
          className="flex-1 win98-input"
        />
        <button className="win98-button px-4">Ir a</button>
        <button className="win98-button px-4">Vínculos</button>
      </div>

  {/* ===== Contenido ===== */}
  <div className="flex-1 bg-white p-0 overflow-auto min-h-0">{renderPage()}</div>

      {/* ===== Status Bar ===== */}
      <div className="win98-bar win98-status flex items-center justify-between h-12 px-2">
        {/* Izquierda */}
        <div className="flex items-center gap-2 w-80 border-r-2 border-[#808080] px-2">
          <img src="/icons/ie/internetpage.png" alt="IE" className="retro-icon" />
          <span>{loading ? "Cargando..." : "Listo"}</span>
        </div>

        {/* Centro */}
        <div className="flex-1 flex items-center px-2">
          <div className="win98-progress w-full">
            <div
              className="win98-progress-fill"
              style={{ width: loading ? `${progress}%` : "0%" }}
            />
          </div>
        </div>

        {/* Derecha */}
        <div className="flex items-center px-3 border-l border-white">
          <img src="/icons/ie/world.png" alt="Internet" className="retro-icon" />
          <span className="ml-1">Internet</span>
        </div>
      </div>
    </div>
  );
}
