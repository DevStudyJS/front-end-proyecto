"use client";
import styles from './AccountPage.module.css';
import Link from "next/link";
import Image from "next/image";
import { FALLBACK_AVATAR } from "../SignUp/SignUpForm";

export default function AccountPage()
{
    return(
       
        <div className={styles.container}>
        
             <aside className={styles.sidebar}>
                <img
                    src={FALLBACK_AVATAR} 
                    alt="Avatar"
                    width={80}
                    height={80}
                    className={styles.avatar}
                />
                <Link href="/dashboard" className={styles.btn}>📊 Dashboard</Link>
                <Link href="/account-details" className={styles.btn}>👤 Account Details</Link>
                <Link href="/change-password" className={styles.btn}>🔑 Change Password</Link>
                <Link href="/logout" className={styles.btn}>🚪 Logout</Link>
            </aside>

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

                    <button type="submit" className={styles.btn}>Guardar cambios</button>
                </form>
            </main>
        </div>
    );
}
