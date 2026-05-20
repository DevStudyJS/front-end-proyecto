// lib/api.ts
import landingData from './landing.json';
import type { LandingContent } from '@/lib/landing.types';

export const api = {
  async getLandingContent(): Promise<LandingContent> {
    // Simula un delay mínimo solo si quieres emular latencia de red (opcional)
    // await new Promise((res) => setTimeout(res, 200));
    
    if (!landingData) throw new Error('El archivo landing.json está vacío o no se pudo leer.');
    return landingData as LandingContent;
  },
};