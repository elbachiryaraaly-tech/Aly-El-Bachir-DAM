// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - GESTIÓN DE CONTRASEÑAS
// Seguridad de Nivel Gubernamental - bcrypt + políticas estrictas
// ============================================================================

import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Configuración de seguridad de contraseñas
const BCRYPT_ROUNDS = 14; // Alto nivel de seguridad (lento pero seguro)
const PASSWORD_MIN_LENGTH = 12;
const PASSWORD_MAX_LENGTH = 128;

// Patrones de validación
const PATTERNS = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  numbers: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  consecutive: /(.)\1{2,}/, // Más de 2 caracteres consecutivos iguales
  sequential: /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i,
};

// Lista de contraseñas comunes prohibidas
const COMMON_PASSWORDS = new Set([
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', 'master',
  'dragon', 'letmein', 'login', 'admin', 'welcome', 'password1', '1234567890',
  'contraseña', 'consulado', 'españa', 'espana', 'oran', 'argelia',
]);

export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0-100
  errors: string[];
  suggestions: string[];
}

export interface PasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecial: boolean;
  preventCommon: boolean;
  preventConsecutive: boolean;
  preventSequential: boolean;
  preventUserInfo: boolean;
}

const DEFAULT_POLICY: PasswordPolicy = {
  minLength: PASSWORD_MIN_LENGTH,
  maxLength: PASSWORD_MAX_LENGTH,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: true,
  preventCommon: true,
  preventConsecutive: true,
  preventSequential: true,
  preventUserInfo: true,
};

/**
 * Hashea una contraseña de forma segura usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Verifica una contraseña contra su hash
 */
