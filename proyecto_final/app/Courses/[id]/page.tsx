import { supabase } from '@/lib/supabase'
import styles from './courses.module.css'

// 1. EL DICCIONARIO DE BIOMAS
// Cambia los números de la izquierda por los IDs reales de tus cursos en Supabase
const islandThemes: Record<number, string> = {
    1: 'themeAlgebra',      // ID de Álgebra
    2: 'themeTrigonometry', // ID de Trigonometría
    3: 'themeCalculus',     // ID de Cálculo
    4: 'themeGeometry',     // ID de Geometría
};

export default async function PaginaCurso({ params }: { params: Promise<{ id: string }> }) {
    const parametrosListos = await params;
    const cursoId = parseInt(parametrosListos.id);

    // Consulta a Supabase
    const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('course_id', cursoId)
        .single();

    // Si hay error o no existe la isla
    if (error || !course) {
        return (
            <div className={`${styles.pageWrapper} ${styles.themeDefault}`}>
                <div className={styles.contentCard}>
                    <h1 className={styles.title}>404</h1>
                    <p className={styles.subtitle}>La isla {parametrosListos.id} aún no ha sido descubierta en el mapa.</p>
                </div>
            </div>
        );
    }

    // 2. BUSCAMOS EL TEMA VISUAL CORRECTO
    const currentThemeClass = islandThemes[cursoId] || 'themeDefault';

    // 3. RENDERIZAMOS CON LA CAJA DE CRISTAL
    return (
        // El fondo cambia en el contenedor principal (pageWrapper)
        <div className={`${styles.pageWrapper} ${styles[currentThemeClass]}`}>
            
            {/* El texto va protegido dentro del contenedor de cristal */}
            <div className={styles.contentCard}>
                <h1 className={styles.title}>{course.title}</h1>
                <p className={styles.subtitle}>
                    Estás explorando los dominios de {course.title}
                </p>
                
                {/* Puedes descomentar esto si tienes duración en tu BD */}
                {/* <p style={{marginTop: '2rem', opacity: 0.8}}>Duración: {course.duration} mins</p> */}
            </div>
            
        </div>
    );
}