import { secretsMatch } from './cv-auth';

const encoder = new TextEncoder();
const algorithm = { name: 'HMAC', hash: 'SHA-256' } as const;

const hex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');

/** base64url of the JSON, so the CV travels in the query string without escaping. */
export function encodeCv(json: string): string {
  const bytes = encoder.encode(json);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeCv(value: string): string {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

export async function signPayload(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), algorithm, false, ['sign']);
  return hex(await crypto.subtle.sign(algorithm, key, encoder.encode(payload)));
}

/** True only for a payload this deployment signed, so the page is not a renderer for anyone's JSON. */
export async function verifyPayload(secret: string, payload: string, sig: string): Promise<boolean> {
  if (!payload || !sig) return false;
  return secretsMatch(sig, await signPayload(secret, payload));
}
