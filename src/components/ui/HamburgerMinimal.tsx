import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { useHamburgerNavigation } from '../../hooks/useHamburgerNavigation';
import { useLanguage } from '../../context/LanguageContext';
import { headerEs, headerEn } from '../../data/header';


const HamburgerMinimal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { menuItems } = useHamburgerNavigation();
  const { language } = useLanguage();
  const location = useLocation();
  
  // Obtener datos de traducción según el idioma actual
  const headerData = language === 'es' ? headerEs : headerEn;

  // Obtener colores dinámicos según la página actual
  const getThemeColors = () => {
    const path = location.pathname;
    
    if (path === '/about') {
      return {
        primary: '#22c55e', // green-500
        primaryRgb: '34, 197, 94',
        secondary: '#16a34a', // green-600
        text: '#bbf7d0', // green-200
        textSecondary: '#86efac' // green-300
      };
    } else if (path === '/contact') {
      return {
        primary: '#3b82f6', // blue-500
        primaryRgb: '59, 130, 246',
        secondary: '#2563eb', // blue-600
        text: '#bfdbfe', // blue-200
        textSecondary: '#93c5fd' // blue-300
      };
    } else if (path === '/projects') {
      return {
        primary: '#06b6d4', // cyan-500
        primaryRgb: '6, 182, 212',
        secondary: '#0891b2', // cyan-600
        text: '#a5f3fc', // cyan-200
        textSecondary: '#67e8f9' // cyan-300
      };
    } else {
      // Default theme (Home)
      return {
        primary: '#ffffff', // white
        primaryRgb: '255, 255, 255',
        secondary: '#f3f4f6', // gray-100
        text: '#ffffff', // white
        textSecondary: '#d1d5db' // gray-300
      };
    }
  };

  const themeColors = getThemeColors();

  const toggleMenu = () => setIsOpen(prev => !prev);

  const toggleSection = useCallback((sectionName: string) => {
    const isCurrentlyExpanded = expandedSection === sectionName;
    
    if (isCurrentlyExpanded) {
      // Animación de cierre
      gsap.to(`.expanded-section-${sectionName}`, {
        height: 0,
        opacity: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setExpandedSection(null);
        }
      });
    } else {
      // Primero cerramos cualquier sección abierta
      if (expandedSection) {
        gsap.to(`.expanded-section-${expandedSection}`, {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.2,
          ease: "power2.inOut"
        });
      }
      
      // Luego abrimos la nueva sección
      setExpandedSection(sectionName);
    }
  }, [expandedSection]);

  const handleNavigate = (action: () => void) => {
    action();
    setIsOpen(false);
    setExpandedSection(null);
  };

  // Contenido para cada sección usando los datos de traducción
  const sectionContent = headerData.sectionContent;

  useEffect(() => {
    gsap.fromTo('.hamburger-header', { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to('.hamburger-menu', { height: 'auto', opacity: 1, duration: 0.25, ease: 'power2.out' });
    } else {
      gsap.to('.hamburger-menu', { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
      setExpandedSection(null); // Cerrar secciones expandidas cuando se cierre el menú
    }
  }, [isOpen]);

  // Animación de apertura para secciones expandibles
  useEffect(() => {
    if (expandedSection) {
      // Pequeño delay para que el DOM se actualice
      setTimeout(() => {
        gsap.fromTo(`.expanded-section-${expandedSection}`, 
          {
            height: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0
          },
          {
            height: 'auto',
            opacity: 1,
            paddingTop: '8px',
            paddingBottom: '16px',
            duration: 0.4,
            ease: "power2.out"
          }
        );
      }, 10);
    }
  }, [expandedSection]);

  // Manejar tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (expandedSection) {
          toggleSection(expandedSection); // Usa toggleSection para animación suave
        } else if (isOpen) {
          setIsOpen(false); // Luego cierra el menú
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, expandedSection, toggleSection]);

  return (
    <>
      <header className="hamburger-header fixed top-0 right-0 z-50 p-3 bg-transparent">
        <button
          onClick={toggleMenu}
          className="hamburger-btn pointer-events-auto flex flex-col justify-center items-center w-8 h-8 space-y-1 transition-all duration-300 cursor-pointer"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span 
            className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
            style={{ backgroundColor: themeColors.primary }}
          />
          <span 
            className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
            style={{ backgroundColor: themeColors.primary }}
          />
          <span 
            className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
            style={{ backgroundColor: themeColors.primary }}
          />
        </button>
      </header>

      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)} />}

      <nav 
        className={`hamburger-menu fixed top-14 right-0 z-50 bg-black/95 border overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
        style={{ borderColor: `rgba(${themeColors.primaryRgb}, 0.2)` }}
      >
        <div className="w-80 max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-white/10 last:border-b-0">
                <button
                  onClick={() => toggleSection(item.label)}
                  disabled={item.disabled}
                  className={`menu-item block w-full text-left px-4 py-3 font-mono transition-all duration-200 border border-transparent hover:border-opacity-30 ${
                    item.disabled
                      ? 'text-gray-600 cursor-not-allowed'
                      : ''
                  }`}
                  style={!item.disabled ? {
                    color: themeColors.text,
                    '--hover-bg': `rgba(${themeColors.primaryRgb}, 0.1)`,
                    '--hover-color': themeColors.textSecondary,
                    '--hover-border': `rgba(${themeColors.primaryRgb}, 0.3)`
                  } as React.CSSProperties : {}}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      {item.icon && <span className="text-sm">{item.icon}</span>}
                      <span>{'>'} {item.label}</span>
                    </span>
                    <span className={`text-xs transition-transform duration-200 ${
                      expandedSection === item.label ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </span>
                </button>
                
                {/* Sección expandible */}
                {expandedSection === item.label && sectionContent[item.label as keyof typeof sectionContent] && (
                  <div 
                    className={`expanded-section-${item.label} section-content px-4 pb-4 pt-2 bg-black/50 border-l-2 ml-4 overflow-hidden`}
                    style={{ borderLeftColor: `rgba(${themeColors.primaryRgb}, 0.2)` }}
                  >
                    <h3 
                      className="font-mono text-sm mb-2"
                      style={{ color: themeColors.text }}
                    >
                      {sectionContent[item.label as keyof typeof sectionContent].title}
                    </h3>
                    <p 
                      className="font-mono text-xs mb-4 leading-relaxed"
                      style={{ color: themeColors.textSecondary }}
                    >
                      {sectionContent[item.label as keyof typeof sectionContent].description}
                    </p>
                    
                    {/* Tips section - solo para Home */}
                    {sectionContent[item.label as keyof typeof sectionContent].tips && (
                      <div className="mb-4">
                        <h4 
                          className="font-mono text-xs mb-2 opacity-80"
                          style={{ color: themeColors.text }}
                        >
                          {headerData.labels.navigationTips}
                        </h4>
                        <ul className="space-y-1">
                          {sectionContent[item.label as keyof typeof sectionContent].tips!.map((tip, tipIndex) => (
                            <li 
                              key={tipIndex}
                              className="font-mono text-xs flex items-start"
                              style={{ color: themeColors.textSecondary }}
                            >
                              <span 
                                className="inline-block w-1.5 h-1.5 rounded-full mr-2 mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: themeColors.primary }}
                              ></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleNavigate(item.action)}
                      className="w-full font-mono text-xs py-2 px-4 border transition-all duration-200 hover:shadow-lg cursor-pointer"
                      style={{
                        backgroundColor: `rgba(${themeColors.primaryRgb}, 0.1)`,
                        color: themeColors.text,
                        borderColor: `rgba(${themeColors.primaryRgb}, 0.3)`
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = `rgba(${themeColors.primaryRgb}, 0.2)`;
                        target.style.borderColor = `rgba(${themeColors.primaryRgb}, 0.5)`;
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = `rgba(${themeColors.primaryRgb}, 0.1)`;
                        target.style.borderColor = `rgba(${themeColors.primaryRgb}, 0.3)`;
                      }}
                    >
                      ▶ {sectionContent[item.label as keyof typeof sectionContent].buttonText}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Terminal-style footer */}
          <div 
            className="p-4 border-t"
            style={{ borderTopColor: `rgba(${themeColors.primaryRgb}, 0.2)` }}
          >
            <div 
              className="font-mono text-xs space-y-1"
              style={{ color: themeColors.textSecondary }}
            >
              <div>{headerData.footer.session}</div>
              <div>{headerData.footer.status}</div>
              <div style={{ color: themeColors.text }}>{headerData.footer.escHint}</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HamburgerMinimal;
