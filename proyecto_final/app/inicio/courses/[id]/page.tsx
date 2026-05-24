import Link from 'next/link'
import styles from './page.module.css'

interface CourseSelectionPageProps {
  params: { id: string }
}

export default async function CourseSelectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  //console.log('📍 ID del curso actual:', id)
  const baseRoute = `/inicio/courses/${id}`

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
          <Link href={`${baseRoute}/content`} className={`${styles.button} ${styles.contentButton}`}>
            Contenido
          </Link>
          <Link href={`${baseRoute}/lesson/1/juegos`} className={`${styles.button} ${styles.gameButton}`}>
            Juegos
          </Link>
        </div>
      </div>
    </div>
  )
}
