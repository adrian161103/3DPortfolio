import React from 'react';

/**
 * Componente Projects - Página simple con fondo púrpura
 */
const Projects: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center"
         style={{ backgroundColor: '#2d1842' }}> {/* Fondo púrpura oscuro */}
      
      <h1 className="text-5xl font-bold text-white">
        Projects
      </h1>
    </div>
  );
};

export default Projects;