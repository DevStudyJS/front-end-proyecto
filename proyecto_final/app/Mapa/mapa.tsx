import styles from './mapa.module.css'

// Definimos los temas
const temas = [
    { id: 1, nombre: 'Álgebra', bloqueado: false, img: '/montaña.jpg' },
    { id: 2, nombre: 'Trigonometría', bloqueado: true, img: '/islanormal.jpg' },
    { id: 3, nombre: 'Geometría', bloqueado: true, img: '/islamorada.jpg' },
    { id: 4, nombre: 'Cálculo', bloqueado: true, img: '/islalila.jpg' },
];

export default function Mapa() {
    return (
        <div className={styles.mainWrapper}>
            <header className={styles.header}>
                <h1>Mapa de Aventuras</h1>
                <p>Elige tu próxima isla para conquistar</p>
            </header>

            <main className={styles.mapGrid}>
                {temas.map((tema) => (
                    <div 
                        key={tema.id} 
                        className={`${styles.islaCard} ${tema.bloqueado ? styles.locked : ''}`}
                    >
                        <img 
                            src={tema.img} 
                            alt={tema.nombre} 
                            className={styles.islaImagen} 
                        />
                        
                        {/* Si está bloqueado, mostramos un candado */}
                        {tema.bloqueado && (
                            <div className={styles.lockIcon}>🔒</div>
                        )}
                        
                        <div style={{textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: '#333'}}>
                            {tema.nombre}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}
