// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// 🎮 Rutas públicas que NO requieren autenticación
const PUBLIC_ROUTES = ['/', '/login', '/register']

// 🎯 Rutas protegidas base (y todos sus hijos)
const PROTECTED_BASE_ROUTES = ['/inicio']

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  // 🔧 Crear cliente de Supabase para servidor con manejo de cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response = NextResponse.next({ request })
              response.cookies.set(name, value, options)
            })
          } catch (error) {
            // En Server Components, setAll puede fallar; es seguro ignorarlo aquí
            console.warn('[Middleware] Cookie set error (ignorable):', error)
          }
        },
      },
    }
  )

  // 🔐 Validar sesión en servidor (getUser() verifica firma JWT, NO solo la cookie)
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError) {
    console.warn('[Middleware] Auth validation error:', authError.message)
  }

  const pathname = request.nextUrl.pathname

  // 🚫 Ignorar archivos estáticos, APIs de Next, etc.
  const isStaticAsset = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.') || // .png, .svg, .ico, etc.
    pathname === '/favicon.ico'

  if (isStaticAsset) {
    return response
  }

  // ✅ Verificar si es ruta pública explícita
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  // ✅ Verificar si es ruta protegida (base o hijos)
  const isProtectedRoute = PROTECTED_BASE_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // ─────────────────────────────────────────────────────
  // 🎯 LÓGICA DE PROTECCIÓN
  // ─────────────────────────────────────────────────────

  // 🔒 Si intenta acceder a ruta protegida SIN usuario → redirigir a /
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/', request.url)
    // Opcional: guardar ruta original para redirección post-login
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 🔓 Si ya está autenticado y va a /login o /register → redirigir a /inicio
  if (user && (pathname === '/login' || pathname === '/register')) {
    const redirectUrl = new URL('/inicio', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // 🎁 Bonus: Si hay parámetro ?redirect= y el usuario acaba de loguearse,
  // podrías manejarlo en el cliente (no en middleware para evitar loops)

  return response
}

// ⚙️ Configuración del matcher: qué rutas interceptar
export const config = {
  matcher: [
    /*
     * Intercepta todas las rutas EXCEPTO:
     * - Archivos estáticos de Next.js (_next/static, _next/image)
     * - Favicon y archivos con extensión (.png, .jpg, .svg, etc.)
     * - APIs de Next.js (/api/*) si las tienes
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}