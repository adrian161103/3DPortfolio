import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { AdditiveBlending } from 'three';
import { animateCameraToViewByName } from '../../lib/cameraAnimator';

// Shader para el disco de acreción del agujero negro
const diskVertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform float uRadius;
  uniform float uInnerRadius;
  
  attribute float size;
  attribute float alpha;
  attribute vec3 color;
  attribute float offset;
  attribute float speed;
  attribute float radialPosition;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRadialPosition;
  
  void main() {
    // Posición base
    vec3 pos = position;
    
    // Rotación según la distancia al centro (efecto kepleriano extremo)
    // Las partículas más cercanas al centro giran mucho más rápido
    float distanceFromCenter = length(pos.xz);
    float rotationSpeed = speed * 6.0 / (0.2 + pow(distanceFromCenter / 3.0, 1.5));
    float angle = uTime * rotationSpeed + offset;
    
    // Efecto de ondulación vertical para simular turbulencia en el disco
    float waveFreq = 5.0 + radialPosition * 10.0; // Frecuencia aumenta con la distancia
    float waveAmp = 0.05 * min(1.0, radialPosition * 3.0); // Amplitud
    pos.y += sin(angle * 3.0 + radialPosition * waveFreq) * waveAmp;
    
    // Rotación del disco
    float cosA = cos(angle);
    float sinA = sin(angle);
    
    vec3 rotatedPos = vec3(
      pos.x * cosA - pos.z * sinA,
      pos.y,
      pos.x * sinA + pos.z * cosA
    );
    
    // Proyección
    vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
    
    // Tamaño adaptativo basado en la distancia a la cámara
    float cameraDistance = length(mvPosition.xyz);
    float sizeScale = min(3.0, 1000.0 / cameraDistance);
    float finalSize = uSize * size * sizeScale;
    
    // Efecto de destello cerca del horizonte de eventos
    float horizonProximity = 1.0 - smoothstep(uInnerRadius * 0.8, uInnerRadius * 1.5, distanceFromCenter);
    finalSize *= 1.0 + horizonProximity * 0.7;
    
    // Animación de pulsación suave
    finalSize *= 1.0 + 0.15 * sin(uTime * 2.0 + offset * 15.0);
    
    gl_PointSize = finalSize;
    gl_Position = projectionMatrix * mvPosition;
    
    // Pasar variables al fragment shader
    vColor = color;
    vAlpha = alpha;
    vRadialPosition = radialPosition; // Posición radial normalizada (0-1)
  }
`;

const diskFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRadialPosition;
  
  void main() {
    // Partículas con borde suave para mejor calidad visual
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float radius = length(xy);
    
    // Estructura de brillo con varias capas
    // Núcleo muy brillante
    float coreGlow = exp(-radius * 6.0);
    // Brillo medio más intenso
    float midGlow = exp(-radius * 3.0);
    // Halo exterior más difuso
    float outerGlow = exp(-radius * 1.5);
    
    // Combinar capas con diferentes intensidades según la posición radial
    float alphaCore = coreGlow * 0.5;
    float alphaMid = midGlow * 0.7;
    float alphaOuter = outerGlow * 0.3;
    
    float alpha = (alphaCore + alphaMid + alphaOuter) * vAlpha;
    
    // Efecto de temperatura - más caliente (anaranjado/amarillo) en el interior,
    // más azulado hacia el exterior
    vec3 baseColor = vColor;
    
    // Mayor intensidad lumínica cerca del horizonte de eventos
    float horizonFactor = pow(1.0 - vRadialPosition, 3.0);
    baseColor *= 1.0 + horizonFactor * 0.8;
    
    // Ajustar saturación según distancia
    // Interior más blanco por temperatura extrema
    vec3 finalColor = mix(vec3(1.0, 0.9, 0.7), baseColor, vRadialPosition * 0.7 + 0.3);
    
    // Brillo adicional en el centro
    finalColor += vec3(0.2, 0.1, 0.0) * pow(1.0 - vRadialPosition, 2.0);
    
    // Efecto Doppler simulado (azulado en un lado, rojizo en otro)
    // Calculado por coordenada de textura para variar en cada partícula
    float dopplerEffect = gl_PointCoord.x - 0.5;
    finalColor = mix(
      finalColor,
      mix(
        vec3(1.0, 0.6, 0.3), // Rojizo
        vec3(0.5, 0.7, 1.0), // Azulado
        gl_PointCoord.x
      ),
      0.15 * horizonFactor // Más pronunciado cerca del horizonte
    );
    
    // Limitar valores para evitar oversaturación
    finalColor = min(finalColor, vec3(1.5, 1.5, 1.5));
    
    gl_FragColor = vec4(finalColor, alpha);
    
    // Eliminar fragmentos casi transparentes para mejor rendimiento
    if (alpha < 0.01) discard;
  }
`;

