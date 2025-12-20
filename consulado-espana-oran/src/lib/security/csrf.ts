// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - PROTECCIÓN CSRF
// Tokens de seguridad para prevención de ataques Cross-Site Request Forgery
// ============================================================================

import crypto from 'crypto';
import { cookies } from 'next/headers';

const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex');
const CSRF_TOKEN_LENGTH = 32;
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hora en ms
const CSRF_COOKIE_NAME = '__Host-csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

interface CSRFTokenData {
  token: string;
  timestamp: number;
  sessionId: string;
}

/**
 * Genera un token CSRF seguro
 */
export function generateCSRFToken(sessionId: string): string {
  const timestamp = Date.now();
  const randomPart = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
  
  // Crear datos del token
  const tokenData: CSRFTokenData = {
    token: randomPart,
    timestamp,
    sessionId,
  };
  
  // Crear HMAC para verificación
  const dataString = JSON.stringify(tokenData);
  const hmac = crypto.createHmac('sha256', CSRF_SECRET);
  hmac.update(dataString);
  const signature = hmac.digest('hex');
  
  // Combinar datos y firma
  const fullToken = Buffer.from(JSON.stringify({
    ...tokenData,
    signature,
  })).toString('base64');
  
  return fullToken;
}

/**
 * Verifica un token CSRF
 */
export function verifyCSRFToken(
  token: string,
  sessionId: string
): { valid: boolean; error?: string } {
  try {
    // Decodificar token
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    const { token: randomPart, timestamp, sessionId: tokenSessionId, signature } = decoded;
    
    // Verificar que el token no ha expirado
    if (Date.now() - timestamp > CSRF_TOKEN_EXPIRY) {
      return { valid: false, error: 'Token CSRF expirado' };
    }
    
    // Verificar que el session ID coincide
    if (tokenSessionId !== sessionId) {
      return { valid: false, error: 'Token CSRF inválido para esta sesión' };
    }
    
    // Reconstruir y verificar HMAC
    const tokenData: CSRFTokenData = {
      token: randomPart,
      timestamp,
      sessionId: tokenSessionId,
    };
    
    const dataString = JSON.stringify(tokenData);
    const hmac = crypto.createHmac('sha256', CSRF_SECRET);
    hmac.update(dataString);
    const expectedSignature = hmac.digest('hex');
    
    // Comparación segura
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: false, error: 'Firma de token CSRF inválida' };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Token CSRF malformado' };
  }
}

/**
 * Establece la cookie CSRF
 */
export async function setCSRFCookie(sessionId: string): Promise<string> {
  const token = generateCSRFToken(sessionId);
  const cookieStore = await cookies();
  
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: CSRF_TOKEN_EXPIRY / 1000, // en segundos
  });
  
  return token;
}

/**
 * Obtiene el token CSRF de la cookie
 */
export async function getCSRFTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CSRF_COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Middleware para validar CSRF en requests
 */
export async function validateCSRFRequest(
  request: Request,
  sessionId: string
): Promise<{ valid: boolean; error?: string }> {
  // Métodos seguros no requieren CSRF
  const safeMethod = ['GET', 'HEAD', 'OPTIONS'].includes(request.method);
  if (safeMethod) {
    return { valid: true };
  }
  
  // Obtener token del header
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  if (!headerToken) {
    return { valid: false, error: 'Token CSRF no proporcionado' };
  }
  
  // Verificar token
  return verifyCSRFToken(headerToken, sessionId);
}

/**
 * Genera token CSRF doble (para Double Submit Cookie pattern)
 */
export function generateDoubleSubmitToken(): {
  cookieToken: string;
  headerToken: string;
} {
  const token = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
  
  // El cookie token incluye un HMAC adicional
  const hmac = crypto.createHmac('sha256', CSRF_SECRET);
  hmac.update(token);
  const cookieToken = `${token}.${hmac.digest('hex')}`;
  
  return {
    cookieToken,
    headerToken: token,
  };
}

/**
 * Verifica Double Submit Cookie pattern
 */
export function verifyDoubleSubmit(
  cookieToken: string,
  headerToken: string
): boolean {
  try {
    const [token, signature] = cookieToken.split('.');
    
    // Verificar que el token del header coincide
    if (token !== headerToken) {
      return false;
    }
    
    // Verificar HMAC
    const hmac = crypto.createHmac('sha256', CSRF_SECRET);
    hmac.update(token);
    const expectedSignature = hmac.digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// Exportar constantes
export {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  CSRF_TOKEN_EXPIRY,
};
