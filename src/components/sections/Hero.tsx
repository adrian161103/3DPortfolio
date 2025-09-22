import { useEffect } from 'react';
import MainScene from '../3d/MainScene';
import { useGsapTimeline } from '@/hooks/useGsapTimeline';
import FullscreenView from '../ui/FullscreenView';

export default function Hero() {
  const timeline = useGsapTimeline();

  useEffect(() => {
    // Animación de entrada
    timeline
      .fromTo(
        '#hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      )
      .from(
        '#scroll-indicator',
        { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

    // Animación de scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      
      timeline.to('#hero-title', {
        opacity: 1 - progress,
        y: progress * 50,
        duration: 0,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [timeline]);

  return (
    <FullscreenView>
      <MainScene />
    </FullscreenView>
  );
}