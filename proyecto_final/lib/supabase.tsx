import { createClient } from '@supabase/supabase-js';

// Usamos el signo de exclamación (!) al final para prometerle a TypeScript 
// que estas variables de entorno sí existen y no son "undefined"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Exportamos el cliente para poder usarlo en toda la app
export const supabase = createClient(supabaseUrl, supabaseKey);