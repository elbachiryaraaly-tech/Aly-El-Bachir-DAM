// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - TIPOS TYPESCRIPT
// Definiciones de tipos para seguridad gubernamental
// ============================================================================

import { 
  User, 
  ConsularService, 
  Appointment, 
  Session,
  AuditLog,
  SecurityEvent,
  Document,
  Notification
} from '@prisma/client';

// ============================================================================
// TIPOS DE USUARIO Y AUTENTICACIÓN
// ============================================================================

export interface SafeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  nationality: string;
  phone: string;
  role: string;
  twoFactorEnabled: boolean;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
  sessionId: string;
  twoFactorVerified: boolean;
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  captchaToken?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  nationality: string;
  phone: string;
  dateOfBirth: string;
  acceptTerms: boolean;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface TwoFactorVerifyRequest {
  code: string;
  isBackupCode?: boolean;
}

// ============================================================================
// TIPOS DE SERVICIOS Y CITAS
// ============================================================================

export interface ServiceWithSlots extends ConsularService {
  timeSlots: TimeSlotData[];
  appointmentCount?: number;
}

export interface TimeSlotData {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  maxAppointments: number;
  isActive: boolean;
  availableSlots?: number;
}

export interface AvailableDate {
  date: string;
  dayOfWeek: number;
  slots: AvailableSlot[];
  isHoliday: boolean;
  holidayName?: string;
}

export interface AvailableSlot {
  id: string;
  time: string;
  available: number;
  total: number;
}

export interface AppointmentCreateData {
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
  documents?: string[];
}

export interface AppointmentWithDetails extends Appointment {
  user: SafeUser;
  service: ConsularService;
  documents: Document[];
}

export interface AppointmentFilters {
  status?: string[];
  serviceId?: string;
  dateFrom?: string;
  dateTo?: string;
  userId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================================================
// TIPOS DE SEGURIDAD
// ============================================================================

export interface SecurityConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenExpiresIn: string;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecial: boolean;
  maxLoginAttempts: number;
  lockoutDuration: number;
  sessionTimeout: number;
  twoFactorRequired: boolean;
  rateLimitRequests: number;
  rateLimitWindow: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs: number;
}

export interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Frame-Options': string;
  'X-Content-Type-Options': string;
  'X-XSS-Protection': string;
  'Strict-Transport-Security': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
}

export interface CSRFToken {
  token: string;
  expiresAt: Date;
}

export interface AuditLogEntry {
  action: string;
  resource: string;
  resourceId?: string;
  description: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SecurityEventEntry {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// TIPOS DE DOCUMENTOS
// ============================================================================

export interface DocumentUpload {
  file: File;
  type: string;
  appointmentId?: string;
}

export interface DocumentWithUser extends Document {
  user: SafeUser;
}

// ============================================================================
// TIPOS DE NOTIFICACIONES
// ============================================================================

export interface NotificationData {
  type: string;
  title: string;
  message: string;
  channels: string[];
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// TIPOS DE RESPUESTA API
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  stack?: string;
}

// ============================================================================
// TIPOS DE FORMULARIO
// ============================================================================

export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// ============================================================================
// TIPOS DE CONFIGURACIÓN DEL CONSULADO
// ============================================================================

export interface ConsulateConfig {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  openingHours: OpeningHours;
  location: {
    latitude: number;
    longitude: number;
  };
  socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface OpeningHours {
  [key: number]: DaySchedule | null;
}

export interface DaySchedule {
  open: string;
  close: string;
  breakStart?: string;
  breakEnd?: string;
}

// ============================================================================
// TIPOS DE ESTADÍSTICAS
// ============================================================================

export interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedToday: number;
  noShowToday: number;
  averageWaitTime: number;
  popularServices: ServiceStat[];
  appointmentsByStatus: StatusStat[];
  appointmentsTrend: TrendData[];
}

export interface ServiceStat {
  serviceId: string;
  serviceName: string;
  count: number;
  percentage: number;
}

export interface StatusStat {
  status: string;
  count: number;
  percentage: number;
}

export interface TrendData {
  date: string;
  count: number;
}

// ============================================================================
// EXPORTACIÓN DE TIPOS DE PRISMA
// ============================================================================

export type {
  User,
  ConsularService,
  Appointment,
  Session,
  AuditLog,
  SecurityEvent,
  Document,
  Notification
};
