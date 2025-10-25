import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_ABOUT_CONFIG, RESPONSIVE_BREAKPOINTS } from './config';

gsap.registerPlugin(ScrollTrigger);

/**
 * Utilidades para el sistema About
 */

// Helper para detectar si está en mobile
export const isMobileDevice = (): boolean => {
  return window.innerWidth < 768;
};

// Helper para obtener elementos waypoint
export const getWaypoints = (): HTMLElement[] => {
  return Array.from(document.querySelectorAll('.waypoint, [data-waypoint]')) as HTMLElement[];
};

// Helper para obtener el elemento destello
export const getGlintElement = (): (HTMLElement & { moveTo?: (x: number, y: number) => void }) | null => {
  return document.querySelector('[data-glint]') as (HTMLElement & { moveTo?: (x: number, y: number) => void }) | null;
};

// Helper para mover el destello a una posición específica
export const moveGlintTo = (x: number, y: number): void => {
  const glint = getGlintElement();
  if (glint && glint.moveTo) {
    glint.moveTo(x, y);
  }
};

// Helper para mover el destello al centro de un elemento
export const moveGlintToElement = (element: HTMLElement): void => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  moveGlintTo(centerX, centerY);
};

// Helper para configurar ScrollTrigger responsive
export const createResponsiveScrollTrigger = (config: {
  trigger: string | HTMLElement;
  onEnter?: () => void;
  onLeave?: () => void;
}): ScrollTrigger => {
  return ScrollTrigger.create({
    trigger: config.trigger,
    start: 'top 85%',
    end: 'bottom 20%',
    onEnter: config.onEnter,
    onLeave: config.onLeave
  });
};

// Helper para limpiar todos los ScrollTriggers
export const cleanupScrollTriggers = (): void => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Helper para detectar si prefers-reduced-motion está activo
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Helper para obtener configuración de animación basada en preferencias
export const getAnimationConfig = () => {
  const reduced = prefersReducedMotion();
  return {
    duration: reduced ? 0.1 : DEFAULT_ABOUT_CONFIG.timeline.autoPlay ? 0.8 : 0.5,
    ease: reduced ? 'none' : 'power2.out',
    enabled: !reduced
  };
};

// Helper para crear quickTo functions con configuración optimizada
export const createQuickToFunctions = (element: HTMLElement) => {
  const config = getAnimationConfig();
  
  return {
    x: gsap.quickTo(element, 'x', {
      duration: config.enabled ? 0.2 : 0,
      ease: config.ease
    }),
    y: gsap.quickTo(element, 'y', {
      duration: config.enabled ? 0.18 : 0,
      ease: config.ease
    })
  };
};

// Helper para obtener la paleta de colores en formato CSS
export const getAuroraColors = () => ({
  '--aurora-primary': '#0EF0B5',
  '--aurora-secondary': '#35D6A4',
  '--aurora-tertiary': '#0AB27A',
  '--aurora-accent': '#7ED6C9',
  '--aurora-background': '#05070B'
});

// Helper para aplicar la paleta como variables CSS
export const applyAuroraColors = (element: HTMLElement = document.documentElement): void => {
  const colors = getAuroraColors();
  Object.entries(colors).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
};

// Helper para debug - mostrar información del sistema
export const debugAboutSystem = (): void => {
  if (import.meta.env.DEV) {
    console.group('About System Debug');
    console.log('Mobile device:', isMobileDevice());
    console.log('Waypoints found:', getWaypoints().length);
    console.log('Glint element:', getGlintElement() ? 'Found' : 'Not found');
    console.log('Reduced motion:', prefersReducedMotion());
    console.log('ScrollTriggers active:', ScrollTrigger.getAll().length);
    console.groupEnd();
  }
};

// Hook personalizado para limpiar efectos al desmontar
export const useAboutCleanup = () => {
  const cleanup = () => {
    cleanupScrollTriggers();
    // Limpiar quickTo functions si es necesario
    gsap.killTweensOf('*');
  };

  // Retornar función de limpieza para usar en useEffect
  return cleanup;
};

// Configuración de MediaQueries para GSAP
export const setupResponsiveAnimations = () => {
  return ScrollTrigger.matchMedia({
    [RESPONSIVE_BREAKPOINTS.mobile]: () => {
      // Configuración mobile
      console.log('Activando configuración mobile');
    },
    [RESPONSIVE_BREAKPOINTS.desktop]: () => {
      // Configuración desktop
      console.log('Activando configuración desktop');
    }
  });
};

// Helper para crear efectos de hover en cards
export const createCardHoverEffect = (card: HTMLElement) => {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(card, {
    scale: 1.05,
    y: -10,
    duration: 0.3,
    ease: 'power2.out'
  });

  return {
    play: () => tl.play(),
    reverse: () => tl.reverse()
  };
};

export default {
  isMobileDevice,
  getWaypoints,
  getGlintElement,
  moveGlintTo,
  moveGlintToElement,
  createResponsiveScrollTrigger,
  cleanupScrollTriggers,
  prefersReducedMotion,
  getAnimationConfig,
  createQuickToFunctions,
  getAuroraColors,
  applyAuroraColors,
  debugAboutSystem,
  useAboutCleanup,
  setupResponsiveAnimations,
  createCardHoverEffect
};