export function normalizeUkPhone(phone: string): string {
  return phone.replace(/[\s\-().]/g, '');
}

/** UK numbers: +44 or 0 prefix, 10–11 national digits. */
export function isValidUkPhone(phone: string): boolean {
  const normalized = normalizeUkPhone(phone);
  if (normalized.startsWith('+44')) {
    const digits = normalized.slice(3);
    return /^[1-9]\d{8,9}$/.test(digits);
  }
  if (normalized.startsWith('0')) {
    return /^0[1-9]\d{8,9}$/.test(normalized);
  }
  return false;
}

export const UK_PHONE_HINT = 'Enter a valid UK number (e.g. +44 7700 900123 or 07700 900123).';
