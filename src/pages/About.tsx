import React from 'react';
import AtmosphericScene from '../components/3d/AtmosphericScene';

/**
 * Componente About - Página con escena atmosférica 3D
 */
const About: React.FC = () => {
  return (
    <div className="min-h-screen w-screen relative">
      {/* Escena 3D atmosférica de fondo - fija pero permitiendo interacción */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <AtmosphericScene />
      </div>
      
      {/* Contenido que se puede scrollear */}
      <div className="relative z-10 w-full">
        {/* Espaciador transparente para scroll inicial */}
        <div className="h-[200vh] w-full"></div>
        
      
      </div>
    </div>
  );
};

export default About;