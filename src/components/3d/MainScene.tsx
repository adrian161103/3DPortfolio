import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { ErrorBoundary } from "../ErrorBoundary";
import { gsap } from "@/lib/gsap";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

import CameraController from "./CameraController";
import KeyboardController from "./desktop/KeyboardController";
import { useStandardMaterials } from "@/lib/useStandardMaterials";
import ConsoleScreen from "../ui/Console";
import PrinterInteraction from "./PrinterInteraction";

// Inicializa los uniformes necesarios para `RectAreaLight` (requerido por
// tres.js cuando se usan luces de área desde el paquete de ejemplos).
RectAreaLightUniformsLib.init();

function DeskModel() {
  const { scene } = useGLTF("/models/adrian.glb");
  useStandardMaterials(scene);

  // Forzar propiedades emisivas en partes concretas del modelo:
  // - monitor.001: emisión verde para simular pantalla encendida
  // - bombilla: emisión cálida y mayor intensidad para simular luz
  // Esto se hace después de cargar el glTF para asegurar que los
  // materiales estén disponibles.
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name.toLowerCase().includes("monitor001")) {
        child.material.emissive = new THREE.Color("#00FF66");
        child.material.emissiveIntensity = .59;
      }
      if (child.name.toLowerCase().includes("sphere001")) {
        child.material.emissive = new THREE.Color("#FFD38A");
        child.material.emissiveIntensity = 10.0;
      }
    }
  });

  return (<>
  <primitive object={scene} scale={1.2} position={[0, -1, 0]} />
  <ConsoleScreen /></>
  )
}

function Scene() {
  const monitorLight = useRef<THREE.RectAreaLight>(null);
  const lampLight = useRef<THREE.SpotLight>(null);

  const [flickerActive, setFlickerActive] = useState(false);

  useEffect(() => {
    if (!monitorLight.current || !lampLight.current) return;

    const tl = gsap.timeline({ delay: 1 });

    // Animación de encendido
    tl.fromTo(
      monitorLight.current,
      { intensity: 0 },
      // Suavemente aumentar la intensidad de la luz del monitor
      { intensity: 0., duration: 2, ease: "power2.inOut" }
    );
    tl.fromTo(
      lampLight.current,
      { intensity: 0 },
      {
        intensity: 80,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => setFlickerActive(true), // activar flicker al terminar
      },
      "<"
    );
  }, []);

  // 🔥 Parpadeo realista con GSAP
  useEffect(() => {
    if (!flickerActive || !lampLight.current) return;

    const baseIntensity = 80;

    const flickerLoop = () => {
      if (!lampLight.current) return;

      const randomDelay = Math.random() * 2 + 0.5; // tiempo aleatorio entre flickers
      const flickerIntensity = baseIntensity * (0.4 + Math.random() * 0.6); // rango 40% - 100%

      gsap.to(lampLight.current, {
        intensity: flickerIntensity,
        duration: 0.1 + Math.random() * 0.2, // duración rápida
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.delayedCall(randomDelay, flickerLoop);
        },
      });
    };

    flickerLoop(); // iniciar loop

    return () => {
      gsap.killTweensOf(lampLight.current);
    };
  }, [flickerActive]);

  return (
    <>
      <rectAreaLight
        ref={monitorLight}
        position={[0, 1.3, 0.8]}
        width={0.5}
        height={0.5}
        intensity={0}
        color={"#00FF66"}
        lookAt={[0, 0, 0]}
      />

      <spotLight
        ref={lampLight}
        position={[0, 4, 0]}
        intensity={60}
        distance={10}
        decay={3}
        angle={Math.PI / 4.5}
        penumbra={0.7}
        color={"#FFD38A"}
        castShadow
      />

      <DeskModel />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2}
      />

      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.4}
          luminanceSaturation={0.9}
        />
        <Vignette eskil={false} offset={0.3} darkness={1.0} />
      </EffectComposer>
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white">
      <div className="text-center">
        <p className="text-xl animate-pulse">Cargando escena 3D...</p>
      </div>
    </div>
  );
}

export default function MainScene() {
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    // 🔦 Quitamos el overlay después de unos segundos (cuando termina la animación de luces)
    gsap.to("#overlay", {
      opacity: 0,
      delay: 1,
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => setOverlayVisible(false),
    });
  }, []);

  return (
    <ErrorBoundary fallback={<LoadingScreen />}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Canvas
          camera={{ position: [0, 5, 10], fov: 40 }}
          style={{ background: "#000", width: "100%", height: "100%" }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
          }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Scene />
            <PrinterInteraction  />
            <KeyboardController />
          </Suspense>
          <CameraController />
        </Canvas>

        {/* Overlay negro al inicio */}
        {overlayVisible && (
          <div
            id="overlay"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "black",
              zIndex: 10,
            }}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

// Precargar el modelo
useGLTF.preload("/models/adrian.glb");
