import { useEffect, useState, useRef } from 'react';
import { Review } from '@/lib/landing.types';
import styles from './Testimonials.module.css';

interface TestimonialsProps {
  title: string;
  subtitle: string;
  reviews: Review[];
}

const CARD_WIDTH = 350 + 24; // 350px card + 24px gap (1.5rem)

export const Testimonials = ({ title, subtitle, reviews }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll infinito (comportamiento funcional, no visual)
  useEffect(() => {
    if (isPaused || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  // Scroll suave cuando cambia el índice
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * CARD_WIDTH,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // Duplicar testimonios para efecto infinito
  const extendedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className={styles.section} id="testimonials" aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="testimonials-title" className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        {/* Container con scroll */}
        <div 
          className={styles.carouselContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradientes laterales para efecto fade */}
          <div className={styles.fadeLeft} aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />

          {/* Track de testimonios */}
          <div ref={scrollRef} className={styles.track}>
            {extendedReviews.map((review, index) => (
              <TestimonialCard 
                key={`${index}-${review.name}`}
                review={review}
                index={index % reviews.length}
              />
            ))}
          </div>

          {/* Indicadores de navegación */}
          <div className={styles.indicators} role="tablist" aria-label="Seleccionar testimonio">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-controls={`testimonial-${index}`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ review, index }: { review: Review; index: number }) => {
  return (
    <article 
      className={`${styles.card} ${styles.featured}`}
      id={`testimonial-${index}`}
      role="tabpanel"
      aria-labelledby={`reviewer-${index}`}
    >
      {/* Avatar y Nombre */}
      <div className={styles.avatarSection}>
        <div className={styles.avatar} aria-hidden="true">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div className={styles.userInfo}>
          <h4 id={`reviewer-${index}`} className={styles.userName}>{review.name}</h4>
          <p className={styles.userRole}>{review.role}</p>
        </div>
      </div>

      {/* Estrellas */}
      <div className={styles.stars} aria-label={`Calificación: ${review.stars} de 5 estrellas`}>
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={styles.star}
            aria-hidden={i >= review.stars}
            style={{ opacity: i < review.stars ? 1 : 0.3 }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Texto del testimonio */}
      <p className={styles.testimonialText}>{review.text}</p>
    </article>
  );
};