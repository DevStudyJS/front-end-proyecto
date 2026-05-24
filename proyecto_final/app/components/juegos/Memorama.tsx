"use client"

import { useEffect, useState } from "react"
import { muestraMemorama, pares } from "@/lib/cartasService"
import { Card } from "@/lib/types"

interface MemoramaGameProps {
  courseId: string
  lessonId: number
}

export default function MemoramaGame({ courseId, lessonId }: MemoramaGameProps) {
  const [cartas, setCartas] = useState<Card[]>([])
  const [volteadas, setVolteadas] = useState<number[]>([])
  const [acertadas, setAcertadas] = useState<number[]>([])

  useEffect(() => {
    const cargarCartas = async () => {
      const data = await muestraMemorama(lessonId) // ✅ Usa lessonId dinámico
      setCartas(data.sort(() => Math.random() - 0.5))
    }
    cargarCartas()
  }, [lessonId])

  const handleFlip = (carta: Card) => {
    if (volteadas.length === 2 || acertadas.includes(carta.id) || volteadas.includes(carta.id)) return

    const nuevasVolteadas = [...volteadas, carta.id]
    setVolteadas(nuevasVolteadas)

    if (nuevasVolteadas.length === 2) {
      const [primeraId, segundaId] = nuevasVolteadas
      const primera = cartas.find(c => c.id === primeraId)!
      const segunda = cartas.find(c => c.id === segundaId)!

      if (primera.respuesta === segunda.respuesta) {
        pares(primera.id, segunda.id)
        setAcertadas(prev => [...prev, primeraId, segundaId])
        setVolteadas([])
      } else {
        setTimeout(() => setVolteadas([]), 1000)
      }
    }
  }

  return (
    <div className="memorama-grid">
      {cartas.map((carta) => (
        <div
          key={carta.id}
          className={`carta ${acertadas.includes(carta.id) ? "match" : volteadas.includes(carta.id) ? "flip" : ""}`}
          onClick={() => handleFlip(carta)}
        >
          {acertadas.includes(carta.id) || volteadas.includes(carta.id) ? (
            <div className="carta-contenido">
              <p className="pregunta">{carta.pregunta}</p>
              <p className="respuesta">{carta.respuesta}</p>
            </div>
          ) : (
            <span className="verso">🔍</span>
          )}
        </div>
      ))}
    </div>
  )
}