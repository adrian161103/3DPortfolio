// src/components/CameraController.tsx
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { gsap } from "../../lib/gsap";
import * as THREE from "three";
import TrashController from "./TrashController";

export default function CameraController() {
  const controlsRef = useRef<any>();
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

      (window as any).windowsModeActive = isWindows;

      window.dispatchEvent(new CustomEvent("focusMode", { detail: isWindows }));

   if (isWindows) {
  // POV especial de Windows
  gsap.to(perspectiveCamera.position, {
    x: 0,
    y: 2,
    z: 2.7, 
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => perspectiveCamera.lookAt(0, 1, 0),
  });

  gsap.to({ fov: perspectiveCamera.fov }, {
    fov: 15, 
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: function () {
      perspectiveCamera.fov = this.targets()[0].fov;
      perspectiveCamera.updateProjectionMatrix();
    },
  });

  gsap.to(controlsRef.current.target, {
    x: 0,
    y: 1.27,
    z: 0,
    duration: 2,
    ease: "power2.inOut",
  });
} else {
        // Restaurar POV normal
        gsap.to(perspectiveCamera.position, {
          x: 0,
          y: 3,
          z: 6,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => perspectiveCamera.lookAt(0, 1, 0),
        });

        gsap.to({ fov: perspectiveCamera.fov }, {
          fov: 40,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: function () {
            perspectiveCamera.fov = this.targets()[0].fov;
            perspectiveCamera.updateProjectionMatrix();
          },
        });

        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 1,
          z: 0,
          duration: 2,
          ease: "power2.inOut",
        });
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

      (window as any).consoleModeActive = isConsoleMode;

      if (isConsoleMode) {
        // POV más cerca para los comandos de consola (about, projects, etc)
        gsap.to(perspectiveCamera.position, {
          x: 0,
          y: 2,
          z: 2.2, // Un poco más cerca que Windows (2.7)
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => perspectiveCamera.lookAt(0, 1, 0),
        });

        gsap.to({ fov: perspectiveCamera.fov }, {
          fov: 18, // Zoom ligeramente menor que Windows (15)
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: function () {
            perspectiveCamera.fov = this.targets()[0].fov;
            perspectiveCamera.updateProjectionMatrix();
          },
        });

        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 1.27,
          z: 0,
          duration: 2,
          ease: "power2.inOut",
        });
      } else {
        // Restaurar POV normal
        gsap.to(perspectiveCamera.position, {
          x: 0,
          y: 3,
          z: 6,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => perspectiveCamera.lookAt(0, 1, 0),
        });

        gsap.to({ fov: perspectiveCamera.fov }, {
          fov: 40,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: function () {
            perspectiveCamera.fov = this.targets()[0].fov;
            perspectiveCamera.updateProjectionMatrix();
          },
        });

        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 1,
          z: 0,
          duration: 2,
          ease: "power2.inOut",
        });
      }
    };

    window.addEventListener("setConsoleMode", handleConsoleMode);
    return () => window.removeEventListener("setConsoleMode", handleConsoleMode);
  }, [perspectiveCamera]);

  // === Monitor View Mode listener (para cls y errores) ===
  useEffect(() => {
    const handleMonitorViewMode = () => {
      // Ir a la vista del monitor (como cuando se hace clic en el monitor)
      gsap.to(perspectiveCamera.position, {
        x: 0,
        y: 2,
        z: 2,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => perspectiveCamera.lookAt(0, 1, 0),
      });

      gsap.to({ fov: perspectiveCamera.fov }, {
        fov: 40,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function () {
          perspectiveCamera.fov = this.targets()[0].fov;
          perspectiveCamera.updateProjectionMatrix();
        },
      });

      gsap.to(controlsRef.current.target, {
        x: 0,
        y: 1,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      });
    };

    window.addEventListener("setMonitorViewMode", handleMonitorViewMode);
    return () => window.removeEventListener("setMonitorViewMode", handleMonitorViewMode);
  }, [perspectiveCamera]);

  // === Clicks mesa/monitor (solo si no está Windows o Console activo) ===
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if ((window as any).windowsModeActive || (window as any).consoleModeActive) return;

      const { innerWidth, innerHeight } = window;
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, perspectiveCamera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clicked = intersects[0].object;

        if (clicked.name.includes("mesa")) {
          gsap.to(perspectiveCamera.position, {
            x: 0,
            y: 3,
            z: 6,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => perspectiveCamera.lookAt(0, 1, 0),
          });

          gsap.to({ fov: perspectiveCamera.fov }, {
            fov: 40,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: function () {
              perspectiveCamera.fov = this.targets()[0].fov;
              perspectiveCamera.updateProjectionMatrix();
            },
          });

          gsap.to(controlsRef.current.target, {
            x: 0,
            y: 1,
            z: 0,
            duration: 2,
            ease: "power2.inOut",
          });
        }

        if (clicked.name.includes("monitor")) {
          gsap.to(perspectiveCamera.position, {
            x: 0,
            y: 2,
            z: 2,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => perspectiveCamera.lookAt(0, 1, 0),
          });

          gsap.to({ fov: perspectiveCamera.fov }, {
            fov: 40,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: function () {
              perspectiveCamera.fov = this.targets()[0].fov;
              perspectiveCamera.updateProjectionMatrix();
            },
          });

          gsap.to(controlsRef.current.target, {
            x: 0,
            y: 1,
            z: 0,
            duration: 2,
            ease: "power2.inOut",
          });
        }
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [perspectiveCamera, scene]);

  return (
    <>
      <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} />
      <TrashController controlsRef={controlsRef} />
    </>
  );
}