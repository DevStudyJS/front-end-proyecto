export interface Usuarios {
  id_usuario: string;           // UUID vinculado a auth.users (PK)
  usuario: string;              // Nombre visible / username
  email: string;                // Correo electrónico único
  avatar: string;               // URL o ruta de la imagen de perfil
  courses_completed: number;    // [Gamificación] Cursos completados (RF 10, 22)
  last_date: string;            // Última actividad (ISO 8601, timestamptz en BD)
  escuela: string;              // Institución educativa
  rol: 'estudiante' | 'docente' | 'administrador' | 'invitado'; // RF 3
  dinero: number;               // [Gamificación] Dinero acumulado (RF 22)
  racha_dias: number;           // [Gamificación] Días consecutivos activos (Sprint 4)
  created_at: string;           // Fecha de creación automática
  updated_at: string;           // Última actualización automática
}

// Tipos estrictos para formularios de autenticación
export type SignUpFormData = {
  usuario: string;
  email: string;
  password: string;
  escuela: string;
  rol?: Usuarios['rol'];
  avatar?: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type UpdateProfileData = Partial<
  Pick<Usuarios, 'usuario' | 'avatar' | 'escuela' | 'courses_completed' | 'dinero' | 'racha_dias'>
>;

// Tipo de retorno estandarizado para operaciones de Auth
export type AuthResult<T> = {
  data: T | null;
  error: Error | null;
};

export type LoginFormData = {
  identifier: string; // Puede ser email o username
  password: string;
};

export type UsuarioPreview = Pick<Usuarios, 'usuario' | 'avatar' | 'rol'>
