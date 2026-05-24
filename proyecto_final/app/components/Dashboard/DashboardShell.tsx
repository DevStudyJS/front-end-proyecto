"use client"

import type { ReactNode } from 'react'
import Menu from './menu/menu'
import styles from './DashboardShell.module.css'

interface DashboardShellProps {
  children: ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className={styles.dashboardLayout}>
      <Menu />
      <main className={styles.mainContent}>{children}</main>
    </div>
  )
}
