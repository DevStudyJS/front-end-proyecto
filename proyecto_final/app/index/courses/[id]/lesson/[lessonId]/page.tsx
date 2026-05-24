import Link from 'next/link'
import styles from './page.module.css'

interface LessonRouteProps {
  params: Promise<{
    id: string
    lessonId: string
  }>
}

export default async function LessonRoute({ params }: LessonRouteProps) {
  const { id, lessonId } = await params
  const baseRoute = `/index/courses/${id}`
  console.log("HERE")

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.breadcrumbs}>
          <span>Curso {id}</span>
          <span>Lección {lessonId}</span>
        </div>

        <div className={styles.mainContent}>
          <h1 className={styles.title}>Lección {lessonId}</h1>
          <p className={styles.description}>
            Estás dentro de la lección {lessonId} del curso {id}. Aquí puedes revisar el contenido o jugar para practicar.
          </p>
          <div className={styles.actions}>
            <Link href={`${baseRoute}/lesson/${lessonId}/juegos`} className={styles.primaryButton}>
              Ir a juegos
            </Link>
            <Link href={baseRoute} className={styles.secondaryButton}>
              Volver al curso
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
