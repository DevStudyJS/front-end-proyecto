'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import styles from './CTA.module.css';

interface CTAProps {
  title: string;
  subtitle: string;
  btnPrimary: string;
  btnSecondary: string;
  badges: string[];
}

export const CTA = ({ title, subtitle, btnPrimary, btnSecondary, badges }: CTAProps) => {
  const ctaRef = useRef<HTMLElement>(null);

  // Efecto de confeti al hacer hover (gamificación visual)
  const createConfetti = useCallback((x: number, y: number) => {
    const confetti = document.createElement('span');
    confetti.className = styles.confetti;
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
    
    ctaRef.current?.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 2000);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (Math.random() > 0.7) { // 30% de probabilidad para no saturar
      createConfetti(e.clientX, e.clientY);
    }
  }, [createConfetti]);

  // Efecto de entrada al cargar
  useEffect(() => {
    const ctaElement = ctaRef.current;
    if (ctaElement) {
      ctaElement.classList.add('loaded');
    }
  }, []);

  return (
    <section 
      ref={ctaRef}
      className={styles.cta}
      onMouseMove={handleMouseMove}
      aria-label="Llamado a la acción"
    >
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        
        <div className={styles.buttonsContainer}>
          <Link href="/index/login" className={`${styles.btn} ${styles.btnPrimary}`} aria-label={btnPrimary}>
            <span className={styles.icon} aria-hidden="true">🚀</span>
            {btnPrimary}
          </Link>
          <a href="#contacto" className={`${styles.btn} ${styles.btnSecondary}`} aria-label={btnSecondary}>
            <span className={styles.icon} aria-hidden="true">✈️</span>
            {btnSecondary}
          </a>
        </div>

        <div className={styles.badgesContainer}>
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className={styles.badge}
              style={{ '--badge-index': idx } as React.CSSProperties}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};