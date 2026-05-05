import React from 'react';
import Link from 'next/link';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Página no encontrada</h2>
        <p className={styles.description}>
          Lo sentimos, la página que estás buscando no existe, fue eliminada o cambió de dirección.
        </p>
        <Link href="/" className={styles.button}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};
