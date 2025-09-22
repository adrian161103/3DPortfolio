import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// Controla la animación de las teclas del modelo 3D cuando el usuario
// presiona teclas reales del teclado. Se busca el objeto llamado
// "Keyboard_Body" y se construye un mapa de teclas para manipular sus meshes.
export default function KeyboardController() {
  const { scene } = useThree();
  const pressedKeys = useRef<Set<string>>(new Set());

  useEffect(() => {
    const kb = scene.getObjectByName("Keyboard_Body");
    if (!kb) {
      console.warn("Keyboard_Body no encontrado en la escena");
      return;
    }

    // Construye un mapa dinámico de nombres de child → mesh y posición inicial
    const keyMeshes: Record<string, { mesh: THREE.Mesh; initialY: number }> = {};
    kb.children.forEach(child => {
      let mesh: THREE.Mesh | undefined;
      child.traverse(c => {
        if ((c as any).isMesh && !mesh) mesh = c as THREE.Mesh;
      });
      if (mesh && child.name) {
        keyMeshes[child.name.toLowerCase()] = {
          mesh,
          initialY: mesh.position.y, //  posición inicial
        };
      }
    });

    console.log("Teclas detectadas en el modelo:", Object.keys(keyMeshes));

    const handleKeyDown = (event: KeyboardEvent) => {
      const pressed = event.key.toLowerCase();
      if (pressedKeys.current.has(pressed)) return;
      pressedKeys.current.add(pressed);

      // Mapear teclas especiales a las claves usadas en el modelo
      let targetData = keyMeshes[pressed];
      if (pressed === " ") targetData = keyMeshes["space"];
      else if (pressed === "escape") targetData = keyMeshes["esc"];
      else if (pressed === "capslock") targetData = keyMeshes["caps"];
      else if (pressed === "control")
        targetData = keyMeshes["lctrl"] || keyMeshes["rctrl"];
      else if (pressed === "shift")
        targetData = keyMeshes["lshift"] || keyMeshes["rshift"];
      else if (pressed === "meta") targetData = keyMeshes["lwin"];

      if (targetData) {
        const { mesh, initialY } = targetData;
        gsap.killTweensOf(mesh.position);
        gsap.to(mesh.position, {
          y: initialY - 0.5, // animacion de hundido posición original
          duration: 0.1,
          ease: "power1.out",
        });
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const released = event.key.toLowerCase();
      if (!pressedKeys.current.has(released)) return;
      pressedKeys.current.delete(released);

      let targetData = keyMeshes[released];
      if (released === " ") targetData = keyMeshes["space"];
      else if (released === "escape") targetData = keyMeshes["esc"];
      else if (released === "capslock") targetData = keyMeshes["caps"];
      else if (released === "control")
        targetData = keyMeshes["lctrl"] || keyMeshes["rctrl"];
      else if (released === "shift")
        targetData = keyMeshes["lshift"] || keyMeshes["rshift"];
      else if (released === "meta") targetData = keyMeshes["lwin"];

      if (targetData) {
        const { mesh, initialY } = targetData;
        gsap.killTweensOf(mesh.position);
        gsap.to(mesh.position, {
          y: initialY, // volver a su posición original
          duration: 0.1,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [scene]);

  return null;
}
