// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - MÓDULO DE ENCRIPTACIÓN
// Seguridad de Nivel Gubernamental - AES-256-GCM
// ============================================================================

import crypto from 'crypto';
import CryptoJS from 'crypto-js';

// Configuración de encriptación
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const TAG_LENGTH = 16;
const SALT_LENGTH = 32;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

/**
 * Genera una clave de encriptación segura a partir de una contraseña
 */
export function deriveKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512');
}

/**
 * Encripta datos sensibles usando AES-256-GCM
 * @param plaintext - Texto a encriptar
 * @param key - Clave de encriptación (debe ser de 32 bytes)
 * @returns Datos encriptados en formato base64
 */
export function encrypt(plaintext: string, key?: string): string {
  const encryptionKey = key || process.env.ENCRYPTION_KEY;
  
  if (!encryptionKey) {
    throw new Error('Encryption key is required');
  }

  // Generar IV aleatorio
  const iv = crypto.randomBytes(IV_LENGTH);
  
  // Derivar clave de 32 bytes
  const salt = crypto.randomBytes(SALT_LENGTH);
  const derivedKey = deriveKey(encryptionKey, salt);
  
  // Crear cipher
  const cipher = crypto.createCipheriv(ALGORITHM, derivedKey, iv);
  
  // Encriptar
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Obtener tag de autenticación
  const tag = cipher.getAuthTag();
  
  // Combinar: salt + iv + tag + encrypted
  const combined = Buffer.concat([
    salt,
    iv,
    tag,
    Buffer.from(encrypted, 'hex')
  ]);
  
  return combined.toString('base64');
}

/**
 * Desencripta datos usando AES-256-GCM
 * @param encryptedData - Datos encriptados en base64
 * @param key - Clave de encriptación
 * @returns Texto desencriptado
 */
export function decrypt(encryptedData: string, key?: string): string {
  const encryptionKey = key || process.env.ENCRYPTION_KEY;
  
  if (!encryptionKey) {
    throw new Error('Encryption key is required');
  }

  // Decodificar base64
  const combined = Buffer.from(encryptedData, 'base64');
  
  // Extraer componentes
  const salt = combined.subarray(0, SALT_LENGTH);
  const iv = combined.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const tag = combined.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const encrypted = combined.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  
  // Derivar clave
  const derivedKey = deriveKey(encryptionKey, salt);
  
  // Crear decipher
  const decipher = crypto.createDecipheriv(ALGORITHM, derivedKey, iv);
  decipher.setAuthTag(tag);
  
  // Desencriptar
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString('utf8');
}

/**
 * Genera un hash seguro SHA-512
 */
export function hashSHA512(data: string): string {
  return crypto.createHash('sha512').update(data).digest('hex');
}

/**
 * Genera un hash SHA-256
 */
export function hashSHA256(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Genera un token seguro aleatorio
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Genera un código de verificación numérico
 */
export function generateVerificationCode(length: number = 6): string {
  const max = Math.pow(10, length) - 1;
  const randomNumber = crypto.randomInt(0, max);
  return randomNumber.toString().padStart(length, '0');
}

/**
 * Compara dos strings de forma segura (timing-safe)
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Encripta datos para almacenamiento en cliente (usando CryptoJS)
 */
export function encryptForClient(data: string, secret: string): string {
  return CryptoJS.AES.encrypt(data, secret).toString();
}

/**
 * Desencripta datos del cliente
 */
export function decryptFromClient(encryptedData: string, secret: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Genera checksum para verificar integridad de archivos
 */
export function generateChecksum(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/**
 * Verifica checksum de un archivo
 */
export function verifyChecksum(buffer: Buffer, expectedChecksum: string): boolean {
  const actualChecksum = generateChecksum(buffer);
  return secureCompare(actualChecksum, expectedChecksum);
}

/**
 * Máscara para datos sensibles (para logs)
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
  if (data.length <= visibleChars * 2) {
    return '*'.repeat(data.length);
  }
  const start = data.substring(0, visibleChars);
  const end = data.substring(data.length - visibleChars);
  const masked = '*'.repeat(data.length - visibleChars * 2);
  return `${start}${masked}${end}`;
}

/**
 * Genera número de referencia único para citas
 */
export function generateReferenceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `CGE-${timestamp}-${random}`;
}

/**
 * Clase para manejo seguro de datos sensibles en memoria
 */
export class SecureString {
  private encrypted: string;
  private key: Buffer;

  constructor(value: string) {
    this.key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    this.encrypted = iv.toString('hex') + encrypted;
    
    // Limpiar valor original de memoria
    value = '';
  }

  getValue(): string {
    const iv = Buffer.from(this.encrypted.substring(0, 32), 'hex');
    const encrypted = this.encrypted.substring(32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  destroy(): void {
    this.encrypted = '';
    this.key.fill(0);
  }
}
