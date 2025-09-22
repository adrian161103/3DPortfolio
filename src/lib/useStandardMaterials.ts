import * as THREE from "three";

/**
 * Convierte materiales de un Object3D a MeshStandardMaterial,
 * preservando texturas y propiedades físicas.
 */
export function useStandardMaterials(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const oldMat = child.material as THREE.MeshStandardMaterial;

      child.material = new THREE.MeshStandardMaterial({
        // Color base
        color: oldMat?.color ? oldMat.color.clone() : new THREE.Color(0xffffff),

        // Mapas
        map: oldMat?.map ?? null,
        normalMap: (oldMat as any)?.normalMap ?? null,
        roughnessMap: (oldMat as any)?.roughnessMap ?? null,
        metalnessMap: (oldMat as any)?.metalnessMap ?? null,
        aoMap: (oldMat as any)?.aoMap ?? null,
        emissiveMap: (oldMat as any)?.emissiveMap ?? null,

        // Valores físicos
        roughness: oldMat?.roughness ?? 0.6,
        metalness: oldMat?.metalness ?? 0.1,
        emissive: (oldMat as any)?.emissive
          ? (oldMat as any).emissive.clone()
          : new THREE.Color(0x000000),
        emissiveIntensity: (oldMat as any)?.emissiveIntensity ?? 1.0,

        // Transparencia
        transparent: oldMat?.transparent ?? false,
        opacity: oldMat?.opacity ?? 1.0,

        // Renderizado
        side: oldMat?.side ?? THREE.FrontSide,
      });

      child.material.needsUpdate = true;
    }
  });
}
