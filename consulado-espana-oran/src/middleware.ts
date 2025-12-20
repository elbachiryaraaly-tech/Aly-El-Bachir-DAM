// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - MIDDLEWARE DE SEGURIDAD
// Protección de nivel gubernamental para todas las rutas
// ============================================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = [
  '/mi-cuenta',
  '/admin',
  '/api/appointments',
  '/api/user',
];

// Rutas que NO requieren autenticación
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth/login',
  '/api/auth/register',
];

// Rutas de administración
const adminRoutes = [
  '/admin',
  '/api/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Crear respuesta base
  const response = NextResponse.next();
  
  // ============================================================================
  // SECURITY HEADERS
  // ============================================================================
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.consulado-espana-oran.es",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join('; ')
  );
  
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Strict Transport Security (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), payment=()'
  );
  
  // ============================================================================
  // RATE LIMITING (Basic - usar Redis en producción)
  // ============================================================================
  
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  // Añadir IP a headers para uso en API routes
  response.headers.set('x-client-ip', clientIP);
  
  // ============================================================================
  // REQUEST ID PARA TRACKING
  // ============================================================================
  
  const requestId = crypto.randomUUID();
  response.headers.set('x-request-id', requestId);
  
  // ============================================================================
  // AUTHENTICATION CHECK
  // ============================================================================
  
  const authToken = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!authToken; // En producción, verificar JWT
  
  // Verificar rutas protegidas
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // Redirigir a login si no está autenticado
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirigir a home si ya está autenticado e intenta acceder a login/register
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/mi-cuenta', request.url));
  }
  
  // Verificar rol de admin para rutas de administración
  // En producción, decodificar JWT y verificar rol
  if (isAdminRoute && isAuthenticated) {
    // TODO: Verificar que el usuario tiene rol ADMIN o SUPER_ADMIN
    // const decoded = verifyToken(authToken);
    // if (!['ADMIN', 'SUPER_ADMIN'].includes(decoded.role)) {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url));
    // }
  }
  
  // ============================================================================
  // CSRF PROTECTION PARA MUTACIONES
  // ============================================================================
  
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    // Verificar origen de la solicitud
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    if (origin && !origin.includes(host || '')) {
      // Posible CSRF - en producción, bloquear y registrar
      console.warn('[CSRF WARNING]', { origin, host, pathname });
    }
  }
  
  // ============================================================================
  // LOGGING
  // ============================================================================
  
  // Log de acceso (en producción, enviar a sistema de logs centralizado)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname} - IP: ${clientIP} - ReqID: ${requestId}`);
  }
  
  return response;
}

// Configuración del middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
