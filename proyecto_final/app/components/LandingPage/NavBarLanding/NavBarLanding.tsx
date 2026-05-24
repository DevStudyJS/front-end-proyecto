import { useCallback } from 'react';
import Link from 'next/link';
import styles from './NavBarLanding.module.css';

export const Navbar = () => {
  const navLinks = [
    { name: 'Características', href: '#features' },
    { name: 'Cómo Funciona', href: '#how-it-works' },
    { name: 'Testimonios', href: '#testimonials' },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <nav 
      className={styles.navbar}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className={styles.container}>
        <div className={styles.navbarInner}>
          
          {/* Logo con animación */}
          <Link href="/" className={styles.logoLink} aria-label="Ir al inicio">
            <div className={styles.logoIcon} aria-hidden="true">🌱</div>
            <span className={styles.logoText}>DevStudy</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.desktopNav}>
            {navLinks.map((link) => (
              <li key={link.name} className={styles.navItem}>
                <a 
                  href={link.href} 
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            
            {/* Auth Section */}
            <li className={styles.navItem}>
              <div className={styles.authContainer}>
                <Link 
                  href="/index/login" 
                  className={styles.loginButton}
                  aria-label="Iniciar sesión"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};