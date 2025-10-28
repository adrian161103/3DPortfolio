import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { Mesh, Group, Vector3, MathUtils } from 'three';
import { gsap } from 'gsap';
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/**
 * Componente que renderiza un efecto visual de prisma 3D interactivo con efectos de refracción
 * y respuesta a los movimientos del cursor.
 */
export function PrismEffect() {
  // Referencias a objetos 3D para manipulación y animación
  const prismRef = useRef<Group>(null);
  const glassRef = useRef<Mesh>(null);
  const innerGlowRef = useRef<Mesh>(null);
  const lightRef = useRef<Group>(null);
  const { mouse } = useThree();
  
  // Variables de control para las animaciones de rotación
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  
  /**
   * Loop de animación que se ejecuta en cada frame
   * Maneja la interactividad con el mouse y los efectos de movimiento
   */
  useFrame((state, delta) => {
    if (prismRef.current) {
      // Control de rotación basado en la posición del cursor con interpolación suave
      targetRotationX.current = mouse.y * 0.5;
      targetRotationY.current = mouse.x * 0.5;
      
      rotationX.current = MathUtils.lerp(rotationX.current, targetRotationX.current, 0.05);
      rotationY.current = MathUtils.lerp(rotationY.current, targetRotationY.current, 0.05);
      
      prismRef.current.rotation.x = rotationX.current;
      prismRef.current.rotation.y = rotationY.current;
      
      // Rotación autónoma constante en el eje Z
      prismRef.current.rotation.z += delta * 0.1;
      
      // Efecto de flotación vertical con movimiento sinusoidal
      prismRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    // Animación de pulsación para el núcleo luminoso
    if (innerGlowRef.current && innerGlowRef.current.material) {
      const material = innerGlowRef.current.material as any;
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    // Movimiento de luces para generar efectos dinámicos de iluminación
    if (lightRef.current) {
      lightRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      lightRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  
  /**
   * Animación de entrada al montar el componente
   * Utiliza GSAP para crear transiciones fluidas, manteniendo el prisma iluminado desde el inicio
   */
  useEffect(() => {
    if (prismRef.current) {
      // Animación de entrada desde abajo con rebote
      gsap.from(prismRef.current.position, {
        y: -5,
        duration: 2,
        ease: "elastic.out(1, 0.5)"
      });
      
      // Rotación inicial dinámica
      gsap.from(prismRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI,
        duration: 2.5,
        ease: "power3.out"
      });
      
    }
  }, []);
  
  return (
    <>
      {/* Configuración de iluminación ambiental y entorno */}
      <Environment files="/hdri/studio_small_03_1k.hdr" />
      <ambientLight intensity={0.18} />
      
      {/* Grupo de luces dinámicas que crean efectos de color */}
      <group ref={lightRef}>
        <spotLight
          position={[10, 10, 10]}
          angle={0.12}
          penumbra={0.9}
          intensity={2.8}
          color="#ff00ff"
          castShadow
          shadow-bias={-0.0001}
        />
        <pointLight position={[-10, -10, -5]} color="#00ffff" intensity={3.8} distance={15} decay={2} />
        <pointLight position={[0, 10, 0]} color="#ffffff" intensity={1.8} />
        <pointLight position={[3, -2, 5]} color="#ffcc77" intensity={1.2} distance={8} />
      </group>

      {/* Estructura principal del prisma */}
      <group ref={prismRef} position={[0, 0, 0]}>
        {/* Núcleo luminoso interior */}
        <mesh ref={innerGlowRef} scale={0.85}>
          <tetrahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent={true}
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
        
        {/* Cuerpo principal del prisma con material de transmisión avanzado */}
        <mesh ref={glassRef}>
          <tetrahedronGeometry args={[1.2, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={24}          // Calidad de muestreo para refracción
            resolution={512}      // Resolución de la textura de transmisión
            transmission={0.98}   // Nivel de transparencia
            thickness={0.35}      // Grosor óptico del material
            roughness={0.04}      // Rugosidad de la superficie
            chromaticAberration={0.08} // Separación de componentes de color
            anisotropy={1.5}      // Dirección preferente de dispersión de luz
            distortion={1.2}      // Nivel de distorsión óptica
            distortionScale={0.4} // Escala espacial de la distorsión
            temporalDistortion={0.3} // Variación temporal de la distorsión
            clearcoat={1.2}       // Capa superficial brillante
            attenuationDistance={0.4}
            attenuationColor="#ffffff"
            color="#f8f8ff"       // Color base con tinte azulado sutil
            ior={2.0}             // Índice de refracción
            reflectivity={0.2}    // Nivel de reflectividad
          />
        </mesh>
        
        {/* Contorno sutil para definir mejor los bordes */}
        <mesh scale={1.002}>
          <tetrahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.08} 
          />
        </mesh>
      </group>

      {/* Efectos de post-procesado para mejorar la calidad visual */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.8}
          radius={0.5}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector3(0.0035, 0.0035, 0.0035)}
          radialModulation
          modulationOffset={0.5}
        />
        <DepthOfField 
          focusDistance={0}
          focalLength={0.02}
          bokehScale={3}
          height={600}
        />
      </EffectComposer>
    </>
  );
}
