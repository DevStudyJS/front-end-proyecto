import { supabase } from '@/lib/supabase';
import Link from 'next/link'; // Importamos la herramienta de navegación de Next.js
import styles from './mapa.module.css';
import HeaderFondo from '../HeaderFondo/headerFondo';   

// 1. DICCIONARIO VISUAL (Solo imágenes y estado de bloqueo)
// Mapeamos el ID de la base de datos con su imagen correspondiente.
// Más adelante, podrías guardar el estado de "bloqueado" en la base de datos según el progreso del usuario.
const visualesIsla: Record<number, { img: string; bloqueado: boolean }> = {
    1: { img: '/montaña.jpg', bloqueado: false },
    2: { img: '/islanormal.jpg', bloqueado: true },
    3: { img: '/islamorada.jpg', bloqueado: true }, // ID de Geometría (Ajusta si es el 4)
    4: { img: '/islalila.jpg', bloqueado: true },   // ID de Cálculo
};

export default async function Mapa() {
    // 2. OBTENEMOS LOS CURSOS DE LA BASE DE DATOS
    // Al no usar .eq(), le decimos "tráeme todos los registros de la tabla"
    const { data: cursos, error } = await supabase
        .from('courses')
        .select('*')
        .order('course_id', { ascending: true }); // Los ordenamos por ID de menor a mayor

    if (error) {
        return <div>Error al cargar el mapa de aventuras.</div>;
    }

    return (
        <div className={styles.mainWrapper}>
            <HeaderFondo/>

            <main className={styles.mapGrid}>
                {/* 3. RECORREMOS LA BASE DE DATOS EN LUGAR DEL ARREGLO ESTÁTICO */}
                {cursos?.map((curso) => {
                    // Combinamos los datos de Supabase con nuestro diccionario visual
                    const visual = visualesIsla[curso.course_id] || { img: '/default.jpg', bloqueado: true };

                    // Preparamos el diseño de la tarjeta
                    const tarjetaContenido = (
                        <div className={`${styles.islaCard} ${visual.bloqueado ? styles.locked : ''}`}>
                            <img 
                                src={visual.img} 
                                alt={curso.title} // Título dinámico desde BD
                                className={styles.islaImagen} 
                            />
                            
                            {visual.bloqueado && (
                                <div className={styles.lockIcon}>🔒</div>
                            )}
                            
                            <div style={{textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: '#333'}}>
                                {curso.title} {/* Título dinámico desde BD */}
                            </div>
                        </div>
                    );

                    // 4. LÓGICA DE CLICS Y NAVEGACIÓN
                    // Si está bloqueada, renderizamos la tarjeta dentro de un div normal (no hace nada al clickear)
                    if (visual.bloqueado) {
                        return <div key={curso.course_id}>{tarjetaContenido}</div>;
                    }

                    // Si está desbloqueada, envolvemos la tarjeta en el Link de Next.js
                    return (
                        <Link 
                            key={curso.course_id} 
                            href={`/Courses/${curso.course_id}`} 
                            style={{ textDecoration: 'none' }} // Evita que se subraye el texto por ser un enlace
                        >
                            {tarjetaContenido}
                        </Link>
                    );
                })}
            </main>
        </div>
    );
}