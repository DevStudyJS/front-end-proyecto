"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/Auth' // ✅ Corregido: minúscula 'auth'
import type { SignUpFormData, Usuarios } from '@/lib/database.types'
import styles from './SignUpForm.module.css'
import Link from 'next/link'
import { Center } from '@react-three/drei'

// 🎨 Constantes de avatar
export const FALLBACK_AVATAR = 'https://static.wikia.nocookie.net/roblox/images/3/3b/NOOB%21.png/revision/latest/scale-to-width-down/284?cb=20210630174226'
export const AVATAR_BASE_URL = 'https://api.dicebear.com/9.x/pixel-art/svg?seed='

// 🎮 Mapeo retro de roles (estética 8-bit)
const ROLE_LABELS: Record<Usuarios['rol'], string> = {
  estudiante: '🎓 APRENDIZ',
  docente: '👨‍🏫 MAESTRO',
  administrador: '⚙️ ADMIN',
  invitado: '👁️ OBSERVADOR'
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

  // 🔄 Avatar 8-bits en tiempo real (debounce 150ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const usuarioLimpio = form.usuario.trim()
      if (usuarioLimpio) {
        const seed = encodeURIComponent(usuarioLimpio)
        const bg = usuarioLimpio.length % 5
        const colors = ['b6e3f4', 'fbcfe8', 'bbf7d0', 'fde68a', 'c7d2fe']
        // ✅ URL válida: "?" solo una vez, luego "&"
        setAvatarUrl(`${AVATAR_BASE_URL}${seed}&backgroundColor=${colors[bg]}&scale=90`)
      } else {
        setAvatarUrl(FALLBACK_AVATAR)
      }
    }, 150)
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
      const usuarioLimpio = form.usuario.trim()
      
      // ✅ Generar URL válida del avatar (CORREGIDO: "&" en vez de "?")
      const avatarFinal = usuarioLimpio 
        ? `${AVATAR_BASE_URL}${encodeURIComponent(usuarioLimpio)}&backgroundColor=${['b6e3f4','fbcfe8','bbf7d0','fde68a','c7d2fe'][usuarioLimpio.length % 5]}&scale=90`
        : ''

      console.log('📤 Enviando registro:', {
        usuario: usuarioLimpio,
        email: form.email.trim().toLowerCase(),
        escuela: form.escuela.trim(),
        rol: form.rol,
        avatar: avatarFinal
      })
      

      const { data, error: authError } = await signUp({
        usuario: usuarioLimpio,
        email: form.email.trim().toLowerCase(),
        password: form.password,
        escuela: form.escuela.trim(),
        rol: form.rol,
        avatar: avatarFinal
      })

      if (authError || !data) {
        throw authError || new Error('ERROR: CUENTA NO CREADA')
      }

      console.log('✅ Registro exitoso:', data)
      setSuccess(true)
      setTimeout(() => router.push('/login?registered=true'), 2500)
      
    } catch (err: any) {
      console.error('❌ Error en signUp:', {
        name: err?.name,
        message: err?.message,
        code: err?.code,
        status: err?.status,
        isDev: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      })
      setError(err.message || 'QUEST FALLIDA. INTENTA DE NUEVO.')
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
            loading="lazy"
            onError={(e) => { 
              console.warn('⚠️ Error cargando avatar, usando fallback')
              e.currentTarget.src = FALLBACK_AVATAR 
            }}
          />
          <span className={styles.previewLabel}>VISTA PREVIA</span>
        </div>

        {error && (
          <div className={styles.errorMsg} role="alert">⚠️ {error}</div>
        )}
        
        {success && (
          <div className={styles.successMsg} role="status">✅ ¡PERSONAJE CREADO! REDIRIGIENDO...</div>
        )}

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
              pattern="^[a-zA-Z0-9_]{3,20}$"
              title="3-20 caracteres: letras, números y guiones bajos"
              className={styles.input}
              disabled={loading}
              autoComplete="username"
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
              autoComplete="email"
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
              autoComplete="new-password"
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

          <button 
            type="submit" 
            className={`${styles.button} ${loading || success ? styles.disabled : ''}`}
            disabled={loading || success}
          >
            {loading ? '⏳ GUARDANDO...' : success ? '✅ LISTO' : '🚀 INICIAR AVENTURA'}
          </button>
        </form>

        <div className={styles.footerSeparator}><p></p></div>
        <Link 
            href="/" 
            className={styles.retroLink}
            onClick={() => setLoading(false)}
          >
            VOLVER AL INICIO
          </Link>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <button 
            className={styles.link} 
            onClick={() => router.push('/login')}
            disabled={loading}
          >
            ENTRAR
          </button>
        </p>
      </div>
    </div>
  )
}