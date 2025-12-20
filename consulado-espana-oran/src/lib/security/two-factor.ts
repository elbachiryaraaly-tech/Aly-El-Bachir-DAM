// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - AUTENTICACIÓN DE DOS FACTORES
// Implementación TOTP con seguridad de nivel gubernamental
// ============================================================================

import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { encrypt, decrypt, generateSecureToken } from './encryption';

const ISSUER = 'Consulado España Orán';
const TOTP_WINDOW = 1; // Permite 1 intervalo antes/después (30 segundos cada uno)
const BACKUP_CODE_COUNT = 10;

export interface TwoFactorSecret {
  secret: string;
  encryptedSecret: string;
  otpauthUrl: string;
  qrCode: string;
  backupCodes: string[];
  encryptedBackupCodes: string[];
}

export interface VerificationResult {
  valid: boolean;
  usedBackupCode?: boolean;
  remainingBackupCodes?: number;
}

/**
 * Genera un nuevo secreto 2FA para un usuario
 */
export async function generateTwoFactorSecret(
  userEmail: string,
  userName: string
): Promise<TwoFactorSecret> {
  // Generar secreto TOTP
  const secret = speakeasy.generateSecret({
    name: `${userName} (${userEmail})`,
    issuer: ISSUER,
    length: 32, // 256 bits para máxima seguridad
  });

  // Generar URL otpauth
  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.base32,
    label: `${ISSUER}:${userEmail}`,
    issuer: ISSUER,
    encoding: 'base32',
  });

  // Generar código QR
  const qrCode = await QRCode.toDataURL(otpauthUrl, {
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });

  // Generar códigos de respaldo
  const backupCodes = generateBackupCodes(BACKUP_CODE_COUNT);

  // Encriptar datos sensibles para almacenamiento
  const encryptedSecret = encrypt(secret.base32);
  const encryptedBackupCodes = backupCodes.map(code => encrypt(code));

  return {
    secret: secret.base32,
    encryptedSecret,
    otpauthUrl,
    qrCode,
    backupCodes,
    encryptedBackupCodes,
  };
}

/**
 * Verifica un código TOTP
 */
export function verifyTOTPCode(
  encryptedSecret: string,
  code: string
): boolean {
  try {
    const secret = decrypt(encryptedSecret);
    
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: TOTP_WINDOW,
    });
  } catch (error) {
    console.error('Error verifying TOTP:', error);
    return false;
  }
}

/**
 * Verifica un código de respaldo
 */
export function verifyBackupCode(
  encryptedBackupCodes: string[],
  code: string
): { valid: boolean; remainingCodes: string[] } {
  const normalizedCode = code.toUpperCase().replace(/-/g, '');
  
  for (let i = 0; i < encryptedBackupCodes.length; i++) {
    try {
      const decryptedCode = decrypt(encryptedBackupCodes[i]);
      const normalizedStored = decryptedCode.toUpperCase().replace(/-/g, '');
      
      if (normalizedCode === normalizedStored) {
        // Código válido, eliminar de la lista
        const remainingCodes = [
          ...encryptedBackupCodes.slice(0, i),
          ...encryptedBackupCodes.slice(i + 1),
        ];
        
        return {
          valid: true,
          remainingCodes,
        };
      }
    } catch (error) {
      // Continuar con el siguiente código
      continue;
    }
  }
  
  return {
    valid: false,
    remainingCodes: encryptedBackupCodes,
  };
}

/**
 * Genera códigos de respaldo seguros
 */
function generateBackupCodes(count: number): string[] {
  const codes: string[] = [];
  const crypto = require('crypto');
  
  for (let i = 0; i < count; i++) {
    // Formato: XXXX-XXXX-XXXX (12 caracteres alfanuméricos)
    const buffer = crypto.randomBytes(6);
    const hex = buffer.toString('hex').toUpperCase();
    const formatted = `${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`;
    codes.push(formatted);
  }
  
  return codes;
}

/**
 * Regenera códigos de respaldo
 */
export function regenerateBackupCodes(): {
  codes: string[];
  encryptedCodes: string[];
} {
  const codes = generateBackupCodes(BACKUP_CODE_COUNT);
  const encryptedCodes = codes.map(code => encrypt(code));
  
  return {
    codes,
    encryptedCodes,
  };
}

/**
 * Genera un código TOTP actual (para pruebas/admin)
 */
export function generateCurrentTOTP(encryptedSecret: string): string {
  const secret = decrypt(encryptedSecret);
  
  return speakeasy.totp({
    secret,
    encoding: 'base32',
  });
}

/**
 * Obtiene el tiempo restante del código actual
 */
export function getTimeRemaining(): number {
  const now = Math.floor(Date.now() / 1000);
  const step = 30; // Intervalo TOTP estándar
  return step - (now % step);
}

/**
 * Verifica si el 2FA está configurado correctamente
 */
export function validate2FASetup(
  encryptedSecret: string,
  testCode: string
): boolean {
  return verifyTOTPCode(encryptedSecret, testCode);
}

/**
 * Genera token temporal para configuración de 2FA
 */
export function generateSetupToken(): string {
  return generateSecureToken(32);
}

/**
 * Formatea códigos de respaldo para mostrar al usuario
 */
export function formatBackupCodesForDisplay(codes: string[]): string {
  return codes.map((code, index) => `${index + 1}. ${code}`).join('\n');
}

/**
 * Valida formato de código TOTP
 */
export function isValidTOTPFormat(code: string): boolean {
  // TOTP debe ser 6 dígitos
  return /^\d{6}$/.test(code);
}

/**
 * Valida formato de código de respaldo
 */
export function isValidBackupCodeFormat(code: string): boolean {
  // Formato: XXXX-XXXX-XXXX
  const normalized = code.toUpperCase().replace(/-/g, '');
  return /^[A-F0-9]{12}$/.test(normalized);
}
