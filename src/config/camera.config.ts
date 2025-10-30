/**
 * CONFIGURACIÓN CENTRALIZADA DE CÁMARA
 * 
 * Todas las posiciones, FOVs y duraciones de animaciones
 * de la cámara están definidas aquí.
 * 
 * Esto evita valores erroneos
 * y facilita ajustes globales.
 */

/**
 * Tipo para las coordenadas 3D
 */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Configuración completa de una vista de cámara
 */
export interface CameraViewConfig {
  position: Vec3;
  target: Vec3;
  fov: number;
  duration: number;
  fovDuration: number;
  ease: string;
}

/**
 * Todas las vistas de cámara disponibles
 */
export const CAMERA_VIEWS: Record<string, CameraViewConfig> = {
  /**
   * Vista por defecto - Escritorio completo
   * Se usa al iniciar y cuando se hace clic en la mesa
   */
  desktop: {
    position: { x: 0, y: 3, z: 6 },
    target: { x: 0, y: 1, z: 0 },
    fov: 40,
    duration: 2,
    fovDuration: 1.5,
    ease: "power2.inOut",
  },

  /**
   * Vista del monitor - Al hacer clic en monitor o ejecutar cls
   * Posición intermedia para ver la consola
   */
  monitor: {
    position: { x: 0, y: 2, z: 2 },
    target: { x: 0, y: 1, z: 0 },
    fov: 40,
    duration: 2,
    fovDuration: 1.5,
    ease: "power2.inOut",
  },

  /**
   * Vista Windows 98 - Zoom máximo para interfaz retro
   */
  windows: {
    position: { x: 0, y: 2, z: 2.7 },
    target: { x: 0, y: 1.27, z: 0 },
    fov: 15,
    duration: 2,
    fovDuration: 1.5,
    ease: "power2.inOut",
  },

  /**
   * Vista Windows 98 para móviles - Menos zoom para pantallas pequeñas
   */
  windowsMobile: {
    position: { x: 0, y: 2, z: 4 },
    target: { x: 0, y: 1.27, z: 0 },
    fov: 15,
    duration: 2,
    fovDuration: 1.5,
    ease: "power2.inOut",
  },


  /**
   * Vista de consola - Para comandos about, projects, etc.
   */
  console: {
    position: { x: 0, y: 2, z: 2.2 },
    target: { x: 0, y: 1.27, z: 0 },
    fov: 18,
    duration: 2,
    fovDuration: 1.5,
    ease: "power2.inOut",
  },

  /**
   * Vista del agujero negro - Zoom hacia el agujero negro
   */
  blackHole: {
    position: { x: 0, y: 10, z: 0 }, 
    target: { x: 0, y: 0, z: 0 },
    fov: 0, // (entra en el agujero negro)
    duration: 2.5,
    fovDuration: 2,
    ease: "power3.inOut",
  },
};

/**
 * Constantes de animación global
 */
export const ANIMATION_CONSTANTS = {
  /**
   * Punto de enfoque estándar (centro de la escena, altura media)
   */
  LOOK_AT_POINT: { x: 0, y: 1, z: 0 } as Vec3,

  /**
   * Multiplicador para animación de FOV
   * El FOV anima un 25% más rápido que la posición
   */
  FOV_SPEED_MULTIPLIER: 0.75,
} as const;
