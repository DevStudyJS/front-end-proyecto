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

  const closeMobileMenu = () => {
    const checkbox = document.getElementById('nav-toggle') as HTMLInputElement | null;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <nav 
      className={styles.navbar}
      role="navigation"
      aria-label="Navegación principal"
    >
      {/* 
        Checkbox hack: debe ser HERMANO DIRECTO de .navbarInner y .mobileMenu 
        para que los selectores ~ del CSS funcionen.
      */}
      <input 
        type="checkbox" 
        id="nav-toggle" 
        className={styles.toggleCheckbox} 
        aria-hidden="true"
      />
      
      <div className={styles.container}>
        <div className={styles.navbarInner}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Ir al inicio">
            <div className={styles.logoIcon} aria-hidden="true">🌱</div>
            <span className={styles.logoText}>DevStudy</span>
          </Link>

          {/* Botón Hamburguesa (Label que activa el checkbox) */}
          <label 
            htmlFor="nav-toggle" 
            className={styles.hamburger} 
            aria-label="Abrir menú de navegación"
            aria-expanded="false"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </label>

          {/* Navegación Desktop */}
          <ul className={styles.desktopNav}>
            {navLinks.map((link) => (
              <li key={`desktop-${link.name}`} className={styles.navItem}>
                <a 
                  href={link.href} 
                  className={styles.navLink}
                  onClick={(e) => handleNavClick?.(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className={styles.navItem}>
              <div className={styles.authContainer}>
                <Link href="/login" className={styles.loginButton} aria-label="Iniciar sesión">
                  Iniciar Sesión
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Menú Móvil (se muestra/oculta vía CSS checkbox hack) */}
      <div className={styles.mobileMenu}>
        <ul className={styles.mobileMenuList}>
          {navLinks.map((link) => (
            <li key={`mobile-${link.name}`}>
              <a 
                href={link.href} 
                className={styles.mobileLink}
                onClick={(e) => {
                  handleNavClick?.(e, link.href);
                  closeMobileMenu(); // Cierra el menú automáticamente
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileAuth}>
          <Link href="/login" className={styles.loginButton} aria-label="Iniciar sesión en móvil">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};