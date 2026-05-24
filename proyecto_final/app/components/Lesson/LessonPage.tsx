// app/courses/[id]/lessons/page.tsx
import { createClient } from '@/lib/supabase/client' 
import styles from './Lesson.module.css'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import Link from 'next/link'

const supabase = createClient();
// =========================================
// SISTEMA DE GAMIFICACIÓN
// =========================================

interface Quest {
  id: number
  title: string
  description: string
  xp: number
  completed: boolean
  locked: boolean
  type: 'theory' | 'practice' | 'boss'
}

interface Achievement {
  id: number
  name: string
  icon: string
  unlocked: boolean
  description: string
}

// Misiones para la Unidad 1
const unit1Quests: Quest[] = [
  {
    id: 1,
    title: "🎯 El Despertar de los Enteros",
    description: "Domina las operaciones básicas con números enteros. Suma, resta, multiplicación y división en el reino de los positivos y negativos.",
    xp: 100,
    completed: false,
    locked: false,
    type: 'theory'
  },
  {
    id: 2,
    title: "⚔️ Batalla de Problemas",
    description: "Resuelve 5 problemas del mundo real usando operaciones básicas. ¡Demuestra tu poder!",
    xp: 150,
    completed: false,
    locked: false,
    type: 'practice'
  },
  {
    id: 3,
    title: "🔮 El Secreto de las Fracciones",
    description: "Descubre las relaciones de proporcionalidad. Aprende a comparar y convertir fracciones como un mago.",
    xp: 120,
    completed: false,
    locked: true,
    type: 'theory'
  },
  {
    id: 4,
    title: "🌊 Operaciones Decimales",
    description: "Navega por las operaciones con números fraccionarios y decimales. ¡Suma, resta, multiplica y divide!",
    xp: 150,
    completed: false,
    locked: true,
    type: 'theory'
  },
  {
    id: 5,
    title: "💰 Maestro de Porcentajes",
    description: "Conviértete en experto en porcentajes. Descuentos, aumentos y más en situaciones cotidianas.",
    xp: 130,
    completed: false,
    locked: true,
    type: 'practice'
  },
  {
    id: 6,
    title: "⚡ Poderes y Raíces",
    description: "Domina la potenciación y radicación. Eleva números al poder y extrae raíces como un ninja matemático.",
    xp: 140,
    completed: false,
    locked: true,
    type: 'theory'
  },
  {
    id: 7,
    title: "👑 JEFE FINAL: El Gran Desafío",
    description: "Resuelve problemas complejos combinando todo lo aprendido. ¡Derrota al boss final!",
    xp: 300,
    completed: false,
    locked: true,
    type: 'boss'
  }
]

const achievements: Achievement[] = [
  { id: 1, name: "Primeros Pasos", icon: "🌟", unlocked: true, description: "Completa tu primera lección" },
  { id: 2, name: "Cazador de Enteros", icon: "🎯", unlocked: false, description: "Resuelve 10 problemas con enteros" },
  { id: 3, name: "Fracción Perfecta", icon: "🔮", unlocked: false, description: "Domina las fracciones equivalentes" },
  { id: 4, name: "Porcentaje Pro", icon: "💯", unlocked: false, description: "Acierta 5 porcentajes seguidos" },
  { id: 5, name: "Matemático Legendario", icon: "🏆", unlocked: false, description: "Completa la unidad con 100%" },
]

