"use client";
import styles from './AccountPage.module.css';

export default function AccountPage()
{
    return(
       
        <div className={styles.container}>
        {/*
            <aside className={styles.sidebar}>
                <img
                    src="/avatar.png" 
                    alt="Perfil"
                    className={styles.avatar}
                />
                <nav>
                    <a href="#" className={styles.active}>Dashboard</a>
                    <a href="#">Detalles de la cuenta</a>
                    <a href="#">Cambio de contraseña</a>
                    <a href="#">Salir</a>
                </nav>
            </aside>
            */}

            {/*Pagina de configuracion*/}
            <main className={styles.main}>
                <h2>Configuracion de la cuenta</h2>
                <form className={styles.form}>
                    <label>Email: </label>
                    <input type="email" defaultValue="support@profile.com" />

                    <label>Alias: </label>
                    <input type="text" defaultValue="support@profile.com" />

                    <label>Nombre: </label>
                    <input type="text" defaultValue="support@profile.com" />

                    <label>Apellido: </label>
                    <input type="text" defaultValue="support@profile.com" />

                    <button type="submit" className={styles.saveBtn}>Guardar cambios</button>
                </form>
            </main>
        </div>
    );
}
