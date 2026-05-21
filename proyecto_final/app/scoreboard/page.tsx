import React from 'react';
import styles from './scoreboard.module.css';
import 'remixicon/fonts/remixicon.css';

export default function MiProgreso() {
  // Datos simulados (Mock data)
  const progresoUnidades = [
    { id: 1, titulo: 'Álgebra', completado: 15, total: 20, porcentaje: 75, color: '#eab308', icono: 'ri-superscript' },
    { id: 2, titulo: 'Trigonometría', completado: 10, total: 25, porcentaje: 40, color: '#3b82f6', icono: 'ri-shape-line' },
    { id: 3, titulo: 'Geometría', completado: 0, total: 18, porcentaje: 0, color: '#06b6d4', icono: 'ri-compasses-2-line' },
    { id: 4, titulo: 'Cálculo', completado: 0, total: 22, porcentaje: 0, color: '#a855f7', icono: 'ri-functions' },
  ];

  const historial = [
    { id: 1, examen: 'Ecuaciones Lineales', tema: 'Álgebra', fecha: '2024-05-15', calificacion: 95 },
    { id: 2, examen: 'Sistemas de 2x2', tema: 'Álgebra', fecha: '2024-05-14', calificacion: 88 },
    { id: 3, examen: 'Teorema de Pitágoras', tema: 'Geometría', fecha: '2024-05-12', calificacion: 72 },
    { id: 4, examen: 'Leyes de Senos', tema: 'Trigonometría', fecha: '2024-05-10', calificacion: 91 },
  ];

  const insignias = [
    { id: 1, titulo: 'Primera Victoria', icono: 'ri-trophy-fill', activa: true },
    { id: 2, titulo: 'Racha de 7 días', icono: 'ri-fire-fill', activa: true },
    { id: 3, titulo: 'Maestro del Álgebra', icono: 'ri-ruler-2-fill', activa: false },
    { id: 4, titulo: 'Perfeccionista', icono: 'ri-star-fill', activa: true },
  ];

  return (
    <div className={styles.progresoContainer}>
      
      {/* Banner Principal */}
      <div className={styles.headerBanner}>
        <h1 className={styles.bannerTitle}>Tu Progreso</h1>
        <p className={styles.bannerSubtitle}>Sigue mejorando cada día en el archipiélago</p>
      </div>

      {/* Tarjetas de Resumen (Stats) */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blueIcon}`}><i className="ri-book-read-fill"></i></div>
          <div className={styles.statValue}>24</div>
          <div className={styles.statLabel}>Lecciones Completadas</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.greenIcon}`}><i className="ri-check-double-line"></i></div>
          <div className={styles.statValue}>87%</div>
          <div className={styles.statLabel}>Precisión Promedio</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.orangeIcon}`}><i className="ri-time-fill"></i></div>
          <div className={styles.statValue}>12h</div>
          <div className={styles.statLabel}>Tiempo de Estudio</div>
        </div>
      </div>

      {/* Progreso por Unidad */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Progreso por Isla</h2>
        <div className={styles.progressList}>
          {progresoUnidades.map((unidad) => (
            <div key={unidad.id} className={styles.progressItem}>
              <div className={styles.progressHeader}>
                <div className={styles.unitInfo}>
                  <div className={styles.unitIcon} style={{ backgroundColor: unidad.color }}>
                    <i className={unidad.icono}></i>
                  </div>
                  <span className={styles.unitTitle}>{unidad.titulo}</span>
                </div>
                <div className={styles.unitStats}>
                  {unidad.completado}/{unidad.total} ({unidad.porcentaje}%)
                </div>
              </div>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${unidad.porcentaje}%`, backgroundColor: unidad.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Historial de Evaluaciones */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Historial de Misiones</h2>
        <div className={styles.historyList}>
          {historial.map((evaluacion) => (
            <div key={evaluacion.id} className={styles.historyItem}>
              <div className={styles.historyInfo}>
                <h4 className={styles.historyTitle}>
                  {evaluacion.examen} <span className={styles.historyTopic}>{evaluacion.tema}</span>
                </h4>
                <span className={styles.historyDate}>{evaluacion.fecha}</span>
              </div>
              <div className={`${styles.scoreBadge} ${evaluacion.calificacion >= 80 ? styles.scoreHigh : styles.scoreMedium}`}>
                {evaluacion.calificacion}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insignias */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Insignias Desbloqueadas</h2>
        <div className={styles.badgesGrid}>
          {insignias.map((insignia) => (
            <div key={insignia.id} className={`${styles.badgeCard} ${!insignia.activa ? styles.badgeLocked : ''}`}>
              <div className={styles.badgeIcon}>
                <i className={insignia.icono}></i>
              </div>
              <span className={styles.badgeTitle}>
                {insignia.titulo}
                {!insignia.activa && <span className={styles.lockedText}>Bloqueada</span>}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}