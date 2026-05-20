"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/Auth'
import type { SignUpFormData, Usuarios } from '@/lib/database.types'
import styles from './SignUpForm.module.css'

const FALLBACK_AVATAR = 'https://static.wikia.nocookie.net/roblox/images/3/3b/NOOB%21.png/revision/latest/scale-to-width-down/284?cb=20210630174226'
const AVATAR_BASE_URL = 'https://api.dicebear.com/9.x/pixel-art/svg?seed='

// Mapeo retro de roles
const ROLE_LABELS: Record<Usuarios['rol'], string> = {
  estudiante: 'APRENDIZ',
  docente: 'MAESTRO',
  administrador: 'ADMIN',
  invitado: 'OBSERVADOR'
}

export default function SignupForm() {
  const [form, setForm] = useState<SignUpFormData>({
    usuario: '',
    email: '',
    password: '',
    escuela: '',
    rol: 'estudiante'
  })
  const [avatarUrl, setAvatarUrl] = useState(FALLBACK_AVATAR)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // Avatar pixelado en tiempo real (debounce simple)
  useEffect(() => {
    const timer = setTimeout(() => {
      const usuarioLimpio = form.usuario.trim()
      setAvatarUrl(
        usuarioLimpio 
          ? `${AVATAR_BASE_URL}${encodeURIComponent(usuarioLimpio)}` 
          : FALLBACK_AVATAR
      )
    }, 250)
    return () => clearTimeout(timer)
  }, [form.usuario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error: authError } = await signUp({
        usuario: form.usuario.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        escuela: form.escuela.trim(),
        rol: form.rol,
        avatar: form.usuario ? `${AVATAR_BASE_URL}${encodeURIComponent(form.usuario.trim())}` : ''
      })
      if (authError || !data) throw authError || new Error('ERROR: CUENTA NO CREADA')
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2500)
    } catch (err: any) {
      setError(err.message || 'QUEST FALLIDA. INTENTA DE NUEVO.')
      // En el catch de signUp:
      console.error('🔍 Debug completo del error:', {
        name: (error as any)?.name,
        status: (error as any)?.status,
        code: (error as any)?.code,
        message: (error as any)?.message,
        headers: (error as any)?.headers,
        isDev: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.scanlines} />
      
      <div className={styles.dialogBox}>
        <h1 className={styles.title}>📜 CREAR PERSONAJE</h1>
        
        <div className={styles.previewArea}>
          <img 
            src={avatarUrl} 
            alt="Avatar Preview" 
            className={styles.avatar}
            onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR }}
          />
          <span className={styles.previewLabel}>VISTA PREVIA</span>
        </div>

        {error && <div className={styles.errorMsg} role="alert">⚠️ {error}</div>}
        {success && <div className={styles.successMsg} role="status">✅ ¡PERSONAJE CREADO! REDIRIGIENDO...</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>👤 NOMBRE (ID)</label>
            <input
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              placeholder="TuNickname8Bit"
              required
              maxLength={20}
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>📧 EMAIL</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jugador@devstudy.com"
              required
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>🔒 CONTRASEÑA</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 caracteres"
              required
              minLength={6}
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>🏫 ESCUELA / GREMIO</label>
            <input
              name="escuela"
              value={form.escuela}
              onChange={handleChange}
              placeholder="Secundaria #123"
              required
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>⚔️ CLASE INICIAL</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className={`${styles.input} ${styles.select}`}
              disabled={loading}
            >
              {Object.entries(ROLE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.button} disabled={loading || success}>
            {loading ? '⏳ GUARDANDO...' : '🚀 INICIAR AVENTURA'}
          </button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta? <button className={styles.link} onClick={() => router.push('/login')}>ENTRAR</button>
        </p>
      </div>
    </div>
  )
}