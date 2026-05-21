import { StepItem } from '@/lib/landing.types';
import styles from './HowItWorks.module.css';

interface HowItWorksProps {
  title: string;
  subtitle: string;
  items: StepItem[];
}

// Emojis como alternativa a RemixIcon (sin dependencias externas)
const stepEmojis = ['user-6-fill', 'treasure-map-line', 'book-ai-line', 'trophy-line'];

export const HowItWorks = ({ title, subtitle, items }: HowItWorksProps) => {
  return (
    <section className={styles.section} id="how-it-works" aria-labelledby="how-it-works-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="how-it-works-title" className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.grid}>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <StepCard 
                key={`${item.title}-${index}`}
                item={item}
                index={index}
              />
            ))
          ) : (
            <p className={styles.emptyState}>No hay pasos disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ item, index }: { item: StepItem; index: number }) => {
  return (
    <article className={styles.card}>
      {/* Número del paso (decorativo, accesible vía aria) */}
      <div className={styles.stepNumber} aria-hidden="true">
        {item.step}
      </div>

      {/* Icono con emoji o SVG */}
      <div className={styles.iconWrapper}>
        <i className={`${styles.icon}  ri-${stepEmojis[index % stepEmojis.length]}`} aria-hidden="true"></i>

      </div>

      {/* Título */}
      <h3 className={styles.cardTitle}>{item.title}</h3>

      {/* Descripción */}
      <p className={styles.cardDescription}>{item.desc}</p>
    </article>
  );
};