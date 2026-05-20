"use client"
import { useState, useEffect } from 'react'
import { signIn, getCurrentUser } from '@/lib/Auth'
import type { Usuarios } from '@/lib/database.types'
import styles from './LoginForm.module.css'
import Link from 'next/link'

export interface PlayerData {
  username: string
  avatar: string
  title: string
  id_usuario?: string
}

const FALLBACK_AVATAR = 'https://static.wikia.nocookie.net/roblox/images/3/3b/NOOB%21.png/revision/latest/scale-to-width-down/284?cb=20210630174226'

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

  // 🔍 Búsqueda en tiempo real + Fallback inmediato
  useEffect(() => {
    if (!identifier.trim()) {
      setPreviewPlayer(null)
      onPreviewChange(null)
      return
    }

    const timer = setTimeout(async () => {
      const { data: { session } } = await import('@/lib/supabase').then(m => m.supabase.auth.getSession())
      if (session) return

      const { supabase } = await import('@/lib/supabase')
      const { data, error } = await supabase
        .from('usuarios')
        .select('usuario, avatar, rol')
        .or(`email.eq.${identifier},usuario.eq.${identifier}`)
        .maybeSingle()

      if (error) {
        console.error('Error buscando usuario:', error)
        return
      }

      if (data) {
        const userRole = data.rol as Usuarios['rol']
        const player: PlayerData = {
          username: data.usuario,
          avatar: data.avatar || FALLBACK_AVATAR,
          title: ROLE_TITLES[userRole]
        }
        setPreviewPlayer(player)
        onPreviewChange(player) // ✅ Envía datos al padre
      } else {
        // 🚨 USUARIO INVÁLIDO → Activa fallback inmediatamente
        const fallbackPlayer: PlayerData = {
          username: identifier.includes('@') ? identifier.split('@')[0] : identifier,
          avatar: FALLBACK_AVATAR,
          title: 'Nuevo Explorador'
        }
        setPreviewPlayer(fallbackPlayer)
        onPreviewChange(fallbackPlayer) 
      }
    }, 300)

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

      const { profile } = await getCurrentUser()
      if (!profile) throw new Error('Perfil no disponible')

      onLoginSuccess({
        username: profile.usuario,
        avatar: profile.avatar || FALLBACK_AVATAR,
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
        <Link type="button" className={styles.link} href="/register">
          Regístrate
        </Link>
      </div>
    </form>
  )
}