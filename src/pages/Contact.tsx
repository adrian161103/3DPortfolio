import React from 'react';

/**
 * Componente Contact - Página simple con fondo verde
 */
const Contact: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center"
         style={{ backgroundColor: '#164430' }}> {/* Fondo verde oscuro */}
      
      <h1 className="text-5xl font-bold text-white">
        Contact
      </h1>
    </div>
  );
};

export default Contact;