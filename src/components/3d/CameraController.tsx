
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
  const [isWindowsMode, setIsWindowsMode] = useState(false);

  // Función para actualizar las restricciones de OrbitControls
  const updateControlsConstraints = (windowsMode: boolean) => {
    if (!controlsRef.current) return;

    if (windowsMode) {
      // En modo Windows: restringir movimiento al mínimo
      controlsRef.current.minAzimuthAngle = -0; // Casi sin movimiento horizontal
      controlsRef.current.maxAzimuthAngle = 0;
      controlsRef.current.minPolarAngle = Math.PI / 2 - 0; // Casi sin movimiento vertical
      controlsRef.current.maxPolarAngle = Math.PI / 2 + 0;
      
      // Bloquear movimiento hacia adelante/atrás con una distancia fija apropiada
      // Usamos la distancia de la vista Windows (aproximadamente 2.7 unidades)
      const windowsDistance = 3.3; //distancia 3.3 para que encuandre mejor ya que los valores se modificaron
      controlsRef.current.minDistance = windowsDistance - 0;
      controlsRef.current.maxDistance = windowsDistance + 0;
    } else {
      // Modo normal: permitir movimiento limitado
      controlsRef.current.minAzimuthAngle = -Math.PI / 2; // -90 grados
      controlsRef.current.maxAzimuthAngle = Math.PI / 2;  // +90 grados
      controlsRef.current.minPolarAngle = Math.PI / 4;    // 45 grados desde arriba
      controlsRef.current.maxPolarAngle = Math.PI * 3/4;  // 135 grados
      
      // Restaurar límites de distancia normales
      controlsRef.current.minDistance = 1;  // Distancia mínima razonable
      controlsRef.current.maxDistance = 10; // Distancia máxima razonable
    }
  };

  // === Windows mode listener ===
  useEffect(() => {
    const handleWindowsMode = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      const isWindows = custom.detail;

      // Actualizar estado local
      setIsWindowsMode(isWindows);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).windowsModeActive = isWindows;

      window.dispatchEvent(new CustomEvent("focusMode", { detail: isWindows }));

      if (isWindows) {
        // Detectar el tamaño de pantalla y elegir la vista apropiada
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        let windowsView;
        
        // DEBUG: Ver qué tamaño detecta tu dispositivo
        console.log(`🔍 Dimensiones detectadas: ${screenWidth}px x ${screenHeight}px`);
        
        // Considerar móvil si el ancho es menor a 680px O la altura es menor a 900px
        const isMobile = screenWidth <= 680 || screenHeight <= 900;
        
        if (isMobile) {
          // Pantallas móviles - usar vista sin zoom para Windows
          windowsView = CAMERA_VIEWS.windowsMobileNoZoom;
        } else {
          // Pantallas grandes (escritorio)
          windowsView = CAMERA_VIEWS.windows;
        }
        
        animateCameraToView(perspectiveCamera, controlsRef.current, windowsView);
      } else {
        // Restaurar POV normal
        animateCameraToView(perspectiveCamera, controlsRef.current, CAMERA_VIEWS.desktop);
      }

      // Actualizar restricciones de controles después de un pequeño delay
      // para asegurar que la animación haya comenzado
      setTimeout(() => {
        updateControlsConstraints(isWindows);
      }, 100);
    };

    window.addEventListener("setWindowsMode", handleWindowsMode);
    return () => window.removeEventListener("setWindowsMode", handleWindowsMode);
  }, [perspectiveCamera]);

  // === Inicializar restricciones de controles ===
  useEffect(() => {
    if (controlsRef.current) {
      // Aplicar restricciones iniciales
      updateControlsConstraints(isWindowsMode);
    }
  }, [isWindowsMode]);

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
        // Las restricciones de ángulos se manejan dinámicamente en updateControlsConstraints
      />
      <TrashController controlsRef={controlsRef} />
    </>
  );
}