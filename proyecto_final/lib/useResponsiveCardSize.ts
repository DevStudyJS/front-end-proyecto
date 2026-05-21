// hooks/useResponsiveCardSize.ts
import { useState, useEffect } from 'react';

export type CardSize = {
  width: number;
  height: number;
  totalWidth: number; // width + gap (para scroll/carousel)
};

function calculateSize(): CardSize {
  if (typeof window === 'undefined') {
    return { width: 350, height: 400, totalWidth: 374 }; // fallback SSR
  }

  const vw = window.innerWidth;
  if (vw <= 480) return { width: 280, height: 340, totalWidth: 296 };
  if (vw <= 768) return { width: 320, height: 380, totalWidth: 344 };
  return { width: 350, height: 400, totalWidth: 374 };
}

export function useResponsiveCardSize(): CardSize {
  const [size, setSize] = useState<CardSize>(calculateSize);

  useEffect(() => {
    const handleResize = () => setSize(calculateSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}