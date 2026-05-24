"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithIdentifier } from '@/lib/Auth'
import { lookupUser } from '@/lib/userLookup'
import styles from './LoginForm.module.css'

export interface PlayerData {
  username: string
  avatar: string
  title: string
}

interface Props {
  onPreviewChange?: (player: PlayerData | null) => void
  onLoginSuccess?: (player: PlayerData) => void
}

const ROLE_TITLES: Record<string, string> = {
  estudiante: 'Explorador Estelar',
  docente: 'Maestro del Cosmos',
  administrador: 'Guardían del Servidor',
  invitado: 'Visitante Galáctico',
}

const getTitleFromRole = (rol?: string) => {
  return ROLE_TITLES[rol ?? 'estudiante'] || 'Estudiante Dev'
}

export default function LoginForm({ onPreviewChange, onLoginSuccess }: Props) {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewPlayer, setPreviewPlayer] = useState<PlayerData | null>(null)

  useEffect(() => {
    let active = true
    const lookup = async () => {
      const cleanValue = identifier.trim()
      if (!cleanValue) {
        setPreviewPlayer(null)
        onPreviewChange?.(null)
        return
      }

      setPreviewLoading(true)
      const { user, error: lookupError } = await lookupUser(cleanValue)
      if (!active) return
      setPreviewLoading(false)

      if (lookupError) {
        console.error('[LoginForm] Error lookupUser:', lookupError)
        setPreviewPlayer(null)
        onPreviewChange?.(null)
        return
      }

      if (!user) {
        setPreviewPlayer(null)
        onPreviewChange?.(null)
        return
      }

      const player = {
        username: user.usuario,
        avatar: user.avatar,
        title: getTitleFromRole(user.rol),
      }

      setPreviewPlayer(player)
      onPreviewChange?.(player)
    }

    lookup().catch((err) => {
      console.error(err)
      setPreviewLoading(false)
    })

    return () => {
      active = false
    }
  }, [identifier, onPreviewChange])

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value)
    setError(null)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setError(null)
  }

  const handleRegister = () => {
    router.push('/index/signup')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const trimmedIdentifier = identifier.trim()
      const trimmedPassword = password.trim()
      if (!trimmedIdentifier || !trimmedPassword) {
        throw new Error('Completa usuario y contraseña.')
      }

      const { data, error: authError } = await signInWithIdentifier(trimmedIdentifier, trimmedPassword)
      if (authError || !data) {
        throw authError || new Error('Credenciales inválidas, intenta de nuevo.')
      }

      const player = previewPlayer ?? {
        username: trimmedIdentifier,
        avatar: 'https://mystickermania.com/cdn/stickers/games/sticker_3216-512x512.png',
        title: 'Estudiante Dev',
      }

      onLoginSuccess?.(player)
    } catch (err: any) {
      setError(err.message || 'No se pudo iniciar sesión. Revisa tus datos.')
      console.error('[LoginForm] Error al iniciar sesión:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <h2 className={styles.title2}>DevStudy</h2>
      
      <p className={styles.subtitle}>Prepárate para el siguiente nivel 🎮</p>

      <div className={styles.fields}>
        <div>
          <label className={styles.label}>Usuario o correo</label>
          <input
            type="text"
            value={identifier}
            onChange={handleIdentifierChange}
            placeholder="Ej: astro_dev o correo@dominio.com"
            className={styles.input}
            autoComplete="username"
          />
        </div>
        <div>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            className={styles.input}
            autoComplete="current-password"
          />
        </div>
      </div>

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
      </button>

      <div className={styles.footer}>
        ¿No tienes cuenta?{' '}
        <button
          type="button"
          className={styles.link}
          onClick={handleRegister}
          disabled={loading}
        >
          Regístrate
        </button>
      </div>
    </form>
  )
}