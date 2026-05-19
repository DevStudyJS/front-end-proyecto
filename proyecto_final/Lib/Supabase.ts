// Paso 1: Importamos la función para crear el cliente de Supabase
import { createClient } from "@supabase/supabase-js";

// Paso 2: Leemos las variables de entorno (URL y clave anónima)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Paso 3: Creamos y exportamos el cliente de Supabase
// Este cliente se usa para hacer consultas a la base de datos
export const supabase = createClient(supabaseUrl, supabaseAnonKey);