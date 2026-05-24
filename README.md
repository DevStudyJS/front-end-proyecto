# 🎓 DevStudy v2.0
> Plataforma educativa gamificada para la preparación de exámenes de ingreso a la educación media superior.

[![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)](#)
[![Versión](https://img.shields.io/badge/Versión-2.0-blue)](#)
[![Semestre](https://img.shields.io/badge/Semestre-2026--II-orange)](#)
[![Licencia](https://img.shields.io/badge/Licencia-Académica_UNAM-green)](#)

## 📖 Descripción
**DevStudy** es un proyecto académico desarrollado por estudiantes de la carrera de *Matemáticas Aplicadas y Computación* de la **FES Acatlán - UNAM**. 

Nuestra misión es transformar la preparación para procesos de selección (como el ECOEMS) mediante la **gamificación pedagógica**, integrando mecánicas de videojuegos, retroalimentación inmediata y seguimiento analítico para motivar a los estudiantes, permitir el re-intento sin penalización y potenciar el aprendizaje significativo.

🎯 **Objetivo General:** Diseñar y construir un sitio web responsive, gratuito y de acceso público que integre cursos de preparación con herramientas digitales innovadoras, escalables mediante APIs y con posibilidad de integración a plataformas externas (Moodle, Google Classroom).

## 🚀 Características Principales
### 🎮 Gamificación & Retención
- ✅ Sistema de rachas diarias con recordatorios (WhatsApp/Correo)
- ✅ Insignias y logros escalables por completar tareas
- ✅ Mundos interactivos y misiones con personajes históricos
- ✅ Leaderboards globales por curso
- ✅ Personalización de avatares y sistema de puntos/experiencia

### 👥 Roles de Usuario
| Rol | Acceso y Funcionalidades |
|---|---|
| 🎓 **Estudiante** | Usuario principal. Accede a cursos, juegos, evaluaciones y visualiza su progreso. |
| 👨‍🏫 **Docente** | Crea/gestiona cursos, actividades lúdicas, banco de preguntas, sube materiales y consulta analíticas. |
| 👤 **Invitado** | Explora la plataforma mediante un tour interactivo sin registro. |
| 🔑 **Administrador** | Gestiona permisos, usuarios, valida funcionalidades y supervisa métricas globales. |
| 💻 **Developer** | Mantiene la arquitectura, desarrolla nuevas features y da soporte técnico. |

### 📚 Gestión Educativa
- 📊 Cursos con seguimiento de progreso individual y grupal
- 📝 Banco de preguntas con generación aleatoria de exámenes
- 🔄 Evaluaciones tipo ECOEMS con retroalimentación inmediata
- 📎 Soporte para materiales: PDFs, videos, enlaces, cuestionarios
- 📈 Reportes exportables en PDF y CSV

## 🛠️ Stack Tecnológico
| Área | Tecnologías |
|---|---|
| **Frontend** | React, Vite, TypeScript, JavaScript, HTML5, CSS3 |
| **Backend** | Node.js, API REST, Express/Fastify (por definir) |
| **Base de Datos** | Relacional (PostgreSQL/MySQL), Normalizada a 3FN |
| **DevOps & Despliegue** | Docker, GitHub Actions, Vercel |
| **Gestión & Comunicación** | Notion, Discord/WhatsApp, GitHub Projects |
| **IA Asistida** | Copilot, Cursor, NotebookLM, Gemini, Claude |

## ⚙️ Instalación y Configuración
> ⚠️ *Requisitos previos: Node.js v18+, npm/pnpm, Docker (opcional).*

1. **Clonar el repositorio**
   ```bash
    git clone https://github.com/tu-organizacion/devstudy.git
    cd devstudy
   ```

2. **Instalar dependencias**
    ```bash
        # Frontend
        cd client && npm install
        # Backend
        cd ../server && npm install
    ```
3. **Configuración de variables de entorno**
    ```bash
    cp .env.example .env
    # Edita `.env` con tus credenciales locales
    ```

4. **Ejecutar en modo desarrollo**
    ```bash
        npm run dev:client
        npm run dev:server
    ```

## 👥 Equipo de Desarrollo
| Nombre | Usuario | Rol Principal |
| :--- | :---: | ---: |
| Buenrostro Cruces Sarai | @SaraiCruces | Developer |
| Gil de Gaona Jazmín | @JazGil | Developer, Admin del Sitio, Product Owner |
| Hernández Peña Angel Adrian | @SinR0str0 | Project Manager, Developer, Arquitecto de Software |
| Medina Hernández Ramón | @RamonMedina04 | Administrador de BD, QA Tester |
| Pérez López Zaira Cecilia | @ZairaP-coder | Developer |

## 📜 Licencia
Proyecto académico sin fines de lucro. Uso educativo autorizado bajo los lineamientos de la **Universidad Nacional Autónoma de México (UNAM)**.

## 📬 Contacto & Soporte
¿Tienes dudas, sugerencias o quieres colaborar?
🐛 Reportar errores: Issues del repositorio
📧 Correo: [devstudyjs@gmail.com]
