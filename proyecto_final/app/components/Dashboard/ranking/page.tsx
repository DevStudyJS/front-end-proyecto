"use client";

import React, { useState } from 'react';
import styles from './ranking.module.css';
import 'remixicon/fonts/remixicon.css';

export default function RankingGlobal() {
  // 1. ESTADO PARA LOS BOTONES DE FILTRO
  const [filtroActivo, setFiltroActivo] = useState('mes');

  // 2. DICCIONARIO DEL TOP 3 CON AVATARES LOCALES
  const top3 = [
    { 
      id: 2, 
      posicion: 2, 
      nombre: 'María González', 
      puntos: 4950, 
      color: '#94a3b8', 
      avatar: 'maria.jpg' 
    },
    { 
      id: 1, 
      posicion: 1, 
      nombre: 'Carlos Rodríguez', 
      puntos: 5280, 
      color: '#eab308', 
      avatar: 'carlos.jpg' 
    },
    { 
      id: 3, 
      posicion: 3, 
      nombre: 'Luis Hernández', 
      puntos: 4720, 
      color: '#b45309', 
      avatar: 'luis.jpg'
    },
  ];

  // 3. DATOS DE LA TABLA (Sin propiedad de avatar, solo datos puros)
  const leaderboard = [
    { id: 4, posicion: 4, nombre: 'Sofía López', puntos: 4350, insignias: ['ri-star-fill', 'ri-ruler-2-fill'], esUsuario: false },
    { id: 5, posicion: 5, nombre: 'Diego Ramírez', puntos: 4120, insignias: ['ri-trophy-fill', 'ri-fire-fill'], esUsuario: false },
    { id: 6, posicion: 6, nombre: 'Valentina Torres', puntos: 3890, insignias: ['ri-trophy-line', 'ri-book-read-fill'], esUsuario: false },
    { id: 7, posicion: 7, nombre: 'Ana Martínez', puntos: 3450, insignias: ['ri-trophy-fill', 'ri-fire-fill', 'ri-star-fill'], esUsuario: true },
    { id: 8, posicion: 8, nombre: 'Miguel Sánchez', puntos: 3280, insignias: ['ri-compasses-2-fill'], esUsuario: false },
    { id: 9, posicion: 9, nombre: 'Isabella Flores', puntos: 3150, insignias: ['ri-book-read-fill', 'ri-lightbulb-fill'], esUsuario: false },
    { id: 10, posicion: 10, nombre: 'Alejandro Cruz', puntos: 2980, insignias: ['ri-fire-fill'], esUsuario: false },
  ];

  return (
    <div className={styles.rankingContainer}>
      
      {/* Banner Principal Amarillo */}
      <div className={styles.headerBanner}>
        <div className={styles.bannerIcon}><i className="ri-trophy-fill"></i></div>
        <h1 className={styles.bannerTitle}>Ranking Global</h1>
        <p className={styles.bannerSubtitle}>Compite con los mejores estudiantes</p>
      </div>

      {/* Selector de Tiempo Interactivo */}
      <div className={styles.toggleWrapper}>
        <div className={styles.toggleContainer}>
          <button 
            className={`${styles.toggleBtn} ${filtroActivo === 'semana' ? styles.activeBtn : ''}`}
            onClick={() => setFiltroActivo('semana')}
          >
            Esta Semana
          </button>
          
          <button 
            className={`${styles.toggleBtn} ${filtroActivo === 'mes' ? styles.activeBtn : ''}`}
            onClick={() => setFiltroActivo('mes')}
          >
            Este Mes
          </button>
          
          <button 
            className={`${styles.toggleBtn} ${filtroActivo === 'todo' ? styles.activeBtn : ''}`}
            onClick={() => setFiltroActivo('todo')}
          >
            Todo el Tiempo
          </button>
        </div>
      </div>

      {/* ================= EL PODIO ================= */}
      <div className={styles.podiumWrapper}>
        {top3.map((estudiante) => (
          <div 
            key={estudiante.id} 
            className={`${styles.podiumStep} ${styles[`step${estudiante.posicion}`]}`}
          >
            {estudiante.posicion === 1 && (
              <div className={styles.crown}><i className="ri-vip-crown-fill"></i></div>
            )}
            
            <div className={styles.avatarWrapper}>
              {/* Aquí cargamos el avatar local del Top 3 */}
              <img 
                src={estudiante.avatar} 
                alt={estudiante.nombre} 
                className={styles.avatarImage} 
              />
              <div className={styles.positionBadge}>{estudiante.posicion}</div>
            </div>
            
            <h3 className={styles.podiumName}>{estudiante.nombre}</h3>
            <p className={styles.podiumPoints}>{estudiante.puntos}</p>
            
            <div className={styles.podiumBadges}>
              <i className="ri-medal-fill" style={{ color: estudiante.posicion === 1 ? '#fff' : '#fde047' }}></i>
              <i className="ri-star-fill" style={{ color: '#fde047' }}></i>
              <i className="ri-fire-fill" style={{ color: '#f97316' }}></i>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLA DE POSICIONES ================= */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.colPos}>Posición</div>
          <div className={styles.colName}>Estudiante</div>
          <div className={styles.colPoints}>Puntos</div>
          <div className={styles.colBadges}>Insignias</div>
        </div>

        <div className={styles.tableBody}>
          {leaderboard.map((row) => (
            <div 
              key={row.id} 
              className={`${styles.tableRow} ${row.esUsuario ? styles.currentUserRow : ''}`}
            >
              <div className={styles.colPos}>
                <span className={styles.posNumber}>{row.posicion}</span>
              </div>
              
              <div className={styles.colName}>
                {/* Todos en la tabla usan su inicial, sin validaciones extra */}
                <div className={styles.listAvatar}>
                  {row.nombre.charAt(0)}
                </div>
                
                <div className={styles.nameContainer}>
                  <span className={styles.studentName}>{row.nombre}</span>
                  {row.esUsuario && <span className={styles.youBadge}>Tú</span>}
                </div>
              </div>
              
              <div className={styles.colPoints}>
                <span className={styles.pointsText}>{row.puntos}</span>
              </div>
              
              <div className={styles.colBadges}>
                {row.insignias.map((icono, index) => (
                  <i key={index} className={`${icono} ${styles.listBadgeIcon}`}></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}