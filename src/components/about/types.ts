import * as THREE from 'three';

// Tipos para el shader de aurora
export interface AuroraUniforms {
  uTime: { value: number };
  uScroll: { value: number };
  uIntensity: { value: number };
  uGranularity: { value: number };
  uPalette: { value: THREE.Color[] };
}

// Tipos para el seguidor de destello
export interface GlintFollowerConfig {
  reducedIntensityOutsideHero?: boolean;
  mobile?: {
    waypoints?: string[];
    animationDuration?: number;
  };
  desktop?: {
    followCursor?: boolean;
    easing?: string;
    duration?: number;
  };
}

// Tipos para timeline
export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  skills?: string[];
  side: 'left' | 'right';
  icon?: string;
}

export interface TimelineConfig {
  items: TimelineItem[];
  animateOnScroll?: boolean;
  glintIntegration?: boolean;
}

// Tipos para secciones
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

// Tipos para skills
export interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
  icon?: string;
}

// Configuración de paleta de colores
export interface AuroraPalette {
  primary: string;    // #0EF0B5
  secondary: string;  // #35D6A4  
  tertiary: string;   // #0AB27A
  accent: string;     // #7ED6C9
  background: string; // #05070B
}

// Configuración general del sistema
export interface AboutSystemConfig {
  aurora: {
    confinedToHero: boolean;
    intensity: [number, number]; // [min, max]
    animationSpeed: number;
  };
  glint: {
    followCursor: boolean;
    reducedIntensityOutsideHero: boolean;
    trailLength: number;
  };
  timeline: {
    enableGlintJumping: boolean;
    autoPlay: boolean;
  };
  performance: {
    dpr: [number, number];
    pauseOutsideViewport: boolean;
    respectReducedMotion: boolean;
  };
  accessibility: {
    focusVisible: boolean;
    contrastCompliant: boolean;
    keyboardNavigation: boolean;
  };
}