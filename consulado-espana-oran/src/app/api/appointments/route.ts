// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - API DE CITAS
// Gestión completa de citas con validación y seguridad
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { verifyAccessToken, extractTokenFromHeader } from '@/lib/security/jwt';
import { consumeRateLimit } from '@/lib/security/rate-limiter';
import { logAppointmentCreated } from '@/lib/security/audit';
import { generateReferenceNumber } from '@/lib/security/encryption';

// Schema de validación para crear cita
const createAppointmentSchema = z.object({
  serviceId: z.string().min(1, 'El servicio es requerido'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido'),
  notes: z.string().max(500).optional(),
});

// Schema de validación para actualizar cita
const updateAppointmentSchema = z.object({
  status: z.enum(['CONFIRMED', 'CANCELLED', 'RESCHEDULED']).optional(),
  notes: z.string().max(500).optional(),
  newDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  newTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  cancellationReason: z.string().max(500).optional(),
});

// ============================================================================
// GET - Obtener citas del usuario
// ============================================================================

export async function GET(request: NextRequest) {
  const clientIP = request.headers.get('x-client-ip') || 'unknown';
  
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'No autorizado' } },
        { status: 401 }
      );
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_TOKEN', message: 'Token inválido' } },
        { status: 401 }
      );
    }

    // Rate limiting
    const rateLimitResult = await consumeRateLimit('appointments', `${decoded.userId}:${clientIP}`);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMIT', message: 'Demasiadas solicitudes' } },
        { status: 429 }
      );
    }

    // Obtener parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);

    // Construir filtros
    const where: Record<string, unknown> = {
      userId: decoded.userId,
    };

    if (status) {
      where.status = status;
    }

    // Obtener citas con paginación
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          service: {
            select: {
              id: true,
              code: true,
              name: true,
              category: true,
              duration: true,
              price: true,
            },
          },
        },
        orderBy: { appointmentDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });

  } catch (error) {
    console.error('[APPOINTMENTS GET ERROR]', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Error interno' } },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Crear nueva cita
// ============================================================================

export async function POST(request: NextRequest) {
  const clientIP = request.headers.get('x-client-ip') || 'unknown';
  
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'No autorizado' } },
        { status: 401 }
      );
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_TOKEN', message: 'Token inválido' } },
        { status: 401 }
      );
    }

    // Rate limiting
    const rateLimitResult = await consumeRateLimit('appointments', `${decoded.userId}:${clientIP}`);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMIT', message: 'Demasiadas solicitudes' } },
        { status: 429 }
      );
    }

    // Validar cuerpo de la solicitud
    const body = await request.json();
    const validation = createAppointmentSchema.safeParse(body);
    
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

    const { serviceId, date, time, notes } = validation.data;

    // Verificar que el servicio existe y está activo
    const service = await prisma.consularService.findUnique({
      where: { id: serviceId },
    });

    if (!service || !service.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'SERVICE_NOT_FOUND', message: 'Servicio no disponible' },
        },
        { status: 404 }
      );
    }

    // Verificar fecha válida
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Mínimo 24 horas de antelación
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    
    // Máximo 60 días de antelación
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 60);

    if (appointmentDate < minDate || appointmentDate > maxDate) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_DATE',
            message: 'La fecha debe estar entre 1 y 60 días a partir de hoy',
          },
        },
        { status: 400 }
      );
    }

    // Verificar que no es fin de semana ni festivo
    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_DATE',
            message: 'El consulado no atiende los viernes, sábados ni domingos',
          },
        },
        { status: 400 }
      );
    }

    // Verificar festivos
    const holiday = await prisma.specialDate.findFirst({
      where: {
        date: appointmentDate,
        type: { in: ['HOLIDAY_SPAIN', 'HOLIDAY_ALGERIA', 'CLOSED'] },
      },
    });

    if (holiday) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'HOLIDAY',
            message: `El consulado está cerrado ese día: ${holiday.description}`,
          },
        },
        { status: 400 }
      );
    }

    // Verificar disponibilidad del horario
    const existingAppointments = await prisma.appointment.count({
      where: {
        appointmentDate,
        appointmentTime: time,
        serviceId,
        status: { notIn: ['CANCELLED', 'RESCHEDULED'] },
      },
    });

    // Verificar slot de tiempo
    const timeSlot = await prisma.timeSlot.findFirst({
      where: {
        serviceId,
        dayOfWeek: dayOfWeek === 0 ? 7 : dayOfWeek, // Ajustar domingo
        startTime: time,
        isActive: true,
      },
    });

    if (!timeSlot || existingAppointments >= timeSlot.maxAppointments) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SLOT_NOT_AVAILABLE',
            message: 'Este horario ya no está disponible',
          },
        },
        { status: 409 }
      );
    }

    // Verificar que el usuario no tiene otra cita el mismo día
    const userAppointmentSameDay = await prisma.appointment.findFirst({
      where: {
        userId: decoded.userId,
        appointmentDate,
        status: { notIn: ['CANCELLED', 'RESCHEDULED'] },
      },
    });

    if (userAppointmentSameDay) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_APPOINTMENT',
            message: 'Ya tiene una cita programada para este día',
          },
        },
        { status: 409 }
      );
    }

    // Generar número de referencia único
    const referenceNumber = generateReferenceNumber();

    // Crear la cita
    const appointment = await prisma.appointment.create({
      data: {
        referenceNumber,
        userId: decoded.userId,
        serviceId,
        timeSlotId: timeSlot.id,
        appointmentDate,
        appointmentTime: time,
        estimatedDuration: service.duration,
        status: 'CONFIRMED',
        isConfirmed: true,
        confirmedAt: new Date(),
        notes,
      },
      include: {
        service: {
          select: {
            id: true,
            code: true,
            name: true,
            category: true,
            duration: true,
            price: true,
            requirements: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Log de auditoría
    await logAppointmentCreated(
      decoded.userId,
      appointment.id,
      serviceId,
      date,
      clientIP
    );

    // TODO: Enviar email de confirmación

    return NextResponse.json({
      success: true,
      data: appointment,
      message: 'Cita creada exitosamente',
    }, { status: 201 });

  } catch (error) {
    console.error('[APPOINTMENTS POST ERROR]', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Error interno' } },
      { status: 500 }
    );
  }
}
