import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

export function useCursor(onHover = true) {
  const [hovered, setHovered] = useState(false);
  useThree();

  useEffect(() => {
    if (onHover) {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }
  }, [hovered, onHover]);

  return [hovered, setHovered] as const;
}