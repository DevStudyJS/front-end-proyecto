import Memorama from '@/app/components/juegos/Memorama'
import Link from 'next/link'
import styles from './page.module.css'

export default async function MemoramaGamePage({ 
  params 
}: { 
  params: Promise<{ id: string; lessonId: string }> 
}) {
  const { id, lessonId } = await params
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerBar}>
        <div>
          <p className={styles.label}>Curso {id} · Lección {lessonId}</p>
          <h1 className={styles.title}>Memorama</h1>
        </div>
        <Link href={`/courses/${id}/lesson/${lessonId}/juegos`} className={styles.backLink}>
          ← Volver a selección
        </Link>
      </div>
      <div className={styles.gameArea}>
        <Memorama />
      </div>
    </div>
  )
}
