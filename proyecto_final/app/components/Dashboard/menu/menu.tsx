"use client";
import { useEffect, useState } from 'react';
import styles from './menu.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/Auth';
import type { Usuarios } from '@/lib/database.types';

export default function Menu() {
  const pathname = usePathname() || '';
  const [profile, setProfile] = useState<Usuarios | null>(null);

  const navItems = [
    { label: 'Mapa de islas', href: '/inicio' },
    { label: 'Mi progreso', href: '/inicio/scoreboard' },
    { label: 'Ranking global', href: '/inicio/ranking' },
    { label: 'Tienda', href: '/inicio/tienda' },
    { label: 'Configuración', href: '/inicio/config' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const getItemClass = (href: string) => {
    let className = styles.navItem;
    if (href === '/inicio/scoreboard') className = `${styles.navItem} ${styles.scoreItem}`;
    if (href === '/inicio/ranking') className = `${styles.navItem} ${styles.rankingItem}`;
    if (isActive(href)) className = `${className} ${styles.active}`;
    return className;
  };

  const avatarUrl = profile?.avatar || 'https://mystickermania.com/cdn/stickers/games/sticker_3216-512x512.png';
  const points = profile?.dinero ?? 0;
  const streak = profile?.racha_dias ?? 0;
  const streakLabel = streak > 0 ? `${streak} días` : 'Iniciemos con tu racha';

  useEffect(() => {
    async function loadProfile() {
      const { profile } = await getCurrentUser();
      setProfile(profile);
    }

    loadProfile();
  }, []);

  return (
    <aside className={styles.menu}>
      <div>
        <div className={styles.logoRow}>
          <div className={styles.logoIcon} aria-hidden="true">
            🌱
          </div>
          <span className={styles.logoText}>DevStudy</span>
        </div>

        <div className={styles.menuHeader}>
          <h2 className={styles.menuTitle}>Panel</h2>
          <p className={styles.menuSubtitle}>Navega tu progreso y tienda</p>
        </div>

        <div className={styles.userPanel}>
          <img
            src={avatarUrl}
            alt={profile?.usuario || 'Avatar del usuario'}
            className={styles.userAvatar}
            onError={(event) => {
              const img = event.currentTarget as HTMLImageElement;
              img.src = 'https://mystickermania.com/cdn/stickers/games/sticker_3216-512x512.png';
            }}
          />
          <div className={styles.userInfoBox}>
            <strong className={styles.userName}>{profile?.usuario || 'Estudiante Dev'}</strong>
            <span className={styles.userSubtitle}>{profile?.usuario ? `Nivel ${profile.racha_dias ?? 0}` : 'Bienvenido'}</span>
          </div>
        </div>
      </div>

      <nav className={styles.navList}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={getItemClass(item.href)}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.pointsBox}>
        <span className={styles.pointsLabel}>Puntos Totales</span>
        <span className={styles.pointsValue}>{points} pts</span>
      </div>
    </aside>
  );
}
