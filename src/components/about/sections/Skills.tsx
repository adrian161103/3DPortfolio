import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../context/LanguageContext';
import { aboutEs } from '../../../data/about/about.es';
import { aboutEn } from '../../../data/about/about.en';
import type { SkillCategoryData } from '../../../data/about/aboutTypes';

gsap.registerPlugin(ScrollTrigger);

// Datos se cargan desde src/data/about según idioma

interface SkillsProps {
  className?: string;
}

export const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  const { language } = useLanguage();
  const data = language === 'es' ? aboutEs.skills : aboutEn.skills;
  const skillCategories: SkillCategoryData[] = data.categories;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const cards = grid.querySelectorAll('.skill-card');

    // Estado inicial cinematográfico
    gsap.set(header, { 
      opacity: 0, 
      y: 100,
      rotationX: 15,
      transformPerspective: 1000
    });
    
    gsap.set(cards, { 
      opacity: 0, 
      y: 120, 
      scale: 0.8,
      rotationY: 15,
      transformPerspective: 1000
    });

    // Timeline maestro
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animación del header
    masterTl.to(header, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.5,
      ease: 'power3.out'
    });

    // Animación de las cards
    masterTl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
      stagger: 0.15
    }, '-=0.8');

    // Animación de barras de progreso
    cards.forEach((card, index) => {
      const progressBars = card.querySelectorAll('.progress-bar');
      
      gsap.set(progressBars, { scaleX: 0, transformOrigin: 'left' });
      
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(progressBars, {
            scaleX: 1,
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.1,
            delay: index * 0.1
          });

          // Animación de contadores
          progressBars.forEach((bar) => {
            const skillLevel = parseInt(bar.getAttribute('data-level') || '0');
            const counter = bar.parentElement?.querySelector('.skill-counter');
            if (counter) {
              gsap.fromTo(counter, 
                { textContent: '0%' },
                {
                  textContent: skillLevel + '%',
                  duration: 1.5,
                  ease: 'power2.out',
                  delay: 0.5,
                  snap: { textContent: 1 }
                }
              );
            }
          });
        }
      });

      // Efectos de hover cinematográficos
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          y: -10,
          rotationY: 5,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          duration: 0.4,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotationY: 0,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      masterTl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`py-32 px-8 bg-black relative overflow-hidden ${className}`}>
      {/* Gradiente de transición superior */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-px bg-green-400"></div>
            <span className="text-sm tracking-[0.3em] text-green-400 font-mono uppercase">{data.headerKicker}</span>
            <div className="w-16 h-px bg-green-400"></div>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-light leading-tight tracking-tight mb-6">
            <span className="text-white">{data.headerTitleTop}</span>
            <br />
            <span className="text-green-400 italic">{data.headerTitleBottom}</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {data.headerSubtitle}
          </p>
        </div>

        {/* Grid de skills */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category) => (
            <div 
              key={category.title}
              className="skill-card bg-gray-900/30 border border-gray-800/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-300"
            >
              {/* Header de categoría */}
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-white mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </div>

              {/* Skills individuales */}
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="skill-counter text-green-400 font-mono text-sm">0%</span>
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`progress-bar absolute inset-y-0 left-0 bg-gradient-to-r ${category.color} rounded-full transition-all duration-300 group-hover:shadow-lg`}
                        data-level={skill.level}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradiente de transición inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};