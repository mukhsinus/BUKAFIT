/** Digits only after country code; Uzbekistan mobile is 9 digits */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Format display: +998 XX XXX XX XX
 * Accepts raw input with or without +998 prefix.
 */
export function formatUzPhoneInput(raw: string): string {
  let digits = digitsOnly(raw);

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  digits = digits.slice(0, 9);

  const p1 = digits.slice(0, 2);
  const p2 = digits.slice(2, 5);
  const p3 = digits.slice(5, 7);
  const p4 = digits.slice(7, 9);

  let out = "+998";
  if (p1) out += ` ${p1}`;
  if (p2) out += ` ${p2}`;
  if (p3) out += ` ${p3}`;
  if (p4) out += ` ${p4}`;
  return out;
}

/** Normalize to E.164 +998XXXXXXXXX */
export function toE164Uz(display: string): string {
  let digits = digitsOnly(display);
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }
  digits = digits.slice(0, 9);
  return `+998${digits}`;
}

export function isCompleteUzPhone(display: string): boolean {
  return /^\+998\d{9}$/.test(toE164Uz(display));
}