export async function verifyPassword(
  password: string, 
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Valida una contraseña según la política de seguridad gubernamental
 */
export function validatePassword(
  password: string,
  userInfo?: { email?: string; firstName?: string; lastName?: string },
  policy: PasswordPolicy = DEFAULT_POLICY
): PasswordValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Longitud mínima
  if (password.length < policy.minLength) {
    errors.push(`La contraseña debe tener al menos ${policy.minLength} caracteres`);
    score -= 25;
  }

  // Longitud máxima
  if (password.length > policy.maxLength) {
    errors.push(`La contraseña no puede exceder ${policy.maxLength} caracteres`);
    score -= 10;
  }

  // Mayúsculas
  if (policy.requireUppercase && !PATTERNS.uppercase.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
    score -= 15;
  }

  // Minúsculas
  if (policy.requireLowercase && !PATTERNS.lowercase.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
    score -= 15;
  }

  // Números
  if (policy.requireNumbers && !PATTERNS.numbers.test(password)) {
    errors.push('La contraseña debe contener al menos un número');
    score -= 15;
  }

  // Caracteres especiales
  if (policy.requireSpecial && !PATTERNS.special.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial (!@#$%^&*...)');
    score -= 15;
  }

  // Contraseñas comunes
  if (policy.preventCommon && COMMON_PASSWORDS.has(password.toLowerCase())) {
    errors.push('Esta contraseña es demasiado común. Por favor, elija una más segura');
    score -= 30;
  }

  // Caracteres consecutivos repetidos
  if (policy.preventConsecutive && PATTERNS.consecutive.test(password)) {
    errors.push('La contraseña no puede contener más de 2 caracteres consecutivos iguales');
    score -= 10;
  }

  // Secuencias predecibles
  if (policy.preventSequential && PATTERNS.sequential.test(password)) {
    errors.push('La contraseña no puede contener secuencias predecibles (123, abc, etc.)');
    score -= 10;
  }

  // Información del usuario
  if (policy.preventUserInfo && userInfo) {
    const lowerPassword = password.toLowerCase();
    
    if (userInfo.email) {
      const emailPrefix = userInfo.email.split('@')[0].toLowerCase();
      if (lowerPassword.includes(emailPrefix)) {
        errors.push('La contraseña no puede contener parte de su correo electrónico');
        score -= 20;
      }
    }
    
    if (userInfo.firstName && lowerPassword.includes(userInfo.firstName.toLowerCase())) {
      errors.push('La contraseña no puede contener su nombre');
      score -= 20;
    }
    
    if (userInfo.lastName && lowerPassword.includes(userInfo.lastName.toLowerCase())) {
      errors.push('La contraseña no puede contener su apellido');
      score -= 20;
    }
  }

  // Generar sugerencias
  if (password.length < 16) {
    suggestions.push('Considere usar una contraseña más larga para mayor seguridad');
  }

  if (!PATTERNS.special.test(password) || (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length < 2) {
    suggestions.push('Agregue más caracteres especiales para aumentar la seguridad');
  }

  // Calcular entropía
  const entropy = calculateEntropy(password);
  if (entropy < 60) {
    suggestions.push('La contraseña tiene baja entropía. Considere hacerla más aleatoria');
    score -= 10;
  }

  // Normalizar score
  score = Math.max(0, Math.min(100, score));

  return {
    isValid: errors.length === 0,
    score,
    errors,
    suggestions,
  };
}

/**
 * Calcula la entropía de una contraseña
 */
export function calculateEntropy(password: string): number {
  const charsetSize = getCharsetSize(password);
  return Math.log2(Math.pow(charsetSize, password.length));
}

function getCharsetSize(password: string): number {
  let size = 0;
  
  if (PATTERNS.lowercase.test(password)) size += 26;
  if (PATTERNS.uppercase.test(password)) size += 26;
  if (PATTERNS.numbers.test(password)) size += 10;
  if (PATTERNS.special.test(password)) size += 32;
  
  return size || 26; // Mínimo
}

/**
 * Genera una contraseña segura aleatoria
 */
export function generateSecurePassword(length: number = 16): string {
  const lowercase = 'abcdefghijkmnpqrstuvwxyz'; // Sin l, o (confusión con 1, 0)
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Sin I, O
  const numbers = '23456789'; // Sin 0, 1
  const special = '!@#$%^&*-_=+';
  
  const allChars = lowercase + uppercase + numbers + special;
  
  let password = '';
  
  // Garantizar al menos uno de cada tipo
  password += lowercase[crypto.randomInt(lowercase.length)];
  password += uppercase[crypto.randomInt(uppercase.length)];
  password += numbers[crypto.randomInt(numbers.length)];
  password += special[crypto.randomInt(special.length)];
  
  // Rellenar el resto
  for (let i = password.length; i < length; i++) {
    password += allChars[crypto.randomInt(allChars.length)];
  }
  
  // Mezclar caracteres
  return shuffleString(password);
}

function shuffleString(str: string): string {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

/**
 * Genera códigos de respaldo para 2FA
 */
export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  
  for (let i = 0; i < count; i++) {
    // Formato: XXXX-XXXX (8 caracteres alfanuméricos)
    const part1 = crypto.randomBytes(2).toString('hex').toUpperCase();
    const part2 = crypto.randomBytes(2).toString('hex').toUpperCase();
    codes.push(`${part1}-${part2}`);
  }
  
  return codes;
}

/**
 * Verifica si la contraseña ha expirado
 */
export function isPasswordExpired(
  lastChange: Date, 
  maxAgeDays: number = 90
): boolean {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastChange.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > maxAgeDays;
}

/**
 * Verifica si la contraseña está próxima a expirar
 */
export function isPasswordNearExpiry(
  lastChange: Date,
  maxAgeDays: number = 90,
  warningDays: number = 14
): boolean {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastChange.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > (maxAgeDays - warningDays);
}

/**
 * Calcula días restantes hasta expiración
 */
export function daysUntilExpiry(
  lastChange: Date,
  maxAgeDays: number = 90
): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastChange.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, maxAgeDays - diffDays);
}
