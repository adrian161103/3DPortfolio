
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import TrashController from "./TrashController";
import { animateCameraToView } from "../../lib/cameraAnimator";
import { CAMERA_VIEWS } from "../../config/camera.config";

export default function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, scene } = useThree();

  // 👇 casteamos explícitamente la cámara
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  const [raycaster] = useState(() => new THREE.Raycaster());
  const [mouse] = useState(() => new THREE.Vector2());

  // === Windows mode listener ===
  useEffect(() => {
    const handleWindowsMode = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      const isWindows = custom.detail;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).windowsModeActive = isWindows;

      window.dispatchEvent(new CustomEvent("focusMode", { detail: isWindows }));

      if (isWindows) {
        // Detectar el tamaño de pantalla y elegir la vista apropiada
        const screenWidth = window.innerWidth;
        let windowsView;
        
        if (screenWidth < 680) {
          // Pantallas móviles (menores a 680px) - usar medidas de console para mejor navegación
          windowsView = CAMERA_VIEWS.console;
        } else {
          // Pantallas grandes (escritorio - 680px y más)
          windowsView = CAMERA_VIEWS.windows;
        }
        
        animateCameraToView(perspectiveCamera, controlsRef.current, windowsView);
      } else {
        // Restaurar POV normal
        animateCameraToView(perspectiveCamera, controlsRef.current, CAMERA_VIEWS.desktop);
      }
    };

    window.addEventListener("setWindowsMode", handleWindowsMode);
    return () => window.removeEventListener("setWindowsMode", handleWindowsMode);
  }, [perspectiveCamera]);

  // === Console mode listener ===
  useEffect(() => {
    const handleConsoleMode = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      const isConsoleMode = custom.detail;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).consoleModeActive = isConsoleMode;

      if (isConsoleMode) {
        // POV más cerca para los comandos de consola (about, projects, etc)
        animateCameraToView(perspectiveCamera, controlsRef.current, CAMERA_VIEWS.console);
      } else {
        // Restaurar POV normal
        animateCameraToView(perspectiveCamera, controlsRef.current, CAMERA_VIEWS.desktop);
      }
    };

    window.addEventListener("setConsoleMode", handleConsoleMode);
    return () => window.removeEventListener("setConsoleMode", handleConsoleMode);
  }, [perspectiveCamera]);

  // === Monitor View Mode listener (para cls y errores) ===
  useEffect(() => {
    const handleMonitorViewMode = () => {
      // Ir a la vista del monitor (como cuando se hace clic en el monitor)
      animateCameraToView(perspectiveCamera, controlsRef.current, CAMERA_VIEWS.monitor);
    };

    window.addEventListener("setMonitorViewMode", handleMonitorViewMode);
    return () => window.removeEventListener("setMonitorViewMode", handleMonitorViewMode);
  }, [perspectiveCamera]);

  // === Clicks mesa/monitor (solo si no está Windows o Console activo) ===
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).windowsModeActive || (window as any).consoleModeActive) return;

      const { innerWidth, innerHeight } = window;
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, perspectiveCamera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clicked = intersects[0].object;

        // Click en la mesa → volver al escritorio
        if (clicked.name.includes("mesa")) {
          animateCameraToView(perspectiveCamera, controlsRef.current, CAMERA_VIEWS.desktop);
        }

        // Click en el monitor → vista de monitor
        if (clicked.name.includes("monitor")) {
          animateCameraToView(perspectiveCamera, controlsRef.current, CAMERA_VIEWS.monitor);
        }
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [perspectiveCamera, scene, raycaster, mouse]);

  return (
    <>
      <OrbitControls 
        ref={controlsRef} 
        enableZoom={false} 
        enablePan={false}
        minAzimuthAngle={-Math.PI / 2} // -90 grados
        maxAzimuthAngle={Math.PI / 2}  // +90 grados
        minPolarAngle={Math.PI / 4}    // 45 grados desde arriba
        maxPolarAngle={Math.PI * 3/4}  // 135 grados (no completamente abajo)
      />
      <TrashController controlsRef={controlsRef} />
    </>
  );
}