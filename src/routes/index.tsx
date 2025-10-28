import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout global
import Layout from "../components/layout/Layout";

// Vista principal actual del portfolio (hero/animaciones)
import App from "../App";

// Páginas
import About from "../pages/About";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import BlackHole from "../components/ui/BlackHole";

/**
 * Rutas públicas de la aplicación (solo frontend)
 * - "/"          -> App (home con escena 3D/hero actual)
 * - "/about"     -> About
 * - "/contact"   -> Contact
 * - "/proyects"  -> Projects (mapeado con ese slug solicitado)
 */
const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blackhole" element={<BlackHole />} />
        

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
