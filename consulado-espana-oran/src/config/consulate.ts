// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - CONFIGURACIÓN
// Información oficial del consulado
// ============================================================================

export const CONSULATE_INFO = {
  // Información básica
  name: 'Consulado General de España en Orán',
  nameArabic: 'القنصلية العامة لإسبانيا في وهران',
  nameFrench: 'Consulat Général d\'Espagne à Oran',
  
  // Contacto
  address: 'Bd Colonel Lotfi n° 4',
  city: 'Orán',
  postalCode: '31000',
  country: 'Argelia',
  fullAddress: 'Bd Colonel Lotfi n° 4, 31000 Orán, Argelia',
  
  phone: '+213 41 40 88 46',
  fax: '+213 41 40 88 45',
  emergencyPhone: '+213 770 95 42 46', // Teléfono de emergencia 24h
  email: 'cog.oran@maec.es',
  website: 'https://www.exteriores.gob.es/Consulados/oran',
  
  // Ubicación geográfica
  coordinates: {
    latitude: 35.6976,
    longitude: -0.6337,
  },
  googleMapsUrl: 'https://maps.google.com/?q=35.6976,-0.6337',
  
  // Jurisdicción consular
  jurisdiction: [
    'Orán',
    'Mascara',
    'Mostaganem',
    'Relizane',
    'Sidi Bel Abbes',
    'Ain Temouchent',
    'Tlemcen',
    'Tiaret',
    'Tissemsilt',
    'Saida',
    'El Bayadh',
    'Naama',
  ],
  
  // Horarios de atención
  openingHours: {
    general: {
      weekdays: 'Lunes a Jueves: 08:30 - 14:30',
      closed: 'Viernes, Sábado y Domingo: Cerrado',
    },
    detailed: {
      monday: { open: '08:30', close: '14:30' },
      tuesday: { open: '08:30', close: '14:30' },
      wednesday: { open: '08:30', close: '14:30' },
      thursday: { open: '08:30', close: '14:30' },
      friday: null,
      saturday: null,
      sunday: null,
    },
    publicHolidays: 'El consulado permanece cerrado los festivos españoles y argelinos',
    emergencyService: 'Para emergencias consulares fuera de horario: +213 770 95 42 46',
  },
  
  // Redes sociales
  socialMedia: {
    twitter: 'https://twitter.com/MAECgob',
    facebook: 'https://www.facebook.com/Exteriores.maec',
    instagram: 'https://www.instagram.com/exteriores.maec',
    youtube: 'https://www.youtube.com/user/canalmaectv',
  },
  
  // Enlaces oficiales
  officialLinks: {
    maec: 'https://www.exteriores.gob.es',
    sedeElectronica: 'https://sede.maec.gob.es',
    citaPrevia: 'https://www.citaconsular.es',
    boe: 'https://www.boe.es',
    aecid: 'https://www.aecid.es',
  },
} as const;

