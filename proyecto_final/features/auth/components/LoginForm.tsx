"use client"
import { useState, useCallback } from 'react'
import styles from './LoginForm.module.css'

export interface PlayerData {
  username: string
  avatar: string
  title: string
}

const PLAYERS_DB: Record<string, PlayerData> = {
  'astro_dev': { username: 'astro_dev', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Avery', title: 'Explorador Estelar' },
  'math_wizard': { username: 'math_wizard', avatar: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Ryker', title: 'Mago Matemático' },
  'dev_student': { username: 'dev_student', avatar: 'https://api.dicebear.com/9.x/toon-head/svg?seed=Riley', title: 'Aprendiz Dev' }
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
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <h2 className={styles.title2}>DevStudy</h2>
      
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