import styles from './menu.module.css';
import Link from './menu.module.css';

export default function Menu()
{
    return (
        <div className={styles.menu}>
            <h2>Menu</h2>
            <button className={styles['menu-btn']}>Mapa de islas</button>
            <button className={styles['menu-btn']}>Mi progreso</button>
            <button className={styles['menu-btn']}>Ranking global</button>
            <button className={styles['menu-btn']}>Mi avatar</button>

            <Link href="/configuration">
                <button className={styles['menu-btn']}>Configuracion</button>
            </Link>
        </div>
    );
}