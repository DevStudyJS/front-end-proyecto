"use client"
import { useState, useCallback } from 'react'
import styles from './LoginForm.module.css'

export interface PlayerData {
  username: string
  avatar: string
  title: string
}

const PLAYERS_DB: Record<string, PlayerData> = {
  'astro_dev': { username: 'astro_dev', avatar: 'https://placehold.co/400x400/0f172a/06b6d4?text=🚀', title: 'Explorador Estelar' },
  'math_wizard': { username: 'math_wizard', avatar: 'https://placehold.co/400x400/0f172a/a855f7?text=🧙‍♂️', title: 'Mago Matemático' },
  'dev_student': { username: 'dev_student', avatar: 'https://placehold.co/400x400/0f172a/22c55e?text=👨‍💻', title: 'Aprendiz Dev' }
}

interface Props {
  onUsernameChange: (player: PlayerData | null) => void
}

export default function LoginForm({ onUsernameChange }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    setUsername(val)
    onUsernameChange(PLAYERS_DB[val] || null)
  }, [onUsernameChange])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔐 Intento de login:', { username, password })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={styles.title}>DevStudy</h1>
      <p className={styles.subtitle}>Prepárate para el siguiente nivel 🎮</p>

      <div className={styles.fields}>
        <div>
          <label className={styles.label}>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Ej: astro_dev"
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={styles.input}
          />
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Iniciar Sesión
      </button>

      <div className={styles.footer}>
        ¿No tienes cuenta? <span className={styles.link}>Regístrate</span>
      </div>
    </form>
  )
}