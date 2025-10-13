import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { Sky, Cloud, Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';
import { gsap } from '../../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Componente de la roca flotante
const FloatingRock = () => {
  const rockRef = useRef<THREE.Group>(null!);
  
  useEffect(() => {
    if (rockRef.current) {
      // Animación sutil de flotación
      gsap.to(rockRef.current.position, {
        y: "+=0.1",
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
      
      gsap.to(rockRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  return (
    <group ref={rockRef} position={[0, 2.5, -2]} name="floatingRock">
      <mesh castShadow receiveShadow>
        <dodecahedronGeometry args={[0.3, 1]} />
        <meshPhongMaterial 
          color="#3D2F24"
          specular="#1A1410"
          shininess={5}
          flatShading={true}
          transparent={false}
        />
      </mesh>
      {/* Capas de textura irregular */}
      <mesh position={[0.02, 0.01, 0.02]} castShadow>
        <octahedronGeometry args={[0.28, 2]} />
        <meshPhongMaterial 
          color="#2A1F17"
          specular="#0F0C0A"
          shininess={3}
          flatShading={true}
          opacity={0.9}
          transparent={true}
        />
      </mesh>
      <mesh position={[-0.01, -0.01, 0.01]} castShadow>
        <tetrahedronGeometry args={[0.32, 1]} />
        <meshPhongMaterial 
          color="#4A3B2E"
          specular="#1F1812"
          shininess={8}
          flatShading={true}
          opacity={0.7}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

// Componente del sistema de nubes
const CloudSystem = () => {
  const cloudGroupRef = useRef<THREE.Group>(null!);
  
  useEffect(() => {
    if (cloudGroupRef.current) {
      // Animación de las nubes - corregida para usar position.x
      cloudGroupRef.current.children.forEach((cloud, index) => {
        if (cloud.position) {
          gsap.to(cloud.position, {
            x: cloud.position.x + 2,
            duration: 30 + index * 5, // Variación en duración
            ease: "none",
            repeat: -1,
            yoyo: true,
            delay: index * 0.5
          });
          
          // Animación sutil en Y para más realismo
          gsap.to(cloud.position, {
            y: cloud.position.y + 0.5,
            duration: 15 + index * 3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.3
          });
        }
      });
    }
  }, []);

  return (
    <group ref={cloudGroupRef}>
      {/* Capa de nubes principales */}
      <Cloud
        position={[-4, 2, -8]}
        speed={0.1}
        opacity={0.6}
        color="#e6f3ff"
        segments={40}
        bounds={[8, 2, 8]}
        volume={6}
        smallestVolume={0.3}
      />
      <Cloud
        position={[4, 1.5, -12]}
        speed={0.15}
        opacity={0.4}
        color="#f0f6ff"
        segments={35}
        bounds={[6, 1.5, 6]}
        volume={4}
        smallestVolume={0.2}
      />
      <Cloud
        position={[0, 3, -15]}
        speed={0.08}
        opacity={0.7}
        color="#ddeeff"
        segments={50}
        bounds={[10, 3, 10]}
        volume={8}
        smallestVolume={0.4}
      />
      
      {/* Nubes de fondo más distantes */}
      <Cloud
        position={[-8, 0, -20]}
        speed={0.05}
        opacity={0.3}
        color="#f5faff"
        segments={25}
        bounds={[12, 1, 12]}
        volume={3}
        smallestVolume={0.1}
      />
      <Cloud
        position={[8, 1, -25]}
        speed={0.07}
        opacity={0.25}
        color="#ffffff"
        segments={30}
        bounds={[15, 2, 15]}
        volume={5}
        smallestVolume={0.15}
      />
    </group>
  );
};

// Componente principal de la escena
const SceneContent = () => {
  const sceneRef = useRef<THREE.Group>(null!);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return;

    // Configuración inicial de la cámara
    cameraRef.current.position.set(0, 0, 5);
    cameraRef.current.lookAt(0, 0, 0);

    // ScrollTrigger para capturar la posición de scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        // Solo guardamos el progreso, la actualización real se hace en useFrame
        scrollProgressRef.current = self.progress;
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Usamos useFrame para actualizar la posición de la cámara y la roca en cada frame
  useFrame(() => {
    if (!cameraRef.current || !sceneRef.current) return;
    
    const progress = scrollProgressRef.current;
    
    // Animación de la cámara descendiendo
    cameraRef.current.position.y = -progress * 15; // Descender 15 unidades
    cameraRef.current.position.z = 5 - progress * 10; // Acercarse también
    
    // Mover la roca para que siempre sea visible frente a la cámara
    const rock = sceneRef.current.getObjectByName('floatingRock');
    if (rock) {
      // Mantener la posición relativa de la roca a la cámara
      rock.position.y = 2.5 - progress * 15; // Mismo descenso que la cámara
      
      // Ajustar la posición Z de la roca para mantener la distancia relativa
      // A medida que la cámara se acerca, la roca también debe alejarse para mantener perspectiva
      rock.position.z = -2 - progress * 10; // Se aleja a la misma velocidad que la cámara se acerca
      
      // Opcional: ajustar la escala de la roca para mantener su tamaño aparente
      // A mayor progreso, menor escala para compensar la cercanía
      const baseScale = 1.0;
      rock.scale.setScalar(baseScale - progress * 0.3); // Reducir escala hasta un 30% al máximo scroll
    }
    
    // Movimiento de las nubes para crear profundidad
    sceneRef.current.children.forEach((child, index) => {
      if (child.userData.isCloud) {
        child.position.y += progress * 0.1 * (index + 1);
      }
    });
  });

  return (
    <group ref={sceneRef}>
      <PerspectiveCamera 
        ref={cameraRef}
        makeDefault 
        fov={60}
        near={0.1}
        far={1000}
      />
      
      {/* Iluminación atmosférica */}
      <ambientLight intensity={0.4} color="#87ceeb" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color="#fff8dc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Luz de relleno suave */}
      <hemisphereLight 
        args={["#87ceeb", "#e6f3ff", 0.3]}
      />
      
      {/* Sistema de cielo */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0.6}
        azimuth={0.25}
        rayleigh={0.5}
        turbidity={10}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      
      {/* Sistema de nubes */}
      <CloudSystem />
      
      {/* Roca flotante - ahora con nombre para poder referenciarla */}
      <FloatingRock />
      
      {/* Environment mapping */}
      <Environment preset="city" />
    </group>
  );
};

const AtmosphericScene = () => {
  return (
    <div className="fixed inset-0 w-full h-[300vh]"> {/* Altura extendida para scroll */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
          
          {/* Post-processing para calidad cinematográfica */}
          <EffectComposer>
            <Bloom 
              intensity={0.4}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            <Vignette 
              offset={0.3} 
              darkness={0.5} 
              eskil={false} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AtmosphericScene;
