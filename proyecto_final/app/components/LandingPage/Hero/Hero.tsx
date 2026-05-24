import styles from './Hero.module.css';

interface HeroProps {
  courses: string;
  lessons: string;
  students: string;
}

export const Hero = ({ courses, lessons, students }: HeroProps) => {
  return (
    <header className={styles.hero} aria-label="Sección principal de bienvenida">
      
      {/* Fondo Geométrico Animado */}
      <div className={styles.bgShapes}>
        {/* Blobs principales */}
        <div className={`${styles.shape} ${styles.floatSlow}`} style={{ top: '10%', left: '5%', width: '128px', height: '128px', backgroundColor: 'rgba(251, 146, 60, 0.3)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div className={`${styles.shape} ${styles.floatMedium}`} style={{ top: '20%', right: '10%', width: '96px', height: '96px', backgroundColor: 'rgba(250, 204, 21, 0.3)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div className={`${styles.shape} ${styles.floatFast}`} style={{ bottom: '15%', left: '15%', width: '160px', height: '160px', backgroundColor: 'rgba(244, 114, 182, 0.3)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div className={`${styles.shape} ${styles.floatSlow}`} style={{ bottom: '25%', right: '20%', width: '112px', height: '112px', backgroundColor: 'rgba(165, 180, 252, 0.3)', borderRadius: '50%', filter: 'blur(40px)' }} />

        {/* Hexágono */}
        <div className={`${styles.shape} ${styles.floatMedium}`} style={{ top: '15%', left: '12%', width: '80px', height: '80px', background: 'linear-gradient(135deg, #fb923c, #ef4444)', opacity: 0.8, transform: 'rotate(12deg)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />

        {/* Rombo */}
        <div className={`${styles.shape} ${styles.floatSlow}`} style={{ top: '25%', right: '8%', width: '96px', height: '96px', background: 'linear-gradient(135deg, #fdba74, #facc15)', opacity: 0.7, transform: 'rotate(45deg)' }} />

        {/* Círculos pequeños */}
        <div className={`${styles.shape} ${styles.pulse}`} style={{ top: '8%', right: '25%', width: '24px', height: '24px', backgroundColor: 'rgba(251, 146, 60, 0.6)' }} />
        <div className={`${styles.shape} ${styles.pulse}`} style={{ top: '35%', left: '8%', width: '16px', height: '16px', backgroundColor: 'rgba(254, 243, 199, 0.6)', animationDelay: '0.5s' }} />
        <div className={`${styles.shape} ${styles.pulse}`} style={{ bottom: '30%', right: '35%', width: '48px', height: '48px', backgroundColor: 'rgba(251, 207, 232, 0.6)', animationDelay: '0.8s' }} />
        <div className={`${styles.shape} ${styles.pulse}`} style={{ bottom: '10%', left: '25%', width: '40px', height: '40px', backgroundColor: 'rgba(199, 210, 254, 0.6)', animationDelay: '1.1s' }} />

        {/* Triángulos */}
        <div className={`${styles.shape} ${styles.floatMedium}`} style={{ top: '40%', right: '15%', width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '26px solid rgba(147, 197, 253, 0.5)' }} />
        <div className={`${styles.shape} ${styles.floatFast}`} style={{ bottom: '35%', left: '30%', width: '0', height: '0', borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '20px solid rgba(253, 224, 71, 0.5)', transform: 'rotate(180deg)' }} />

        {/* Cuadrado con patrón */}
        <div className={`${styles.shape} ${styles.floatSlow}`} style={{ bottom: '8%', right: '8%', width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(192, 132, 252, 0.4))' }}>
          <div style={{ width: '100%', height: '100%', opacity: 0.5, backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '8px 8px' }} />
        </div>

        {/* Blobs orgánicos grandes */}
        <div className={`${styles.shape} ${styles.floatSlow}`} style={{ top: '5%', right: '15%', width: '256px', height: '256px', backgroundColor: 'rgba(216, 180, 254, 0.2)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div className={`${styles.shape} ${styles.floatMedium}`} style={{ bottom: '5%', left: '5%', width: '320px', height: '320px', backgroundColor: 'rgba(165, 180, 252, 0.2)', borderRadius: '50%', filter: 'blur(90px)' }} />
        <div className={`${styles.shape} ${styles.floatFast}`} style={{ top: '45%', left: '45%', width: '384px', height: '384px', backgroundColor: 'rgba(252, 207, 232, 0.15)', borderRadius: '50%', filter: 'blur(100px)' }} />

        {/* Líneas decorativas SVG */}
        <svg className={`${styles.shape} ${styles.spinSlow}`} style={{ top: '30%', left: '20%', width: '128px', height: '128px', opacity: 0.2 }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1" fill="none" strokeDasharray="5,5"/>
        </svg>
        <svg className={`${styles.shape} ${styles.spinSlow}`} style={{ bottom: '20%', right: '25%', width: '96px', height: '96px', opacity: 0.15, animationDirection: 'reverse' }} viewBox="0 0 100 100">
          <polygon points="50,5 95,75 5,75" stroke="white" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          Prepárate para el <br />
          <span className={styles.titleHighlight}>Bachillerato</span>
        </h1>

        <p className={styles.subtitle}>
          Aprende las bases para el examen <span className={styles.subtitleHighlight}>ECOEMS</span> de forma divertida con nuestra plataforma de gamificación educativa. 
          Explora islas temáticas, completa desafíos y alcanza tus metas.
        </p>

        <div className={styles.buttonGroup}>
          <button className={styles.btnPrimary}>
            <span><i className={`ri-space-ship-2-line`} aria-hidden="true"></i> Comenzar Aventura</span>
          </button>
          <button className={styles.btnSecondary}>
            <i className={`ri-question-line`} aria-hidden="true"></i> Ver Cómo Funciona
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={`${styles.statValue} ${styles.colorYellow}`}>{courses}</div>
            <div className={styles.statLabel}>Cursos Actuales</div>
          </div>
          
          <div className={styles.statCard}>
            <div className={`${styles.statValue} ${styles.colorOrange}`}>{lessons}+</div>
            <div className={styles.statLabel}>Lecciones Interactivas</div>
          </div>
          
          <div className={styles.statCard}>
            <div className={`${styles.statValue} ${styles.colorRed}`}>{students}+</div>
            <div className={styles.statLabel}>Estudiantes Activos</div>
          </div>
        </div>
      </div>

      {/* Degradado inferior para transición suave */}
      <div className={styles.bottomGradient} />
    </header>
  );
};