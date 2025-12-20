// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - SISTEMA DE AUDITORÍA
// Registro completo de todas las acciones para compliance gubernamental
// ============================================================================

import { prisma } from '@/lib/db/prisma';
import { AuditLogEntry, SecurityEventEntry } from '@/types';
import { maskSensitiveData } from './encryption';

// Campos sensibles que deben ser enmascarados en logs
const SENSITIVE_FIELDS = [
  'password',
  'passwordHash',
  'token',
  'secret',
  'twoFactorSecret',
  'creditCard',
  'ssn',
  'documentNumber',
];

export type AuditAction = 
  | 'CREATE'
  | 'READ'
  | 'UPDATE'
  | 'DELETE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'LOGIN_FAILED'
  | 'PASSWORD_CHANGE'
  | 'PASSWORD_RESET'
  | 'TWO_FACTOR_ENABLE'
  | 'TWO_FACTOR_DISABLE'
  | 'APPOINTMENT_CREATE'
  | 'APPOINTMENT_UPDATE'
  | 'APPOINTMENT_CANCEL'
  | 'APPOINTMENT_COMPLETE'
  | 'DOCUMENT_UPLOAD'
  | 'DOCUMENT_VERIFY'
  | 'DOCUMENT_REJECT'
  | 'ADMIN_ACTION'
  | 'SECURITY_EVENT'
  | 'EXPORT_DATA';

export type ActorType = 'USER' | 'STAFF' | 'ADMIN' | 'SYSTEM' | 'ANONYMOUS';

export type SecurityEventType =
  | 'BRUTE_FORCE_ATTEMPT'
  | 'SUSPICIOUS_ACTIVITY'
  | 'UNAUTHORIZED_ACCESS'
  | 'SESSION_HIJACK_ATTEMPT'
  | 'SQL_INJECTION_ATTEMPT'
  | 'XSS_ATTEMPT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'INVALID_TOKEN'
  | 'IP_BLOCKED'
  | 'ACCOUNT_LOCKED'
  | 'DATA_BREACH_ATTEMPT';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

interface AuditContext {
  userId?: string;
  actorType: ActorType;
  ipAddress: string;
  userAgent?: string;
  requestId?: string;
}

/**
 * Registra una entrada de auditoría
 */
