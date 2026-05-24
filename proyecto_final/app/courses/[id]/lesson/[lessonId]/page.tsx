import Link from 'next/link'
import styles from './page.module.css'

interface LessonRouteProps {
  params: {
    id: string
    lessonId: string
  }
}

export default function LessonRoute({ params }: LessonRouteProps) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.breadcrumbs}>
          <span>Curso {params.id}</span>
          <span>Lección {params.lessonId}</span>
        </div>

        <div className={styles.mainContent}>
          <h1 className={styles.title}>Lección {params.lessonId}</h1>
          <p className={styles.description}>
            Estás dentro de la lección {params.lessonId} del curso {params.id}. Aquí puedes revisar el contenido o jugar para practicar.
          </p>
          <div className={styles.actions}>
            <Link href={`/courses/${params.id}/lesson/${params.lessonId}/juegos`} className={styles.primaryButton}>
              Ir a juegos
            </Link>
            <Link href={`/courses/${params.id}`} className={styles.secondaryButton}>
              Volver al curso
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