export default async function LessonsPage({ params }: { params: Promise<{ id: string }> }) {
  const parametrosListos = await params
  const cursoId = parseInt(parametrosListos.id)

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('course_id', cursoId)
    .single()

  const totalXP = unit1Quests.reduce((sum, quest) => sum + quest.xp, 0)
  const completedXP = unit1Quests.filter(q => q.completed).reduce((sum, quest) => sum + quest.xp, 0)
  const progress = Math.round((completedXP / totalXP) * 100)

  return (
    <div className={styles.pageWrapper}>
      {/* BARRA DE PROGRESO SUPERIOR */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        <span className={styles.progressText}>Nivel de Poder: {progress}%</span>
      </div>

      <div className={styles.container}>
        {/* PANEL IZQUIERDO - ESTADÍSTICAS */}
        <aside className={styles.statsPanel}>
          <div className={styles.playerCard}>
            <div className={styles.avatar}>🧙♂️</div>
            <h2 className={styles.playerName}>Aprendiz</h2>
            <div className={styles.xpBadge}>
              <span className={styles.xpIcon}>⭐</span>
              <span>{completedXP} / {totalXP} XP</span>
            </div>
          </div>

          <div className={styles.achievementsSection}>
            <h3 className={styles.sectionTitle}>🏆 Logros</h3>
            <div className={styles.achievementsGrid}>
              {achievements.map(ach => (
                <div 
                  key={ach.id} 
                  className={`${styles.achievement} ${ach.unlocked ? styles.unlocked : styles.locked}`}
                >
                  <span className={styles.achievementIcon}>{ach.icon}</span>
                  <span className={styles.achievementName}>{ach.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href={`/courses/${cursoId}`} className={styles.backButton}>
            ← Volver a la Isla
          </Link>
        </aside>

        {/* CONTENIDO PRINCIPAL - QUESTS */}
        <main className={styles.mainContent}>
          <header className={styles.header}>
            <h1 className={styles.title}>{course?.title || 'Unidad 1'}</h1>
            <p className={styles.subtitle}>
              Completa las misiones para desbloquear nuevos poderes matemáticos
            </p>
          <Link href={`/courses/${cursoId}/lesson/${unit1Quests[0].id}/juegos`} className={styles.gameSelector}>
            🎮 Ir a juegos de esta lección
          </Link>
        </header>

          <div className={styles.questList}>
            {unit1Quests.map((quest, index) => (
              <div
                key={quest.id}
                className={`
                  ${styles.questCard}
                  ${quest.completed ? styles.completed : ''}
                  ${quest.locked ? styles.locked : ''}
                  ${quest.type === 'boss' ? styles.bossQuest : ''}
                `}
              >
                <div className={styles.questHeader}>
                  <div className={styles.questNumber}>{index + 1}</div>
                  <div className={styles.questInfo}>
                    <h3 className={styles.questTitle}>{quest.title}</h3>
                    <p className={styles.questDesc}>{quest.description}</p>
                  </div>
                  <div className={styles.questReward}>
                    <span className={styles.xpValue}>+{quest.xp} XP</span>
                    <span className={styles.questType}>
                      {quest.type === 'theory' && '📚 Teoría'}
                      {quest.type === 'practice' && '⚔️ Práctica'}
                      {quest.type === 'boss' && '👑 Boss'}
                    </span>
                  </div>
                </div>

                {!quest.locked && (
                  <Link
                    href={`/courses/${cursoId}/lesson/${quest.id}`}
                    className={styles.startButton}
                  >
                    {quest.completed ? '✓ Completado' : '▶ Iniciar Misión'}
                  </Link>
                )}

                {quest.locked && (
                  <div className={styles.lockedOverlay}>
                    <span>🔒 Completa la misión anterior</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* PANEL DERECHO - CONTENIDO RÁPIDO */}
        <aside className={styles.sidePanel}>
          <div className={styles.quickReference}>
            <h3 className={styles.sideTitle}>📖 Fórmulas ÉpicAS</h3>
            
            <div className={styles.formulaCard}>
              <h4>Números Enteros</h4>
              <BlockMath math="(-a) + (-b) = -(a + b)" />
              <BlockMath math="(-a) \\times (-b) = ab" />
            </div>

            <div className={styles.formulaCard}>
              <h4>Fracciones</h4>
              <BlockMath math="\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}" />
              <BlockMath math="\frac{a}{b} \\times \frac{c}{d} = \frac{ac}{bd}" />
            </div>

            <div className={styles.formulaCard}>
              <h4>Porcentajes</h4>
              <BlockMath math="\% = \frac{parte}{total} \\times 100" />
              <BlockMath math="descuento = precio \\times \frac{descuento\\%}{100}" />
            </div>

            <div className={styles.formulaCard}>
              <h4>Potencias</h4>
              <BlockMath math="a^n \\times a^m = a^{n+m}" />
              <BlockMath math="(a^n)^m = a^{n \\times m}" />
            </div>
          </div>

          <div className={styles.tipBox}>
            <h4>💡 Tip del Día</h4>
            <p>
              Los números negativos son como deudas: 
              si debes $5 y gastas $3 más, ahora debes $8. 
              ¡<InlineMath math="-5 + (-3) = -8" />!
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}