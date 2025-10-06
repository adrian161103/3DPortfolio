/**
 * UTILIDAD DE ANIMACIÓN DE CÁMARA
 * 
 * Funciones reutilizables para animar la cámara con GSAP.
 * Centraliza la lógica de animación que antes estaba duplicada
 * en múltiples lugares del CameraController.
 */

import { gsap } from "./gsap";
import type * as THREE from "three";
import type { CameraViewConfig } from "../config/camera.config";
import { CAMERA_VIEWS } from "../config/camera.config";

/**
 * Anima la cámara a una configuración específica
 * 
 * @param camera - Cámara de Three.js a animar
 * @param controls - Controles de órbita (para animar el target)
 * @param config - Configuración de la vista (posición, FOV, duración, etc)
 * 
 * @example
 * ```tsx
 * import { CAMERA_VIEWS } from '@/config/camera.config';
 * 
 * animateCameraToView(camera, controlsRef.current, CAMERA_VIEWS.windows);
 * ```
 */
export const animateCameraToView = (
  camera: THREE.PerspectiveCamera,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controls: any,
  config: CameraViewConfig
): void => {
  // Animar posición de la cámara
  gsap.to(camera.position, {
    x: config.position.x,
    y: config.position.y,
    z: config.position.z,
    duration: config.duration,
    ease: config.ease,
    onUpdate: () => camera.lookAt(0, 1, 0),
  });

  // Animar Field of View (zoom)
  gsap.to({ fov: camera.fov }, {
    fov: config.fov,
    duration: config.fovDuration,
    ease: config.ease,
    onUpdate: function () {
      camera.fov = this.targets()[0].fov;
      camera.updateProjectionMatrix();
    },
  });

  // Animar el target de los controles (punto de enfoque)
  if (controls) {
    gsap.to(controls.target, {
      x: config.target.x,
      y: config.target.y,
      z: config.target.z,
      duration: config.duration,
      ease: config.ease,
    });
  }
};

/**
 * Anima la cámara a una vista específica por nombre
 * 
 * @param camera - Cámara de Three.js
 * @param controls - Controles de órbita
 * @param viewName - Nombre de la vista (ej: 'desktop', 'windows', 'console')
 * 
 * @example
 * ```tsx
 * animateCameraToViewByName(camera, controls, 'monitor');
 * ```
 */
export const animateCameraToViewByName = (
  camera: THREE.PerspectiveCamera,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controls: any,
  viewName: keyof typeof CAMERA_VIEWS
): void => {
  const config = CAMERA_VIEWS[viewName];
  
  if (!config) {
    console.warn(`[CameraAnimator] Vista "${viewName}" no encontrada. Usando vista "desktop"`);
    animateCameraToView(camera, controls, CAMERA_VIEWS.desktop);
    return;
  }
  
  animateCameraToView(camera, controls, config);
};
