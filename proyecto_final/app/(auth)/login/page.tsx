"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm, { type PlayerData } from '@/app/components/Login/LoginForm'
import SpaceScene from '@/app/components/Login/SpaceScene'
import { useIsMobile } from '@/lib/useIsMobile'
import styles from './login.module.css'

export default function LoginPage() {
  const [avatarData, setAvatarData] = useState<PlayerData | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobile(768)

  const handlePreviewChange = (player: PlayerData | null) => setAvatarData(player)

  const handleLoginSuccess = () => {
    setIsLoggingIn(true)
    setTimeout(() => {
      router.push('/inicio')
      router.refresh()
    }, 800)
  }

  return (
    <main className={styles.mainLayout}>
      {/* ✅ SECCIÓN IZQUIERDA: SIEMPRE visible */}
      <section className={styles.leftSection}>
        <LoginForm 
          onPreviewChange={handlePreviewChange}
          onLoginSuccess={handleLoginSuccess}
        />
      </section>

      {!isMobile && (
        <section className={styles.rightSection}>
          <SpaceScene 
            showAvatar={!!avatarData || isLoggingIn} 
            avatarData={avatarData}
            isLoading={isLoggingIn}
          />
          <div className={styles.footerText}>
            {isLoggingIn && <span className={styles.loadingText}>🚀 Preparando tu aventura...</span>}
          </div>
        </section>
      )}
    </main>
  )
}