import { useState, useEffect, useRef, useCallback } from "react";
import About from "./pages/About";
import Projects from "./pages/Project";
import Contact from "./pages/Contact";
import { useLanguage } from "../../context/LanguageContext";
import { browserEs } from "../../data/browser/browser.es";
import { browserEn } from "../../data/browser/browser.en";
import { BrowserData } from "../../data/browser/browserTypes";

type Page = "home" | "about" | "projects" | "contact";

type ToolbarButton = {
  icon?: string;
  label?: string;
  action?: () => void;
  disabled?: boolean;
  separator?: boolean;
};

export default function RetroBrowser() {
  const { language } = useLanguage();
  const t: BrowserData = language === "es" ? browserEs : browserEn;
  
  const [page, setPage] = useState<Page>("home");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<Page[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Navegación
  const navigateTo = useCallback((newPage: Page) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newPage];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setPage(newPage);
    setShouldAnimate(true); // Activar animación solo en navegación
  }, [history, historyIndex]);

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPage(history[historyIndex - 1]);
      setShouldAnimate(true);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPage(history[historyIndex + 1]);
      setShouldAnimate(true);
    }
  };

  const stopLoading = () => {
    setLoading(false);
    setProgress(0);
  };

  const refresh = () => {
    setShouldAnimate(true); // Activar animación al refrescar
  };

  // Simulación de carga cuando se activa la animación
  useEffect(() => {
    if (!shouldAnimate) return;

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShouldAnimate(false); // Resetear flag de animación
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  // Listener para eventos de navegación externos (desde About, etc.)
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      const targetPage = event.detail as Page;
      navigateTo(targetPage);
    };

    window.addEventListener("navigateTo", handleNavigate as EventListener);
    return () => window.removeEventListener("navigateTo", handleNavigate as EventListener);
  }, [navigateTo]);

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
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return (
          <div className="ie-home-page">
            <div className="ie-home-header">
              <h1 className="ie-home-title">
                {language === "es" ? "Bienvenido a mi Portfolio" : "Welcome to my Portfolio"}
              </h1>
            </div>
            
            <div className="ie-home-content">
              <div className="ie-home-section">
                <h2 className="ie-section-title">
                  {language === "es" ? "Navegación Rápida" : "Quick Navigation"}
                </h2>
                <div className="ie-nav-grid">
                  <div className="ie-nav-card" onClick={() => navigateTo("about")}>
                    <div className="ie-nav-icon">👤</div>
                    <div className="ie-nav-text">
                      <div className="ie-nav-link">{t.pages.about}</div>
                      <div className="ie-nav-desc">
                        {language === "es" 
                          ? "Conoce más sobre mí" 
                          : "Learn more about me"}
                      </div>
                    </div>
                  </div>

                  <div className="ie-nav-card" onClick={() => navigateTo("projects")}>
                    <div className="ie-nav-icon">💼</div>
                    <div className="ie-nav-text">
                      <div className="ie-nav-link">{t.pages.projects}</div>
                      <div className="ie-nav-desc">
                        {language === "es" 
                          ? "Explora mis trabajos" 
                          : "Explore my work"}
                      </div>
                    </div>
                  </div>

                  <div className="ie-nav-card" onClick={() => navigateTo("contact")}>
                    <div className="ie-nav-icon">📧</div>
                    <div className="ie-nav-text">
                      <div className="ie-nav-link">{t.pages.contact}</div>
                      <div className="ie-nav-desc">
                        {language === "es" 
                          ? "Envíame un mensaje" 
                          : "Send me a message"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const toolbarButtons: ToolbarButton[] = [
    { 
      icon: "/icons/ie/back.png", 
      label: t.toolbar.back, 
      action: goBack,
      disabled: !canGoBack 
    },
    { 
      icon: "/icons/ie/forward.png", 
      label: t.toolbar.forward,
      action: goForward,
      disabled: !canGoForward
    },
    { separator: true },
    { 
      icon: "/icons/ie/stop.png", 
      label: t.toolbar.stop,
      action: stopLoading,
      disabled: !loading
    },
    { 
      icon: "/icons/ie/refresh.png", 
      label: t.toolbar.refresh,
      action: refresh
    },
    { separator: true },
    { 
      icon: "/icons/ie/home.png", 
      label: t.toolbar.home, 
      action: () => navigateTo("home") 
    },
    { icon: "/icons/ie/search.png", label: t.toolbar.search },
    { icon: "/icons/ie/favorites.png", label: t.toolbar.favorites },
    { icon: "/icons/ie/history.png", label: t.toolbar.history },
    { 
      icon: "/icons/ie/mail.png", 
      label: t.toolbar.mail,
      action: () => navigateTo("contact")
    },
    { icon: "/icons/ie/print.png", label: t.toolbar.print },
  ];

  return (
    <div className="flex flex-col h-full w-full text-xl font-[Tahoma,'MS Sans Serif',sans-serif] bg-gray-300 border-2 border-gray-600">
      {/* ===== Toolbar ===== */}
      <div className="win98-bar flex items-center h-14 px-2">
        {toolbarButtons.map((btn, i) =>
          btn.separator ? (
            <div key={i} className="win98-separator" />
          ) : (
            <button
              key={i}
              onClick={btn.action}
              disabled={btn.disabled}
              className={`win98-button ${btn.disabled ? 'win98-button-disabled' : ''}`}
              title={btn.label}
            >
              <img 
                src={btn.icon} 
                alt={btn.label} 
                className="retro-icon"
                style={{ opacity: btn.disabled ? 0.4 : 1 }}
              />
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
  <div className="flex-1 bg-white p-0 overflow-auto min-h-0" ref={contentRef}>
    {renderPage()}
  </div>

      {/* ===== Status Bar ===== */}
      <div className="win98-bar win98-status flex items-center justify-between h-12 px-2">
        {/* Izquierda */}
        <div className="flex items-center gap-2 w-80 border-r-2 border-gray-600 px-2">
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
