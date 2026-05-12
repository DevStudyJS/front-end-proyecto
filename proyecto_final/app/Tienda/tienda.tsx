import React, { useState } from 'react';
import styles from './tienda.module.css';

// Datos falsos para avanzar hoy
const MOCK_ITEMS = [
  { id: 1, name: 'Gorra Roja', price: 50, category: 'accesorios', img: '/assets/gorra.png' },
  { id: 2, name: 'Lentes Pro', price: 30, category: 'accesorios', img: '/assets/lentes.png' },
  { id: 3, name: 'Chamarra Azul', price: 100, category: 'blusas', img: '/assets/top1.png' },
  { id: 4, name: 'Corgi Espacial', price: 500, category: 'mascota', img: '/assets/pet1.png' },
];

export const Tienda = () => {
  const [categoria, setCategoria] = useState('accesorios');
  const [viewing, setViewing] = useState({
    accesorios: '',
    blusas: '',
    mascota: ''
  });

  const filtrarItems = MOCK_ITEMS.filter(item => item.category === categoria);

  return (
    <div className={styles.container}>
      {/* SECCIÓN AVATAR (PREVISUALIZACIÓN) */}
      <div className={styles.avatarSection}>
        <img src="/assets/base_body.png" className={styles.avatarLayer} alt="Cuerpo" />
        {viewing.blusas && <img src={viewing.blusas} className={styles.avatarLayer} />}
        {viewing.accesorios && <img src={viewing.accesorios} className={styles.avatarLayer} />}
        {viewing.mascota && <img src={viewing.mascota} className={styles.avatarLayer} />}
      </div>

      {/* SECCIÓN TIENDA */}
      <div className={styles.storeSection}>
        <div className={styles.tabs}>
          <button onClick={() => setCategoria('accesorios')}>Accesorios</button>
          <button onClick={() => setCategoria('blusas')}>Blusas</button>
          <button onClick={() => setCategoria('mascota')}>Mascotas</button>
        </div>

        <div className={styles.grid}>
          {filtrarItems.map(item => (
            <div 
              key={item.id} 
              className={styles.itemCard}
              onClick={() => setViewing({...viewing, [item.category]: item.img})}
            >
              <img src={item.img} width={50} />
              <p>{item.name}</p>
              <span>💰 {item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};