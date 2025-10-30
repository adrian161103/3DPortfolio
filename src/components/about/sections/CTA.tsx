import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../context/LanguageContext';
import { aboutEs } from '../../../data/about/about.es';
import { aboutEn } from '../../../data/about/about.en';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  className?: string;
}

export const CTA: React.FC<CTAProps> = ({ className = '' }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const data = language === 'es' ? aboutEs.cta : aboutEn.cta;
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  // Función para navegar a proyectos
  const handleViewProjects = () => {
    navigate('/projects');
  };

  // Función para descargar CV
  const handleDownloadCV = () => {
    const cvPath = '/docs/adrian alejos garcia cv.pdf';
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Adrian_Alejos_Garcia_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !statsRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    const background = backgroundRef.current;
    const particleContainer = particleRef.current;

    // Configurar estado inicial cinematográfico
    gsap.set([content, stats], { 
      opacity: 0, 
      y: 50
    });

    if (background) {
      gsap.set(background, {
        opacity: 0
      });
    }

    // Crear partículas de código dinámicas (sin rotación)
    const createCodeParticles = () => {
      if (!particleContainer) return;

      const codeElements = [
        'console.log("¡Hola!");',
        'function magic() { }',
        'const awesome = true;',
        'return success;',
        '{ creativity: ∞ }',
        'npm install happiness',
        'git commit -m "Epic"',
        'class Developer { }'
      ];

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute text-xs font-mono text-green-400/20 pointer-events-none';
        particle.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particleContainer.appendChild(particle);

        gsap.to(particle, {
          y: -200,
          opacity: 1,
          duration: 6 + Math.random() * 2,
          ease: 'none',
          delay: Math.random() * 2,
          repeat: -1,
          onRepeat: () => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
          }
        });
      }
    };

    // Timeline cinematográfico principal
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animación del fondo
    if (background) {
      masterTl.to(background, {
        opacity: 0.1,
        duration: 2,
        ease: 'power2.out'
      });
    }

    // Animación del contenido principal
    masterTl.to(content, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out'
    }, 0.3);

    // Animación de estadísticas con efectos escalonados
    masterTl.to(stats, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=0.8');

    // Crear partículas
    createCodeParticles();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      masterTl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`py-32 px-8 bg-black relative overscroll-none overflow-hidden ${className}`}>
      {/* Fondo con efectos cinematográficos */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-blue-900/5"
      />
      
      {/* Contenedor de partículas */}
      <div ref={particleRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
      
      {/* Gradiente de transición superior */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* Layout editorial asimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Contenido principal */}
          <div ref={contentRef} className="lg:col-span-8 space-y-12 min-w-0">
            
            {/* Header con estilo editorial */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-green-300"></div>
                <span className="text-sm tracking-[0.3em] text-green-300 font-mono uppercase">
                  {data.kicker}
                </span>
              </div>
              
              <h2 className="text-5xl lg:text-8xl font-extralight leading-[0.85] tracking-[-0.02em]">
                {data.titleLines.map((line, i) => (
                  <span key={i} className={i === 1 ? 'text-green-300 italic font-light block' : 'text-white block'}>
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Descripción */}
            <div className="space-y-6 max-w-2xl">
              {data.paragraphs.map((p, i) => (
                <p key={i} className={`${i === 0 ? 'text-xl lg:text-2xl text-gray-300' : 'text-lg text-gray-400'} font-light leading-relaxed`}>
                  {p}
                </p>
              ))}
            </div>

            {/* Botones de acción cinematográficos */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <button 
                onClick={handleViewProjects}
                className="group relative px-8 py-4 bg-green-300 text-black font-medium rounded-full hover:bg-green-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400 focus:ring-offset-0 cursor-pointer"
              >
                <span className="relative z-10 tracking-wide cursor-pointer">{data.buttons.primary}</span>
              </button>
              
              <button 
                onClick={handleDownloadCV}
                className="group relative px-8 py-4 border border-green-300/50 text-green-300 font-medium rounded-full hover:border-green-300 hover:bg-green-300/5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400 focus:ring-offset-0 cursor-pointer"
              >
                <span className="relative z-10 tracking-wide cursor-pointer">{data.buttons.secondary}</span>
              </button>
            </div>
          </div>
          
          {/* Sidebar con estadísticas */}
          <div ref={statsRef} className="lg:col-span-4 space-y-8 min-w-0">
            
            {/* Stats elegantes */}
            <div className="space-y-8">
              <h3 className="text-sm tracking-[0.3em] text-green-300 font-mono uppercase">
                {language === 'es' ? 'Indicadores' : 'Metrics'}
              </h3>
              
              <div className="space-y-8">
                {data.stats?.map((s, idx) => (
                  <div key={idx} className="group">
                    <div className="text-4xl font-extralight text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                      {s.value}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider leading-relaxed">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote motivacional */}
            <div className="bg-green-300/5 border border-green-300/20 p-6 space-y-4 mt-12">
              <div className="text-4xl text-green-300/30 font-serif leading-none">"</div>
              {data.quote && (
                <p className="text-gray-300 italic font-light leading-relaxed -mt-2">
                  {data.quote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradiente de transición inferior suave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};