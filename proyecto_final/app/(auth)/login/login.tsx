"use client"
import { useState } from 'react'
import LoginForm, { type PlayerData } from '@/features/auth/components/LoginForm'
import SpaceScene from '@/features/auth/components/SpaceScene'
import styles from "./login.module.css"

export default function Login(){
    const [avatarData, setAvatarData] = useState<PlayerData | null>(null)

    return (
        <main className={styles.mainLayout}>
        <section className={styles.leftSection}>
            <div className={styles.mobileBg} />
            <LoginForm onUsernameChange={setAvatarData} />
        </section>

        <section className={styles.rightSection}>
            <SpaceScene showAvatar={!!avatarData} avatarData={avatarData} />
            <div className={styles.footerText}>
            </div>
        </section>
        </main>
    )
}