import React from 'react';

/**
 * Componente About - Página simple con fondo azul
 */
const About: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center"
         style={{ backgroundColor: '#1a2c42' }}> {/* Fondo azul oscuro */}
      
      <h1 className="text-5xl font-bold text-white">
        About
      </h1>
    </div>
  );
};

export default About;