// Shader para el agujero negro (sombra)
const blackHoleVertexShader = `
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const blackHoleFragmentShader = `
  void main() {
    // Negro absoluto con ligera transparencia en los bordes
    vec2 uv = gl_FragCoord.xy / vec2(1000.0);
    float distFromCenter = length(uv - vec2(0.5));
    
    // Negro puro para el agujero
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
`;

// Shader para el anillo luminoso (horizonte de eventos)
const horizonVertexShader = `
  uniform float uTime;
  
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const horizonFragmentShader = `
  uniform float uTime;
  
  varying vec2 vUv;
  
  void main() {
    // Distancia del centro del anillo
    float dist = length(vUv - vec2(0.5));
    
    // Ancho del anillo con bordes suaves
    float ring = smoothstep(0.4, 0.45, dist) * (1.0 - smoothstep(0.45, 0.5, dist));
    
    // Brillo pulsante
    float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
    
    // Colores del anillo, inspirados en la imagen de referencia
    vec3 orangeColor = vec3(1.0, 0.7, 0.3) * 1.2; // Naranja cálido
    vec3 blueColor = vec3(0.3, 0.5, 1.0); // Azul para efecto Doppler
    
    // Mezcla de colores según la posición angular
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float colorMix = 0.5 + 0.5 * sin(angle + uTime * 0.2);
    vec3 ringColor = mix(orangeColor, blueColor, colorMix);
    
    // Intensidad variable alrededor del anillo
    float intensity = 0.7 + 0.3 * sin(angle * 8.0 + uTime * 3.0);
    
    // Color final con brillo y transparencia
    gl_FragColor = vec4(ringColor * intensity * pulse * ring, ring * pulse);
  }
`;

// Propiedades del componente
interface BlackHoleCoreProps {
  radius?: number;
  diskIntensity?: number;
  rotationSpeed?: number;
  enableZoom?: boolean;
}

// Componente principal del agujero negro
const BlackHoleCore: React.FC<BlackHoleCoreProps> = ({ 
  radius = 2.5, 
  diskIntensity = 1.0,
  rotationSpeed = 1.0,
  enableZoom = false
}) => {
  const diskRef = useRef<THREE.Points>(null);
  const diskMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const horizonRef = useRef<THREE.Mesh>(null);
  const horizonMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const blackHoleRef = useRef<THREE.Mesh>(null);
  
  const { viewport, camera } = useThree();
  
  // Radio interno (horizonte de eventos)
  const innerRadius = radius * 0.3;
  
  // Generar datos para el disco de acreción
  const diskData = React.useMemo(() => {
    const count = 15000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const offsets = new Float32Array(count);
    const speeds = new Float32Array(count);
    const radialPositions = new Float32Array(count);
    
    // Colores base del disco de acreción
    const innerColor = new THREE.Color(1.0, 0.8, 0.4); // Amarillo cálido
    const midColor = new THREE.Color(1.0, 0.5, 0.2);   // Naranja
    const outerColor = new THREE.Color(0.6, 0.3, 0.1); // Marrón rojizo
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribución de partículas en el disco de acreción
      // El disco debe tener un agujero en el centro
      const angle = Math.random() * Math.PI * 2;
      
      // Distribución radial con densidad variable
      // Mayor concentración cerca del horizonte de eventos
      let radialPos;
      
      // 40% de partículas cerca del horizonte
      if (i < count * 0.4) {
        radialPos = innerRadius + Math.pow(Math.random(), 2) * (radius - innerRadius) * 0.3;
      } 
      // 40% en zona media
      else if (i < count * 0.8) {
        radialPos = innerRadius + Math.pow(Math.random(), 1.5) * (radius - innerRadius) * 0.7;
      }
      // 20% en zona exterior
      else {
        radialPos = innerRadius + Math.pow(Math.random(), 0.8) * (radius - innerRadius) * 1.2;
      }
      
      // Posición normalizada (0-1) desde el horizonte hasta el borde
      const normalizedRadialPos = (radialPos - innerRadius) / (radius - innerRadius);
      radialPositions[i] = normalizedRadialPos;
      
      // Posición cartesiana
      positions[i3] = Math.cos(angle) * radialPos;
      
      // El disco tiene un grosor variable (más grueso cerca del horizonte)
      const heightScale = 0.1 + 0.2 * (1.0 - normalizedRadialPos);
      positions[i3 + 1] = (Math.random() - 0.5) * heightScale;
      
      positions[i3 + 2] = Math.sin(angle) * radialPos;
      
      // Colores según distancia radial
      const colorObj = new THREE.Color();
      
      if (normalizedRadialPos < 0.3) {
        // Zona cercana al horizonte - más amarillo/blanco
        colorObj.copy(innerColor);
        // Algunas partículas casi blancas por temperatura extrema
        if (Math.random() > 0.7) {
          colorObj.lerp(new THREE.Color(1.0, 1.0, 0.9), 0.7);
        }
      } else if (normalizedRadialPos < 0.7) {
        // Zona media - transición a naranja
        const t = (normalizedRadialPos - 0.3) / 0.4;
        colorObj.copy(innerColor).lerp(midColor, t);
      } else {
        // Zona exterior - más rojiza/marrón
        const t = (normalizedRadialPos - 0.7) / 0.3;
        colorObj.copy(midColor).lerp(outerColor, t);
      }
      
      colors[i3] = colorObj.r;
      colors[i3 + 1] = colorObj.g;
      colors[i3 + 2] = colorObj.b;
      
      // Tamaño de partículas (mayor cerca del horizonte)
      const sizeBase = 0.5 + 1.5 * Math.pow(1.0 - normalizedRadialPos, 2);
      sizes[i] = sizeBase * (0.8 + Math.random() * 0.4);
      
      // Alfa (más brillante cerca del horizonte)
      alphas[i] = Math.min(1.0, 0.4 + 0.6 * Math.pow(1.0 - normalizedRadialPos, 1.5));
      
      // Offsets aleatorios para animación
      offsets[i] = Math.random() * Math.PI * 2;
      
      // Velocidad de rotación (ley de Kepler)
      // Las partículas cercanas al horizonte giran extremadamente rápido
      const baseSpeed = 0.2 + Math.random() * 0.1;
      speeds[i] = baseSpeed * rotationSpeed;
    }
    
    return {
      positions,
      colors,
      sizes,
      alphas,
      offsets,
      speeds,
      radialPositions
    };
  }, [radius, innerRadius, rotationSpeed]);
  
  // Estado para controlar si el cursor está sobre el agujero negro
  const [hovered, setHovered] = useState(false);
  
  // Función para manejar el zoom hacia el agujero negro
  const handleBlackHoleClick = () => {
    if (enableZoom) {
      // Animar la cámara hacia la vista del agujero negro
      animateCameraToViewByName(camera as THREE.PerspectiveCamera, null, 'blackHole');
      
      // Configurar un temporizador para emitir el evento cuando termine la animación
      setTimeout(() => {
        console.log("Emitiendo evento blackHoleZoomComplete");
        window.dispatchEvent(new CustomEvent("blackHoleZoomComplete"));
      }, 2500); //  mismo tiempo que la duración de la animación de la cámara
    }
  };

  // Actualización de la animación
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (diskMaterialRef.current) {
      diskMaterialRef.current.uniforms.uTime.value = time;
    }
    
    if (horizonMaterialRef.current) {
      horizonMaterialRef.current.uniforms.uTime.value = time;
    }

    // Cambiar el cursor si está sobre el agujero negro
    if (enableZoom) {
      document.body.style.cursor = hovered ? 'pointer' : 'default';
    }
  });
  
  // Tamaño responsivo
  const responsiveSize = Math.min(viewport.width, viewport.height) * 0.01;
  
  return (
    <group>
      {/* Disco de acreción */}
      <points ref={diskRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[diskData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[diskData.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[diskData.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-alpha"
            args={[diskData.alphas, 1]}
          />
          <bufferAttribute
            attach="attributes-offset"
            args={[diskData.offsets, 1]}
          />
          <bufferAttribute
            attach="attributes-speed"
            args={[diskData.speeds, 1]}
          />
          <bufferAttribute
            attach="attributes-radialPosition"
            args={[diskData.radialPositions, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={diskMaterialRef}
          blending={AdditiveBlending}
          depthWrite={false}
          vertexShader={diskVertexShader}
          fragmentShader={diskFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uSize: { value: responsiveSize * diskIntensity },
            uRadius: { value: radius },
            uInnerRadius: { value: innerRadius }
          }}
          transparent={true}
        />
      </points>
      
      {/* Agujero negro (esfera negra) con interactividad */}
      <mesh 
        ref={blackHoleRef}
        onClick={handleBlackHoleClick}
        onPointerOver={() => enableZoom && setHovered(true)}
        onPointerOut={() => enableZoom && setHovered(false)}
      >
        <sphereGeometry args={[innerRadius, 32, 32]} />
        <shaderMaterial
          vertexShader={blackHoleVertexShader}
          fragmentShader={blackHoleFragmentShader}
          transparent={false}
          depthWrite={true}
          side={THREE.FrontSide}
        />
      </mesh>
      
      {/* Anillo luminoso (horizonte de eventos) */}
      <mesh ref={horizonRef} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[innerRadius * 0.9, innerRadius * 1.1, 64]} />
        <shaderMaterial
          ref={horizonMaterialRef}
          vertexShader={horizonVertexShader}
          fragmentShader={horizonFragmentShader}
          uniforms={{
            uTime: { value: 0 }
          }}
          transparent={true}
          blending={AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default BlackHoleCore;