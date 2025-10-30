import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  HeroAurora, 
  Bio, 
  Skills, 
  TimelineAurora, 
  CTA 
} from '../components/about';
import { useLanguage } from '../context/LanguageContext';
import { aboutEs } from '../data/about/about.es';
import { aboutEn } from '../data/about/about.en';

/**
 * Componente About - Página cinematográfica con efectos avanzados
 * 
 * Estructura:
 * 1. HeroAurora - Aurora cinematográfica con efectos de paralaje
 * 2. GlintFollower - Sistema de partículas que sigue el cursor
 * 3. Bio - Información personal con animaciones avanzadas
 * 4. Skills - Habilidades con efectos 3D y microinteracciones
 * 5. TimelineAurora - Línea temporal interactiva
 * 6. CTA - Llamada a la acción con efectos magnéticos
 */
const About: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const data = language === 'es' ? aboutEs : aboutEn;
  const whiteOverlayRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Crear animación de entrada desde blanco con timeout para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      if (whiteOverlayRef.current) {
        console.log('About: Iniciando animación de transición desde blanco');
        
        // Asegurar que el overlay esté visible inicialmente
        gsap.set(whiteOverlayRef.current, {
          opacity: 1,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          display: 'block'
        });
        
        // Desvanecer el overlay blanco después de un pequeño delay
        gsap.to(whiteOverlayRef.current, {
          opacity: 0,
          duration: 3,
          ease: "power2.out",
          delay: 0.5,
          onComplete: () => {
            console.log('About: Transición desde blanco completada');
            if (whiteOverlayRef.current) {
              whiteOverlayRef.current.style.display = 'none';
            }
          }
        });
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black overflow-x-hidden overscroll-none">
      {/* Overlay blanco para transición desde AfterBlackHole */}
      <div 
        ref={whiteOverlayRef}
        className="fixed inset-0 z-50 bg-white"
        style={{ 
          opacity: 1,
          display: 'block',
          pointerEvents: 'none'
        }}
      />
      
      {/* Sistema de partículas de fondo */}
      <div className="particle-system">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section - Aurora cinematográfica */}
      <HeroAurora data-hero="true" className="cinematic-entrance">
        <div className="flex flex-col h-full justify-between px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 max-w-7xl mx-auto relative z-20">
          {/* Header superior con efectos de entrada */}
          <div className="flex justify-between items-start">
            <div className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-green-300/60 font-mono neon-text">
              {data.hero.kickerLeft}
            </div>
            <div className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-green-300/60 font-mono hologram-effect">
              {data.hero.kickerRight}
            </div>
          </div>
          
          {/* Contenido principal centrado con efectos cinematográficos */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-8 sm:space-y-10 md:space-y-12 magnetic-hover">
              {/* Título principal con tipografía editorial mejorada */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-[clamp(2.5rem,10vw,10rem)] sm:text-[clamp(3rem,10vw,10rem)] md:text-[clamp(4rem,12vw,10rem)] font-light leading-[0.85] tracking-[-0.02em]">
                  <span className="block text-white font-extralight glitch-text" data-text={data.hero.titleTop}>{data.hero.titleTop}</span>
                  <span className="block text-green-300 font-bold italic tilt-3d">{data.hero.titleBottom}</span>
                </h1>
                
                {/* Subtítulo con diseño asimétrico y efectos */}
                <div className="relative px-4 sm:px-0">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
                    {data.hero.subtitle}
                  </p>
                  {/* Línea decorativa animada - oculta en móviles */}
                  <div className="hidden sm:block absolute -right-4 top-1/2 w-16 h-px bg-gradient-to-r from-green-300/50 to-transparent glow-effect"></div>
                </div>
              </div>

              {/* Stats con diseño moderno y efectos 3D */}
              {data.hero.stats && data.hero.stats.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-16">
                  {data.hero.stats.map((s, idx) => (
                    <React.Fragment key={s.label + idx}>
                      {idx > 0 && (
                        <>
                          {/* Separador horizontal para móviles */}
                          <div className="block sm:hidden w-16 h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent glow-effect"></div>
                          {/* Separador vertical para desktop */}
                          <div className="hidden sm:block w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-green-300/30 to-transparent glow-effect"></div>
                        </>
                      )}
                      <div className="text-center group cursor-default magnetic-hover">
                        <div className="text-xl sm:text-2xl md:text-3xl font-light text-green-300 mb-1 group-hover:scale-110 transition-transform duration-300 neon-text">{s.value}</div>
                        <div className="text-xs tracking-[0.2em] text-gray-200 uppercase">{s.label}</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Botón de llamada a la acción cinematográfico */}
              <div className="pt-6 sm:pt-8">
                <button 
                  onClick={() => navigate('/projects')}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400/10 to-emerald-600/10 border border-green-400/30 rounded-full text-green-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase liquid-morph hover:from-green-400/20 hover:to-emerald-600/20 hover:border-green-400/60 transition-all duration-500 cursor-pointer"
                >
                  <span className="relative z-10">{data.hero.ctaLabel}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer inferior con efectos */}
          <div className="flex justify-between items-end">
            <div className="text-xs sm:text-sm text-gray-200 font-mono hologram-effect">
              ADRIAN ALEJOS
            </div>
            <div className="text-xs sm:text-sm text-gray-200 font-mono cinematic-entrance">
              SCROLL ↓
            </div>
          </div>
        </div>
        
        {/* Gradiente de transición suave mejorado */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
      </HeroAurora>

      {/* Contenido con efectos cinematográficos aplicados */}
      <div className="relative z-10">
        <Bio className="waypoint cinematic-entrance" />
        
        <Skills className="waypoint magnetic-hover" />
        
        <TimelineAurora className="waypoint tilt-3d" />
        
        <CTA className="waypoint  " />
      </div>

      {/* Overlay de efectos ambientales */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid de fondo sutil */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Efectos de luces ambientales */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};

export default About;
