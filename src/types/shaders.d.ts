// Tipos globales para archivos shader
declare module '*.glsl' {
  const content: string;
  export default content;
}

declare module '*.vert' {
  const content: string;
  export default content;
}

declare module '*.frag' {
  const content: string;
  export default content;
}

// Declaraciones para React Three Fiber
import { Object3DNode } from '@react-three/fiber';
import { AuroraShaderMaterial } from '../components/about/shaders/AuroraShaderMaterial';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      auroraShaderMaterial: Object3DNode<AuroraShaderMaterial, typeof AuroraShaderMaterial>;
    }
  }
}

declare module '*.frag' {
  const content: string;
  export default content;
}

// Extensión del namespace JSX para elementos R3F personalizados
declare global {
  namespace JSX {
    interface IntrinsicElements {
      auroraShaderMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.Ref<unknown>;
      };
    }
  }
}