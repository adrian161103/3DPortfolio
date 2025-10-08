import React, { useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleEffect from "./ParticleEffect";
import BlackHoleCore from "./BlackHoleCore";
import AfterBlackHole from "./AfterBlackHole";

// Componente que integra la galaxia y el agujero negro
const GalaxyWithBlackHole: React.FC = () => {
  return (
    <Canvas 
      dpr={[1, 3]} // Mayor resolución para dispositivos de alta densidad
      camera={{ position: [0, 20, 0], fov: 75, up: [0, 0, 1] }} // Vista desde arriba con FOV  amplio
      gl={{ 
        antialias: true, 
        alpha: true,
        precision: "highp", // Precisión alta para mejor calidad
        powerPreference: "high-performance" 
      }}
    >
      <color attach="background" args={['#000']} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={true} 
        autoRotateSpeed={0.2} 
        maxDistance={30}
        minDistance={2}
        minPolarAngle={Math.PI * 0.05} 
        maxPolarAngle={Math.PI * 0.9} 
        zoomSpeed={-0.5} // Invertir el comportamiento del zoom
      />
      {/* Galaxia existente */}
      <ParticleEffect />
      
      {/* Agujero negro en el centro con funcionalidad de zoom al hacer clic */}
      <BlackHoleCore radius={3.0} diskIntensity={1.2} rotationSpeed={1.5} enableZoom={true} />
    </Canvas>
  );
};

const TestComponent: React.FC = () => {
  const [showEffect, setShowEffect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showWhiteScreen, setShowWhiteScreen] = useState(false);

  // Efecto overlay
  useEffect(() => {
    const timer = setTimeout(() => {
      // Activa el efecto visual
      setShowEffect(true);

      // 🔊 Reproducir sonido
      const audio = new Audio("/sounds/intro.mp3"); 
      audio.volume = 0.8; // opcional
      audio.play().catch((err) => {
        console.warn("Error al reproducir sonido:", err);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Detectar cualquier interacción del usuario
  useEffect(() => {
    if (!showEffect) return;
    
    const handleUserInteraction = () => {
      setUserInteracted(true);
      setShowHint(false);
    };

    // Registrar listeners solo para los eventos más importantes
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('wheel', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [showEffect]);

  // Efecto para mostrar el mensaje de ayuda solo una vez después de 4 segundos
  useEffect(() => {
    if (!showEffect || userInteracted) return; // No iniciar si ya interactuó o si no se muestra la galaxia
    
    // Mostrar el mensaje una sola vez después de 4 segundos si no ha habido interacción
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 4000);
    
    return () => {
      clearTimeout(hintTimer);
    };
  }, [showEffect, userInteracted]);
  
  // Efecto para escuchar el evento de finalización del zoom del agujero negro
  useEffect(() => {
    const handleBlackHoleZoomComplete = () => {
      console.log("Animación del agujero negro completada, mostrando pantalla blanca");
      setShowWhiteScreen(true);
    };
    
    window.addEventListener("blackHoleZoomComplete", handleBlackHoleZoomComplete);
    
    return () => {
      window.removeEventListener("blackHoleZoomComplete", handleBlackHoleZoomComplete);
    };
  }, []);

  if (!showEffect) {
    return <div className="bg-black h-screen w-screen" />;
  }

  return (
    <div className="relative bg-black text-white h-screen w-screen overflow-hidden">
      {/* Pantalla blanca que aparece después de la animación del agujero negro */}
      {showWhiteScreen ? (
        <AfterBlackHole />
      ) : (
        <>
          <GalaxyWithBlackHole />
          {showHint && !userInteracted && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm animate-pulse">
              arrastra para rotar, usa la rueda del ratón para hacer zoom o clickea el agujero negro
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestComponent;
