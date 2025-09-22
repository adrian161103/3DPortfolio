import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export function useGsapTimeline() {
  const timeline = gsap.timeline();

  useEffect(() => {
    return () => {
      timeline.kill();
    };
  }, [timeline]);

  return timeline;
}