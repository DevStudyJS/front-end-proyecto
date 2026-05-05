import Link from 'next/link';
import styles from './Menu.module.css';

export default function Menu() {
  return (
    <>
      <div className={styles.menu}>
        <h2>Menú</h2>
        <a href="#">Inicio</a>
        <a href="#">Servicios</a>
        <a href="#">Contacto</a>
      </div>

      <div className={styles.contenido}>
        <h1>Contenido</h1>
        <p>idk ...</p>
      </div>
    </>
  );
}