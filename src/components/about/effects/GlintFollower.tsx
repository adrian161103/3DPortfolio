import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GlintFollowerProps {
  intensity?: number;
  disabled?: boolean;
}

export const GlintFollower: React.FC<GlintFollowerProps> = ({ 
  intensity = 1, 
  disabled = false 
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // GSAP quickTo para movimiento ultra suave
  const quickToX = useRef<gsap.QuickToFunc | undefined>(undefined);
  const quickToY = useRef<gsap.QuickToFunc | undefined>(undefined);
  const quickToDotX = useRef<gsap.QuickToFunc | undefined>(undefined);
  const quickToDotY = useRef<gsap.QuickToFunc | undefined>(undefined);

  useEffect(() => {
    if (!cursorRef.current || !dotRef.current || disabled) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    // Configuración inicial
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });

    // Inicializar quickTo para movimiento ultra suave
    quickToX.current = gsap.quickTo(cursor, 'x', { 
      duration: 0.6, 
      ease: 'power3.out' 
    });
    quickToY.current = gsap.quickTo(cursor, 'y', { 
      duration: 0.6, 
      ease: 'power3.out' 
    });
    
    // Punto central más responsivo
    quickToDotX.current = gsap.quickTo(dot, 'x', { 
      duration: 0.1, 
      ease: 'power2.out' 
    });
    quickToDotY.current = gsap.quickTo(dot, 'y', { 
      duration: 0.1, 
      ease: 'power2.out' 
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!quickToX.current || !quickToY.current || !quickToDotX.current || !quickToDotY.current) return;
      
      // Hacer visible el cursor al moverse
      if (!isVisible) {
        setIsVisible(true);
      }
      
      // Actualizar posiciones
      quickToX.current(e.clientX);
      quickToY.current(e.clientY);
      quickToDotX.current(e.clientX);
      quickToDotY.current(e.clientY);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Detectar hover sobre elementos interactivos
    const handleElementHover = () => {
      setIsHovering(true);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Añadir listeners a elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [disabled, isVisible]);

  if (disabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Cursor principal - círculo verde elegante */}
      <div
        ref={cursorRef}
        className={`absolute w-8 h-8 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '50%',
          backdropFilter: 'blur(4px)',
          boxShadow: `
            0 0 20px rgba(34, 197, 94, 0.2),
            inset 0 0 20px rgba(34, 197, 94, 0.1)
          `,
        }}
      />

      {/* Punto central - más pequeño y más verde */}
      <div
        ref={dotRef}
        className={`absolute w-1 h-1 transition-all duration-150 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } ${isHovering ? 'scale-0' : 'scale-100'}`}
        style={{
          background: '#22c55e',
          borderRadius: '50%',
          boxShadow: `
            0 0 10px rgba(34, 197, 94, 0.8),
            0 0 20px rgba(34, 197, 94, 0.4)
          `,
        }}
      />

      {/* Efecto de brillo sutil en hover */}
      <div
        ref={cursorRef}
        className={`absolute w-16 h-16 transition-all duration-500 ease-out ${
          isVisible && isHovering ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
};