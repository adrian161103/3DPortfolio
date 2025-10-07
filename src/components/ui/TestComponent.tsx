import React, { useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleEffect from "./ParticleEffect";
import BlackHoleCore from "./BlackHoleCore";

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
      
      {/* Agujero negro en el centro */}
      <BlackHoleCore radius={3.0} diskIntensity={1.2} rotationSpeed={1.5} />
    </Canvas>
  );
};

const TestComponent: React.FC = () => {
  const [showEffect, setShowEffect] = useState(false);

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

  if (!showEffect) {
    return <div className="bg-black h-screen w-screen" />;
  }

  return (
    <div className="relative bg-black text-white h-screen w-screen overflow-hidden">
      <GalaxyWithBlackHole />
    </div>
  );
};

export default TestComponent;
