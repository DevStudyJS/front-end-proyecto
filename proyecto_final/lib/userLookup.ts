// 📁 lib/userLookup.ts
import { supabase } from './supabase'
import type { Usuarios } from './database.types'

// ✅ Solo columnas seguras para exponer en login/preview (RNF 5)
export type PublicUserProfile = Pick<Usuarios, 'id_usuario' | 'usuario' | 'avatar' | 'rol'>

/**
 * Valida si un string tiene formato de correo electrónico estándar
 */
export const isValidEmail = (text: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())
}

/**
 * Busca un usuario por email o username.
 * Retorna solo datos públicos y normalizados.
 */
export const lookupUser = async (identifier: string): Promise<{ 
  user: PublicUserProfile | null; 
  error: Error | null 
}> => {
  const cleanId = identifier.trim()
  if (!cleanId) return { user: null, error: null }

  try {
    const isEmail = isValidEmail(cleanId)
    const normalized = cleanId.toLowerCase()

    // 🔒 Consulta estricta: SOLO columnas públicas + límite 1
    let query = supabase
      .from('usuarios')
      .select('id_usuario, usuario, avatar, rol')
      .limit(1)

    if (isEmail) {
      query = query.eq('email', normalized)
    } else {
      // ilike sin wildcards = búsqueda exacta case-insensitive
      query = query.ilike('usuario', normalized)
    }

    const { data, error } = await query.maybeSingle()

    if (error) throw error

    return { user: data as PublicUserProfile | null, error: null }
  } catch (err) {
    console.error('[lookupUser] Error:', err)
    return { user: null, error: err as Error }
  }
}