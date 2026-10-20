const encoder = new TextEncoder();

/**
 * Compares two secrets without letting the running time depend on how much of them matches. Both
 * sides are hashed first, so even the lengths stop being visible to an attacker who can time calls.
 */
export async function secretsMatch(given: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(given)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected)),
  ]);
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  let difference = 0;
  for (let i = 0; i < left.length; i += 1) difference |= left[i] ^ right[i];
  return difference === 0;
}

/** Reads `Authorization: Bearer <token>`, or null when the header is missing or malformed. */
export function bearerToken(request: Request): string | null {
  const match = /^Bearer\s+(\S+)\s*$/i.exec(request.headers.get('authorization') ?? '');
  return match ? match[1] : null;
}
