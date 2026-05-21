"use client"
import { useState, useEffect } from 'react'
import { signIn, getCurrentUser } from '@/lib/Auth'
import type { Usuarios } from '@/lib/database.types'
import styles from './LoginForm.module.css'
import Link from 'next/link'
import { lookupUser, isValidEmail } from '@/lib/userLookup'


export interface PlayerData {
  username: string
  avatar: string
  title: string
  id_usuario?: string
}

const FALLBACK_AVATAR = 'https://mystickermania.com/cdn/stickers/games/sticker_3216-512x512.png'

const ROLE_TITLES: Record<Usuarios['rol'], string> = {
  estudiante: 'Aprendiz Dev',
  docente: 'Maestro del Código',
  administrador: 'Guardián del Sistema',
  invitado: 'Explorador'
}

interface Props {
  onPreviewChange: (player: PlayerData | null) => void
  onLoginSuccess: (player: PlayerData) => void
}

export default function LoginForm({ onPreviewChange, onLoginSuccess }: Props) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [previewPlayer, setPreviewPlayer] = useState<PlayerData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 🔍 Búsqueda en tiempo real (150ms para respuesta inmediata)
  useEffect(() => {
    if (!identifier.trim()) {
    setPreviewPlayer(null)
    onPreviewChange(null)
    return
  }

  const timer = setTimeout(async () => {
    const { user, error } = await lookupUser(identifier)

    if (error) {
      console.error('❌ Error en búsqueda:', error.message)
      return
    }

    if (user) {
      // ✅ Usuario encontrado: cargar avatar real + rol
      const player: PlayerData = {
        username: user.usuario,
        avatar: user.avatar || FALLBACK_AVATAR,
        title: ROLE_TITLES[user.rol as keyof typeof ROLE_TITLES] || 'Explorador',
        id_usuario: user.id_usuario
      }
      setPreviewPlayer(player)
      onPreviewChange(player)
    } else {
      // 🚨 Usuario no existe: mostrar fallback NOOB
      const fallbackPlayer: PlayerData = {
        username: isValidEmail(identifier) ? identifier.split('@')[0] : identifier,
        avatar: FALLBACK_AVATAR,
        title: 'Nuevo Explorador'
      }
      setPreviewPlayer(fallbackPlayer)
      onPreviewChange(fallbackPlayer)
    }
  }, 150)

    return () => clearTimeout(timer)
  }, [identifier, onPreviewChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const isEmail = identifier.includes('@')
      let emailToLogin = identifier
      
      if (!isEmail) {
        const { supabase } = await import('@/lib/supabase')
        const { data } = await supabase
          .from('usuarios')
          .select('email')
          .eq('usuario', identifier)
          .maybeSingle()
        
        if (!data?.email) throw new Error('Usuario no encontrado en el sistema')
        emailToLogin = data.email
      }

      const { data, error: authError } = await signIn({ email: emailToLogin, password })
      if (authError || !data) throw authError || new Error('Credenciales incorrectas')

      // ✅ Obtener perfil REAL post-login para actualizar valores de autenticación
      const { profile } = await getCurrentUser()
      if (!profile) throw new Error('Perfil no disponible')

      onLoginSuccess({
        username: profile.usuario,
        avatar: profile.avatar || FALLBACK_AVATAR, // Datos reales de la BD
        title: ROLE_TITLES[profile.rol],
        id_usuario: profile.id_usuario
      })
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Link 
            href="/" 
            className={styles.modernLink}
            onClick={() => setLoading(false)}
          >
            <b>↩ Inicio</b>
          </Link>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <h2 className={styles.title2}>DevStudy</h2>
      <p className={styles.subtitle}>Prepárate para el siguiente nivel 🎮</p>

      {error && <div className={styles.errorBanner} role="alert">⚠️ {error}</div>}

      <div className={styles.fields}>
        <div>
          <label className={styles.label}>Correo o Usuario</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value.trim())}
            placeholder="Ej: astro_dev o correo@escuela.com"
            className={styles.input}
            disabled={loading}
            autoComplete="username"
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
            disabled={loading}
            autoComplete="current-password"
          />
        </div>
      </div>

      <button type="submit" className={`${styles.button} ${loading ? styles.loading : ''}`} disabled={loading || !identifier || !password}>
        {loading ? '🚀 Conectando...' : 'Iniciar Sesión'}
      </button>


      <div className={styles.footer}>
        ¿No tienes cuenta?{' '}
        <Link className={styles.link} href="/register">
          Regístrate
        </Link>
      </div>
    </form>
  )
}