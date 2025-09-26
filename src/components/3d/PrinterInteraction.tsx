// src/components/PrinterInteraction.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function PrinterInteraction({
  printerName = "impresora", // 👈 nombre EXACTO del mesh en tu glTF
  cvUrl = "/docs/adrian alejos garcia cv.pdf", // 👈 ruta de tu CV en /public/docs
}) {
  const { scene, camera, gl } = useThree();
  const printerRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const printer = scene.getObjectByName(printerName);
    if (printer && printer instanceof THREE.Mesh) {
      printerRef.current = printer;
      printerRef.current.userData.clickable = true;
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (!printerRef.current) return;

      mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(printerRef.current, true);
      if (intersects.length > 0) {
        const win = window.open(cvUrl, "_blank");
        if (win) {
          win.addEventListener("load", () => {
            win.print();
          });
        }
      }
    };

    const handleMove = (event: MouseEvent) => {
      if (!printerRef.current) return;

      mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(printerRef.current, true);
      gl.domElement.style.cursor = intersects.length > 0 ? "pointer" : "default";
    };

    gl.domElement.addEventListener("click", handleClick);
    gl.domElement.addEventListener("mousemove", handleMove);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("mousemove", handleMove);
      gl.domElement.style.cursor = "default";
    };
  }, [scene, camera, gl, cvUrl, printerName]);

  return null; // 👈 No renderiza nada, solo maneja interacción
}
