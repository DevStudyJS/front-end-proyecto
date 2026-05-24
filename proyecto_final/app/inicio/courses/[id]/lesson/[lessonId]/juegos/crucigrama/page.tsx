import CrucigramaGame from '@/app/components/juegos/Crucigrama'
import Link from 'next/link'
import styles from './page.module.css'

export default async function CrucigramaRoute({ 
  params 
}: { 
  params: Promise<{ id: string; lessonId: string }> 
}) {
  const { id, lessonId } = await params
  const baseRoute = `/inicio/courses/${id}/lesson/${lessonId}`

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerBar}>
        <div>
          <p className={styles.label}>Curso {id} · Lección {lessonId}</p>
          <h1 className={styles.title}>Crucigrama</h1>
        </div>
        <Link href={`${baseRoute}/juegos`} className={styles.backLink}>
          ← Volver a selección
        </Link>
      </div>
      <div className={styles.gameArea}>
        <CrucigramaGame courseId={id} lessonId={Number(lessonId)} />
      </div>
    </div>
  )
}