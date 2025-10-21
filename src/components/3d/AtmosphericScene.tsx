import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { Sky, Cloud, Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';
import { gsap } from '../../lib/gsap';

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
          color="#2C2C2C"
          specular="#FFFFFF"
          shininess={15}
          flatShading={true}
          transparent={false}
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
      {/* Nubes cercanas a la roca - capa principal */}
      <Cloud
        position={[-2, 2.8, -1]}
        speed={0.1}
        opacity={0.8}
        color="#e6f3ff"
        segments={45}
        bounds={[4, 1.5, 4]}
        volume={3}
        smallestVolume={0.2}
      />
      <Cloud
        position={[1.5, 2.2, -0.5]}
        speed={0.12}
        opacity={0.7}
        color="#f0f6ff"
        segments={40}
        bounds={[3, 1.2, 3]}
        volume={2.5}
        smallestVolume={0.15}
      />
      <Cloud
        position={[0.5, 3.2, -3]}
        speed={0.08}
        opacity={0.9}
        color="#ddeeff"
        segments={50}
        bounds={[5, 2, 5]}
        volume={4}
        smallestVolume={0.3}
      />
      
      {/* Capa de nubes medias */}
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
      
      {/* Nubes adicionales para mayor densidad */}
      <Cloud
        position={[-1, 1.8, -6]}
        speed={0.13}
        opacity={0.5}
        color="#f5faff"
        segments={38}
        bounds={[7, 1.8, 7]}
        volume={5}
        smallestVolume={0.25}
      />
      <Cloud
        position={[3, 2.8, -9]}
        speed={0.09}
        opacity={0.6}
        color="#e6f3ff"
        segments={42}
        bounds={[6, 2.2, 6]}
        volume={4.5}
        smallestVolume={0.28}
      />
      <Cloud
        position={[-3, 3.5, -5]}
        speed={0.11}
        opacity={0.65}
        color="#ddeeff"
        segments={48}
        bounds={[8, 2.5, 8]}
        volume={6.5}
        smallestVolume={0.35}
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
      <Cloud
        position={[0, -1, -30]}
        speed={0.06}
        opacity={0.2}
        color="#ffffff"
        segments={32}
        bounds={[18, 3, 18]}
        volume={7}
        smallestVolume={0.18}
      />
      <Cloud
        position={[-12, 2, -28]}
        speed={0.04}
        opacity={0.35}
        color="#f0f6ff"
        segments={28}
        bounds={[14, 2.5, 14]}
        volume={4.5}
        smallestVolume={0.12}
      />
      <Cloud
        position={[12, 3, -32]}
        speed={0.05}
        opacity={0.28}
        color="#e6f3ff"
        segments={26}
        bounds={[16, 3, 16]}
        volume={6}
        smallestVolume={0.16}
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

    // Escuchar eventos de scroll personalizados con mejor debugging
    const handleAtmosphericScroll = (event: CustomEvent) => {
      const newProgress = event.detail.progress;
      scrollProgressRef.current = newProgress;
      console.log('AtmosphericScene received scroll progress:', newProgress); // Debug
    };

    // Agregar listener para el evento personalizado
    window.addEventListener('atmosphericScroll', handleAtmosphericScroll as EventListener);

    // También agregar un listener de scroll directo como fallback
    const handleDirectScroll = () => {
      // Buscar contenedores scrolleables
      const scrollableElements = document.querySelectorAll('[style*="overflow: auto"], .show-scrollbar');
      
      for (const element of scrollableElements) {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        
        if (scrollHeight > 0) {
          const progress = scrollTop / scrollHeight;
          scrollProgressRef.current = progress;
          console.log('AtmosphericScene direct scroll progress:', progress); // Debug
          break; // Solo usar el primer elemento scrolleable encontrado
        }
      }
    };

    // Listener de scroll directo con throttling
    let scrollTimeout: number;
    const throttledDirectScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(handleDirectScroll, 16); // ~60fps
    };

    document.addEventListener('scroll', throttledDirectScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('atmosphericScroll', handleAtmosphericScroll as EventListener);
      document.removeEventListener('scroll', throttledDirectScroll, { capture: true });
      clearTimeout(scrollTimeout);
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
      
      // Mantener la escala constante para que el tamaño no cambie durante el scroll
      const baseScale = 1.0;
      rock.scale.setScalar(baseScale); // Escala fija, sin cambios durante el scroll
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
