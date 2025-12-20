// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - SEED DATA
// Datos iniciales para el sistema de citas consulares
// ============================================================================

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../security/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // ============================================================================
  // INFORMACIÓN DEL CONSULADO
  // ============================================================================
  
  const consulateInfo = await prisma.consulateInfo.upsert({
    where: { id: 'main-consulate' },
    update: {},
    create: {
      id: 'main-consulate',
      name: 'Consulado General de España en Orán',
      address: 'Bd Colonel Lotfi n° 4',
      city: 'Orán',
      country: 'Argelia',
      postalCode: '31000',
      phone: '+213 41 40 88 46',
      fax: '+213 41 40 88 45',
      email: 'cog.oran@maec.es',
      website: 'https://www.exteriores.gob.es/Consulados/oran',
      emergencyPhone: '+213 770 95 42 46',
      latitude: 35.6976,
      longitude: -0.6337,
      jurisdiction: 'Wilayas de Orán, Mascara, Mostaganem, Relizane, Sidi Bel Abbes, Ain Temouchent, Tlemcen, Tiaret, Tissemsilt, Saida, El Bayadh y Naama',
      consularDistrict: 'Oeste de Argelia',
      openingHours: {
        0: null, // Domingo cerrado
        1: { open: '08:30', close: '14:30' }, // Lunes
        2: { open: '08:30', close: '14:30' }, // Martes
        3: { open: '08:30', close: '14:30' }, // Miércoles
        4: { open: '08:30', close: '14:30' }, // Jueves
        5: null, // Viernes cerrado
        6: null, // Sábado cerrado
      },
      socialMedia: {
        twitter: '@CGEspOran',
        facebook: 'ConsuladoEspanaOran',
      },
    },
  });

  console.log('✅ Información del consulado creada');

  // ============================================================================
  // SERVICIOS CONSULARES
  // ============================================================================

  const services = [
    // PASAPORTES
    {
      code: 'PASAPORTE_NUEVO',
      name: 'Expedición de Pasaporte',
      nameArabic: 'إصدار جواز السفر',
      nameFrench: 'Délivrance de Passeport',
      description: 'Solicitud de expedición de pasaporte español para ciudadanos españoles residentes en la demarcación consular.',
      category: 'PASAPORTES',
      duration: 30,
      maxPerDay: 20,
      price: 30.00,
      requirements: [
        'DNI o pasaporte anterior (original y copia)',
        'Fotografía reciente tamaño carnet (32x26mm)',
        'Justificante de pago de tasas consulares',
        'Certificado de empadronamiento consular',
      ],
    },
    {
      code: 'PASAPORTE_RENOVACION',
      name: 'Renovación de Pasaporte',
      nameArabic: 'تجديد جواز السفر',
      nameFrench: 'Renouvellement de Passeport',
      description: 'Renovación de pasaporte español caducado o próximo a caducar.',
      category: 'PASAPORTES',
      duration: 30,
      maxPerDay: 25,
      price: 30.00,
      requirements: [
        'Pasaporte anterior (original)',
        'Fotografía reciente tamaño carnet',
        'Justificante de pago de tasas',
      ],
    },
    
    // VISADOS
    {
      code: 'VISADO_SCHENGEN',
      name: 'Visado Schengen',
      nameArabic: 'تأشيرة شنغن',
      nameFrench: 'Visa Schengen',
      description: 'Solicitud de visado de corta duración para el espacio Schengen (turismo, negocios, visita familiar).',
      category: 'VISADOS',
      duration: 20,
      maxPerDay: 40,
      price: 80.00,
      requirements: [
        'Pasaporte válido (mínimo 6 meses)',
        'Formulario de solicitud cumplimentado',
        'Fotografías recientes',
        'Seguro médico de viaje',
        'Prueba de alojamiento',
        'Prueba de medios económicos',
        'Reserva de vuelo',
      ],
    },
    {
      code: 'VISADO_NACIONAL',
      name: 'Visado Nacional',
      nameArabic: 'التأشيرة الوطنية',
      nameFrench: 'Visa National',
      description: 'Visado de larga duración para residencia, estudios o trabajo en España.',
      category: 'VISADOS',
      duration: 30,
      maxPerDay: 15,
      price: 60.00,
      requirements: [
        'Pasaporte válido',
        'Formulario de solicitud',
        'Fotografías',
        'Certificado de antecedentes penales',
        'Certificado médico',
        'Prueba de medios económicos',
        'Documentación específica según tipo',
      ],
    },
    {
      code: 'VISADO_REAGRUPACION',
      name: 'Visado Reagrupación Familiar',
      nameArabic: 'تأشيرة لم شمل الأسرة',
      nameFrench: 'Visa Regroupement Familial',
      description: 'Visado para familiares de residentes españoles o ciudadanos europeos.',
      category: 'VISADOS',
      duration: 30,
      maxPerDay: 10,
      price: 60.00,
      requirements: [
        'Resolución favorable de reagrupación',
        'Pasaporte válido',
        'Certificado de matrimonio/nacimiento',
        'Certificado de antecedentes penales',
        'Certificado médico',
      ],
    },

    // REGISTRO CIVIL
    {
      code: 'INSCRIPCION_NACIMIENTO',
      name: 'Inscripción de Nacimiento',
      nameArabic: 'تسجيل الولادة',
      nameFrench: 'Inscription de Naissance',
      description: 'Inscripción de nacimiento de hijos de españoles nacidos en el extranjero.',
      category: 'REGISTRO_CIVIL',
      duration: 30,
      maxPerDay: 10,
      price: 0,
      requirements: [
        'Certificado de nacimiento local legalizado',
        'DNI/Pasaporte de los padres',
        'Libro de familia',
        'Certificado de matrimonio (si aplica)',
      ],
    },
    {
      code: 'INSCRIPCION_MATRIMONIO',
      name: 'Inscripción de Matrimonio',
      nameArabic: 'تسجيل الزواج',
      nameFrench: 'Inscription de Mariage',
      description: 'Inscripción de matrimonio celebrado en el extranjero.',
      category: 'REGISTRO_CIVIL',
      duration: 45,
      maxPerDay: 5,
      price: 0,
      requirements: [
        'Certificado de matrimonio legalizado',
        'DNI/Pasaporte de ambos cónyuges',
        'Certificados de nacimiento',
        'Certificado de soltería (si aplica)',
      ],
    },
    {
      code: 'INSCRIPCION_DEFUNCION',
      name: 'Inscripción de Defunción',
      nameArabic: 'تسجيل الوفاة',
      nameFrench: 'Inscription de Décès',
      description: 'Inscripción del fallecimiento de ciudadanos españoles.',
      category: 'REGISTRO_CIVIL',
      duration: 30,
      maxPerDay: 5,
      price: 0,
      requirements: [
        'Certificado de defunción local',
        'DNI/Pasaporte del fallecido',
        'Libro de familia',
      ],
    },

    // NACIONALIDAD
    {
      code: 'NACIONALIDAD_ORIGEN',
      name: 'Nacionalidad por Origen',
      nameArabic: 'الجنسية بالأصل',
      nameFrench: 'Nationalité par Origine',
      description: 'Solicitud de nacionalidad española por origen (hijos y nietos de españoles).',
      category: 'NACIONALIDAD',
      duration: 45,
      maxPerDay: 8,
      price: 0,
      requirements: [
        'Certificado de nacimiento',
        'Certificado de nacimiento del progenitor español',
        'DNI/Pasaporte del progenitor',
        'Certificado de matrimonio de padres (si aplica)',
      ],
    },
    {
      code: 'NACIONALIDAD_RESIDENCIA',
      name: 'Nacionalidad por Residencia',
      nameArabic: 'الجنسية بالإقامة',
      nameFrench: 'Nationalité par Résidence',
      description: 'Información sobre solicitud de nacionalidad por residencia (se tramita en España).',
      category: 'NACIONALIDAD',
      duration: 30,
      maxPerDay: 5,
      price: 0,
      requirements: [
        'Certificado de nacimiento legalizado',
        'Certificado de antecedentes penales',
        'Pruebas de integración (DELE, CCSE)',
      ],
    },

    // NOTARÍA
    {
      code: 'PODERES_NOTARIALES',
      name: 'Poderes Notariales',
      nameArabic: 'التوكيلات',
      nameFrench: 'Procurations Notariales',
      description: 'Otorgamiento de poderes notariales ante el Cónsul.',
      category: 'NOTARIA',
      duration: 30,
      maxPerDay: 10,
      price: 45.00,
      requirements: [
        'DNI/Pasaporte en vigor',
        'Datos del apoderado',
        'Borrador del poder (si dispone)',
      ],
    },
    {
      code: 'FE_DE_VIDA',
      name: 'Fe de Vida',
      nameArabic: 'شهادة الحياة',
      nameFrench: 'Certificat de Vie',
      description: 'Certificación de que el interesado está vivo (para pensiones, seguros, etc.).',
      category: 'NOTARIA',
      duration: 15,
      maxPerDay: 20,
      price: 0,
      requirements: [
        'DNI/Pasaporte en vigor',
        'Documento que solicita la fe de vida (si aplica)',
      ],
    },
    {
      code: 'ACTAS_NOTORIDAD',
      name: 'Actas de Notoriedad',
      nameArabic: 'شهادات العلنية',
      nameFrench: 'Actes de Notoriété',
      description: 'Declaraciones juradas y actas de notoriedad.',
      category: 'NOTARIA',
      duration: 30,
      maxPerDay: 8,
      price: 45.00,
      requirements: [
        'DNI/Pasaporte',
        'Documentación relacionada',
        'Testigos (si se requieren)',
      ],
    },

    // LEGALIZACIONES
    {
      code: 'LEGALIZACION_DOCUMENTOS',
      name: 'Legalización de Documentos',
      nameArabic: 'تصديق الوثائق',
      nameFrench: 'Légalisation de Documents',
      description: 'Legalización de documentos públicos argelinos para su uso en España.',
      category: 'LEGALIZACIONES',
      duration: 15,
      maxPerDay: 30,
      price: 8.00,
      requirements: [
        'Documento original a legalizar',
        'Documento previamente legalizado por autoridad argelina',
      ],
    },
    {
      code: 'COMPULSA_DOCUMENTOS',
      name: 'Compulsa de Documentos',
      nameArabic: 'مصادقة الوثائق',
      nameFrench: 'Certification Conforme',
      description: 'Compulsa de copias de documentos.',
      category: 'LEGALIZACIONES',
      duration: 10,
      maxPerDay: 25,
      price: 5.00,
      requirements: [
        'Documento original',
        'Copia a compulsar',
      ],
    },

    // CENSO ELECTORAL
    {
      code: 'ALTA_CENSO',
      name: 'Alta en Censo Electoral (CERA)',
      nameArabic: 'التسجيل في السجل الانتخابي',
      nameFrench: 'Inscription au Recensement Électoral',
      description: 'Inscripción en el Censo Electoral de Residentes Ausentes.',
      category: 'CENSO_ELECTORAL',
      duration: 20,
      maxPerDay: 15,
      price: 0,
      requirements: [
        'DNI/Pasaporte',
        'Certificado de empadronamiento consular',
        'Formulario de solicitud',
      ],
    },
    {
      code: 'EMPADRONAMIENTO',
      name: 'Empadronamiento Consular',
      nameArabic: 'التسجيل القنصلي',
      nameFrench: 'Inscription Consulaire',
      description: 'Alta o actualización en el Registro de Matrícula Consular.',
      category: 'CENSO_ELECTORAL',
      duration: 20,
      maxPerDay: 20,
      price: 0,
      requirements: [
        'DNI/Pasaporte',
        'Justificante de domicilio en Argelia',
        'Fotografía reciente',
      ],
    },

    // PROTECCIÓN CONSULAR
    {
      code: 'ASISTENCIA_DETENIDOS',
      name: 'Asistencia a Detenidos',
      nameArabic: 'مساعدة المحتجزين',
      nameFrench: 'Assistance aux Détenus',
      description: 'Asistencia y protección consular a ciudadanos españoles detenidos.',
      category: 'PROTECCION_CONSULAR',
      duration: 60,
      maxPerDay: 2,
      price: 0,
      requirements: [
        'Identificación del detenido',
        'Información del centro de detención',
      ],
    },
    {
      code: 'EMERGENCIA_CONSULAR',
      name: 'Emergencia Consular',
      nameArabic: 'حالة طوارئ قنصلية',
      nameFrench: 'Urgence Consulaire',
      description: 'Atención de emergencias: pérdida de documentos, repatriación, etc.',
      category: 'PROTECCION_CONSULAR',
      duration: 45,
      maxPerDay: 5,
      price: 0,
      requirements: [
        'Denuncia policial (si aplica)',
        'Documentación disponible',
      ],
    },

    // OTROS
    {
      code: 'ANTECEDENTES_PENALES',
      name: 'Certificado de Antecedentes Penales',
      nameArabic: 'شهادة السوابق العدلية',
      nameFrench: 'Certificat de Casier Judiciaire',
      description: 'Solicitud de certificado de antecedentes penales españoles.',
      category: 'OTROS',
      duration: 15,
      maxPerDay: 20,
      price: 0,
      requirements: [
        'DNI/Pasaporte',
        'Formulario de solicitud',
        'Huellas dactilares',
      ],
    },
    {
      code: 'INFORMACION_GENERAL',
      name: 'Información General',
      nameArabic: 'معلومات عامة',
      nameFrench: 'Information Générale',
      description: 'Cita para consultas e información sobre trámites consulares.',
      category: 'OTROS',
      duration: 20,
      maxPerDay: 10,
      price: 0,
      requirements: [],
    },
  ];

  for (const service of services) {
    await prisma.consularService.upsert({
      where: { code: service.code },
      update: service,
      create: {
        ...service,
        category: service.category as any,
      },
    });
  }

  console.log(`✅ ${services.length} servicios consulares creados`);

  // ============================================================================
  // FRANJAS HORARIAS
  // ============================================================================

  const allServices = await prisma.consularService.findMany();
  
  for (const service of allServices) {
    // Crear franjas horarias para días laborables (L-J: 1-4)
    for (let day = 1; day <= 4; day++) {
      // Mañana: 08:30 - 12:30 (cada 30 minutos)
      const morningSlots = [
        { start: '08:30', end: '09:00' },
        { start: '09:00', end: '09:30' },
        { start: '09:30', end: '10:00' },
        { start: '10:00', end: '10:30' },
        { start: '10:30', end: '11:00' },
        { start: '11:00', end: '11:30' },
        { start: '11:30', end: '12:00' },
        { start: '12:00', end: '12:30' },
      ];

      // Tarde: 12:30 - 14:30
      const afternoonSlots = [
        { start: '12:30', end: '13:00' },
        { start: '13:00', end: '13:30' },
        { start: '13:30', end: '14:00' },
        { start: '14:00', end: '14:30' },
      ];

      const allSlots = [...morningSlots, ...afternoonSlots];

      for (const slot of allSlots) {
        await prisma.timeSlot.create({
          data: {
            serviceId: service.id,
            dayOfWeek: day,
            startTime: slot.start,
            endTime: slot.end,
            maxAppointments: service.category === 'VISADOS' ? 2 : 1,
            isActive: true,
          },
        });
      }
    }
  }

  console.log('✅ Franjas horarias creadas');

  // ============================================================================
  // FECHAS ESPECIALES (FESTIVOS)
  // ============================================================================

  const holidays2024 = [
    // Festivos España
    { date: '2025-01-01', type: 'HOLIDAY_SPAIN', description: 'Año Nuevo' },
    { date: '2025-01-06', type: 'HOLIDAY_SPAIN', description: 'Reyes Magos' },
    { date: '2025-04-18', type: 'HOLIDAY_SPAIN', description: 'Viernes Santo' },
    { date: '2025-05-01', type: 'HOLIDAY_SPAIN', description: 'Día del Trabajo' },
    { date: '2025-08-15', type: 'HOLIDAY_SPAIN', description: 'Asunción de la Virgen' },
    { date: '2025-10-12', type: 'HOLIDAY_SPAIN', description: 'Fiesta Nacional de España' },
    { date: '2025-11-01', type: 'HOLIDAY_SPAIN', description: 'Todos los Santos' },
    { date: '2025-12-06', type: 'HOLIDAY_SPAIN', description: 'Día de la Constitución' },
    { date: '2025-12-08', type: 'HOLIDAY_SPAIN', description: 'Inmaculada Concepción' },
    { date: '2025-12-25', type: 'HOLIDAY_SPAIN', description: 'Navidad' },
    
    // Festivos Argelia
    { date: '2025-01-01', type: 'HOLIDAY_ALGERIA', description: 'Año Nuevo' },
    { date: '2025-05-01', type: 'HOLIDAY_ALGERIA', description: 'Día del Trabajo' },
    { date: '2025-07-05', type: 'HOLIDAY_ALGERIA', description: 'Día de la Independencia' },
    { date: '2025-11-01', type: 'HOLIDAY_ALGERIA', description: 'Aniversario de la Revolución' },
  ];

  for (const holiday of holidays2024) {
    await prisma.specialDate.upsert({
      where: {
        date_type: {
          date: new Date(holiday.date),
          type: holiday.type as any,
        },
      },
      update: {},
      create: {
        date: new Date(holiday.date),
        type: holiday.type as any,
        description: holiday.description,
        isRecurring: true,
      },
    });
  }

  console.log('✅ Fechas especiales creadas');

  // ============================================================================
  // USUARIO ADMINISTRADOR
  // ============================================================================

  const adminPassword = await hashPassword('Admin@Consulado2024!');
  
  await prisma.user.upsert({
    where: { email: 'admin@consulado-oran.es' },
    update: {},
    create: {
      email: 'admin@consulado-oran.es',
      passwordHash: adminPassword,
      firstName: 'Administrador',
      lastName: 'Sistema',
      documentType: 'DNI',
      documentNumber: '00000000A',
      nationality: 'Española',
      phone: '+213000000000',
      dateOfBirth: new Date('1990-01-01'),
      role: 'SUPER_ADMIN',
      isActive: true,
      twoFactorEnabled: false,
      emailVerified: new Date(),
    },
  });

  console.log('✅ Usuario administrador creado');

  // ============================================================================
  // CONFIGURACIÓN DEL SISTEMA
  // ============================================================================

  const configs = [
    { key: 'max_advance_booking_days', value: '60', category: 'booking', description: 'Días máximos de antelación para reservas' },
    { key: 'min_advance_booking_hours', value: '24', category: 'booking', description: 'Horas mínimas de antelación para reservas' },
    { key: 'max_reschedules_per_appointment', value: '2', category: 'booking', description: 'Reprogramaciones máximas por cita' },
    { key: 'reminder_hours_before', value: '24', category: 'notifications', description: 'Horas antes para enviar recordatorio' },
    { key: 'session_timeout_minutes', value: '30', category: 'security', description: 'Tiempo de sesión en minutos' },
    { key: 'password_expiry_days', value: '90', category: 'security', description: 'Días de validez de contraseña' },
    { key: 'max_failed_logins', value: '5', category: 'security', description: 'Intentos de login fallidos antes de bloqueo' },
    { key: 'lockout_duration_minutes', value: '30', category: 'security', description: 'Duración del bloqueo en minutos' },
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: config,
      create: config,
    });
  }

  console.log('✅ Configuración del sistema creada');

  // ============================================================================
  // PLANTILLAS DE EMAIL
  // ============================================================================

  const emailTemplates = [
    {
      code: 'APPOINTMENT_CONFIRMATION',
      name: 'Confirmación de Cita',
      subject: 'Confirmación de su cita - Consulado de España en Orán',
      body: `
Estimado/a {{userName}},

Su cita ha sido confirmada con los siguientes detalles:

📅 Fecha: {{appointmentDate}}
⏰ Hora: {{appointmentTime}}
📋 Servicio: {{serviceName}}
🔢 Número de referencia: {{referenceNumber}}

📍 Dirección del Consulado:
Bd Colonel Lotfi n° 4
31000 Orán, Argelia

⚠️ IMPORTANTE:
- Llegue al menos 15 minutos antes de su cita
- Traiga toda la documentación requerida
- Traiga un documento de identidad válido

Para cancelar o reprogramar su cita, acceda a:
{{cancelUrl}}

Atentamente,
Consulado General de España en Orán
      `,
      variables: ['userName', 'appointmentDate', 'appointmentTime', 'serviceName', 'referenceNumber', 'cancelUrl'],
    },
    {
      code: 'APPOINTMENT_REMINDER',
      name: 'Recordatorio de Cita',
      subject: 'Recordatorio: Su cita mañana - Consulado de España',
      body: `
Estimado/a {{userName}},

Le recordamos que tiene una cita programada para mañana:

📅 Fecha: {{appointmentDate}}
⏰ Hora: {{appointmentTime}}
📋 Servicio: {{serviceName}}
🔢 Referencia: {{referenceNumber}}

No olvide traer:
{{requirements}}

Atentamente,
Consulado General de España en Orán
      `,
      variables: ['userName', 'appointmentDate', 'appointmentTime', 'serviceName', 'referenceNumber', 'requirements'],
    },
    {
      code: 'APPOINTMENT_CANCELLED',
      name: 'Cita Cancelada',
      subject: 'Su cita ha sido cancelada - Consulado de España',
      body: `
Estimado/a {{userName}},

Su cita ha sido cancelada:

📋 Servicio: {{serviceName}}
📅 Fecha original: {{appointmentDate}}
🔢 Referencia: {{referenceNumber}}

Motivo: {{cancellationReason}}

Si necesita una nueva cita, puede solicitarla en:
{{bookingUrl}}

Atentamente,
Consulado General de España en Orán
      `,
      variables: ['userName', 'serviceName', 'appointmentDate', 'referenceNumber', 'cancellationReason', 'bookingUrl'],
    },
  ];

  for (const template of emailTemplates) {
    await prisma.emailTemplate.upsert({
      where: { code: template.code },
      update: template,
      create: template,
    });
  }

  console.log('✅ Plantillas de email creadas');

  console.log('\n🎉 Seed completado exitosamente!');
  console.log('📧 Admin: admin@consulado-oran.es');
  console.log('🔑 Password: Admin@Consulado2024!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
