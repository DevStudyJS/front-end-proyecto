import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { Usuarios, SignUpFormData, SignInFormData, UpdateProfileData, AuthResult } from './database.types';

/**
 * Registro de nuevo usuario.
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

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: data.password,
      options: {
        data: {
          usuario: normalizedUsuario,
          escuela: normalizedEscuela,
          rol: data.rol || 'estudiante',
          avatar: data.avatar || 'https://api.dicebear.com/9.x/pixel-art/svg?seed=default', // ✅ Nunca vacío
        },
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/index`,
      },
    });

    if (authError) {
      console.error('[Auth] auth.signUp error:', authError);
<<<<<<< HEAD

=======
      // ... (tus mensajes de error gamificados se mantienen) ...
>>>>>>> 77b03dc3f088cb20e3363c6b0667a19c89ee9057
      if (authError.message?.includes('already registered')) {
        return { data: null, error: new Error('⚠️ Este correo ya tiene un personaje registrado.') };
      }
      throw authError;
    }

    if (!authData.user) {
      throw new Error('No se pudo crear la cuenta de autenticación.');
    }

<<<<<<< HEAD
    // ✅ Aquí logueamos el usuario recibido
    console.log('[Auth] Usuario recibido de Supabase:', 
      {
        id: authData.user.id,
        email: authData.user.email,
        metadata: authData.user.user_metadata,
        createdAt: authData.user.created_at
      });

    console.log('[Auth] ✅ Usuario creado en auth.users:', authData.user.id);

    // 🚫 No insertamos en public.usuarios porque el trigger lo hace automáticamente
    return { data: authData.user, error: null };

  } catch (error: any) {
=======
    console.log('[Auth] ✅ Usuario creado en auth.users:', authData.user.id);

    // 🎯 2️⃣ ✅ EL TRIGGER SE ENCARGA DE public.usuarios
    // Solo esperamos un momento para que el trigger termine (opcional pero recomendado)
    await new Promise(resolve => setTimeout(resolve, 300));

    // 🎮 3️⃣ Verificar que el perfil se creó correctamente (para feedback inmediato)
    const { data: perfil, error: perfilError } = await supabase
      .from('usuarios')
      .select('avatar, usuario, rol')
      .eq('id_usuario', authData.user.id)
      .maybeSingle();

    if (perfilError) {
      console.warn('[Auth] ⚠️ Perfil no disponible inmediatamente, pero el registro fue exitoso');
      // No bloqueamos el flujo, el trigger puede tardar unos ms
    } else {
      console.log('[Auth] ✅ Perfil verificado en public.usuarios:', {
        avatar: perfil?.avatar?.substring(0, 60),
        usuario: perfil?.usuario
      });
    }

    return { data: authData.user, error: null };

  } catch (error: any) {
    // ... (tu manejo de errores se mantiene igual) ...
>>>>>>> 77b03dc3f088cb20e3363c6b0667a19c89ee9057
    console.error('[Auth] ❌ Error crítico en signUp:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Quest fallida. Intenta de nuevo.') };
  }
};

/**
 * 🔑 Inicio de sesión.
 */
export const signIn = async (data: SignInFormData): Promise<AuthResult<Session>> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.session) throw new Error('No se pudo iniciar sesión.');

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
 */
export const onAuthStateChange = (
  callback: (event: string, session: Session | null) => void
) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
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
 * 🔒 Verificar sesión activa.
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};