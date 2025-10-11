import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import About from '../../pages/About';
import Projects from '../../pages/Projects';
import Contact from '../../pages/Contact';

/**
 * Componente que muestra una explosión blanca ovalada que se expande desde el centro
 */
const AfterBlackHole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
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
    // Mostrar el texto
    .fromTo('.texto-teesteo', 
      {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)'
      }, 
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          console.log('Animación completada');
          setAnimationComplete(true);
          
          // Después de que termine la animación principal, crear una nueva animación
          // para la transición del fondo sin afectar la animación original
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              backgroundColor: 'rgba(255, 255, 255, 0)', // Hacer el fondo transparente
              duration: 1.5,
              ease: "power2.inOut",
              delay: 0.2,
            });
          }
        }
      }, 
      "-=0.5" // Empezar un poco antes de que termine la transición de color
    );
    
    // Limpieza al desmontar
    return () => {
      tl.kill();
    };
  }, [selectedSection]);
  
  // Renderizar el componente correspondiente según la sección seleccionada
  const renderSelectedComponent = () => {
    if (!animationComplete) return null;
    
    // Aplicamos la clase texto-teesteo a todos para que se beneficien de la animación GSAP
    switch (selectedSection) {
      case 'about':
        return (
          <div className="texto-teesteo w-full h-full cursor-default">
            <About />
          </div>
        );
      case 'projects':
        return (
          <div className="texto-teesteo w-full h-full cursor-default">
            <Projects />
          </div>
        );
      case 'contact':
        return (
          <div className="texto-teesteo w-full h-full cursor-default">
            <Contact />
          </div>
        );
      default:
        return (
          <div className="texto-teesteo text-white text-center">
            <h1 className="text-4xl font-bold mb-4">¡Bienvenido!</h1>
            <p className="text-xl">Usa la consola para navegar por el portfolio.</p>
          </div>
        );
    }
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Capa de contenido (siempre presente pero inicialmente no visible) */}
      <div className="absolute inset-0 z-40">
        {renderSelectedComponent()}
      </div>
      
      {/* Capa de animación (controla la explosión y la animación blanca) */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-50 flex items-center justify-center cursor-default"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 1)', // Comienza negro
          pointerEvents: animationComplete ? 'none' : 'auto' // Evita bloquear interacciones después de la animación
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
    </div>
  );
};

export default AfterBlackHole;