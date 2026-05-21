"use client"
import SignupForm from '@/app/components/SignUp/SignUpForm'
import styles from './signup.module.css'

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <SignupForm />
    </main>
  )
}