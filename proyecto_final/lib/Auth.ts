import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { Usuarios, SignUpFormData, SignInFormData, UpdateProfileData, AuthResult } from './database.types';

/**
 * 📝 Registro de nuevo usuario.
 * Crea la cuenta en Supabase Auth. El trigger en la BD se encarga de `public.usuarios`.
 */
export const signUp = async (data: SignUpFormData): Promise<AuthResult<User>> => {
  try {
    const normalizedEmail = data.email.trim().toLowerCase();
    const normalizedUsuario = data.usuario.trim();
    const normalizedEscuela = data.escuela.trim();

    console.log('[Auth] signUp iniciando:', { 
      email: normalizedEmail, 
      usuario: normalizedUsuario,
      rol: data.rol,
      avatar: data.avatar?.substring(0, 80)
    });

    // 🔐 1️⃣ Crear usuario en auth.users de Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: data.password,
      options: {
        data: {
          usuario: normalizedUsuario,
          escuela: normalizedEscuela,
          rol: data.rol || 'estudiante',
          avatar: data.avatar || '',
        },
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/index`,
      },
    });

    if (authError) {
      console.error('[Auth] auth.signUp error:', authError);
      
      // 🎮 Mensajes gamificados para errores comunes
      if (authError.message?.includes('already registered')) {
        return { data: null, error: new Error('⚠️ Este correo ya tiene un personaje registrado.') };
      }
      if (authError.message?.includes('invalid')) {
        return { data: null, error: new Error('❌ Formato de correo inválido.') };
      }
      if (authError.message?.includes('password')) {
        return { data: null, error: new Error('🔒 La contraseña debe tener al menos 6 caracteres.') };
      }
      throw authError;
    }

    if (!authData.user) {
      throw new Error('No se pudo crear la cuenta de autenticación.');
    }

    console.log('[Auth] ✅ Usuario creado en auth.users:', authData.user.id);

    // 🎮 2️⃣ CREAR PERFIL EXPLÍCITO en public.usuarios (SIN TRIGGERS)
    // Valores iniciales gamificados para DevStudy
    const perfilInicial: Partial<Usuarios> = {
      id_usuario: authData.user.id,
      usuario: normalizedUsuario,
      email: normalizedEmail,
      avatar: data.avatar || 'https://api.dicebear.com/9.x/pixel-art/svg?seed=default',
      escuela: normalizedEscuela,
      rol: data.rol || 'estudiante',
    };

    // 🔄 Intentar insertar con manejo de errores específico
    const { data: perfilCreado, error: insertError } = await supabase
      .from('usuarios')
      .insert(perfilInicial)
      .select()
      .single();

    if (insertError) {
      console.error('[Auth] ❌ Error insertando perfil en public.usuarios:', {
        code: insertError.code,
        message: insertError.message,
        hint: insertError.hint,
        details: insertError.details,
      });

      // 🎮 Manejo de errores con mensajes amigables
      if (insertError.code === '23505') { // unique_violation
        // Verificar qué campo duplicó
        if (insertError.message?.includes('usuarios_usuario_key')) {
          return { 
            data: null, 
            error: new Error('⚠️ El nombre de usuario "' + normalizedUsuario + '" ya está en uso. ¡Elige otro!') 
          };
        }
        if (insertError.message?.includes('usuarios_email_key')) {
          return { 
            data: null, 
            error: new Error('⚠️ Este correo ya tiene una cuenta registrada.') 
          };
        }
        if (insertError.message?.includes('usuarios_pkey')) {
          // El usuario ya existe en auth pero el perfil falló - intentar recuperar
          console.warn('[Auth] ⚠️ Perfil duplicado, intentando recuperar existente...');
          const { data: existing, error: fetchError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id_usuario', authData.user.id)
            .maybeSingle();
            
          if (fetchError || !existing) {
            return { 
              data: null, 
              error: new Error('⚠️ Conflicto de datos. Intenta de nuevo o contacta soporte.') 
            };
          }
          // Perfil recuperado exitosamente
          return { data: authData.user, error: null };
        }
      }

      // Error no manejado - rollback opcional (eliminar usuario de auth si falla perfil)
      console.warn('[Auth] 🔄 Intentando rollback de auth.user por fallo en perfil...');
      // Nota: No eliminamos el user de auth para no complicar, pero podrías hacerlo:
      // await supabase.auth.admin.deleteUser(authData.user.id);
      
      return { 
        data: null, 
        error: new Error('❌ No se pudo guardar tu perfil. Verifica tu conexión e intenta de nuevo.') 
      };
    }

    console.log('[Auth] ✅ Perfil creado exitosamente en public.usuarios:', {
      id: perfilCreado?.id_usuario,
      usuario: perfilCreado?.usuario,
      puntos_iniciales: perfilCreado?.puntos,
      racha: perfilCreado?.racha_dias
    });

    // 🎉 3️⃣ Registrar evento de bienvenida para analytics/gamificación
    // (Opcional - si tienes tabla de logs o eventos)
    /*
    await supabase.from('user_events').insert({
      id_usuario: authData.user.id,
      event_type: 'welcome_registration',
      metadata: { 
        rol: data.rol, 
        escuela: normalizedEscuela,
        bonus_points: 50 
      }
    });
    */

    return { data: authData.user, error: null };

  } catch (error: any) {
    console.error('[Auth] ❌ Error crítico en signUp:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      status: error?.status,
      hint: error?.hint,
      details: error?.details,
      isDev: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
    
    // 🎮 Mensajes de error gamificados y útiles
    if (error?.message?.includes('Database error') || error?.code?.includes('53')) {
      return { 
        data: null, 
        error: new Error('🌐 Error de conexión con la base de datos. Intenta en unos segundos.') 
      };
    }
    if (error?.message?.includes('duplicate') || error?.code === '23505') {
      return { 
        data: null, 
        error: new Error('⚠️ Este usuario o correo ya está registrado. ¡Prueba con otro!') 
      };
    }
    if (error?.message?.includes('policy') || error?.code === '42501') {
      return { 
        data: null, 
        error: new Error('🔒 Permiso denegado. Contacta al administrador si el problema persiste.') 
      };
    }
    
    return { data: null, error: error instanceof Error ? error : new Error('Quest fallida. Intenta de nuevo.') };
  }
};

/**
 * 🔑 Inicio de sesión.
 * Autentica y actualiza `last_date` para tracking de actividad.
 */
export const signIn = async (data: SignInFormData): Promise<AuthResult<Session>> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.session) throw new Error('No se pudo iniciar sesión.');

    // Actualizar última actividad en la tabla `usuarios`
    await supabase
      .from('usuarios')
      .update({ last_date: new Date().toISOString() })
      .eq('id_usuario', authData.session.user.id);

    return { data: authData.session, error: null };
  } catch (error) {
    console.error('[Auth] Error en signIn:', error);
    return { data: null, error: error as Error };
  }
};

/**
 * 🚪 Cierre de sesión.
 */
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('[Auth] Error en signOut:', error);
    return { error: error as AuthError };
  }
};

/**
 * 👤 Obtener usuario autenticado y su perfil completo.
 */
export const getCurrentUser = async (): Promise<{
  user: User | null;
  profile: Usuarios | null;
  error: Error | null;
}> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return { user: null, profile: null, error: null };

    const { data: profile, error: profileError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id_usuario', session.user.id)
      .single();

    // PGRST116 = No rows returned (perfil no existe, manejado por trigger)
    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }

    return { user: session.user, profile: (profile as Usuarios) || null, error: null };
  } catch (error) {
    console.error('[Auth] Error en getCurrentUser:', error);
    return { user: null, profile: null, error: error as Error };
  }
};

/**
 * 🔄 Suscribirse a cambios de autenticación en tiempo real.
 * Útil para mantener el estado global sincronizado sin recargar.
 */
export const onAuthStateChange = (
  callback: (event: string, session: Session | null) => void
) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription; // Llama .unsubscribe() al desmontar componente
};

/**
 * ✏️ Actualizar datos del perfil del usuario.
 */
export const updateUserProfile = async (
  userId: string,
  updates: UpdateProfileData
): Promise<AuthResult<Usuarios>> => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .update({ ...updates, last_date: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id_usuario', userId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Usuarios, error: null };
  } catch (error) {
    console.error('[Auth] Error en updateUserProfile:', error);
    return { data: null, error: error as Error };
  }
};

/**
 * 🔒 Verificar sesión activa (helper para componentes/middleware).
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};