import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Características', href: '/#features' },
    { name: 'Cómo Funciona', href: '/#how-it-works' },
    { name: 'Testimonios', href: '/#testimonials' },
    { name: 'Iniciar Sesión', href: '/login' },
  ];

  const legalLinks = [
    { name: 'Privacidad', href: '/privacidad' },
    { name: 'Términos', href: '/terminos' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Sección Principal */}
        <div className={styles.mainSection}>
          
          {/* Columna 1: Logo y Descripción */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.brand} aria-label="Ir al inicio">
              <div className={`${styles.logoIcon} pulse`} aria-hidden="true">🌱</div>
              <span className={styles.logoText}>DevStudy</span>
            </Link>

            <p className={styles.description}>
              Plataforma de gamificación educativa desarrollada por estudiantes de 
              Matemáticas Aplicadas y Computación de la UNAM para preparar a alumnos 
              de secundaria para el ingreso al bachillerato.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Enlaces Rápidos</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.name} className={styles.linkItem}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <ul className={styles.linksList}>
              <li className={styles.contactItem}>
                <i className={`ri-map-pin-3-fill`} aria-hidden="true"></i>
                <span>FES Acatlán, UNAM, México</span>
              </li>
              <li className={styles.contactItem}>
                <i className={`ri-mail-fill`} aria-hidden="true"></i>
                <a href="mailto:devstudy@gmail.com" className={styles.contactLink}>
                  devstudy@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes/Extra (opcional para gamificación) */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Comunidad</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="https://github.com/DevStudyJS" className={styles.footerLink}>GitHub</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Línea Divisoria */}
        <div className={styles.divider}>
          <div className={styles.dividerContent}>
            
            {/* Copyright */}
            <p className={styles.copyright}>
              &copy; {currentYear} DevStudy. Todos los derechos reservados.
            </p>

            {/* Links Legales */}
            <div className={styles.legalLinks}>
              {legalLinks.map((link) => (
                <Link key={link.name} href={link.href} className={styles.legalLink}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};