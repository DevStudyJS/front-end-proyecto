import Memorama from '@/app/components/juegos/Memorama'
import Link from 'next/link'
import styles from './page.module.css'

interface MemoramaRouteProps {
  params: {
    id: string
    lessonId: string
  }
}

export default function MemoramaGamePage({ params }: MemoramaRouteProps) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerBar}>
        <div>
          <p className={styles.label}>Curso {params.id} · Lección {params.lessonId}</p>
          <h1 className={styles.title}>Memorama</h1>
        </div>
        <Link href={`/courses/${params.id}/lesson/${params.lessonId}/juegos`} className={styles.backLink}>
          ← Volver a selección
        </Link>
      </div>
      <div className={styles.gameArea}>
        <Memorama />
      </div>
    </div>
  )
}
