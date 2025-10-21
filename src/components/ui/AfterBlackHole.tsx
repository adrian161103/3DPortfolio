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
          console.log('Animación de texto completada');
          // Mostrar el contenido inmediatamente cuando termine la animación del texto
          setAnimationComplete(true);
          
          // Después de que termine la animación principal, crear una nueva animación
          // para la transición del fondo sin afectar la animación original
          if (containerRef.current) {
            // Primero remover los elementos de la explosión para que solo quede el fondo blanco
            const explosion = containerRef.current.querySelector('.rounded-full');
            if (explosion) {
              (explosion as HTMLElement).style.display = 'none';
            }
            
            gsap.to(containerRef.current, {
              backgroundColor: 'rgba(255, 255, 255, 0)', // Hacer el fondo transparente
              duration: 2.5,
              ease: "power2.inOut",
              delay: 0.2,
              onComplete: () => {
                // Solo ocultar la capa cuando la transición esté completa
                if (containerRef.current) {
                  containerRef.current.style.display = 'none';
                }
              }
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
          <div className="texto-teesteo w-full h-full cursor-default show-scrollbar" style={{ overflow: 'auto' }}>
            <About />
          </div>
        );
      case 'projects':
        return (
          <div className="texto-teesteo w-full h-full cursor-default show-scrollbar" style={{ overflow: 'auto' }}>
            <Projects />
          </div>
        );
      case 'contact':
        return (
          <div className="texto-teesteo w-full h-full cursor-default show-scrollbar" style={{ overflow: 'auto' }}>
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
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      overflow: animationComplete ? 'visible' : 'hidden' // Ocultar scroll durante la animación
    }}>
      {/* Capa de contenido (siempre presente pero inicialmente no visible) */}
      <div className={`${animationComplete ? 'relative show-scrollbar' : 'absolute hide-scrollbar'} inset-0 z-40 w-full h-full`}
           style={{ 
             overflow: animationComplete ? 'auto' : 'hidden' // Scroll solo cuando la animación termina
           }}>
        {renderSelectedComponent()}
      </div>
      
      {/* Capa de animación (controla la explosión y la animación blanca) */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-50 flex items-center justify-center cursor-default"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 1)', // Comienza negro
          pointerEvents: animationComplete ? 'none' : 'auto', // Evita bloquear interacciones después de la animación
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
    </div>
  );
};

export default AfterBlackHole;