"use client"

interface CrucigramaGameProps {
  courseId: string
  lessonId: number
}

export default function CrucigramaGame({ courseId, lessonId }: CrucigramaGameProps) {
  return (
    <div className="crucigrama-container">
      <div className="crucigrama-placeholder">
        <h2>🧩 Crucigrama en desarrollo</h2>
        <p>Curso: {courseId} | Lección: {lessonId}</p>
        <p>Aquí se renderizará la cuadrícula interactiva conectada a Supabase.</p>
      </div>
    </div>
  )
}