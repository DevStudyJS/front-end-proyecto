'use client';

import { useState } from 'react';
import styles from './tienda.module.css';

// 1. Datos simulados de la ropa/skins (Hardcoded)
const catalogoRopa = [
    { id: 1, nombre: 'Traje de Gala', precio: '150 Monedas', imgGrande: '/traje_elegante.jpg', imgMini: '/traje_elegante.jpg' },
    { id: 2, nombre: 'Conjunto silvestre', precio: '200 Monedas', imgGrande: '/traje_zorro.jpg', imgMini: '/traje_zorro.jpg' },
    { id: 3, nombre: 'Traje de Incógnito', precio: 'Free', imgGrande: '/artista_urbano.jpg', imgMini: '/artista_urbano.jpg' },
    { id: 4, nombre: 'Uniforme de Gala', precio: '100 Monedas', imgGrande: '/cucaracha.png', imgMini: '/cucaracha.png' },
];

export default function TiendaVisual() {
    // 2. Estado para saber qué skin está seleccionada actualmente
    // Empezamos mostrando la primera skin por defecto (catalogoRopa[0])
    const [skinSeleccionada, setSkinSeleccionada] = useState(catalogoRopa[0]);

    return (
        <div className={styles.tiendaWrapper}>
            
            {/* SECCIÓN SUPERIOR: El visualizador del monito */}
            <section className={styles.previewSection}>
                <div className={styles.characterContainer}>
                    {/* Esta imagen cambia dinámicamente según el estado */}
                    <img 
                        src={skinSeleccionada.imgGrande} 
                        alt={skinSeleccionada.nombre} 
                        className={styles.characterImage}
                    />
                </div>
                <div className={styles.characterInfo}>
                    <h2>{skinSeleccionada.nombre}</h2>
                    <span className={styles.precioTag}>{skinSeleccionada.precio}</span>
                    <button className={styles.buyBtn}>Adquirir Aspecto</button>
                </div>
            </section>

            <hr className={styles.divider} />

            {/* SECCIÓN INFERIOR: El catálogo de ropa/conjuntos */}
            <section className={styles.catalogSection}>
                <h3>Conjuntos Disponibles</h3>
                <div className={styles.gridRopa}>
                    {catalogoRopa.map((prenda) => (
                        <div 
                            key={prenda.id} 
                            /* Si es la prenda seleccionada, le añadimos una clase de "activo" */
                            className={`${styles.itemCard} ${skinSeleccionada.id === prenda.id ? styles.activeItem : ''}`}
                            /* POR QUÉ: Al hacer clic, actualizamos el estado con los datos de esta prenda */
                            onClick={() => setSkinSeleccionada(prenda)}
                        >
                            <img src={prenda.imgMini} alt={prenda.nombre} className={styles.miniImg} />
                            <p>{prenda.nombre}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}