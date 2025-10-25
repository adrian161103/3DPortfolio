import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/TimelineAurora.css';
import { useLanguage } from '../../../context/LanguageContext';
import { aboutEs } from '../../../data/about/about.es';
import { aboutEn } from '../../../data/about/about.en';

gsap.registerPlugin(ScrollTrigger);

// Los items se cargan desde src/data/about según idioma

interface TimelineAuroraProps {
  className?: string;
}

export const TimelineAurora: React.FC<TimelineAuroraProps> = ({ className = '' }) => {
  const { language } = useLanguage();
  const data = language === 'es' ? aboutEs.timeline : aboutEn.timeline;
  const timelineRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const particleSystemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !svgRef.current || !lineRef.current) return;

    const timeline = timelineRef.current;
    const cards = timeline.querySelectorAll('.timeline-card');

    // Función para inicializar las animaciones con delay
    const initializeAnimations = () => {
      // Inicializar cards con estado oculto
      cards.forEach((card, index) => {
        gsap.set(card, { 
          opacity: 0, 
          y: 120, 
          scale: 0.8,
          rotationX: 20,
          transformPerspective: 1000
        });
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          refreshPriority: 1,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 1.5,
              ease: 'power3.out',
              delay: index * 0.2
            });
          }
        });
      });

      // Animación de la línea aurora - más espectacular
      const auroraLine = lineRef.current;
      if (auroraLine) {
        gsap.set(auroraLine, {
          strokeDasharray: "2000",
          strokeDashoffset: "2000"
        });

        // Animar el trazo de la línea
        gsap.to(auroraLine, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.out",
          delay: 0.5
        });
      }

      // Efectos continuos de la aurora
      gsap.to('.aurora-flow-1', {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to('.aurora-flow-2', {
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.7
      });

      gsap.to('.aurora-flow-3', {
        opacity: 0.4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1.2
      });
    };

    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    const rafId = requestAnimationFrame(() => {
      setTimeout(() => {
        initializeAnimations();
      }, 50); // 50ms delay para componentes renderizados dinámicamente
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

    // Sistema de partículas flotantes
    const createParticle = () => {
      if (!particleSystemRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'aurora-particle absolute w-1 h-1 rounded-full pointer-events-none';
      particle.style.left = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.backgroundColor = ['#0EF0B5', '#35D6A4', '#0AB27A', '#7ED6C9'][Math.floor(Math.random() * 4)];
      particle.style.boxShadow = `0 0 ${4 + Math.random() * 8}px currentColor`;
      
      particleSystemRef.current.appendChild(particle);
      
      gsap.set(particle, {
        scale: 0,
        x: Math.random() * 40 - 20,
      });
      
      gsap.to(particle, {
        scale: 1,
        y: -100,
        x: Math.random() * 80 - 40,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        ease: 'power2.out',
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    };

    // Crear partículas periódicamente
    const particleInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createParticle();
      }
    }, 300);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <section className={`py-24 px-6 bg-black relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20 relative z-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#0EF0B5] via-[#35D6A4] to-[#7ED6C9] bg-clip-text text-transparent mb-8">
            {data.headerTitle}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {data.headerSubtitle}
          </p>
        </div>

        <div ref={timelineRef} className="relative min-h-screen">
          {/* Sistema de partículas flotantes */}
          <div ref={particleSystemRef} className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 z-5"></div>

          {/* Aurora Line SVG - ESPECTACULAR */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-32 z-10">
            <svg 
              ref={svgRef} 
              className="w-full h-full" 
              viewBox="0 0 140 1000" 
              preserveAspectRatio="none"
            >
              <defs>
                {/* Aurora Gradients - Sistema de colores aurora */}
                <linearGradient id="auroraMain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0EF0B5" stopOpacity="1" />
                  <stop offset="25%" stopColor="#35D6A4" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0AB27A" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#7ED6C9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0EF0B5" stopOpacity="1" />
                </linearGradient>
                
                <linearGradient id="auroraFlow1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0EF0B5" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#35D6A4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0EF0B5" stopOpacity="0.3" />
                </linearGradient>
                
                <linearGradient id="auroraFlow2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7ED6C9" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#0AB27A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7ED6C9" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="auroraFlow3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#35D6A4" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#0EF0B5" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#35D6A4" stopOpacity="0.15" />
                </linearGradient>
                
                {/* Filtros avanzados para efectos aurora */}
                <filter id="auroraGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feComponentTransfer result="glow">
                    <feFuncA type="linear" slope="2"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow"/>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feComponentTransfer result="softGlow">
                    <feFuncA type="linear" slope="1.2"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="softGlow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Múltiples capas para efecto aurora profundo */}
              
              {/* Capa 3 - Fondo más difuso */}
              <path
                d="M 70 0 
                   C 90 100, 50 180, 75 250
                   S 45 320, 80 390
                   S 55 460, 75 530
                   S 45 600, 80 670
                   S 55 750, 75 830
                   S 55 900, 70 1000"
                fill="none"
                stroke="url(#auroraFlow3)"
                strokeWidth="12"
                opacity="1"
                filter="url(#softGlow)"
                className="aurora-flow-3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Capa 2 - Intermedia */}
              <path
                d="M 70 0 
                   C 85 100, 55 180, 75 250
                   S 50 320, 80 390
                   S 50 460, 75 530
                   S 50 600, 80 670
                   S 50 750, 75 830
                   S 50 900, 70 1000"
                fill="none"
                stroke="url(#auroraFlow2)"
                strokeWidth="8"
                opacity="1"
                filter="url(#softGlow)"
                className="aurora-flow-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Capa 1 - Superior */}
              <path
                d="M 70 0 
                   C 80 100, 60 180, 75 250
                   S 55 320, 80 390
                   S 55 460, 75 530
                   S 55 600, 80 670
                   S 55 750, 75 830
                   S 55 900, 70 1000"
                fill="none"
                stroke="url(#auroraFlow1)"
                strokeWidth="6"
                opacity="1"
                filter="url(#auroraGlow)"
                className="aurora-flow-1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* LÍNEA PRINCIPAL - Más brillante y definida */}
              <path
                ref={lineRef}
                d="M 70 0 
                   C 75 100, 65 180, 75 250
                   S 65 320, 80 390
                   S 60 460, 75 530
                   S 65 600, 80 670
                   S 60 750, 75 830
                   S 60 900, 70 1000"
                fill="none"
                stroke="url(#auroraMain)"
                strokeWidth="3"
                opacity="1"
                filter="url(#auroraGlow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Puntos de conexión brillantes */}
              {[120, 300, 480, 660, 840].map((y, index) => (
                <g key={index}>
                  <circle
                    cx="70"
                    cy={y}
                    r="8"
                    fill="url(#auroraMain)"
                    filter="url(#auroraGlow)"
                    opacity="0.8"
                  />
                  <circle
                    cx="70"
                    cy={y}
                    r="4"
                    fill="#0EF0B5"
                    opacity="1"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Timeline Cards con efectos aurora mejorados */}
          <div className="relative z-20 space-y-32 pt-8">
            {data.items.map((item) => (
              <div
                key={item.id}
                className={`timeline-card flex items-center ${
                  item.side === 'left' 
                    ? 'justify-start md:justify-end md:pr-20' 
                    : 'justify-start md:justify-start md:pl-20'
                }`}
              >
                <div className={`relative max-w-lg ${item.side === 'right' ? 'md:ml-4' : 'md:mr-4'}`}>
                  {/* Card con efectos aurora */}
                  <div className="relative group">
                    {/* Aurora Glow Background - Múltiples capas */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-[#0EF0B5]/30 via-[#35D6A4]/20 to-[#7ED6C9]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#0EF0B5]/20 via-[#0AB27A]/15 to-[#35D6A4]/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
                    
                    {/* Main Card con glassmorphism aurora */}
                    <div className="relative bg-black/95 backdrop-blur-lg rounded-2xl p-8 border border-[#0EF0B5]/40 shadow-2xl group-hover:border-[#35D6A4]/80 transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(14,240,181,0.3)]">
                      
                      {/* Animated border glow */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-[#0EF0B5]/0 via-[#35D6A4]/20 to-[#0EF0B5]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0EF0B5] via-[#35D6A4] to-[#7ED6C9] bg-clip-text text-transparent relative">
                          {item.year}
                          {/* Year highlight glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0EF0B5] via-[#35D6A4] to-[#7ED6C9] bg-clip-text text-transparent opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500">
                            {item.year}
                          </div>
                        </span>
                        
                        {/* Connection node mejorado */}
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0EF0B5]/40 via-[#35D6A4]/30 to-[#0AB27A]/40 flex items-center justify-center border border-[#0EF0B5]/60 group-hover:border-[#35D6A4]/90 transition-all duration-500 group-hover:scale-110">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#0EF0B5] to-[#35D6A4] rounded-full animate-pulse shadow-lg shadow-[#0EF0B5]/60 group-hover:shadow-[#0EF0B5]/90 transition-all duration-500"></div>
                          </div>
                          
                          {/* Particle burst effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-[#0EF0B5] rounded-full animate-ping"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`,
                                  animationDelay: `${i * 0.1}s`,
                                  animationDuration: '1s'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#35D6A4] transition-colors duration-500 relative">
                        {item.title}
                        {/* Title glow effect */}
                        <div className="absolute inset-0 text-[#0EF0B5] opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500">
                          {item.title}
                        </div>
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed text-lg mb-6 group-hover:text-gray-200 transition-colors duration-500">
                        {item.description}
                      </p>

                      {item.skills && (
                        <div className="flex flex-wrap gap-3">
                          {item.skills.map((skill, skillIndex) => (
                            <span
                              key={skill}
                              className="relative px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#0EF0B5]/20 via-[#35D6A4]/15 to-[#0AB27A]/20 text-[#0EF0B5] rounded-full border border-[#0EF0B5]/50 hover:border-[#35D6A4]/80 hover:bg-gradient-to-r hover:from-[#0EF0B5]/30 hover:via-[#35D6A4]/25 hover:to-[#0AB27A]/30 transition-all duration-300 cursor-default group/skill overflow-hidden"
                              style={{
                                animationDelay: `${skillIndex * 0.1}s`
                              }}
                            >
                              {/* Skill tag aurora effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-[#0EF0B5]/0 via-[#35D6A4]/30 to-[#0EF0B5]/0 translate-x-[-100%] group-hover/skill:translate-x-[100%] transition-transform duration-700"></div>
                              <span className="relative z-10">{skill}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Connecting line to timeline */}
                      <div className={`absolute top-1/2 ${item.side === 'left' ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} w-8 h-px bg-gradient-to-r ${item.side === 'left' ? 'from-[#0EF0B5]/60 to-transparent' : 'from-transparent to-[#0EF0B5]/60'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental aurora effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating aurora orbs */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#0EF0B5] rounded-full animate-pulse opacity-30"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                filter: 'blur(1px)',
                boxShadow: '0 0 10px currentColor'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};