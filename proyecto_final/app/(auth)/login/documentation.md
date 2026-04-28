# Documentación de la Página de Login

## Descripción General

La página de login (`app/(auth)/login/`) es el punto de entrada para la autenticación de usuarios en la aplicación DevStudy. Esta página combina un formulario de login interactivo con una escena visual espacial que responde dinámicamente a la entrada del usuario.

## Estructura de Archivos

### `login.tsx`
- **Tipo**: Componente de página principal (Next.js App Router)
- **Ubicación**: `app/(auth)/login/login.tsx`
- **Función**: Renderiza el layout principal de la página de login, dividiendo la pantalla en dos secciones principales.

### `login.module.css`
- **Tipo**: Estilos CSS modulares
- **Ubicación**: `app/(auth)/login/login.module.css`
- **Función**: Define los estilos responsivos para el layout de la página de login.

### `documentation.md`
- **Tipo**: Archivo de documentación
- **Ubicación**: `app/(auth)/login/documentation.md`
- **Función**: Este archivo que documenta la implementación y conexiones.

## Componentes Utilizados

### LoginForm
- **Importado desde**: `@/features/auth/components/LoginForm`
- **Función**: Maneja la lógica del formulario de login, incluyendo validación de usuarios y gestión de estado.
- **Props**:
  - `onUsernameChange`: Callback que recibe datos del jugador cuando el username coincide con un usuario registrado.

### SpaceScene
- **Importado desde**: `@/features/auth/components/SpaceScene`
- **Función**: Renderiza una escena 3D/visual espacial que muestra un avatar cuando se detecta un usuario válido.
- **Props**:
  - `showAvatar`: Booleano que indica si mostrar el avatar
  - `avatarData`: Datos del jugador (username, avatar URL, título)

## Base de Datos de Usuarios

La aplicación utiliza una base de datos simulada (`PLAYERS_DB`) en `LoginForm.tsx` con los siguientes usuarios predefinidos:

- **astro_dev**: Explorador Estelar
- **math_wizard**: Mago Matemático  
- **dev_student**: Aprendiz Dev

Cada usuario tiene:
- Username único
- URL de avatar generado dinámicamente (usando DiceBear API)
- Título descriptivo

## Funcionalidad

1. **Formulario de Login**:
   - Campos para username y password
   - Validación en tiempo real del username contra la base de datos
   - Actualización del estado del avatar cuando se reconoce un usuario

2. **Escena Visual**:
   - Muestra una escena espacial en la sección derecha
   - Activa la visualización del avatar cuando se ingresa un username válido
   - Diseño responsivo que se adapta a móviles y desktop

3. **Layout Responsivo**:
   - En móviles: Layout vertical con fondo gradiente
   - En desktop: Layout horizontal dividido en dos secciones

## Conexiones y Dependencias

- **Next.js App Router**: Utiliza el sistema de rutas de Next.js 13+ con directorios agrupados `(auth)`
- **React Hooks**: `useState` para gestión de estado del avatar
- **CSS Modules**: Estilos encapsulados para evitar conflictos
- **TypeScript**: Tipado fuerte para `PlayerData` y props de componentes
- **DiceBear API**: Generación de avatares SVG personalizados

## Flujo de Usuario

1. Usuario ingresa username en el formulario
2. `LoginForm` valida contra `PLAYERS_DB`
3. Si válido, llama `onUsernameChange` con datos del jugador
4. `login.tsx` actualiza estado `avatarData`
5. `SpaceScene` recibe props actualizadas y muestra avatar
6. Usuario puede proceder con el login (lógica de submit pendiente de implementación)

## Notas de Implementación

- La lógica de autenticación real (verificación de password) aún no está implementada
- El formulario actualmente solo registra el intento de login en consola
- La escena espacial es puramente visual y no afecta la funcionalidad de login
- Diseño optimizado para experiencia de usuario inmersiva en educación/dev

## Próximos Pasos

- Implementar validación de password
- Conectar con backend/API de autenticación
- Agregar manejo de errores y feedback al usuario
- Implementar redirección post-login