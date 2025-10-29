// ES: Para el desarrollador que lee esto, por temas de tiempo, he decidido no modularizar momentaneamente este componente. posterior a la salida y con mas calma lo haré. Gracias por tu comprensión.
// EN: For the developer reading this: due to time constraints, I’ve decided not to modularize this component for now. I’ll do it later, once things settle down. Thanks for your understanding.

import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { projectsEs } from '../data/projects/projects.es';
import { projectsEn } from '../data/projects/projects.en';
import { Project, ProjectsData } from '../data/projects/projectsTypes';
// Importamos desde nuestra implementación centralizada
import { gsap } from '../lib/gsap';

/**
 * Componente Projects - Vista de proyectos con estilo futurista holográfico
 */
const Projects: React.FC = () => {
  // Obtener los datos según el idioma
  const { language } = useLanguage();
  const projectsData: ProjectsData = language === "es" ? projectsEs : projectsEn;
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  
  // Referencias para elementos DOM
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  
  // Estado
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [, setIsHovering] = useState<string | number | null>(null); //sin variable
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Audio para efectos sonoros (temporalmente desactivados)
  // Referencias eliminadas para evitar errores de lint

  // Textos traducidos para la interfaz
  const uiText = projectsData.uiText;
  
  // Usar proyectos desde el archivo de traducciones
  const projects = projectsData.projects;

  // Filtrar proyectos según el término de búsqueda y filtro activo
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === "" || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.technologies && project.technologies.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      
    const matchesFilter = activeFilter === null || project.type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Paginación
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Extraer tipos únicos para el filtro
  const uniqueTypes = Array.from(new Set(projects.map(p => p.type)));

  // Cargar efectos de sonido (temporalmente desactivado)
  useEffect(() => {
    // Los efectos de sonido están desactivados 
    return () => {
      // Sin limpieza necesaria
    };
  }, []);

  // Funciones para efectos sonoros (temporalmente desactivadas)
  const playHoverSound = () => {
    // Sonido desactivado
  };

  const playClickSound = () => {
    // Sonido desactivado
  };

  // Efecto para la animación inicial de carga
  useEffect(() => {
    if (isInitialized) return;
    
    // Crear animación de entrada desde blanco
    if (whiteOverlayRef.current) {
      // Comenzar con el overlay blanco visible
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
        delay: 0.3,
        onComplete: () => {
          if (whiteOverlayRef.current) {
            whiteOverlayRef.current.style.display = 'none';
          }
        }
      });
    }
    
    // Ejecutar animaciones con un delay seguro para el DOM
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsInitialized(true);
      
      // Secuencia de animación principal
      const tl = gsap.timeline();
      
      // Animación de entrada para el contenedor principal
      tl.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
      
      // Animación del título con efecto de tipeo
      tl.fromTo(headingRef.current, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
      
      // Efecto de tipeo para el texto del título
      tl.to('.typing-text', {
        duration: 1.2,
        text: {
          value: uiText.title,
          delimiter: ""
        },
        ease: "none"
      }, "-=0.3");
      
      // Elementos de la interfaz
      tl.fromTo(searchRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      );
      
      tl.fromTo(filtersRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 },
        "-=0.2"
      );
      
      // Animación del contenedor de la tabla
      tl.fromTo(tableRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" },
        "-=0.3"
      );
      
      // Animación del holograma decorativo
      tl.fromTo(hologramRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" },
        "-=0.5"
      );
      
      // Iniciar escaneo del holograma
      tl.fromTo('.hologram-scanner',
        { y: 0, opacity: 0.4 },
        { 
          y: '100%', 
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        },
        "-=0.5"
      );
      
      // Animación de partículas cibernéticas
      gsap.to('.cyber-particle', {
        x: 'random(-20, 20)',
        y: 'random(-20, 20)',
        opacity: 'random(0.3, 0.7)',
        duration: 'random(1, 3)',
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.05
      });
      
      // Efecto constante en el borde
      gsap.to('.border-pulse', {
        boxShadow: '0 0 15px rgba(34, 211, 238, 0.5), inset 0 0 10px rgba(34, 211, 238, 0.3)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Animación para líneas de datos en el fondo
      gsap.to('.data-line', {
        width: '100%', 
        duration: 3,
        repeat: -1,
        repeatDelay: 1,
        ease: "power1.inOut",
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
      
      // Animación para proyectos destacados eliminada
    }, 300); // Reducido a 300ms para mejor integración con animaciones del componente padre

    return () => clearTimeout(loadingTimer);
  }, [isInitialized, uiText.title]);

  // Efecto de animación para las filas de la tabla cuando cambian los filtros
  useEffect(() => {
    if (!isInitialized) return;
    
    // Limpiar filas existentes
    gsap.set('.project-row', { 
      opacity: 0, 
      y: 20
    });
    
    // Animar nuevas filas con escala
    gsap.to('.project-row', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out"
    });
    
  }, [searchTerm, activeFilter, isInitialized, currentPage]);

  // Efecto para añadir transición de hover a los proyectos
  useGSAP(() => {
    if (!isInitialized || !projectsContainerRef.current) return;
    
    gsap.utils.toArray<HTMLElement>('.project-row').forEach((row: HTMLElement) => {
      const tl = gsap.timeline({ paused: true });
      tl.to(row, {
        backgroundColor: 'rgba(34, 211, 238, 0.05)',
        boxShadow: 'inset 0 0 10px rgba(34, 211, 238, 0.1)',
        duration: 0.3
      });
      
      // Uso de variable para guardar la timeline en lugar de propiedad personalizada
      const rowAnimation = tl;
      
      row.addEventListener('mouseenter', () => {
        playHoverSound();
        rowAnimation.play();
      });
      
      row.addEventListener('mouseleave', () => {
        rowAnimation.reverse();
      });
    });
    
    // Configurar animaciones para las tarjetas de proyectos expandidas
    gsap.utils.toArray<HTMLElement>('.project-card-3d').forEach((card: HTMLElement, i: number) => {
      gsap.fromTo(card,
        { 
          y: 50, 
          opacity: 0, 
          rotationY: -15 
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "back.out(1.7)",
        }
      );
    });
    
  }, [filteredProjects, isInitialized, currentPage]);
  
  // Animación para cuando se selecciona un proyecto
  useEffect(() => {
    if (selectedProject) {
      playClickSound();
      
      gsap.fromTo('.project-modal', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
      );
      
      gsap.fromTo('.project-modal-content',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 }
      );
      
      // Animar gráfico de tecnologías
      gsap.to('.tech-bar', {
        width: "var(--bar-width)",
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.1,
        delay: 0.2
      });
    }
  }, [selectedProject]);

  return (
    <>
      {/* Overlay blanco para transición desde AfterBlackHole */}
      <div 
        ref={whiteOverlayRef}
        className="fixed inset-0 z-[55] bg-white"
        style={{ 
          opacity: 1,
          display: 'block',
          pointerEvents: 'none'
        }}
      />
      
      {/* Pantalla de carga */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-cyan-500 border-cyan-500/20 rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-500 font-mono tracking-wider">
              {uiText.loading}
              <span className="animate-pulse">.</span>
              <span className="animate-pulse delay-150">.</span>
              <span className="animate-pulse delay-300">.</span>
            </p>
          </div>
        </div>
      )}
      
      {/* Contenedor principal */}
      <div 
        ref={containerRef}
        className="absolute inset-0 flex flex-col cursor-default px-4 pt-14 pb-8 overflow-hidden"
        style={{ 
          backgroundColor: '#0a0f18',
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 60%)'
        }}
      >
        {/* Partículas cibernéticas (reducidas) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={`particle-${i}`}
              className="cyber-particle absolute w-1 h-1 rounded-full bg-cyan-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 5px rgba(34, 211, 238, 0.8)',
              }}
            />
          ))}
          
          {/* Líneas de datos eliminadas para mejorar la estética */}
        </div>
        
        {/* Grid decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="w-full h-full" 
               style={{ 
                 backgroundImage: 'linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
               }}>
          </div>
        </div>
        
        {/* Líneas decorativas laterales */}
        <div className="absolute top-0 bottom-0 left-10 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-10 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        
        {/* Encabezado */}
        <div className="w-full flex justify-between items-center mb-6 px-4 border-b border-cyan-500/30 pb-4 relative">
          {/* Indicador de conexión parpadeante */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2"></div>
            <div className="text-cyan-400/70 text-xs font-mono">//SYS.CONNECTED</div>
          </div>
          
          <h1 ref={headingRef} className="text-4xl font-bold text-cyan-400 ml-32">
            <span className="text-white">&gt;</span> <span className="typing-text"></span><span className="text-white animate-pulse">_</span>
          </h1>
          
          {/* Búsqueda */}
          <div ref={searchRef} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <input
              type="text"
              placeholder={uiText.searchPlaceholder}
              className="relative bg-black/30 border border-cyan-500/50 text-cyan-100 px-4 py-2 rounded-md w-64
                        focus:outline-none focus:ring-1 focus:ring-cyan-400 placeholder-cyan-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-2.5 text-cyan-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Filtros */}
        <div ref={filtersRef} className="flex space-x-2 mb-5 px-4 relative">
          <button 
            className={`px-3 py-1 rounded-md transition-all duration-300 text-sm relative overflow-hidden
                      ${activeFilter === null ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 
                      'bg-cyan-900/30 text-cyan-400 hover:bg-cyan-800/50 hover:shadow-md hover:shadow-cyan-500/10'}`}
            onClick={() => {
              // Solo reproducir sonido si cambia el filtro
              if (activeFilter !== null) {
                playClickSound();
              }
              setActiveFilter(null);
            }}
          >
            <span className="relative z-10 ">{uiText.filterAll}</span>
            {activeFilter === null && (
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500 opacity-70"></span>
            )}
          </button>
          {uniqueTypes.map(type => (
            <button 
              key={type} 
              className={`px-3 py-1 rounded-md transition-all duration-300 text-sm relative overflow-hidden
                        ${activeFilter === type ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 
                        'bg-cyan-900/30 text-cyan-400 hover:bg-cyan-800/50 hover:shadow-md hover:shadow-cyan-500/10'}`}
              onClick={() => {
                // Solo reproducir sonido si cambia el filtro
                if (activeFilter !== type) {
                  playClickSound();
                }
                setActiveFilter(type);
              }}
            >
              <span className="relative z-10">{type}</span>
              {activeFilter === type && (
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500 opacity-70"></span>
              )}
            </button>
          ))}
        </div>
      
        {/* Proyectos (Vista de tabla o Vista 3D) */}
        <div ref={projectsContainerRef} className="relative overflow-hidden flex-1 mx-4 border-pulse">
          {/* Holograma decorativo */}
          <div ref={hologramRef} className="absolute -top-10 right-4 w-32 h-32 pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full opacity-30"
                style={{ 
                  background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0) 70%)',
                  animation: 'pulse 2s infinite'
                }}>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16">
                  <div className="w-full h-full rounded-full border-2 border-cyan-400/30 relative animate-spin"
                      style={{ animationDuration: '10s' }}>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-cyan-400/70 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-cyan-400/50 animate-spin"
                        style={{ animationDuration: '5s', animationDirection: 'reverse' }}>
                      <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-cyan-400/70 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Efecto de escaneo horizontal animado */}
              <div className="hologram-scanner absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"></div>
            </div>
          </div>

          {/* VISTA TABLA CON DESPLEGABLES 3D */}
            <div ref={tableRef} className="relative h-full border border-cyan-500/20 rounded-md overflow-hidden">
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-400/60 pointer-events-none"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-400/60 pointer-events-none"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-400/60 pointer-events-none"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-400/60 pointer-events-none"></div>
              
              {/* UI decorativa */}
              <div className="absolute top-0 left-0 w-full h-8 flex items-center px-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-900/20 via-transparent to-transparent">
                <div className="text-xs text-cyan-400/70 font-mono">DATABASE//RECORDS: {filteredProjects.length}</div>
                <div className="ml-auto flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                </div>
              </div>
              
              {/* Contenido de la tabla */}
              <div className="w-full h-full pt-8 overflow-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-cyan-300 border-b border-cyan-700/50">
                      <th className="py-4 px-6 w-6"></th>
                      <th className="py-4 px-6 w-24">{uiText.year}</th>
                      <th className="py-4 px-6">{uiText.project}</th>
                      <th className="py-4 px-6">{uiText.agency}</th>
                      <th className="py-4 px-6">{uiText.type}</th>
                      <th className="py-4 px-6">{uiText.status}</th>
                      <th className="py-4 px-6 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProjects.length > 0 ? (
                      currentProjects.map(project => (
                        <React.Fragment key={project.id}>
                          <tr 
                            className="project-row border-b border-cyan-800/30 text-gray-300 opacity-0 transform translate-y-4
                                      hover:bg-cyan-900/10 transition-all duration-200 cursor-pointer relative"
                            onMouseEnter={() => setIsHovering(project.id)}
                            onMouseLeave={() => setIsHovering(-1)}
                            onClick={() => {
                              // Solo reproducir sonido al expandir, no al colapsar
                              if (expandedProject !== project.id) {
                                playClickSound();
                              }
                              setExpandedProject(expandedProject === project.id ? null : project.id);
                            }}
                          >
                            <td className="py-4 px-6 text-center">
                              <button
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-cyan-900/30 hover:bg-cyan-800/50 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Solo reproducir sonido al expandir, no al colapsar
                                  if (expandedProject !== project.id) {
                                    playClickSound();
                                  }
                                  setExpandedProject(expandedProject === project.id ? null : project.id);
                                }}
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${expandedProject === project.id ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </td>
                            <td className="py-4 px-6 text-cyan-500">{project.year}</td>
                            <td className="py-4 px-6 font-medium relative">
                              {project.name}
                            </td>
                            <td className="py-4 px-6">{project.agency}</td>
                            <td className="py-4 px-6">{project.type}</td>
                            <td className="py-4 px-6">
                              <span className={`status-indicator ${
                                project.status === 'completed' ? 'status-completed' : 
                                project.status === 'in-progress' ? 'status-in-progress' : 
                                'status-planned'
                              }`}>
                                {project.status === 'completed' ? uiText.statusCompleted : 
                                 project.status === 'in-progress' ? uiText.statusInProgress : 
                                 uiText.statusPlanned}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playClickSound(); // Mantener sonido para este botón importante
                                  setSelectedProject(project);
                                }}
                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-5 w-5 inline-block"
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                          
                          {/* Fila expandible con vista 3D */}
                          {expandedProject === project.id && (
                            <tr className="bg-gray-900/50">
                              <td colSpan={7} className="p-0">
                                <div 
                                  className="project-3d-expanded h-64 relative overflow-hidden expanded-project active perspective-1000 cursor-pointer"
                                  onClick={() => {
                                    playClickSound(); // Mantener sonido para este elemento importante
                                    setSelectedProject(project);
                                  }}
                                >
                                  <div 
                                    className="project-card-3d absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-cyan-950/50
                                            border-t border-b border-cyan-500/20 p-4 hologram-effect float-card"
                                  >
                                    {/* Imagen del proyecto con efecto holográfico */}
                                    <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
                                      {project.image ? (
                                        <div className="relative w-full h-full">
                                          <img 
                                            src={project.image} 
                                            alt={project.name} 
                                            className="w-full h-full object-cover"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-900/90"></div>
                                          
                          
                          {/* Efectos de escaneo animados - simula análisis de datos */}
                          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="scan-line" style={{ top: '0' }}></div>
                            <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-cyan-500/10 to-transparent"
                                style={{ animation: 'scanHorizontal 4s infinite linear' }}></div>
                          </div>                                          {/* Esquinas decorativas */}
                                          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-400/80"></div>
                                          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan-400/80"></div>
                                          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-cyan-400/80"></div>
                                          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-cyan-400/80"></div>
                                        </div>
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-700/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Detalles del proyecto */}
                                    <div className="w-2/3 pr-8 flex flex-col h-full">
                                      <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl text-cyan-400 font-bold detail-appear" style={{ animationDelay: '0.1s' }}>{project.name}</h3>
                                        <div className="text-cyan-300/70 text-sm detail-appear" style={{ animationDelay: '0.2s' }}>
                                          <span className="inline-block border-b border-cyan-500/30 pb-1">{project.year}</span>
                                        </div>
                                      </div>
                                      
                                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 detail-appear" style={{ animationDelay: '0.3s' }}>{project.description}</p>
                                      
                                      {/* Tecnologías */}
                                      {project.technologies && project.technologies.length > 0 && (
                                        <div className="mb-4 detail-appear" style={{ animationDelay: '0.4s' }}>
                                          <h4 className="text-cyan-500 text-xs mb-2">{language === "es" ? "Tecnologías:" : "Technologies:"}</h4>
                                          <div className="flex flex-wrap">
                                            {project.technologies.map((tech, idx) => (
                                              <span key={idx} className="tech-badge">
                                                {tech}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="mt-auto flex justify-between items-center">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                                    ${project.status === 'completed' ? 'bg-green-900/30 text-green-400' : 
                                                      project.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' : 
                                                      'bg-yellow-900/30 text-yellow-400'}`}>
                                          {project.status === 'completed' ? uiText.statusCompleted : 
                                           project.status === 'in-progress' ? uiText.statusInProgress : 
                                           uiText.statusPlanned}
                                        </span>
                                        
                                        {project.url && (
                                          <a 
                                            href={project.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center transition-colors float-card"
                                          >
                                            <span className="detail-appear" style={{ animationDelay: '0.5s' }}>{uiText.visitProject}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                          </a>
                                        )}
                                      </div>
                                      
                                      {/* Decoraciones de esquina */}
                                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400/60"></div>
                                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-400/60"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <div className="mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-900/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p>{uiText.noResults}</p>
                            <button 
                              className="mt-3 text-cyan-500 hover:text-cyan-400 text-sm cursor-pointer"
                              onClick={() => { 
                                playClickSound();
                                setSearchTerm(''); 
                                setActiveFilter(null); 
                              }}
                            >
                              {uiText.clearFilters}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          
          {/* Paginación */}
          {filteredProjects.length > projectsPerPage && (
            <div className="flex justify-center mt-4 space-x-2">
              <button 
                className="bg-cyan-900/30 text-cyan-400 hover:bg-cyan-800/50 px-3 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => {
                  if (currentPage > 1) {
                    playClickSound();
                  }
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                }}
                disabled={currentPage === 1}
              >
                {uiText.previous}
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-cyan-900/30 text-cyan-400 hover:bg-cyan-800/50'}`}
                    onClick={() => {
                      if (currentPage !== page) {
                        playClickSound();
                      }
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button 
                className="bg-cyan-900/30 text-cyan-400 hover:bg-cyan-800/50 px-3 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => {
                  if (currentPage < totalPages) {
                    playClickSound();
                  }
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                }}
                disabled={currentPage === totalPages}
              >
                {uiText.next}
              </button>
            </div>
          )}
        </div>
        
        {/* Pie de página */}
        <div className="mt-6 text-cyan-700 px-4 flex justify-between items-center text-sm">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-cyan-900/50 border border-cyan-500/30 mr-2"></span>
            {uiText.projectsFound} {filteredProjects.length}
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span>{uiText.systemOnline}</span>
          </div>
        </div>
      </div>
      
      {/* Panel de detalles del proyecto */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10 project-modal">
          <div 
            className="project-modal-content bg-gradient-to-b from-gray-900 to-gray-950 border border-cyan-500/30 w-11/12 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg"
            style={{ maxHeight: '80vh' }}
          >
            {/* Barra superior con efecto de escáner */}
            <div className="relative flex justify-between items-center p-4 border-b border-cyan-700/50 bg-gradient-to-r from-cyan-900/30 to-transparent overflow-hidden">
              <h3 className="text-xl font-bold text-cyan-400 relative z-10 flex items-center">
                {selectedProject.name}
              </h3>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="text-cyan-400 hover:text-white transition-colors relative z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Efecto de barrido luminoso - simula una interfaz de alta tecnología */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                    style={{ animation: 'scan 3s infinite linear' }}></div>
              </div>
            </div>
            
            <div className="p-6 custom-scrollbar overflow-auto" style={{ maxHeight: 'calc(80vh - 60px)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Imagen del proyecto con overlay futurista */}
                <div className="aspect-video bg-black/50 rounded overflow-hidden flex items-center justify-center border border-cyan-900/50 relative">
                  {selectedProject.image ? (
                    <>
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/40 via-transparent to-cyan-900/40 pointer-events-none"></div>
                      
                      {/* Detalles superpuestos */}
                      <div className="absolute top-2 left-2 text-xs text-cyan-300/80 font-mono">PROJECT_ID.{selectedProject.id}</div>
                      <div className="absolute bottom-2 right-2 text-xs text-cyan-300/80 font-mono">{selectedProject.year}</div>
                      
                      {/* Animación de escaneo multidireccional - efecto estilo realidad aumentada */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-cyan-500/10 to-transparent"
                            style={{ animation: 'scanVertical 4s infinite linear' }}></div>
                        <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-cyan-500/10 to-transparent"
                            style={{ animation: 'scanHorizontal 4s infinite linear' }}></div>
                      </div>
                      
                      {/* Esquinas decorativas */}
                      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-400/80"></div>
                      <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan-400/80"></div>
                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-cyan-400/80"></div>
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-cyan-400/80"></div>
                    </>
                  ) : (
                    <div className="text-cyan-700 text-sm flex flex-col items-center justify-center h-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {language === "es" ? "Vista previa no disponible" : "Preview not available"}
                    </div>
                  )}
                </div>
                
                {/* Detalles del proyecto */}
                <div className="space-y-4">
                  <div className="relative overflow-hidden pb-2">
                    <h4 className="text-cyan-500 text-sm">{uiText.project}</h4>
                    <p className="text-white text-lg">{selectedProject.name}</p>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 via-cyan-400/20 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative overflow-hidden pb-2">
                      <h4 className="text-cyan-500 text-sm">{uiText.year}</h4>
                      <p className="text-white">{selectedProject.year}</p>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 via-cyan-400/20 to-transparent"></div>
                    </div>
                    <div className="relative overflow-hidden pb-2">
                      <h4 className="text-cyan-500 text-sm">{uiText.type}</h4>
                      <p className="text-white">{selectedProject.type}</p>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 via-cyan-400/20 to-transparent"></div>
                    </div>
                    <div className="relative overflow-hidden pb-2">
                      <h4 className="text-cyan-500 text-sm">{uiText.agency}</h4>
                      <p className="text-white">{selectedProject.agency}</p>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 via-cyan-400/20 to-transparent"></div>
                    </div>
                    <div className="relative overflow-hidden pb-2">
                      <h4 className="text-cyan-500 text-sm">{uiText.status}</h4>
                      <p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                      ${selectedProject.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                        selectedProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                                        'bg-yellow-100 text-yellow-800'}`}>
                          {selectedProject.status === 'completed' ? uiText.statusCompleted : 
                           selectedProject.status === 'in-progress' ? uiText.statusInProgress : 
                           uiText.statusPlanned}
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 via-cyan-400/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  {selectedProject.url && (
                    <div className="relative overflow-hidden pb-2">
                      <h4 className="text-cyan-500 text-sm">URL</h4>
                      <a 
                        href={selectedProject.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {selectedProject.url}
                      </a>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 via-cyan-400/20 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Tecnologías con gráfico de barras animado */}
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div className="relative overflow-hidden pb-2">
                      <h4 className="text-cyan-500 text-sm mb-2">{language === "es" ? "Tecnologías" : "Technologies"}</h4>
                      
                      {/* Visualización en badges */}
                      <div className="mb-3 flex flex-wrap">
                        {selectedProject.technologies.map((tech, index) => (
                          <span key={`badge-${index}`} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Visualización en barras animadas */}
                      <div className="space-y-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <div key={`bar-${index}`} className="flex items-center">
                            <span className="text-xs text-gray-300 w-24">{tech}</span>
                            <div className="flex-1 h-1 bg-gray-700 rounded overflow-hidden">
                              <div 
                                className="h-full tech-bar bg-gradient-to-r from-cyan-500 to-blue-500 rounded"
                                style={{ 
                                  '--bar-width': `${80 + Math.random() * 20}%`,
                                  width: '0%'
                                } as React.CSSProperties}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Información de estado en formato CLI */}
                      <div className="mt-3 text-xs">
                        <div className="terminal-text">{language === "es" ? "Tecnologías analizadas" : "Technologies analyzed"}</div>
                        <div className="terminal-text">{language === "es" ? "Compatibilidad verificada" : "Compatibility verified"}</div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 via-cyan-400/20 to-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Descripción */}
              {selectedProject.description && (
                <div className="mt-6">
                  <h4 className="text-cyan-500 text-sm mb-2">{language === "es" ? "Descripción" : "Description"}</h4>
                  <div className="relative p-4 border border-cyan-800/30 bg-cyan-900/10 rounded-md">
                    <p className="text-gray-300">{selectedProject.description}</p>
                    
                    {/* Esquinas decorativas */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/80"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/80"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/80"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/80"></div>
                  </div>
                </div>
              )}
              
              {/* Botones de acción */}
              <div className="mt-8 flex justify-end space-x-4">
                {selectedProject.url && (
                  <a 
                    href={selectedProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative overflow-hidden group bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    <span className="relative z-10">{uiText.visitProject}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>
                )}
                <button 
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(null);
                  }} 
                  className="relative overflow-hidden group bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded transition-colors"
                >
                  <span className="relative z-10">{language === "es" ? "Cerrar" : "Close"}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Estilos CSS para animaciones */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        @keyframes scanVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        
        @keyframes scanHorizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(1000%); }
        }
        
        @keyframes slideRight {
          0% { transform: rotate(45deg) translateY(-80%) translateX(-100%); }
          100% { transform: rotate(45deg) translateY(-80%) translateX(100%); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}} />
    </>
  );
};

export default Projects;