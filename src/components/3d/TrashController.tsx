// src/components/TrashController.tsx
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import * as THREE from "three";

export default function TrashController(controlsRef: any) {
  const { camera, scene } = useThree();
  const [raycaster] = useState(() => new THREE.Raycaster());
  const [mouse] = useState(() => new THREE.Vector2());

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      // Normalizar coordenadas
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / innerHeight) * 2 + 1;

      // Raycast
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clicked = intersects[0].object;

        // 🔹 Si clickeo la papelera 
        if (clicked.name.includes("Bin_Body")) {
          const targetX = 1.92;
          const targetY = -0.53;
          const targetZ = 0.38;

          gsap.to(camera.position, {
            x: targetX + 3, 
            y: targetY + 0,   
            z: targetZ + 3, 
            duration: 2,
            ease: "power2.inOut",
          });

          gsap.to(controlsRef.current.target, {
            x: targetX,
            y: targetY,
            z: targetZ,
            duration: 2,
            ease: "power2.inOut",
          });
        }
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [camera, scene]);

  return null; 
}
