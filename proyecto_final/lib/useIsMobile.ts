"use client"
import { useState, useEffect } from 'react'

export const useIsMobile = (breakpoint: number = 768): boolean => {
  // ✅ Estado inicial SIEMPRE falso para evitar hydration mismatch
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const check = () => setIsMobile(window.innerWidth < breakpoint)
      check() // Ejecutar inmediatamente al montar
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }
  }, [breakpoint])

  return isMobile
}