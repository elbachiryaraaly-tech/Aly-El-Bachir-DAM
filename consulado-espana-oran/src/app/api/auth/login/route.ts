// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - API DE LOGIN
// Autenticación segura con protección contra ataques
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { verifyPassword } from '@/lib/security/password';
import { generateTokenPair } from '@/lib/security/jwt';
import { consumeRateLimit, getClientIdentifier } from '@/lib/security/rate-limiter';
import { logSuccessfulLogin, logFailedLogin, logBruteForceAttempt } from '@/lib/security/audit';
import { generateSecureToken } from '@/lib/security/encryption';

// Schema de validación
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
  captchaToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const clientIP = request.headers.get('x-client-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const requestId = request.headers.get('x-request-id') || generateSecureToken(16);

  try {
    // ============================================================================
    // RATE LIMITING
    // ============================================================================
    
    const rateLimitResult = await consumeRateLimit('login', clientIP);
    
    if (!rateLimitResult.allowed) {
      // Posible ataque de fuerza bruta
      await logBruteForceAttempt(clientIP, 'unknown');
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Demasiados intentos de inicio de sesión. Por favor, espere antes de intentarlo de nuevo.',
            retryAfter: rateLimitResult.retryAfter,
          },
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter || 60),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // ============================================================================
    // VALIDACIÓN DE ENTRADA
    // ============================================================================
    
    const body = await request.json();
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Datos de entrada inválidos',
            details: validation.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // ============================================================================
    // BUSCAR USUARIO
    // ============================================================================
    
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isBlocked: true,
        blockReason: true,
        twoFactorEnabled: true,
        failedLoginAttempts: true,
        lastFailedLogin: true,
        mustChangePassword: true,
      },
    });

    // ============================================================================
    // VERIFICACIONES DE SEGURIDAD
    // ============================================================================
    
    if (!user) {
      await logFailedLogin(email, clientIP, 'Usuario no encontrado', userAgent);
      
      // Respuesta genérica para no revelar si el usuario existe
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Email o contraseña incorrectos',
          },
        },
        { status: 401 }
      );
    }

    // Verificar si la cuenta está bloqueada
    if (user.isBlocked) {
      await logFailedLogin(email, clientIP, 'Cuenta bloqueada', userAgent);
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACCOUNT_BLOCKED',
            message: 'Su cuenta ha sido bloqueada. ' + (user.blockReason || 'Contacte con el consulado para más información.'),
          },
        },
        { status: 403 }
      );
    }

    // Verificar si la cuenta está activa
    if (!user.isActive) {
      await logFailedLogin(email, clientIP, 'Cuenta inactiva', userAgent);
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACCOUNT_INACTIVE',
            message: 'Su cuenta no está activa. Por favor, verifique su email o contacte con el consulado.',
          },
        },
        { status: 403 }
      );
    }

    // Verificar bloqueo por intentos fallidos
    if (user.failedLoginAttempts >= 5) {
      const lockoutEnd = user.lastFailedLogin 
        ? new Date(user.lastFailedLogin.getTime() + 30 * 60 * 1000) // 30 minutos
        : new Date();
      
      if (new Date() < lockoutEnd) {
        await logFailedLogin(email, clientIP, 'Cuenta bloqueada temporalmente', userAgent);
        
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'ACCOUNT_LOCKED',
              message: 'Su cuenta está bloqueada temporalmente por múltiples intentos fallidos.',
              retryAfter: Math.ceil((lockoutEnd.getTime() - Date.now()) / 1000),
            },
          },
          { status: 423 }
        );
      }
    }

    // ============================================================================
    // VERIFICAR CONTRASEÑA
    // ============================================================================
    
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    
    if (!isValidPassword) {
      // Incrementar contador de intentos fallidos
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: { increment: 1 },
          lastFailedLogin: new Date(),
        },
      });
      
      await logFailedLogin(email, clientIP, 'Contraseña incorrecta', userAgent);
      
      const remainingAttempts = Math.max(0, 5 - (user.failedLoginAttempts + 1));
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Email o contraseña incorrectos',
            remainingAttempts: remainingAttempts > 0 ? remainingAttempts : undefined,
          },
        },
        { status: 401 }
      );
    }

    // ============================================================================
    // VERIFICACIÓN 2FA SI ESTÁ HABILITADO
    // ============================================================================
    
    if (user.twoFactorEnabled) {
      // Generar token temporal para el paso de 2FA
      const twoFactorToken = generateSecureToken(32);
      
      // Guardar token temporal (en producción usar Redis con TTL)
      // Por ahora lo incluimos en la respuesta
      
      return NextResponse.json({
        success: true,
        requiresTwoFactor: true,
        twoFactorToken,
        message: 'Se requiere verificación de dos factores',
      });
    }

    // ============================================================================
    // CREAR SESIÓN
    // ============================================================================
    
    const sessionId = generateSecureToken(32);
    const tokens = generateTokenPair(
      user.id,
      user.email,
      user.role,
      sessionId,
      !user.twoFactorEnabled // Si no tiene 2FA, se considera verificado
    );

    // Crear sesión en base de datos
    await prisma.session.create({
      data: {
        userId: user.id,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        ipAddress: clientIP,
        userAgent,
        expiresAt: new Date(Date.now() + tokens.refreshExpiresIn * 1000),
      },
    });

    // Resetear contador de intentos fallidos
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lastFailedLogin: null,
        lastLogin: new Date(),
      },
    });

    // Log de login exitoso
    await logSuccessfulLogin(user.id, clientIP, userAgent);

    // ============================================================================
    // RESPUESTA EXITOSA
    // ============================================================================
    
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
      },
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
      },
      requiresPasswordChange: user.mustChangePassword,
    });

    // Establecer cookie segura con el token
    response.cookies.set('auth-token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokens.expiresIn,
      path: '/',
    });

    response.cookies.set('refresh-token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokens.refreshExpiresIn,
      path: '/api/auth/refresh',
    });

    return response;

  } catch (error) {
    console.error('[LOGIN ERROR]', { requestId, error });
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Error interno del servidor. Por favor, inténtelo de nuevo más tarde.',
        },
      },
      { status: 500 }
    );
  }
}
