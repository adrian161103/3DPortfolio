// src/components/CameraController.tsx
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import * as THREE from "three";
import TrashController from "./TrashController";

export default function CameraController() {
  const controlsRef = useRef<any>();
  const { camera, scene } = useThree();
  const [raycaster] = useState(() => new THREE.Raycaster());
  const [mouse] = useState(() => new THREE.Vector2());

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      // Normalizar coordenadas del cursor para Raycaster
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / innerHeight) * 2 + 1;

      // Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clicked = intersects[0].object;

        // Si se hace click en la mesa, animar la cámara a una vista general
        if (clicked.name.includes("mesa")) {
          gsap.to(camera.position, {
            x: 0,
            y: 3,
            z: 6,
            duration: 2,
            ease: "power2.inOut",
          });
          gsap.to(controlsRef.current.target, {
            x: 0,
            y: 1,
            z: 0,
            duration: 2,
            ease: "power2.inOut",
          });
        }

        // Si se hace click en el monitor, acercar la cámara
        if (clicked.name.includes("monitor")) {
          gsap.to(camera.position, {
            x: 0,
            y: 2,
            z: 2,
            duration: 2,
            ease: "power2.inOut",
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
  }, [camera, scene]);

  return (
    <>
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
    />
          <TrashController controlsRef={controlsRef} />
     </>
  );
}
