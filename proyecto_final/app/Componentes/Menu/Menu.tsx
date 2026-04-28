import styles from './Menu.module.css';


export default function Menu() {
  return (
    <>
      <div className={styles.menu}>
        <h2>Menú</h2>
        <button className={styles['menu-btn']}>Mapa de islas</button>
        <button className={styles['menu-btn']}>Mi Progreso</button>
        <button className={styles['menu-btn']}>Ranking Global</button>
        <button className={styles['menu-btn']}>Mi Avatar</button>
      </div>

    </>
  );
}