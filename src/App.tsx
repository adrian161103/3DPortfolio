import { useState, useEffect } from "react";
import { gsap } from "./lib/gsap";
import Hero from "./components/sections/Hero";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";
import BlackHole from "./components/ui/BlackHole";

function App() {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [currentView, setCurrentView] = useState<"hero" | "command">("hero");

  useEffect(() => {
    // 🔦 Quitamos el overlay después de unos segundos (cuando termina la animación de luces)
    gsap.to("#overlay", {
      opacity: 0,
      delay: 1,
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        console.log("App: Overlay animation complete, dispatching overlayComplete event");
        setOverlayVisible(false);
        // Disparar evento para que el Console y otros componentes sepan que pueden aparecer
        window.dispatchEvent(new CustomEvent("overlayComplete"));
      },
    });
  }, []);

  // Escuchar eventos para cambiar la vista
  useEffect(() => {
    const handleConsoleMode = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (customEvent.detail) {
        setCurrentView("command");
      }
    };

    const handleMonitorView = () => {
      setCurrentView("hero");
    };

    const handleWindowsMode = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (!customEvent.detail) {
        // Si se cierra Windows, volver a la vista hero
        setCurrentView("hero");
      }
    };

    window.addEventListener("setConsoleMode", handleConsoleMode);
    window.addEventListener("setMonitorViewMode", handleMonitorView);
    window.addEventListener("setWindowsMode", handleWindowsMode);

    return () => {
      window.removeEventListener("setConsoleMode", handleConsoleMode);
      window.removeEventListener("setMonitorViewMode", handleMonitorView);
      window.removeEventListener("setWindowsMode", handleWindowsMode);
    };
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      {/* LanguageSwitcher solo se muestra en la vista hero */}
      {currentView === "hero" && (
        <div className="absolute top-2 left-2 z-30">
          <LanguageSwitcher />
        </div>
      )}
      
      {/* Mostrar vista condicionalmente */}
      {currentView === "hero" ? (
        <Hero />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <BlackHole />
        </div>
      )}
      
      {/* Overlay negro al inicio - z-index mayor que todo para cubrirlo completamente */}
      {overlayVisible && (
        <div
          id="overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "black",
            zIndex: 9999,
          }}
        />
      )}
    </main>
  );
}

export default App;
