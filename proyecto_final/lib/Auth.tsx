import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { Usuarios, SignUpFormData, SignInFormData, UpdateProfileData, AuthResult } from './database.types';

/**
 * 📝 Registro de nuevo usuario.
 * Crea la cuenta en Supabase Auth. El trigger en la BD se encarga de `public.usuarios`.
 */
export const signUp = async (data: SignUpFormData): Promise<AuthResult<User>> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          usuario: data.usuario,
          escuela: data.escuela,
          rol: data.rol || 'estudiante',
        },
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/index`,
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No se pudo crear la cuenta de autenticación.');


    return { data: authData.user, error: null };
  } catch (error) {
    console.error('[Auth] Error en signUp:', error);
    return { data: null, error: error as Error };
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