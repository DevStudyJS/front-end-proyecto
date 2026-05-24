import Link from 'next/link'
import styles from './page.module.css'

export default async function GameChooserPage({ 
  params 
}: { 
  params: Promise<{ id: string; lessonId: string }> 
}) {
  const { id, lessonId } = await params
  const baseRoute = `/inicio/courses/${id}/lesson/${lessonId}`

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
          <Link href={`${baseRoute}/juegos/crucigrama`} className={`${styles.button} ${styles.crucigrama}`}>
            Crucigrama
          </Link>
          {/*<Link href={`${baseRoute}/juegos/memorama`} className={`${styles.button} ${styles.memorama}`}>
            Memorama
          </Link>*/}
        </div>
      </div>
    </div>
  )
}