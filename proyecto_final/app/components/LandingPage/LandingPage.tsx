'use client'
import { useState, useEffect } from 'react';
import { LandingContent } from '@/lib/landing.types';
import { api } from '@/lib/api';
import { Navbar } from '../LandingPage/NavBarLanding/NavBarLanding';
import { Hero } from '../LandingPage/Hero/Hero';
import { Features } from '../LandingPage/Features/Features';
import { HowItWorks } from '../LandingPage/HowItWorks/HowItWorks';
import { Testimonials } from '../LandingPage/Testimonials/Testimonials';
import { CTA } from '../LandingPage/CTA/CTA';
import { Footer } from '../Footer/Footer';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    api.getLandingContent()
      .then((data) => {
        if (isMounted) {
          setContent(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error loading landing content:', err);
          setError('No se pudo cargar el contenido. Por favor, intenta más tarde.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Estado de carga con spinner animado
  if (loading) {
    return (
      <div className={styles.loadingContainer} role="status" aria-live="polite">
        <div className={styles.loadingContent}>
          <div className={styles.spinner} aria-hidden="true" />
          <p className={styles.loadingText}>Cargando experiencia DevStudy...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || !content) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <p className={styles.loadingText} role="alert">
            {error || 'Contenido no disponible'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'opacity 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Renderizado principal de la landing page
  return (
    <main className={styles.page}>
      <Navbar />
      
      <Hero 
        courses={content.hero.courses} 
        lessons={content.hero.lessons} 
        students={content.hero.students}  
      />
      
      <Features 
        title={content.features.title} 
        subtitle={content.features.subtitle} 
        cards={content.features.cards} 
      />
      
      <HowItWorks 
        title={content.steps.title} 
        subtitle={content.steps.subtitle} 
        items={content.steps.items} 
      />
      
      <Testimonials 
        title={content.testimonials.title} 
        subtitle={content.testimonials.subtitle} 
        reviews={content.testimonials.reviews} 
      />
      
      <CTA 
        title={content.cta.title} 
        subtitle={content.cta.subtitle} 
        btnPrimary={content.cta.btnPrimary} 
        btnSecondary={content.cta.btnSecondary} 
        badges={content.cta.badges} 
      />
      
      <Footer />
    </main>
  );
};