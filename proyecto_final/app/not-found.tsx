import React from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';


export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.emoji}>🔍</div>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>¡Ups! Página no encontrada</h2>
        <p className={styles.description}>
          Parece que te perdiste en el camino.
          La página que buscas no existe, fue movida o simplemente se tomó un descanso.
          ¡No te preocupes, volvamos a casa!
        </p>
        <Link href="/" className={styles.button}>
          ✨ Volver al inicio
        </Link>
      </div>
    </div>
  )
}

