import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Vista principal actual del portfolio (hero/animaciones)
import App from "../App";

// Páginas
import About from "../pages/About";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";

/**
 * Rutas públicas de la aplicación (solo frontend)
 * - "/"          -> App (home con escena 3D/hero actual)
 * - "/about"     -> About
 * - "/contact"   -> Contact
 * - "/proyects"  -> Projects (mapeado con ese slug solicitado)
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
