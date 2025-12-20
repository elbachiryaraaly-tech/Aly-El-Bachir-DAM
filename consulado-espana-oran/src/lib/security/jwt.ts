// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - JSON WEB TOKENS
// Implementación JWT con seguridad de nivel gubernamental
// ============================================================================

import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { AuthTokenPayload } from '@/types';

// Configuración de seguridad JWT
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || crypto.randomBytes(64).toString('hex');

const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutos
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 días
const JWT_ALGORITHM = 'HS512'; // HMAC-SHA512

// Blacklist de tokens (en producción usar Redis)
const tokenBlacklist = new Set<string>();

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
  role: string;
  sessionId: string;
  twoFactorVerified: boolean;
  tokenType: 'access' | 'refresh';
}

/**
 * Genera un par de tokens (access + refresh)
 */
export function generateTokenPair(
  userId: string,
  email: string,
  role: string,
  sessionId: string,
  twoFactorVerified: boolean = false
): TokenPair {
  const now = Math.floor(Date.now() / 1000);
  
  // Payload base
  const basePayload = {
    userId,
    email,
    role,
    sessionId,
    twoFactorVerified,
    iat: now,
    jti: crypto.randomBytes(16).toString('hex'), // Unique token ID
  };

  // Access Token
  const accessToken = jwt.sign(
    { ...basePayload, tokenType: 'access' },
    JWT_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: ACCESS_TOKEN_EXPIRY,
      issuer: 'consulado-espana-oran',
      audience: 'consulado-web',
    } as SignOptions
  );

  // Refresh Token
  const refreshToken = jwt.sign(
    { ...basePayload, tokenType: 'refresh' },
    JWT_REFRESH_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: REFRESH_TOKEN_EXPIRY,
      issuer: 'consulado-espana-oran',
      audience: 'consulado-web',
    } as SignOptions
  );

  return {
    accessToken,
    refreshToken,
    expiresIn: 15 * 60, // 15 minutos en segundos
    refreshExpiresIn: 7 * 24 * 60 * 60, // 7 días en segundos
  };
}

/**
 * Verifica un access token
 */
export function verifyAccessToken(token: string): DecodedToken | null {
  try {
    // Verificar si está en blacklist
    if (tokenBlacklist.has(token)) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
      issuer: 'consulado-espana-oran',
      audience: 'consulado-web',
    } as VerifyOptions) as DecodedToken;

    // Verificar tipo de token
    if (decoded.tokenType !== 'access') {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verifica un refresh token
 */
export function verifyRefreshToken(token: string): DecodedToken | null {
  try {
    // Verificar si está en blacklist
    if (tokenBlacklist.has(token)) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      algorithms: [JWT_ALGORITHM],
      issuer: 'consulado-espana-oran',
      audience: 'consulado-web',
    } as VerifyOptions) as DecodedToken;

    // Verificar tipo de token
    if (decoded.tokenType !== 'refresh') {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Refresca tokens usando un refresh token válido
 */
export function refreshTokens(refreshToken: string): TokenPair | null {
  const decoded = verifyRefreshToken(refreshToken);
  
  if (!decoded) {
    return null;
  }

  // Invalidar refresh token anterior
  revokeToken(refreshToken);

  // Generar nuevos tokens
  return generateTokenPair(
    decoded.userId,
    decoded.email,
    decoded.role,
    decoded.sessionId,
    decoded.twoFactorVerified
  );
}

/**
 * Revoca un token (añade a blacklist)
 */
export function revokeToken(token: string): void {
  tokenBlacklist.add(token);
  
  // Limpiar tokens expirados de la blacklist periódicamente
  cleanupBlacklist();
}

/**
 * Revoca todos los tokens de una sesión
 */
export function revokeSessionTokens(sessionId: string): void {
  // En producción, esto debería invalidar en Redis/DB
  // Por ahora, marcamos la sesión como inválida
  console.log(`Revoking all tokens for session: ${sessionId}`);
}

/**
 * Decodifica un token sin verificar (para debugging)
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwt.decode(token) as DecodedToken;
  } catch {
    return null;
  }
}

/**
 * Verifica si un token está próximo a expirar
 */
export function isTokenNearExpiry(token: string, thresholdSeconds: number = 60): boolean {
  const decoded = decodeToken(token);
  
  if (!decoded || !decoded.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp - now < thresholdSeconds;
}

/**
 * Extrae el token del header Authorization
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null;
  }

  return parts[1];
}

/**
 * Genera un token temporal para operaciones específicas
 */
export function generateTemporaryToken(
  purpose: string,
  data: Record<string, unknown>,
  expiresIn: string = '10m'
): string {
  return jwt.sign(
    {
      purpose,
      data,
      jti: crypto.randomBytes(16).toString('hex'),
    },
    JWT_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn,
      issuer: 'consulado-espana-oran',
    } as SignOptions
  );
}

/**
 * Verifica un token temporal
 */
export function verifyTemporaryToken(
  token: string,
  expectedPurpose: string
): { valid: boolean; data?: Record<string, unknown> } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
      issuer: 'consulado-espana-oran',
    } as VerifyOptions) as { purpose: string; data: Record<string, unknown> };

    if (decoded.purpose !== expectedPurpose) {
      return { valid: false };
    }

    return { valid: true, data: decoded.data };
  } catch {
    return { valid: false };
  }
}

/**
 * Limpia tokens expirados de la blacklist
 */
function cleanupBlacklist(): void {
  // En memoria, esto no es muy efectivo
  // En producción usar Redis con TTL
  if (tokenBlacklist.size > 10000) {
    // Limpiar los más antiguos (simplificado)
    const tokensArray = Array.from(tokenBlacklist);
    tokensArray.slice(0, 5000).forEach(t => tokenBlacklist.delete(t));
  }
}

// Exportar configuración
export const JWT_CONFIG = {
  accessTokenExpiry: ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiry: REFRESH_TOKEN_EXPIRY,
  algorithm: JWT_ALGORITHM,
};
