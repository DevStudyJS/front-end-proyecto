"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm, { type PlayerData } from '../../components/Login/LoginForm'
import SpaceScene from '../../components/Login/SpaceScene'
import styles from '@/app/(auth)/login/login.module.css'

export default function LoginPage() {
  const [avatarData, setAvatarData] = useState<PlayerData | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()

  const handlePreviewChange = (player: PlayerData | null) => {
    setAvatarData(player)
  }

  const handleLoginSuccess = (player: PlayerData) => {
    setIsLoggingIn(true)
    setTimeout(() => {
      router.push('/index/dashboard')
      router.refresh()
    }, 800)
  }

  return (
    <main className={styles.mainLayout}>
      <section className={styles.leftSection}>
        <div className={styles.mobileBg} />
        <LoginForm
          onPreviewChange={handlePreviewChange}
          onLoginSuccess={handleLoginSuccess}
        />
      </section>

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
    </main>
  )
}