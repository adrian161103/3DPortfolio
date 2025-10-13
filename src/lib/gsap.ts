import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Registramos los plugins solo si aún no están registrados
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  
  // Configuración optimizada de ScrollTrigger para mejor performance
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
  });
  
  // Configuración para mejor rendimiento
  gsap.config({
    force3D: true,
    autoSleep: 60
  });
}

export { gsap, ScrollTrigger, TextPlugin };