import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { ErrorBoundary } from "../ErrorBoundary";
import { gsap } from "../../lib/gsap";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { useLanguage } from "../../context/LanguageContext";

import CameraController from "./CameraController";
import KeyboardController from "./desktop/KeyboardController";
import { useStandardMaterials } from "../../lib/useStandardMaterials";
import ConsoleScreen from "../ui/Console";
import PrinterInteraction from "./PrinterInteraction";

// Inicializa los uniformes necesarios para `RectAreaLight` (requerido por
// tres.js cuando se usan luces de área desde el paquete de ejemplos).
RectAreaLightUniformsLib.init();

function DeskModel() {
  const { scene } = useGLTF("/models/websites.glb");
  useStandardMaterials(scene);

  // Forzar propiedades emisivas en partes concretas del modelo:
  // - monitor.001: emisión verde para simular pantalla encendida
  // - bombilla: emisión cálida y mayor intensidad para simular luz
  // Esto se hace después de cargar el glTF para asegurar que los
  // materiales estén disponibles.
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name.toLowerCase().includes("monitor001")) {
        child.material.emissive = new THREE.Color("black");
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
const audioRef = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  const audio = new Audio("/sounds/rain.mp3");
  audio.loop = true; // 🔄 se repite como ambiente
  audio.volume = 0.4; // 🎚️ volumen bajo
  audioRef.current = audio;

  const playAudio = () => {
    audio.play().catch(() => {});
    // solo reproducir una vez al primer click
    window.removeEventListener("click", playAudio);
  };

  // 🚨 necesario por política de autoplay de Chrome/Firefox
  window.addEventListener("click", playAudio);

  return () => {
    audio.pause();
    audioRef.current = null;
    window.removeEventListener("click", playAudio);
  };
}, []);
   

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

    // Capturamos la referencia actual para evitar la advertencia de cambios
    const lamp = lampLight.current;

    const flickerLoop = () => {
      if (!lamp) return;

      const randomDelay = Math.random() * 2 + 0.5; // tiempo aleatorio entre flickers
      const flickerIntensity = baseIntensity * (0.4 + Math.random() * 0.6); // rango 40% - 100%

      gsap.to(lamp, {
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
      gsap.killTweensOf(lamp);
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

  <EffectComposer multisampling={4}>
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
  const { language } = useLanguage();
  
  const messages = {
    es: {
      loading: "Cargando escena 3D...",
      recommendation: "Si la escena no aparece después de un momento, se recomienda recargar la página hasta que aparezca."
    },
    en: {
      loading: "Loading 3D scene...",
      recommendation: "If the scene doesn't appear after a moment, we recommend refreshing the page until it appears."
    }
  };

  const currentMessages = messages[language as keyof typeof messages];

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white">
      <div className="text-center max-w-md px-4">
        <p className="text-xl animate-pulse mb-4">{currentMessages.loading}</p>
        <p className="text-sm text-gray-400 leading-relaxed">{currentMessages.recommendation}</p>
      </div>
    </div>
  );
}

export default function MainScene() {

  return (
    <ErrorBoundary fallback={<LoadingScreen />}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1, // asegura que el canvas esté detrás de otros elementos UI
        }}
      >
        <Canvas
          camera={{ position: [0, 5, 10], fov: 40 }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
          style={{ background: "#000", width: "100%", height: "100%", zIndex: 1 }}
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
            try {
              gl.setPixelRatio(window.devicePixelRatio || 1);
            } catch {
              //  no permiten cambiarlo; ignorar
            }
          }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Scene />
            <PrinterInteraction  />
            <KeyboardController />
          </Suspense>
          <CameraController />
        </Canvas>


      </div>
    </ErrorBoundary>
  );
}

// Precargar el modelo
useGLTF.preload("/models/websites.glb");
