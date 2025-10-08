import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Componente que muestra una explosión blanca ovalada que se expande desde el centro
 */
const AfterBlackHole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);
  
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
        }
      }
    );
    
    // Limpieza al desmontar
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 bg-black z-50 flex items-center justify-center">
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
      ></div>
      
      {/* Texto*/}
      <div 
        className="absolute texto-teesteo opacity-0"
        style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          color: '#000',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.2em'
        }}
      >
        TEESTEO
      </div>
    </div>
  );
};

export default AfterBlackHole;