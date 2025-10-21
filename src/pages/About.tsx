import React, { useEffect, useRef } from 'react';
import AtmosphericScene from '../components/3d/AtmosphericScene';

/**
 * Componente About - Página con escena atmosférica 3D
 */
const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Función para manejar el scroll
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      
      // Verificar si el elemento que hace scroll tiene overflow: auto
      const computedStyle = window.getComputedStyle(target);
      if (computedStyle.overflow !== 'auto' && computedStyle.overflowY !== 'auto') {
        return;
      }
      
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight - target.clientHeight;
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      console.log('About scroll detected:', scrollProgress); // Debug
      
      // Disparar evento personalizado para que AtmosphericScene lo escuche
      window.dispatchEvent(new CustomEvent('atmosphericScroll', { 
        detail: { progress: scrollProgress } 
      }));
    };

    // Usar un MutationObserver para detectar cuando aparezca el contenedor con scroll
    const observer = new MutationObserver(() => {
      // Buscar todos los elementos con overflow: auto
      const scrollContainers = document.querySelectorAll('[style*="overflow: auto"], .show-scrollbar');
      
      scrollContainers.forEach(container => {
        // Remover listener anterior si existe
        container.removeEventListener('scroll', handleScroll);
        // Agregar listener
        container.addEventListener('scroll', handleScroll, { passive: true });
      });
    });

    // Observar cambios en el DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // También intentar detectar contenedores existentes
    setTimeout(() => {
      const scrollContainers = document.querySelectorAll('[style*="overflow: auto"], .show-scrollbar');
      scrollContainers.forEach(container => {
        container.addEventListener('scroll', handleScroll, { passive: true });
      });
    }, 100);

    return () => {
      observer.disconnect();
      // Remover todos los listeners
      const scrollContainers = document.querySelectorAll('[style*="overflow: auto"], .show-scrollbar');
      scrollContainers.forEach(container => {
        container.removeEventListener('scroll', handleScroll);
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full relative"
      style={{ height: '100vh' }}
    >
      {/* Escena 3D atmosférica de fondo - fija pero permitiendo interacción */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <AtmosphericScene />
      </div>
      
      {/* Contenido que se puede scrollear */}
      <div className="relative z-10 w-full">
        {/* Espaciador transparente para scroll inicial */}
        <div className="h-[200vh] w-full"></div>
        
        {/* Aquí puedes agregar más contenido si lo necesitas */}
        <div className="h-[100vh] w-full flex items-center justify-center">
          <div className="text-white text-center p-8 bg-black/30 rounded-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg">Contenido adicional para mostrar el scroll funcionando...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;