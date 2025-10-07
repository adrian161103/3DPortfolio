import { useState, useEffect } from "react";
import { gsap } from "./lib/gsap";
import Hero from "./components/sections/Hero";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";

function App() {
  const [overlayVisible, setOverlayVisible] = useState(true);

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

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      {/* LanguageSwitcher con z-index menor que el overlay */}
      <div className="absolute top-2 left-2 z-30">
        <LanguageSwitcher />
      </div>
      
      <Hero />
      
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
