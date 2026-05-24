import Link from 'next/link'
import styles from './page.module.css'

interface GameChooserRouteProps {
  params: {
    id: string
    lessonId: string
  }
}

export default function GameChooserPage({ params }: GameChooserRouteProps) {
  const { id, lessonId } = params

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.breadcrumbs}>
          <span>Curso {id}</span>
          <span>Lección {lessonId}</span>
          <span>Juegos</span>
        </div>

        <div className={styles.header}>
          <p className={styles.overline}>Selecciona tu desafío</p>
          <h1 className={styles.title}>¿Qué quieres jugar?</h1>
          <p className={styles.subtitle}>
            Escoge entre el crucigrama o el memorama para reforzar lo aprendido en esta lección.
          </p>
        </div>

        <div className={styles.buttonRow}>
          <Link href={`/courses/${id}/lesson/${lessonId}/juegos/crucigrama`} className={`${styles.button} ${styles.crucigrama}`}>
            Crucigrama
          </Link>
          <Link href={`/courses/${id}/lesson/${lessonId}/juegos/memorama`} className={`${styles.button} ${styles.memorama}`}>
            Memorama
          </Link>
        </div>
      </div>
    </div>
  )
}
