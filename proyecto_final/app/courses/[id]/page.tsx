import Link from 'next/link'
import styles from './page.module.css'

interface CourseSelectionPageProps {
  params: { id: string }
}

export default async function CourseSelectionPage({ params }: CourseSelectionPageProps) {
  const courseId = params.id

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.overline}>Algebra</p>
          <h1 className={styles.title}>¿Que camino quieres elegir?</h1>
          <p className={styles.subtitle}>
            Elige si quieres revisar el contenido de la isla o saltar directo al juego.
          </p>
        </div>

        <div className={styles.buttonRow}>
          <Link href={`/courses/${courseId}/content`} className={`${styles.button} ${styles.contentButton}`}>
            Contenido
          </Link>
          <Link href={`/courses/${courseId}/lesson/1/juegos`} className={`${styles.button} ${styles.gameButton}`}>
            Juegos
          </Link>
        </div>
      </div>
    </div>
  )
}
