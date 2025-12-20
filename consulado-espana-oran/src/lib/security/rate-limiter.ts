// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - RATE LIMITER
// Protección contra ataques de fuerza bruta y DDoS
// ============================================================================

import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

// Configuraciones de rate limiting por tipo de endpoint
const RATE_LIMIT_CONFIGS = {
  // Login: Muy restrictivo para prevenir brute force
  login: {
    points: 5, // 5 intentos
    duration: 60 * 15, // en 15 minutos
    blockDuration: 60 * 60, // bloqueado por 1 hora
  },
  
  // Registro: Moderado
  register: {
    points: 3, // 3 intentos
    duration: 60 * 60, // en 1 hora
    blockDuration: 60 * 60 * 24, // bloqueado por 24 horas
  },
  
  // API general: Más permisivo
  api: {
    points: 100, // 100 requests
    duration: 60, // por minuto
    blockDuration: 60 * 5, // bloqueado por 5 minutos
  },
  
  // Citas: Moderado
  appointments: {
    points: 20, // 20 requests
    duration: 60, // por minuto
    blockDuration: 60 * 10, // bloqueado por 10 minutos
  },
  
  // Verificación 2FA: Muy restrictivo
  twoFactor: {
    points: 3, // 3 intentos
    duration: 60 * 5, // en 5 minutos
    blockDuration: 60 * 30, // bloqueado por 30 minutos
  },
  
  // Reset de contraseña: Restrictivo
  passwordReset: {
    points: 3, // 3 intentos
    duration: 60 * 60, // en 1 hora
    blockDuration: 60 * 60 * 24, // bloqueado por 24 horas
  },
  
  // Subida de documentos: Moderado
  upload: {
    points: 10, // 10 uploads
    duration: 60 * 10, // en 10 minutos
    blockDuration: 60 * 30, // bloqueado por 30 minutos
  },
};

// Rate limiters en memoria (para producción usar Redis)
const rateLimiters: Record<string, RateLimiterMemory> = {};

// Inicializar rate limiters
Object.entries(RATE_LIMIT_CONFIGS).forEach(([key, config]) => {
  rateLimiters[key] = new RateLimiterMemory({
    points: config.points,
    duration: config.duration,
    blockDuration: config.blockDuration,
  });
});

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
  isBlocked: boolean;
}

/**
 * Consume un punto del rate limiter
 */
export async function consumeRateLimit(
  type: keyof typeof RATE_LIMIT_CONFIGS,
  identifier: string
): Promise<RateLimitResult> {
  const limiter = rateLimiters[type];
  
  if (!limiter) {
    throw new Error(`Rate limiter '${type}' not configured`);
  }
  
  try {
    const result = await limiter.consume(identifier);
    return formatResult(result, false);
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return formatResult(error, true);
    }
    throw error;
  }
}

/**
 * Verifica el estado del rate limit sin consumir
 */
export async function getRateLimitStatus(
  type: keyof typeof RATE_LIMIT_CONFIGS,
  identifier: string
): Promise<RateLimitResult> {
  const limiter = rateLimiters[type];
  
  if (!limiter) {
    throw new Error(`Rate limiter '${type}' not configured`);
  }
  
  try {
    const result = await limiter.get(identifier);
    
    if (!result) {
      const config = RATE_LIMIT_CONFIGS[type];
      return {
        allowed: true,
        remaining: config.points,
        resetTime: new Date(Date.now() + config.duration * 1000),
        isBlocked: false,
      };
    }
    
    return formatResult(result, result.remainingPoints <= 0);
  } catch (error) {
    throw error;
  }
}

/**
 * Elimina el bloqueo de un identificador
 */
export async function resetRateLimit(
  type: keyof typeof RATE_LIMIT_CONFIGS,
  identifier: string
): Promise<void> {
  const limiter = rateLimiters[type];
  
  if (!limiter) {
    throw new Error(`Rate limiter '${type}' not configured`);
  }
  
  await limiter.delete(identifier);
}

/**
 * Penaliza un identificador (añade puntos consumidos)
 */
export async function penalizeRateLimit(
  type: keyof typeof RATE_LIMIT_CONFIGS,
  identifier: string,
  points: number = 1
): Promise<void> {
  const limiter = rateLimiters[type];
  
  if (!limiter) {
    throw new Error(`Rate limiter '${type}' not configured`);
  }
  
  await limiter.penalty(identifier, points);
}

/**
 * Recompensa un identificador (reduce puntos consumidos)
 */
export async function rewardRateLimit(
  type: keyof typeof RATE_LIMIT_CONFIGS,
  identifier: string,
  points: number = 1
): Promise<void> {
  const limiter = rateLimiters[type];
  
  if (!limiter) {
    throw new Error(`Rate limiter '${type}' not configured`);
  }
  
  await limiter.reward(identifier, points);
}

/**
 * Bloquea un identificador permanentemente hasta reset manual
 */
export async function blockIdentifier(
  type: keyof typeof RATE_LIMIT_CONFIGS,
  identifier: string,
  durationSeconds?: number
): Promise<void> {
  const limiter = rateLimiters[type];
  
  if (!limiter) {
    throw new Error(`Rate limiter '${type}' not configured`);
  }
  
  const config = RATE_LIMIT_CONFIGS[type];
  await limiter.block(identifier, durationSeconds || config.blockDuration);
}

function formatResult(
  result: RateLimiterRes,
  isBlocked: boolean
): RateLimitResult {
  const resetTime = new Date(Date.now() + result.msBeforeNext);
  
  return {
    allowed: !isBlocked,
    remaining: Math.max(0, result.remainingPoints),
    resetTime,
    retryAfter: isBlocked ? Math.ceil(result.msBeforeNext / 1000) : undefined,
    isBlocked,
  };
}

/**
 * Middleware helper para obtener identificador único
 */
export function getClientIdentifier(
  ip: string,
  userId?: string,
  userAgent?: string
): string {
  // Combinar IP con userId si está autenticado
  if (userId) {
    return `${userId}:${ip}`;
  }
  
  // Para usuarios no autenticados, usar IP + hash de userAgent
  const crypto = require('crypto');
  const agentHash = userAgent 
    ? crypto.createHash('md5').update(userAgent).digest('hex').substring(0, 8)
    : 'unknown';
  
  return `anon:${ip}:${agentHash}`;
}

/**
 * Rate limiter específico para IPs sospechosas
 */
const suspiciousIPLimiter = new RateLimiterMemory({
  points: 1,
  duration: 60 * 60 * 24, // 24 horas
  blockDuration: 60 * 60 * 24 * 7, // 7 días
});

export async function markIPAsSuspicious(ip: string): Promise<void> {
  await suspiciousIPLimiter.consume(ip);
}

export async function isIPSuspicious(ip: string): Promise<boolean> {
  try {
    const result = await suspiciousIPLimiter.get(ip);
    return result !== null && result.remainingPoints <= 0;
  } catch {
    return true;
  }
}

/**
 * Limpieza de rate limiters (para pruebas)
 */
export function clearAllRateLimiters(): void {
  Object.values(rateLimiters).forEach(limiter => {
    // Rate limiter memory no tiene método clear, 
    // pero los datos expiran automáticamente
  });
}

// Exportar configuraciones para uso externo
export { RATE_LIMIT_CONFIGS };