export async function logAudit(
  context: AuditContext,
  entry: AuditLogEntry
): Promise<void> {
  try {
    // Sanitizar datos sensibles
    const sanitizedOldValue = entry.oldValue 
      ? sanitizeObject(entry.oldValue as Record<string, unknown>) 
      : undefined;
    const sanitizedNewValue = entry.newValue 
      ? sanitizeObject(entry.newValue as Record<string, unknown>) 
      : undefined;

    await prisma.auditLog.create({
      data: {
        userId: context.userId,
        actorType: context.actorType,
        action: entry.action as AuditAction,
        resource: entry.resource,
        resourceId: entry.resourceId,
        description: entry.description,
        oldValue: sanitizedOldValue,
        newValue: sanitizedNewValue,
        metadata: entry.metadata,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        requestId: context.requestId,
        appointmentId: entry.metadata?.appointmentId as string | undefined,
      },
    });
  } catch (error) {
    // Log to console as fallback
    console.error('[AUDIT ERROR]', {
      context,
      entry,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Registra un evento de seguridad
 */
export async function logSecurityEvent(
  context: Partial<AuditContext>,
  event: SecurityEventEntry
): Promise<void> {
  try {
    await prisma.securityEvent.create({
      data: {
        userId: context.userId,
        type: event.type as SecurityEventType,
        severity: event.severity,
        description: event.description,
        ipAddress: context.ipAddress || 'unknown',
        userAgent: context.userAgent,
        metadata: event.metadata,
      },
    });

    // Si es crítico, enviar alerta
    if (event.severity === 'CRITICAL') {
      await sendSecurityAlert(event);
    }
  } catch (error) {
    console.error('[SECURITY EVENT ERROR]', {
      context,
      event,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Log de login exitoso
 */
export async function logSuccessfulLogin(
  userId: string,
  ipAddress: string,
  userAgent?: string
): Promise<void> {
  await logAudit(
    { userId, actorType: 'USER', ipAddress, userAgent },
    {
      action: 'LOGIN',
      resource: 'session',
      description: 'Usuario inició sesión exitosamente',
    }
  );
}

/**
 * Log de login fallido
 */
export async function logFailedLogin(
  email: string,
  ipAddress: string,
  reason: string,
  userAgent?: string
): Promise<void> {
  await logAudit(
    { actorType: 'ANONYMOUS', ipAddress, userAgent },
    {
      action: 'LOGIN_FAILED',
      resource: 'session',
      description: `Intento de login fallido para ${maskSensitiveData(email, 3)}`,
      metadata: { reason },
    }
  );
}

/**
 * Log de creación de cita
 */
export async function logAppointmentCreated(
  userId: string,
  appointmentId: string,
  serviceId: string,
  date: string,
  ipAddress: string
): Promise<void> {
  await logAudit(
    { userId, actorType: 'USER', ipAddress },
    {
      action: 'APPOINTMENT_CREATE',
      resource: 'appointment',
      resourceId: appointmentId,
      description: 'Cita creada exitosamente',
      metadata: { serviceId, date, appointmentId },
    }
  );
}

/**
 * Log de cancelación de cita
 */
export async function logAppointmentCancelled(
  userId: string,
  appointmentId: string,
  reason: string,
  ipAddress: string,
  cancelledBy?: string
): Promise<void> {
  await logAudit(
    { userId, actorType: cancelledBy ? 'STAFF' : 'USER', ipAddress },
    {
      action: 'APPOINTMENT_CANCEL',
      resource: 'appointment',
      resourceId: appointmentId,
      description: 'Cita cancelada',
      metadata: { reason, cancelledBy, appointmentId },
    }
  );
}

/**
 * Log de cambio de contraseña
 */
export async function logPasswordChange(
  userId: string,
  ipAddress: string,
  initiatedBy: 'user' | 'admin' | 'system'
): Promise<void> {
  await logAudit(
    { userId, actorType: 'USER', ipAddress },
    {
      action: 'PASSWORD_CHANGE',
      resource: 'user',
      resourceId: userId,
      description: 'Contraseña actualizada',
      metadata: { initiatedBy },
    }
  );
}

/**
 * Log de activación de 2FA
 */
export async function log2FAEnabled(
  userId: string,
  ipAddress: string
): Promise<void> {
  await logAudit(
    { userId, actorType: 'USER', ipAddress },
    {
      action: 'TWO_FACTOR_ENABLE',
      resource: 'user',
      resourceId: userId,
      description: 'Autenticación de dos factores activada',
    }
  );
}

/**
 * Log de intento de fuerza bruta
 */
export async function logBruteForceAttempt(
  ipAddress: string,
  targetEmail: string
): Promise<void> {
  await logSecurityEvent(
    { ipAddress },
    {
      type: 'BRUTE_FORCE_ATTEMPT',
      severity: 'HIGH',
      description: `Posible ataque de fuerza bruta detectado para ${maskSensitiveData(targetEmail, 3)}`,
      metadata: { attemptedEmail: targetEmail },
    }
  );
}

/**
 * Log de rate limit excedido
 */
export async function logRateLimitExceeded(
  ipAddress: string,
  endpoint: string,
  userId?: string
): Promise<void> {
  await logSecurityEvent(
    { userId, ipAddress },
    {
      type: 'RATE_LIMIT_EXCEEDED',
      severity: 'MEDIUM',
      description: `Rate limit excedido en ${endpoint}`,
      metadata: { endpoint },
    }
  );
}

/**
 * Log de acceso no autorizado
 */
export async function logUnauthorizedAccess(
  ipAddress: string,
  resource: string,
  userId?: string
): Promise<void> {
  await logSecurityEvent(
    { userId, ipAddress },
    {
      type: 'UNAUTHORIZED_ACCESS',
      severity: 'HIGH',
      description: `Intento de acceso no autorizado a ${resource}`,
      metadata: { resource },
    }
  );
}

/**
 * Sanitiza un objeto removiendo/enmascarando campos sensibles
 */
function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Envía alerta de seguridad crítica
 */
async function sendSecurityAlert(event: SecurityEventEntry): Promise<void> {
  // TODO: Implementar envío de alertas por email/SMS
  console.error('[CRITICAL SECURITY ALERT]', {
    type: event.type,
    description: event.description,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Obtener logs de auditoría con filtros
 */
export async function getAuditLogs(filters: {
  userId?: string;
  action?: AuditAction;
  resource?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}) {
  const { userId, action, resource, dateFrom, dateTo, page = 1, limit = 50 } = filters;
  
  const where: Record<string, unknown> = {};
  
  if (userId) where.userId = userId;
  if (action) where.action = action;
  if (resource) where.resource = resource;
  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) (where.createdAt as Record<string, Date>).gte = dateFrom;
    if (dateTo) (where.createdAt as Record<string, Date>).lte = dateTo;
  }
  
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    }),
    prisma.auditLog.count({ where }),
  ]);
  
  return {
    logs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
