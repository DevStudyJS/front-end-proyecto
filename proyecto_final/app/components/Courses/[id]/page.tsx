import { createClient } from '@/lib/supabase/client' 
import styles from './courses.module.css'
import 'katex/dist/katex.min.css'; 
import { InlineMath, BlockMath } from 'react-katex';
const supabase = createClient();

// 1. EL DICCIONARIO DE BIOMAS
const islandThemes: Record<number, string> = {
    1: 'themeAlgebra',      // ID de Álgebra
    2: 'themeTrigonometry', // ID de Trigonometría
    3: 'themeGeometry',     // ID de Geometría
    4: 'themeCalculus',     // ID de Cálculo
};

// 2. DICCIONARIO DE MISIONES (Versión Didáctica con LaTeX)
// Nota: Usa doble barra \\ para que Next.js y KaTeX lo procesen correctamente como texto.
const islandDescriptions: Record<number, string> = {
    1: "¡Bienvenido a la Isla de Álgebra! Aquí las letras se disfrazan de números y las ecuaciones son verdaderos acertijos. Prepara tu mente para despejar la misteriosa $x$, resolver sistemas lineales y dominar la famosa fórmula general: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. ¡Es hora de descubrir el lenguaje secreto del universo!",
    
    2: "¡Alerta de Triángulos! En esta costa dominarás las funciones periódicas. Descubrirás cómo un círculo unitario de radio $r = 1$ define la identidad fundamental $\\operatorname{sen}^2(\\theta) + \\cos^2(\\theta) = 1$. ¡Aprende a calcular la distancia a las estrellas o medir montañas usando las leyes de senos y cosenos!",
    
    3: "¡Entrando a la dimensión de las formas! En este bioma aprenderás a dominar el espacio y las estructuras euclidianas. Desde el clásico Teorema de Pitágoras ($a^2 + b^2 = c^2$) hasta el cálculo de áreas y volúmenes perfectos usando la constante más famosa del mundo en $A = \\pi r^2$. ¡Alinea tus coordenadas!",
    
    4: "¡El territorio de los sabios! La Isla de Cálculo estudia el movimiento continuo y el cambio instantáneo. Aquí analizarás el comportamiento al infinito con límites como $\\lim_{x \\to \\infty} f(x)$, y dominarás las dos herramientas supremas: la derivada $\\frac{dy}{dx}$ para medir razones de cambio y la integral $\\int_{a}^{b} f(x)\\,dx$ para calcular áreas bajo curvas complejas."
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
                <div className={styles.mainContent}>
                    <h1 className={styles.title}>404</h1>
                    <p className={styles.subtitle}>La isla {parametrosListos.id} aún no ha sido descubierta en el mapa.</p>
                </div>
            </div>
        );
    }

    // 3. BUSCAMOS EL TEMA VISUAL Y LA DESCRIPCIÓN CORRECTA
    const currentThemeClass = islandThemes[cursoId] || 'themeDefault';
    const description = islandDescriptions[cursoId] || "Una isla inexplorada llena de misterios por descubrir.";

    return (
        // El contenedor principal ahora es un Flex row
        <div className={`${styles.pageWrapper} ${styles[currentThemeClass]}`}>
            
            {/* EL RECTÁNGULO IZQUIERDO (1/5 de pantalla) */}
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>Tu Misión</h2>
                
                {/* AQUI ESTÁ LA MAGIA DEL LATEX */}
                <p className={styles.sidebarText}>
                    {description.split('$').map((fragmento, indice) => {
                        // Si el índice es impar, es una fórmula de LaTeX
                        if (indice % 2 !== 0) {
                            return <InlineMath key={indice} math={fragmento} />;
                        }
                        // Si es par, es texto normal
                        return fragmento;
                    })}
                </p>
                
                {/* Espacio reservado para futuros botones (ej. Iniciar Lección) */}
                <div className={styles.actionArea}>
                    <div className={styles.statusBadge}>Nivel 1</div>
                </div>
            </aside>

            {/* EL CONTENIDO PRINCIPAL (Título tipo Header) */}
            <main className={styles.mainContent}>
                <header className={styles.headerArea}>
                    <h1 className={styles.title}>{course.title}</h1>
                    <p className={styles.subtitle}>
                        Estás explorando los dominios de {course.title}
                    </p>
                </header>
            </main>
            
        </div>
    );
}