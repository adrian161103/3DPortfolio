import { useEffect, useCallback } from 'react';
import { useScroll as useR3FScroll } from '@react-three/drei';

export function useScroll(onChange?: (progress: number) => void) {
  const scroll = useR3FScroll();
  
  const handleScroll = useCallback(
    (e: any) => {
      const progress = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
      onChange?.(progress);
    },
    [onChange]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scroll;
}