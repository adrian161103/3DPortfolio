import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { AdditiveBlending, Color, ShaderMaterial } from 'three';

// Shaders para las partículas de la galaxia
const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform float branches;
  
  attribute float size;
  attribute vec3 color;
  attribute float alpha;
  attribute float speed;
  attribute float offset;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistanceFromHole;
  
  // Funciones para simular movimiento espiral avanzado
  float easeInOut(float t) {
    return t < 0.5 ? 2.0 * t * t : -1.0 + (4.0 - 2.0 * t) * t;
  }
  
  // Función de ruido para variación más natural
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  
  void main() {
    // Posición base
    vec3 pos = position;
    
    // Cálculo de distancia al centro para efectos diversos
    float distanceFromCenter = length(pos.xz);
    
    // Ángulo base para la rotación con efecto de espiral mucho más pronunciado
    // Velocidad de rotación extremadamente diferenciada según la distancia al centro
    float spiralFactor = 8.0; // Factor de espiral aumentado para mayor visibilidad
    // Movimiento de tipo kepleriano extremo (mucho más rápido en el centro)
    float rotationSpeed = speed * spiralFactor / (0.1 + 0.6 * pow(distanceFromCenter/15.0, 1.2));
    float angle = rotationSpeed * uTime + offset;
    
    // Añadir variación en eje Y para movimiento más dinámico
    // Simulación de "oleadas" en la rotación espiral
    float waveSpeed = 0.3;
    float waveHeight = 0.2;
    float yVariation = sin(uTime * waveSpeed + offset * 10.0 + distanceFromCenter * 0.05) * 
                      waveHeight * min(5.0, distanceFromCenter);
    
    // Componente de elevación/descenso periódico basado en distancia
    float elevationCycle = sin(uTime * 0.2 + distanceFromCenter * 0.1);
    float elevationAmount = 0.1 * distanceFromCenter * elevationCycle;
    
    pos.y += yVariation + elevationAmount;
    
    // Efecto espiral reforzado: partículas se mueven radialmente de forma más pronunciada
    float breatheCycle = uTime * 0.3 + offset * 8.0;
    float breatheEffect = sin(breatheCycle) * 0.12 + cos(breatheCycle * 0.5) * 0.08;
    float radialShift = distanceFromCenter * breatheEffect;
    
    // Efecto espiral adicional: las partículas siguen trayectorias espirales
    // Añadimos una componente de "remolino" que aumenta con el tiempo
    float spiralIntensity = 0.5 + 0.2 * sin(uTime * 0.15); // Mayor intensidad de espiral
    float spiralAngle = spiralIntensity * log(max(1.0, distanceFromCenter)) * sin(uTime * 0.5);
    angle += spiralAngle;
    
    // Factor adicional para reforzar el efecto visual de brazos espirales
    float branchesValue = branches > 0.0 ? branches : 5.0;
    float armFactor = sin(float(int(angle * branchesValue / (2.0 * 3.1416))) * (2.0 * 3.1416 / branchesValue));
    pos.xz *= 1.0 + armFactor * 0.15; // Aumentado el efecto
    
      // Calcular posición con efectos espirales mejorados
    // Este es el efecto de rotación espiral principal
    float cosA = cos(angle);
    float sinA = sin(angle);
    
    // Efecto de "fuga" del borde del agujero negro
    float holeEdgeEffect = 0.0;
    float holeRadius = 3.0; // Radio del agujero en unidades de espacio
    if (distanceFromCenter < holeRadius * 1.5) {
        // Para partículas cercanas al borde del agujero
        float distFromHoleEdge = max(0.01, distanceFromCenter - holeRadius);
        float edgeFactor = smoothstep(0.0, holeRadius * 0.5, distFromHoleEdge);
        holeEdgeEffect = (1.0 - edgeFactor) * 0.3;
    }
    
    // Vector normalizado desde el centro hasta la partícula (para efecto espiral)
    vec2 radialDir = normalize(pos.xz);    // Factor de deformación espiral (más fuerte en partículas más alejadas)
    float spiralDeformation = 0.05 * sin(uTime * 0.2 + offset * 3.0) * distanceFromCenter;
    
    // Efecto de "órbita acelerada" cerca del agujero
    if (distanceFromCenter < holeRadius * 1.8) {
        // Las partículas cercanas al agujero tienen movimiento más errático
        float holeProximityFactor = 1.0 - smoothstep(holeRadius, holeRadius * 1.8, distanceFromCenter);
        spiralDeformation += holeProximityFactor * 0.2 * sin(uTime * 2.0 + offset * 5.0);
    }
    
    // Vector de deformación espiral
    vec2 spiralDir = vec2(
        cos(angle * 1.2 + distanceFromCenter * 0.1),
        sin(angle * 1.2 + distanceFromCenter * 0.1)
    );
    
    // Efecto de "succión" hacia el agujero en el borde
    vec2 holeInfluence = vec2(0.0);
    if (distanceFromCenter < holeRadius * 2.0) {
        float holeEffect = (1.0 - smoothstep(holeRadius, holeRadius * 2.0, distanceFromCenter)) * 0.3;
        // Vector hacia el agujero
        holeInfluence = -normalize(pos.xz) * holeEffect * (0.5 + 0.5 * sin(uTime * 0.5));
    }
    
    // Aplicar rotación espiral con efectos de deformación aumentados
    vec3 rotatedPos = vec3(
        (pos.x + radialDir.x * radialShift + spiralDir.x * spiralDeformation + holeInfluence.x) * cosA - 
        (pos.z + radialDir.y * radialShift + spiralDir.y * spiralDeformation + holeInfluence.y) * sinA,
        pos.y,
        (pos.x + radialDir.x * radialShift + spiralDir.x * spiralDeformation + holeInfluence.x) * sinA + 
        (pos.z + radialDir.y * radialShift + spiralDir.y * spiralDeformation + holeInfluence.y) * cosA
    );
    
    // Aplicar la transformación
    vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
    
    // Mejorar el tamaño para mejor visibilidad en zoom
    float cameraDistance = length(mvPosition.xyz);
    float visibilityFactor = min(5.0, 1000.0 / cameraDistance); // Mejor escalado con la distancia
    float finalSize = uSize * size * visibilityFactor;
    
    // Tamaño mínimo para garantizar visibilidad incluso a distancia
    finalSize = max(finalSize, 0.5);
    
    // Pulsación sutil de tamaño para dar más vida
    finalSize *= 1.0 + 0.1 * sin(uTime + offset * 20.0);
    
    // Calcular y pasar la distancia al agujero para efectos en el fragmentShader
    // Reutilizamos la variable holeRadius ya definida anteriormente
    float distanceFromHole = max(0.0, distanceFromCenter - holeRadius);
    float normalizedDistance = smoothstep(0.0, 2.0, distanceFromHole);
    vDistanceFromHole = normalizedDistance;
    
    // Aumentar el tamaño de las partículas cerca del borde del agujero
    if (distanceFromHole < 1.0) {
        finalSize *= 1.0 + (1.0 - normalizedDistance) * 0.8;
    }
    
    // Configurar salida
    gl_PointSize = finalSize;
    gl_Position = projectionMatrix * mvPosition;
    
    // Pasar colores y alpha al fragment shader
    vColor = color;
    vAlpha = alpha;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistanceFromHole;
  
  void main() {
    // Calcular punto suave circular con brillo central de alta definición
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float radius = length(xy);
    
    // Estructura de brillo mejorada para mayor definición en zoom
    // Núcleo muy brillante y pequeño
    float coreGlow = exp(-radius * 8.0);
    // Brillo medio con borde definido
    float midGlow = exp(-radius * 4.0);
    // Halo exterior más difuminado
    float outerGlow = exp(-radius * 1.5);
    
    // Mezcla de tres capas para mejor definición
    float alphaCore = coreGlow * 0.4;
    float alphaMid = midGlow * 0.6;
    float alphaOuter = outerGlow * 0.3;
    
    // Combinar las tres capas
    float alpha = (alphaCore + alphaMid + alphaOuter) * vAlpha;
    
    // Aplicar color con mayor rango dinámico
    vec3 finalColor = vColor * (1.0 + coreGlow * 0.8 + midGlow * 0.4);
    
    // Efecto especial para partículas cerca del borde del agujero
    if (vDistanceFromHole < 0.6) {
      // Aumentar brillo para partículas cercanas al borde
      float edgeFactor = 1.0 - vDistanceFromHole / 0.6;
      
      // Añadir tinte azulado/violeta al borde para efecto de energía
      vec3 edgeColor = vec3(0.3, 0.4, 1.0);
      finalColor = mix(finalColor, edgeColor, edgeFactor * 0.7);
      
      // Aumentar brillo general
      finalColor *= 1.0 + edgeFactor * 0.8;
      
      // Hacer que el brillo pulse con el tiempo
      alpha *= 1.0 + edgeFactor * 0.5;
    }
    
    // Limitar valores muy altos para evitar oversaturación
    finalColor = min(finalColor, vec3(1.2, 1.2, 1.2));
    
    // Color final con mejor definición
    gl_FragColor = vec4(finalColor, alpha);
    
    // Prevenir artefactos en los bordes
    if (alpha < 0.01) discard;
  }
`;

// Tipos de partículas en la galaxia
interface ParticleProps {
  count: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
}

// Componente de partículas con WebGL usando Three.js
const GalaxyParticles = ({
  count = 10000,
  radius = 5,
  branches = 5,
  spin = 1,
  randomness = 0.5,
  randomnessPower = 3,
  insideColor = '#8b6cfd',
  outsideColor = '#1b3984'
}: ParticleProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);
    const { viewport } = useThree();
    
  // Añadido uniforms directamente en el material

  // Generar datos de partículas
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);    const insideColorObj = new Color(insideColor);
    const outsideColorObj = new Color(outsideColor);
    
    // Color intermedio para transición más suave
    const midColor = new Color().copy(insideColorObj).lerp(outsideColorObj, 0.4);
    
    // Distribución de partículas 
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribución con agujero central 
      let particleRadius;
      
     
      const holeRadius = radius * 0.35; // Agujero central ampliado (35% del radio total )
      
      // Distribución completamente fuera del agujero central
      if (i < count * 0.3) {
        // 30% de partículas en anillo cercano al borde del agujero
        particleRadius = holeRadius + Math.random() * radius * 0.15;
      } else if (i < count * 0.7) {
        // 40% de partículas en zona media
        particleRadius = holeRadius + Math.pow(Math.random(), 0.8) * radius * 0.5;
      } else {
        // 30% de partículas en el halo exterior
        particleRadius = radius * (0.6 + Math.random() * 0.6); // Mayor dispersión radial
      }
      
      // Ángulo de brazo espiral
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      
      // El factor de giro aumenta con la distancia,
      const spinAngle = spin * Math.pow(particleRadius, 0.6); // Aumentamos giro 
      
      // Aumentamos la proporción de partículas que siguen la estructura espiral
      const radialRandom = Math.random();
      // Ahora 50% de partículas siguen una estructura, el resto es dispersión
      const isInArm = radialRandom > 0.5;
      
      //  aleatoriedad para que las partículas sigan mejor la estructura espiral
      const randomFactor = randomness * (1.0 + particleRadius / (radius * 2));
      
      // Las partículas en los brazos tienen mucha menos dispersión para que se vea la estructura espiral
      const randomStrength = isInArm ? randomFactor * 0.4 : randomFactor * 1.5;
      
      // Dispersión casi total con ligera estructura
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomStrength * particleRadius * 1.3;
      
      // Dispersión vertical más pronunciada para eliminar el aspecto de "disco plano"
      const heightFactor = 0.3; // Más altura para todas las partículas
      const randomY = Math.pow(Math.random(), randomnessPower - 0.5) * (Math.random() < 0.5 ? 1 : -1) * randomStrength * particleRadius * heightFactor;
      
      // Mayor dispersión en Z
      const randomZ = Math.pow(Math.random(), randomnessPower - 0.5) * (Math.random() < 0.5 ? 1 : -1) * randomStrength * particleRadius * 1.8;
      
      // Sin inclinación (se ve desde arriba)
      const tiltAngle = 0; // Eliminar la inclinación
      const cosT = Math.cos(tiltAngle);
      const sinT = Math.sin(tiltAngle);
      
      // Calcular posición base en la espiral
      let x = Math.cos(branchAngle + spinAngle) * particleRadius;
      let y = 0;
      let z = Math.sin(branchAngle + spinAngle) * particleRadius;
      
      // Añadir variación aleatoria
      x += randomX;
      y += randomY;
      z += randomZ;
      
      // Aplicar inclinación
      const tiltedY = y * cosT - z * sinT;
      const tiltedZ = y * sinT + z * cosT;
      
      positions[i3] = x;
      positions[i3 + 1] = tiltedY;
      positions[i3 + 2] = tiltedZ;
      
      // Mezcla de colores con transición 
      const colorPosition = particleRadius / radius;
      const mixedColor = new Color();
      
      if (colorPosition < 0.3) {
        // Transición del centro al medio
        const t = colorPosition / 0.3;
        mixedColor.copy(insideColorObj).lerp(midColor, t);
      } else {
        // Transición del medio a los bordes
        const t = (colorPosition - 0.3) / 0.7;
        mixedColor.copy(midColor).lerp(outsideColorObj, t);
      }
      
      // Variación sutil en el color para evitar uniformidad
      if (Math.random() > 0.85) {
        // 15% de estrellas con variación de color
        const hsl = {h: 0, s: 0, l: 0};
        mixedColor.getHSL(hsl);
        hsl.s *= 0.7 + Math.random() * 0.6; // Variación de saturación
        hsl.l *= 0.8 + Math.random() * 0.4; // Variación de luminosidad
        mixedColor.setHSL(hsl.h, hsl.s, hsl.l);
      }
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
      
      // Tamaño: mayor rango y mejor distribución para calidad en zoom
      // Distribución Gaussiana refinada para mayor naturalidad
      const normalRandom = () => {
        // Box-Muller para distribución normal más realista
        const u = 1 - Math.random();
        const v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // Normalizar a rango 0-1 con sesgo positivo
        return Math.min(1, Math.max(0, (z * 0.3) + 0.6));
      };
      
      // Estratificación de tamaños para mejor definición en zoom
      if (isInArm) {
        // Partículas en "brazos" ( dispersos) - más grandes
        sizes[i] = normalRandom() * 2.2 + 0.6;
      } else if (particleRadius > radius * 0.7) {
        // Partículas exteriores -  pequeñas
        sizes[i] = normalRandom() * 1.0 + 0.4;
      } else {
        // Partículas en zona media
        sizes[i] = normalRandom() * 1.6 + 0.5;
      }
      
      // Mayor variedad de tamaños destacados
      const starBrightnessFactor = Math.random();
      if (starBrightnessFactor < 0.02) {
        // 2% estrellas muy brillantes
        sizes[i] *= 2.0;
      } else if (starBrightnessFactor < 0.1) {
        // 8% estrellas brillantes
        sizes[i] *= 1.5;
      }
      
      // Alfa con mejor distribución, manteniendo mejor visibilidad
      const alphaBase = 0.7 + normalRandom() * 0.3; // Base alpha entre 0.7-1.0
      const distanceFactor = Math.pow(particleRadius / radius, 2.0) * 0.4; // Reducción por distancia
      alphas[i] = Math.max(0.3, alphaBase - distanceFactor);
      
      // Velocidades extremadamente diferenciadas para efecto espiral
      // Velocidad base muy aumentada para movimiento más visible
      const baseSpeed = 0.03; // Velocidad para mas movimiento 
      
      // Ley de Kepler: mucha diferencia entre centro y bordes
      // Esto crea el efecto de "remolino" o espiral
      const keplerExponent = 0.45; // Exponente reducido para diferencia más extrema
      const keplerFactor = Math.pow(Math.max(0.02, particleRadius / radius), keplerExponent); 
      
      // Variación de velocidad por posición angular reforzada
      const angularSector = (Math.atan2(positions[i3 + 2], positions[i3]) + Math.PI) / (Math.PI * 2);
      
      // Variación más dramática entre sectores
      const sectorVariation = 0.4 + 0.7 * Math.sin(angularSector * Math.PI * branches + 
                                                  particleRadius * 0.2);
      
      // Velocidad final con mayor amplitud de variación
      speeds[i] = baseSpeed / keplerFactor * (0.7 + 0.6 * sectorVariation);
      
      // Offsets estructurados para crear patrones espirales más fuertes
      const baseOffset = Math.random() * Math.PI * 2;
      
      // Para partículas en brazos, alineamos más fuertemente con la estructura espiral
      if (isInArm) {
        // Alineamiento fuerte con brazos espirales
        const branchAngle = (i % branches) / branches * Math.PI * 2;
        // componente logarítmica para efecto espiral más definido
        const spiralComponent = 0.2 * Math.log(particleRadius + 1.0);
        // Offset principal alineado al brazo + pequeña variación
        offsets[i] = branchAngle + spiralComponent + baseOffset * 0.2;
      } else {
        // Para partículas fuera de los brazos, aún mantenemos cierta coherencia
        // Esto crea "corrientes" de partículas entre los brazos principales
        const sectorOffset = Math.floor(angularSector * 12) / 12 * Math.PI * 2;
        offsets[i] = sectorOffset + baseOffset * 0.6;
      }
    }
    
    return {
      positions,
      colors,
      sizes,
      alphas,
      speeds,
      offsets
    };
  }, [count, branches, spin, randomness, randomnessPower, insideColor, outsideColor, radius]);

  // Referencia para la rotación global de la galaxia
  const groupRef = useRef<THREE.Group>(null);
  
  // Actualización de la animación de la galaxia
  useFrame(({ clock }) => {
    // Actualizar tiempo para el shader (movimiento espiral interno)
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    
    // Rotación global de toda la galaxia
    if (groupRef.current) {
      // Velocidad de rotación más lenta que la espiral interna
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  // Responsive sizing
  const responsiveSize = Math.min(viewport.width, viewport.height) * 0.0075;

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-alpha"
          args={[particles.alphas, 1]}
        />
        <bufferAttribute
          attach="attributes-speed"
          args={[particles.speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-offset"
          args={[particles.offsets, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        blending={AdditiveBlending}
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uSize: { value: responsiveSize },
          branches: { value: branches }
        }}
        transparent={true}
      />
    </points>
    </group>
  );
};

// Componente principal del efecto de partículas
const ParticleEffect: React.FC = () => {
  return (
    <>
    {/* dos capas de partículas para mayor profundidad */}
      <GalaxyParticles
        count={10000}
        radius={12}
        branches={3} /* número de brazos */
        spin={0.3} /* espiral */
        randomness={1.5} /*randomness para máxima dispersión */
        randomnessPower={1.8} /* Potencia baja para dispersión más uniforme */
        insideColor="#FFC107" /* Color dorado cálido para el centro */
        outsideColor="#4B70B8" /* Azul */
      />
      <GalaxyParticles
        count={5000}
        radius={15}
        branches={2} /*  estructura */
        spin={-0.2}
        randomness={1.8} /*  randomness para dispersión */
        randomnessPower={1.5} /* Potencia muy baja para máxima dispersión */
        insideColor="#F5D0A9" /*  melocotón suave para el centro  */
        outsideColor="#1B3984" /* Azul oscuro para los bordes */
      />
    </>
  );
};

export default ParticleEffect;