// Categorías de servicios
export const SERVICE_CATEGORIES = {
  PASAPORTES: {
    name: 'Pasaportes',
    nameArabic: 'جوازات السفر',
    nameFrench: 'Passeports',
    icon: 'passport',
    description: 'Expedición y renovación de pasaportes españoles',
    color: '#C60B1E', // Rojo español
  },
  VISADOS: {
    name: 'Visados',
    nameArabic: 'التأشيرات',
    nameFrench: 'Visas',
    icon: 'stamp',
    description: 'Visados Schengen, nacionales y de reagrupación familiar',
    color: '#FFC400', // Amarillo español
  },
  REGISTRO_CIVIL: {
    name: 'Registro Civil',
    nameArabic: 'السجل المدني',
    nameFrench: 'État Civil',
    icon: 'file-text',
    description: 'Nacimientos, matrimonios y defunciones',
    color: '#1E3A8A',
  },
  NACIONALIDAD: {
    name: 'Nacionalidad',
    nameArabic: 'الجنسية',
    nameFrench: 'Nationalité',
    icon: 'flag',
    description: 'Nacionalidad española por origen o residencia',
    color: '#059669',
  },
  NOTARIA: {
    name: 'Notaría',
    nameArabic: 'كتابة العدل',
    nameFrench: 'Notariat',
    icon: 'pen-tool',
    description: 'Poderes, fe de vida y actas notariales',
    color: '#7C3AED',
  },
  LEGALIZACIONES: {
    name: 'Legalizaciones',
    nameArabic: 'التصديقات',
    nameFrench: 'Légalisations',
    icon: 'check-circle',
    description: 'Legalización y compulsa de documentos',
    color: '#DC2626',
  },
  CENSO_ELECTORAL: {
    name: 'Censo Electoral',
    nameArabic: 'السجل الانتخابي',
    nameFrench: 'Recensement Électoral',
    icon: 'vote',
    description: 'CERA y empadronamiento consular',
    color: '#2563EB',
  },
  PROTECCION_CONSULAR: {
    name: 'Protección Consular',
    nameArabic: 'الحماية القنصلية',
    nameFrench: 'Protection Consulaire',
    icon: 'shield',
    description: 'Asistencia y emergencias consulares',
    color: '#EA580C',
  },
  OTROS: {
    name: 'Otros Servicios',
    nameArabic: 'خدمات أخرى',
    nameFrench: 'Autres Services',
    icon: 'more-horizontal',
    description: 'Antecedentes penales e información general',
    color: '#6B7280',
  },
} as const;

// Estados de citas
export const APPOINTMENT_STATUS = {
  PENDING: {
    name: 'Pendiente',
    nameArabic: 'قيد الانتظار',
    nameFrench: 'En attente',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  CONFIRMED: {
    name: 'Confirmada',
    nameArabic: 'مؤكد',
    nameFrench: 'Confirmé',
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
  CHECKED_IN: {
    name: 'Presente',
    nameArabic: 'حاضر',
    nameFrench: 'Présent',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
  },
  IN_PROGRESS: {
    name: 'En Atención',
    nameArabic: 'قيد المعالجة',
    nameFrench: 'En cours',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
  COMPLETED: {
    name: 'Completada',
    nameArabic: 'مكتمل',
    nameFrench: 'Terminé',
    color: '#059669',
    bgColor: '#D1FAE5',
  },
  CANCELLED: {
    name: 'Cancelada',
    nameArabic: 'ملغي',
    nameFrench: 'Annulé',
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  NO_SHOW: {
    name: 'No Presentado',
    nameArabic: 'لم يحضر',
    nameFrench: 'Absent',
    color: '#6B7280',
    bgColor: '#F3F4F6',
  },
  RESCHEDULED: {
    name: 'Reprogramada',
    nameArabic: 'أعيدت جدولتها',
    nameFrench: 'Reprogrammé',
    color: '#F97316',
    bgColor: '#FFEDD5',
  },
} as const;

// Configuración de reservas
export const BOOKING_CONFIG = {
  maxAdvanceDays: 60, // Días máximos de antelación
  minAdvanceHours: 24, // Horas mínimas de antelación
  maxReschedules: 2, // Reprogramaciones máximas
  reminderHoursBefore: 24, // Horas antes para recordatorio
  cancellationDeadlineHours: 24, // Horas antes límite para cancelar
  slotDurationMinutes: 30, // Duración estándar de slot
} as const;

// Idiomas soportados
export const SUPPORTED_LANGUAGES = {
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇩🇿', dir: 'rtl' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
} as const;

// Tipos de documento
export const DOCUMENT_TYPES = {
  PASSPORT: { name: 'Pasaporte', code: 'PASSPORT' },
  DNI: { name: 'DNI', code: 'DNI' },
  NIE: { name: 'NIE', code: 'NIE' },
} as const;

// Nacionalidades comunes
export const COMMON_NATIONALITIES = [
  'Española',
  'Argelina',
  'Marroquí',
  'Francesa',
  'Tunecina',
  'Otra',
] as const;
