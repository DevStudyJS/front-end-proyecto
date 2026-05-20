import { FeatureCard } from '@/lib/landing.types';
import styles from './Features.module.css';

interface FeaturesProps {
  title: string;
  subtitle: string;
  cards: FeatureCard[];
}

// Variantes de colores para íconos y bordes (se inyectan como CSS custom properties)
const colorVariants = [
  { gradient: 'linear-gradient(135deg, #fb923c, #f97316)', border: '#fb923c' },
  { gradient: 'linear-gradient(135deg, #f87171, #ef4444)', border: '#f87171' },
  { gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)', border: '#60a5fa' },
  { gradient: 'linear-gradient(135deg, #c084fc, #a855f7)', border: '#c084fc' },
  { gradient: 'linear-gradient(135deg, #4ade80, #22c55e)', border: '#4ade80' },
  { gradient: 'linear-gradient(135deg, #22d3ee, #06b6d4)', border: '#22d3ee' },
];

export const Features = ({ title, subtitle, cards }: FeaturesProps) => {
  return (
    <section className={styles.section} id="features" aria-labelledby="features-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="features-title" className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.grid}>
          {cards && cards.length > 0 ? (
            cards.map((card, index) => {
              const colors = colorVariants[index % colorVariants.length];
              return (
                <div
                  key={`${card.title}-${index}`}
                  className={styles.card}
                  style={{ 
                    '--icon-gradient': colors.gradient,
                    '--hover-border-color': colors.border,
                    animationDelay: `${0.3 + (index * 0.15)}s` 
                  } as React.CSSProperties}
                >
                  <div className={styles.iconWrapper}>
                    <i className={`ri-${card.icon}-line`} aria-hidden="true"></i>
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.desc}</p>
                </div>
              );
            })
          ) : (
            <p className={styles.emptyState}>No hay características disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
};