import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuroraShaderMaterial } from './shaders/AuroraShaderMaterial';
gsap.registerPlugin(ScrollTrigger);

interface AuroraPlaneProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

function AuroraPlane({ mousePosition, scrollProgress }: AuroraPlaneProps) {
  const materialRef = useRef<AuroraShaderMaterial>(null);
  const { viewport, size } = useThree();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      
      // Update mouse position in normalized coordinates
      const normalizedX = mousePosition.x / size.width;
      const normalizedY = 1.0 - (mousePosition.y / size.height);
      materialRef.current.updateMouse(normalizedX, normalizedY);
      
      // Update scroll progress
      materialRef.current.scroll = scrollProgress;
      
      // Modulate intensity based on scroll - MÁS INTENSIDAD BASE
      const baseIntensity = 1.2; // Intensidad aumentada para mayor espectacularidad
      const scrollIntensity = baseIntensity + (scrollProgress * 0.3);
      materialRef.current.intensity = Math.max(scrollIntensity, 1.0); // Mínimo 1.0
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.updateResolution(size.width, size.height);
    }
  }, [size]);

  return (
    <mesh scale={[viewport.width * 4.0, viewport.height * 4.0, 1]} position={[0, 0, -1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <primitive object={new AuroraShaderMaterial()} ref={materialRef} />
    </mesh>
  );
}

interface HeroAuroraProps {
  className?: string;
  children?: React.ReactNode;
}

export const HeroAurora: React.FC<HeroAuroraProps> = ({ 
  className = '', 
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    
    if (!element || !content || !scrollIndicator) return;

    // Efectos cinematográficos de entrada
    const tl = gsap.timeline();
    
    // Animación de entrada del contenido principal
    gsap.set(content.children, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      rotationX: 15,
      transformPerspective: 1000
    });

    tl.to(content.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.2,
      delay: 0.5
    });

    // Animación del indicador de scroll
    gsap.set(scrollIndicator, {
      opacity: 0,
      y: 30
    });

    tl.to(scrollIndicator, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, "-=0.5");

    // Animación continua del indicador
    gsap.to(scrollIndicator.querySelector('.scroll-line'), {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 2,
      repeat: -1,
      ease: 'power2.inOut',
      yoyo: true,
      delay: 2
    });

    // Manejo avanzado del mouse con efectos de paralaje
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });

      // Efecto de paralaje sutil en el contenido
      const moveX = (x - rect.width / 2) * 0.01;
      const moveY = (y - rect.height / 2) * 0.01;

      gsap.to(content, {
        x: moveX,
        y: moveY,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    // ScrollTrigger mejorado con efectos adicionales
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        
        // Efecto de desvanecimiento del contenido al hacer scroll
        const fadeProgress = Math.min(self.progress * 2, 1);
        gsap.to(content, {
          opacity: 1 - fadeProgress * 0.3,
          scale: 1 - fadeProgress * 0.05,
          duration: 0.3,
          overwrite: true
        });

        // Ocultar indicador de scroll al comenzar a hacer scroll
        if (self.progress > 0.1) {
          gsap.to(scrollIndicator, {
            opacity: 0,
            y: 20,
            duration: 0.3
          });
        } else {
          gsap.to(scrollIndicator, {
            opacity: 1,
            y: 0,
            duration: 0.3
          });
        }
      },
    });

    element.addEventListener('mousemove', handleMouseMove);
    
    // Initialize mouse position to center
    const rect = element.getBoundingClientRect();
    setMousePosition({
      x: rect.width / 2,
      y: rect.height / 2,
    });

    // Efecto de cursor personalizado
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-[#0EF0B5] rounded-full pointer-events-none z-50 mix-blend-difference';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);

    const handleGlobalMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      scrollTrigger.kill();
      element.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-[100svh] overflow-hidden bg-black ${className}`}
    >
      {/* Sistema de partículas de fondo */}
      <div className="absolute inset-0 opacity-30">
        <div className="particle-container relative w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#0EF0B5] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Three.js Aurora Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 2], fov: 45 }}
          dpr={[1, 2]}
          performance={{ min: 0.8 }}
        >
          <AuroraPlane 
            mousePosition={mousePosition} 
            scrollProgress={scrollProgress}
          />
        </Canvas>
      </div>
      
      {/* Content mejorado con efectos cinematográficos */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center min-h-[100svh] px-4"
      >
        {children}
      </div>
      
      {/* Indicador de scroll mejorado con efectos */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        onClick={() => {
          // Hacer scroll suave a la siguiente sección
          const nextSection = containerRef.current?.nextElementSibling as HTMLElement;
          if (nextSection) {
            nextSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }}
      >
        <div className="flex flex-col items-center text-gray-400 group cursor-pointer">
          <span className="text-sm mb-4 tracking-[0.3em] font-light uppercase transition-all duration-300 group-hover:text-[#0EF0B5] group-hover:tracking-[0.4em]">
            Scroll
          </span>
          <div className="relative">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#0EF0B5] to-transparent opacity-60"></div>
            <div className="scroll-line absolute inset-0 w-px bg-gradient-to-b from-[#0EF0B5] to-transparent"></div>
          </div>
          <div className="mt-2 w-2 h-2 border border-[#0EF0B5] rotate-45 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Overlay gradiente para transición suave */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};