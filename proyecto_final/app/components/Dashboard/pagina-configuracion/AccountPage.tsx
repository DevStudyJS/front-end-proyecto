"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './AccountPage.module.css'
import { getCurrentUser, updateUserProfile, signOut } from '@/lib/Auth'
import type { Usuarios } from '@/lib/database.types'

const initialFormState = {
  email: '',
  usuario: '',
  escuela: '',
  avatar: '',
  rol: '',
  website: '',
  facebook: '',
  twitter: '',
}

export default function AccountPage() {
  const [profile, setProfile] = useState<Usuarios | null>(null)
  const [form, setForm] = useState(initialFormState)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)
      setError('')

      const { profile, error } = await getCurrentUser()

      if (error) {
        setError('No se pudo cargar el perfil. Intenta de nuevo más tarde.')
        setLoading(false)
        return
      }

      if (!profile) {
        setError('No hay sesión activa. Inicia sesión para ver tu perfil.')
        setLoading(false)
        return
      }

      setProfile(profile)
      setForm({
        email: profile.email,
        usuario: profile.usuario,
        escuela: profile.escuela || '',
        avatar: profile.avatar || '',
        rol: profile.rol || 'estudiante',
        website: '',
        facebook: '',
        twitter: '',
      })
      setLoading(false)
    }

    loadProfile()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setMessage('')
    setError('')
  }

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!profile) return

    setSaving(true)
    setError('')
    setMessage('')

    const { data, error } = await updateUserProfile(profile.id_usuario, {
      usuario: form.usuario,
      escuela: form.escuela,
      avatar: form.avatar,
    })

    if (error) {
      setError('No se pudieron guardar los cambios.')
      setSaving(false)
      return
    }

    setProfile(data)
    setMessage('Perfil actualizado correctamente.')
    setSaving(false)
  }

  const avatarUrl = form.avatar || profile?.avatar || 'https://mystickermania.com/cdn/stickers/games/sticker_3216-512x512.png'

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img
            src={avatarUrl}
            alt={form.usuario || 'Avatar'}
            className={styles.avatarImage}
            onError={(event) => {
              const target = event.currentTarget as HTMLImageElement
              target.src = 'https://mystickermania.com/cdn/stickers/games/sticker_3216-512x512.png'
            }}
          />
          <div className={styles.userInfo}>
            <strong>{profile?.usuario || 'Usuario anónimo'}</strong>
            <span>{profile?.rol === 'docente' ? 'Docente' : 'Estudiante Dev'}</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <Link href="/index" className={styles.sidebarLink}>
            Islas
          </Link>
          <Link href="/index/config" className={`${styles.sidebarLink} ${styles.activeLink}`}>
            Cuenta
          </Link>
          <button
            type="button"
            className={styles.sidebarLink}
            onClick={async () => {
              await signOut()
              router.push('/')
            }}
          >
            Salir
          </button>
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div>
            <p className={styles.pageLabel}>Account Settings</p>
            <h1 className={styles.pageTitle}>Configuración de la cuenta</h1>
          </div>
          <button className={styles.saveButton} type="submit" form="accountForm" disabled={saving || loading}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>

        <div className={styles.card}>
          {loading ? (
            <p>Cargando perfil...</p>
          ) : (
            <form id="accountForm" className={styles.form} onSubmit={handleSave}>
              {error && <div className={styles.feedbackError}>{error}</div>}
              {message && <div className={styles.feedbackSuccess}>{message}</div>}

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Información personal</h2>
                <div className={styles.fieldGrid}>
                  <label>
                    Email address
                    <input type="email" name="email" value={form.email} readOnly />
                  </label>
                  <label>
                    Username
                    <input type="text" name="usuario" value={form.usuario} onChange={handleChange} />
                  </label>
                  <label>
                    Escuela
                    <input type="text" name="escuela" value={form.escuela} onChange={handleChange} />
                  </label>
                  <label>
                    Rol
                    <input type="text" name="rol" value={form.rol} readOnly />
                  </label>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Social</h2>
                <div className={styles.fieldGrid}>
                  <label>
                    Website
                    <input type="url" name="website" value={form.website} onChange={handleChange} placeholder="https://" />
                  </label>
                  <label>
                    Facebook
                    <input type="url" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/" />
                  </label>
                  <label className={styles.fullWidth}>
                    Twitter
                    <input type="url" name="twitter" value={form.twitter} onChange={handleChange} placeholder="https://twitter.com/" />
                  </label>
                  <label className={styles.fullWidth}>
                    Avatar URL
                    <input type="url" name="avatar" value={form.avatar} onChange={handleChange} placeholder="https://" />
                  </label>
                </div>
              </section>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
