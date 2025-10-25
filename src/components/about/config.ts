import { AboutSystemConfig, AuroraPalette } from './types';

// Paleta de colores por defecto (aurora verdosa, fondo negro)
export const DEFAULT_AURORA_PALETTE: AuroraPalette = {
  primary: '#0EF0B5',    // Verde aurora claro
  secondary: '#35D6A4',  // Verde aurora medio
  tertiary: '#0AB27A',   // Verde aurora oscuro
  accent: '#7ED6C9',     // Cian verdoso para highlights
  background: '#05070B'  // Negro profundo
};

// Configuración por defecto del sistema
export const DEFAULT_ABOUT_CONFIG: AboutSystemConfig = {
  aurora: {
    confinedToHero: true,
    intensity: [0.6, 0.9],
    animationSpeed: 0.5
  },
  glint: {
    followCursor: true,
    reducedIntensityOutsideHero: true,
    trailLength: 16
  },
  timeline: {
    enableGlintJumping: true,
    autoPlay: false
  },
  performance: {
    dpr: [1, 2],
    pauseOutsideViewport: true,
    respectReducedMotion: true
  },
  accessibility: {
    focusVisible: true,
    contrastCompliant: true,
    keyboardNavigation: true
  }
};

// Tokens Tailwind útiles
export const TAILWIND_TOKENS = {
  hero: 'relative min-h-[100svh] overflow-hidden bg-black',
  auroraLayer: 'absolute inset-0 pointer-events-none',
  heroTitle: 'text-balance tracking-[0.02em] leading-tight',
  timelineContainer: 'grid md:grid-cols-[auto_1fr] gap-8',
  glintOverlay: 'fixed inset-0 pointer-events-none z-50 mix-blend-screen'
};

// Breakpoints para responsive
export const RESPONSIVE_BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)'
};

// Configuración de animaciones GSAP
export const GSAP_CONFIG = {
  matchMedia: {
    mobile: RESPONSIVE_BREAKPOINTS.mobile,
    desktop: RESPONSIVE_BREAKPOINTS.desktop
  },
  quickTo: {
    duration: 0.2,
    ease: 'power2.out'
  },
  scrollTrigger: {
    start: 'top 85%',
    end: 'bottom 20%',
    scrub: 1
  }
};

// Configuración de rendimiento para R3F
export const R3F_PERFORMANCE_CONFIG = {
  dpr: [1, 2] as [number, number],
  antialias: false,
  alpha: true,
  powerPreference: 'high-performance' as const,
  camera: {
    position: [0, 0, 5] as [number, number, number],
    fov: 75
  }
};