"use client";
import styles from './menu.module.css';
import Link from 'next/link';
import { FALLBACK_AVATAR } from "../SignUp/SignUpForm";

export default function Menu()
{
    return (
        <div className={styles.menu}>
            <h2>Menu</h2>

            <img 
                src={`${FALLBACK_AVATAR}`} 
                alt="Avatar" 
                className={styles.avatar}
                width={80}
                height={80}
            />
            <button className={`${styles['menu-btn']} ${styles.active}`}>Mapa de islas</button>
            <button className={styles['menu-btn']}>Mi progreso</button>
            <button className={styles['menu-btn']}>Ranking global</button>
            <button className={styles['menu-btn']}>Mi avatar</button>

            <Link href="/configuracion">
                <button className={styles['menu-btn']}>Configuracion</button>
            </Link>

            {/* Botón de configuración */}
            <Link href="/configuracion">
                <button className={styles['menu-btn']}>Configuración</button>
            </Link>

            {/* Botón de racha activa */}
            <button className={`${styles['menu-btn']} ${styles.streak}`}></button>

            {/* Puntos totales */}
            <div className={styles['points-box']}> Puntos Totales</div>
        </div>
    );
}