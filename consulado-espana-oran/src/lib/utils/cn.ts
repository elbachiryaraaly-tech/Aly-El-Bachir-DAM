// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - UTILIDADES DE CLASES CSS
// ============================================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
