import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Componente que muestra una explosión blanca ovalada que se expande desde el centro
 */
const AfterBlackHole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  // Leer la sección seleccionada desde localStorage al montar el componente
  useEffect(() => {
    const savedSection = localStorage.getItem('selectedSection');
    if (savedSection) {
      setSelectedSection(savedSection);
    }
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || !explosionRef.current) return;
    
    // Timeline para la animación de la explosión
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      }
    });
    
    // Configuración inicial
    gsap.set(explosionRef.current, {
      scale: 0,
      opacity: 0,
      filter: 'blur(0px)'
    });
    
    // Secuencia de animación
    tl.to(
      explosionRef.current, 
      {
        scale: 0.05, 
        opacity: 1,
        duration: 0.2,
        ease: "power1.in"
      }
    )
    // Expansión principal - rápida desde el centro
    .to(explosionRef.current, {
      scale: 15,
      opacity: 0.9,
      filter: 'blur(15px)',
      duration: 0.8,
      ease: "power3.in"
    })
    // Flash intenso que cubre la pantalla
    .to(containerRef.current, {
      backgroundColor: 'rgba(255, 255, 255, 1)', // Blanco puro
      duration: 0.2,
    }, "-=0.3")
    // Mantener el blanco y desvanecer solo la forma ovalada
    .to(explosionRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    })
    // Mantener el blanco y navegar a la ruta correspondiente
    .call(() => {
      console.log('Animación de explosión completada, navegando a:', selectedSection);
      // Remover los elementos de la explosión para que solo quede el fondo blanco
      if (explosionRef.current) {
        explosionRef.current.style.display = 'none';
      }
      
      // Navegar a la ruta correspondiente después de un pequeño delay
      setTimeout(() => {
        switch (selectedSection) {
          case 'about':
            navigate('/about');
            break;
          case 'projects':
            navigate('/projects');
            break;
          case 'contact':
            navigate('/contact');
            break;
          default:
            navigate('/');
        }
      }, 200);
    });
    
    // Limpieza al desmontar
    return () => {
      tl.kill();
    };
  }, [selectedSection, navigate]);
  

  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center cursor-default"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 1)', // Comienza negro
        overflow: 'hidden' // Asegurar que no hay scroll en la capa de animación
      }}
    >
      {/* Explosión blanca ovalada */}
      <div 
        ref={explosionRef} 
        className="rounded-full bg-white flex items-center justify-center"
        style={{
          width: '200px',
          height: '150px', 
          filter: 'blur(5px)',
          boxShadow: '0 0 40px 20px rgba(255, 255, 255, 1)',
        }}
      />
    </div>
  );
};

export default AfterBlackHole;