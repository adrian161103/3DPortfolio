import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../context/LanguageContext';
import { aboutEs } from '../../../data/about/about.es';
import { aboutEn } from '../../../data/about/about.en';

gsap.registerPlugin(ScrollTrigger);

interface BioProps {
  className?: string;
}

export const Bio: React.FC<BioProps> = ({ className = '' }) => {
  const { language } = useLanguage();
  const data = language === 'es' ? aboutEs.bio : aboutEn.bio;
  const bioRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bioRef.current || !textRef.current || !statsRef.current || !quoteRef.current) return;

    const bio = bioRef.current;
    const text = textRef.current;
    const stats = statsRef.current;
    const quote = quoteRef.current;
    const photo = photoRef.current;
    const background = backgroundRef.current;

    // Configurar estado inicial simplificado con fallback de visibilidad
    gsap.set([text, stats], { 
      opacity: 1, // Cambiado de 0 a 1 para asegurar visibilidad
      y: 0 // Cambiado de 30 a 0 para evitar desplazamiento inicial
    });

    // Estado inicial para la cita
    gsap.set(quote, {
      opacity: 1, // Cambiado de 0 a 1 para asegurar visibilidad
      y: 0 // Cambiado de 20 a 0 para evitar desplazamiento inicial
    });

    // Estado inicial para la foto
    if (photo) {
      gsap.set(photo, {
        opacity: 0,
        scale: 0.8,
        y: 30
      });
    }

    if (background) {
      gsap.set(background, {
        opacity: 0
      });
    }

    // Mantener el texto original sin división en palabras para asegurar visibilidad
    const textElements = text.querySelectorAll('p:not(.quote-text), h2, h3');
    // Comentado para evitar problemas de visibilidad
    // textElements.forEach(element => {
    //   const words = element.textContent?.split(' ') || [];
    //   element.innerHTML = words
    //     .map(w => `<span style="opacity:0;transform:translateY(30px)">${w}</span>`)
    //     .join(' ');
    // });

    // Dividir estadísticas para animación escalonada
    const statItems = stats.querySelectorAll('[data-animate]');
    gsap.set(statItems, {
      opacity: 0,
      y: 20
    });

    // Timeline cinematográfico principal
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: bio,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animación de fondo
    if (background) {
      masterTl.to(background, {
        opacity: 0.1,
        duration: 1,
        ease: 'power2.out'
      });
    }

    // Animación del contenido principal simplificada - asegurar visibilidad
    masterTl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.5, // Duración reducida
      ease: 'power2.out'
    }, 0);

    // Asegurar que todos los elementos de texto sean visibles inmediatamente
    textElements.forEach((element) => {
      gsap.set(element, {
        opacity: 1,
        y: 0,
        visibility: 'visible'
      });
    });

    // Animación de estadísticas simplificada
    masterTl.to(statItems, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1
    }, '-=0.8');

    // Animación de foto con efecto suave
    if (photo) {
      masterTl.to(photo, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.7');
    }

    // Animación de quote simplificada
    masterTl.to(quote, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6');

    // Efecto de partículas flotantes
    const createFloatingParticles = () => {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-green-400/30 rounded-full pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        bio.appendChild(particle);

        gsap.to(particle, {
          y: -100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          ease: 'power2.out',
          delay: Math.random() * 2,
          repeat: -1,
          onRepeat: () => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
          }
        });
      }
    };

    createFloatingParticles();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      masterTl.kill();
    };
  }, []);

  return (
    <section ref={bioRef} className={`bio-section py-32 px-8 bg-black relative overflow-hidden ${className}`}>
      {/* Gradiente de transición superior */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>
      
      <div className="w-full mx-auto relative z-20 px-4">
        
        {/* Layout asimétrico inspirado en diseño editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Columna principal de texto */}
          <div ref={textRef} className="lg:col-span-4 space-y-12 min-w-0">
            
            {/* Encabezado editorial */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-green-300"></div>
                <span className="text-sm tracking-[0.3em] text-green-300 font-mono uppercase">
                  {data.kicker}
                </span>
              </div>
              
              <h2 className="text-[clamp(3rem,8vw,6rem)] font-extralight leading-[1.05] tracking-[-0.02em]">
                {data.heading.map((line, i) => (
                  <span 
                    key={i} 
                    className={i === 1 ? 'block text-green-300 italic font-light opacity-100 visible' : 'block text-white opacity-100 visible'}
                    style={{ 
                      opacity: 1,
                      visibility: 'visible',
                      color: i === 1 ? '#34d399' : '#ffffff',
                      fontWeight: i === 1 ? '300' : '200',
                      fontStyle: i === 1 ? 'italic' : 'normal'
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Párrafos con tipografía editorial */}
            <div className="space-y-8 text-lg lg:text-xl leading-relaxed">
              {data.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`${i === data.paragraphs.length - 1 ? 'text-gray-300 font-medium' : 'text-gray-400 font-light'} whitespace-normal break-words opacity-100 visible`}
                  style={{
                    opacity: 1,
                    visibility: 'visible',
                    display: 'block',
                    color: i === data.paragraphs.length - 1 ? '#d1d5db' : '#9ca3af',
                    fontWeight: i === data.paragraphs.length - 1 ? 500 : 300,
                    transform: 'none',
                    fontSize: i === 0 ? '1.25rem' : '1.125rem',
                    lineHeight: '1.625',
                    marginBottom: '2rem'
                  } as React.CSSProperties}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Lista de enfoques con diseño moderno */}
            {data.columns && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                {data.columns.map((col) => (
                  <div key={col.title} className="space-y-4">
                    <h3 className="text-green-300 text-sm tracking-[0.2em] uppercase font-mono">
                      {col.title}
                    </h3>
                    <ul className="space-y-3 text-gray-300 break-words">
                      {col.items.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className="w-1 h-1 bg-green-300 rounded-full flex-shrink-0"></div>
                          <span className="break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar con información adicional */}
          <div className="lg:col-span-1 space-y-8 lg:pl-4 break-words overflow-hidden">
            
            {/* Stats rediseñados */}
            <div ref={statsRef} className="space-y-6">
              <h3 className="text-sm tracking-[0.3em] text-green-300 font-mono uppercase">
                {language === 'es' ? 'Información' : 'Info'}
              </h3>
              
              <div className="space-y-4">
                {data.sidebar?.stats?.map((s, idx) => (
                  <div key={idx} data-animate className="border-l-2 border-green-300/30 pl-4">
                    <div className="text-2xl font-light text-white mb-1">{s.value}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Foto personal con diseño elegante */}
            <div ref={photoRef} className="space-y-4">
              <h3 className="text-sm tracking-[0.3em] text-green-300 font-mono uppercase">
                {language === 'es' ? 'Conoce al Desarrollador' : 'Meet The Developer'}
              </h3>
              
              <div className="relative group">
                {/* Contenedor de la foto */}
                <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                  {/* Borde decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-300/20 to-green-300/5 rounded-full p-1">
                    <div className="w-full h-full bg-black rounded-full p-2">
                      {/* Placeholder para la foto - reemplaza src con tu imagen */}
                      <img 
                        src={data.sidebar?.photo?.src || '/path-to-your-photo.jpg'} 
                        alt={data.sidebar?.photo?.alt || 'Profile photo'}
                        className="w-full h-full object-cover rounded-full border-2 border-green-300/30 transition-all duration-500 group-hover:border-green-300/60 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback si no hay imagen
                          e.currentTarget.style.display = 'none';
                          const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                          if (sibling) sibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback con iniciales si no hay imagen */}
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-green-300/20 to-green-300/5 border-2 border-green-300/30 flex items-center justify-center text-2xl font-light text-green-300" style={{display: 'none'}}>
                        {data.sidebar?.photo?.initials || 'AA'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Efecto de hover sutil */}
                  <div className="absolute inset-0 rounded-full bg-green-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Información adicional */}
                <div className="text-center space-y-2 mt-4">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    {data.sidebar?.availability}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300">{data.sidebar?.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote inspiracional compacta */}
            <div ref={quoteRef} className="bg-green-300/5 border border-green-300/20 p-4 space-y-2 break-words overflow-hidden">
              <div className="text-3xl text-green-300/30 font-serif leading-none">"</div>
              <p className="quote-text text-sm text-gray-300 italic font-light leading-relaxed -mt-2 break-words">
                {data.quote?.text}
              </p>
              <div className="text-xs text-green-300 tracking-wider break-words">— {data.quote?.author}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradiente de transición inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};