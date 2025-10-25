precision highp float;

uniform float uTime;
uniform float uIntensity;
uniform float uScroll;
uniform vec3 uPalette[4];
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

// Hash function for better noise
float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0)); 
    float d = hash21(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// Domain warping for organic aurora movement
vec2 domainWarp(vec2 p) {
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0)),
                  fbm(p + vec2(5.2, 1.3)));
    
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)),
                  fbm(p + 4.0 * q + vec2(8.3, 2.8)));
    
    return p + 0.25 * vec2(fbm(p + 4.0 * r), fbm(p + 4.0 * r + vec2(8.3, 2.8)));
}

void main() {
    vec2 uv = vUv;
    
    // **FONDO NEGRO REAL** - Sin wash celeste
    vec3 backgroundColor = vec3(0.0, 0.0, 0.0);
    
    // Center coordinates
    vec2 center = uv - 0.5;
    
    // Mouse interaction - distorsión sutil
    vec2 mousePos = uMouse / uResolution;
    vec2 mouseDistance = uv - mousePos;
    float mouseDist = length(mouseDistance);
    float mouseEffect = exp(-mouseDist * 6.0) * 0.2;
    
    // Time-based movement orgánico y lento
    vec2 movement = vec2(uTime * 0.02, uTime * 0.015);
    
    // Domain warp para movimiento natural
    vec2 warpedPos = domainWarp(center * 2.2 + movement);
    
    // **BANDAS VERTICALES/DIAGONALES** - NO horizontales
    float angle = radians(20.0); // Diagonal
    vec2 rotated = vec2(
        warpedPos.x * cos(angle) - warpedPos.y * sin(angle),
        warpedPos.x * sin(angle) + warpedPos.y * cos(angle)
    );
    
    // Crear bandas verticales principales
    float bands1 = sin(rotated.x * 10.0 + fbm(warpedPos * 2.5) * 5.0 + uTime * 0.7);
    float bands2 = sin(rotated.x * 7.0 + fbm(warpedPos * 1.8) * 3.5 + uTime * 0.5);
    float bands3 = sin(rotated.x * 14.0 + fbm(warpedPos * 3.2) * 2.8 + uTime * 0.9);
    
    // Combinar bandas con diferentes intensidades
    float bandPattern = (bands1 * 0.6 + bands2 * 0.3 + bands3 * 0.1);
    bandPattern = (bandPattern + 1.0) * 0.5; // Normalizar 0-1
    
    // Aurora intensity con falloff natural
    float distanceFromCenter = length(center);
    float falloff = 1.0 - smoothstep(0.2, 0.7, distanceFromCenter);
    
    // Intensidad combinada
    float auroraIntensity = bandPattern * falloff * uIntensity;
    auroraIntensity += mouseEffect; // Efecto del mouse
    
    // Threshold para **CONTRASTE LOCAL ALTO**
    auroraIntensity = smoothstep(0.15, 0.85, auroraIntensity);
    
    // **CONTRASTE LOCAL** - Highlights cian/ámbar sobre sombras casi negras
    vec3 shadowColor = vec3(0.0, 0.08, 0.05);      // Sombras casi negras
    vec3 midColor = vec3(0.0, 0.4, 0.25);          // Verde medio
    vec3 brightCyan = vec3(0.15, 0.95, 0.75);      // Highlights cian
    vec3 warmAmber = vec3(0.9, 0.7, 0.15);         // Toques ámbar
    
    // Mapeo de colores con alto contraste
    vec3 auroraColor = backgroundColor;
    auroraColor = mix(auroraColor, shadowColor, auroraIntensity * 0.4);
    auroraColor = mix(auroraColor, midColor, auroraIntensity * 0.6);
    auroraColor = mix(auroraColor, brightCyan, pow(auroraIntensity, 1.5) * 0.8);
    
    // Toques de ámbar en zonas muy brillantes
    float amberMask = pow(auroraIntensity, 3.0);
    auroraColor = mix(auroraColor, warmAmber, amberMask * 0.15);
    
    // **GRANO FINO** - Solo un toque para textura
    float grain = noise(uv * 180.0 + uTime * 1.5) * 0.015;
    auroraColor += vec3(grain);
    
    // **VIGNETTE SUAVE** - No marco gris, fuerza reducida
    float vignette = 1.0 - pow(distanceFromCenter * 0.6, 6.0);
    vignette = max(0.9, vignette); // Fuerza muy reducida
    
    // Color final con vignette sutil
    vec3 finalColor = auroraColor * vignette;
    
    // Alpha que preserva fondo negro
    float alpha = auroraIntensity;
    
    gl_FragColor = vec4(finalColor, alpha);
}