"use client"
import SignupForm from '@/app/components/SignUp/SignUpForm'
import styles from '@/app/(auth)/register/signup.module.css'

export default function IndexSignupPage() {
  return (
    <main className={styles.main}>
      <SignupForm />
    </main>
  )
}
