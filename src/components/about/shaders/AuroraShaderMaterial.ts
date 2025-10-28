import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import auroraVertexShader from './auroraVertex.glsl?raw';
import auroraFragmentShader from './auroraFragment.glsl?raw';

export class AuroraShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uIntensity: { value: 0.8 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uPalette: {
        value: [
          new THREE.Vector3(0.055, 0.941, 0.710), // #0EF0B5 - Bright cyan-green
          new THREE.Vector3(0.208, 0.839, 0.643), // #35D6A4 - Teal-green
          new THREE.Vector3(0.039, 0.698, 0.478), // #0AB27A - Deep green
          new THREE.Vector3(0.494, 0.839, 0.788), // #7ED6C9 - Light cyan
        ]
      }
    };

    super({
      uniforms,
      vertexShader: auroraVertexShader,
      fragmentShader: auroraFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }

  set time(value: number) {
    this.uniforms.uTime.value = value;
  }

  get time() {
    return this.uniforms.uTime.value;
  }

  set scroll(value: number) {
    this.uniforms.uScroll.value = value;
  }

  get scroll() {
    return this.uniforms.uScroll.value;
  }

  set intensity(value: number) {
    this.uniforms.uIntensity.value = value;
  }

  get intensity() {
    return this.uniforms.uIntensity.value;
  }

  set mouse(value: THREE.Vector2) {
    this.uniforms.uMouse.value = value;
  }

  get mouse() {
    return this.uniforms.uMouse.value;
  }

  set resolution(value: THREE.Vector2) {
    this.uniforms.uResolution.value = value;
  }

  get resolution() {
    return this.uniforms.uResolution.value;
  }

  updateMouse(x: number, y: number) {
    this.uniforms.uMouse.value.set(x, y);
  }

  updateResolution(width: number, height: number) {
    this.uniforms.uResolution.value.set(width, height);
  }
}

extend({ AuroraShaderMaterial });