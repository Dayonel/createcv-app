import { describe, expect, it } from 'vitest';
import { decodeCv, encodeCv, signPayload, verifyPayload } from './cv-print-link';

const secret = 'print-secret';
const cv = { color: '#1f2933', contacts: [{ key: 'c1', text: 'me@example.com', icon: 'mail' }], sections: [] };
const json = JSON.stringify(cv);

describe('encodeCv and decodeCv', () => {
  it('round-trips a CV', () => {
    expect(JSON.parse(decodeCv(encodeCv(json)))).toEqual(cv);
  });

  it('round-trips characters that are not ASCII', () => {
    const accented = JSON.stringify({ ...cv, summary: 'Gérard — “senior” engineer, 5 ★' });
    expect(decodeCv(encodeCv(accented))).toBe(accented);
  });

  it('produces something safe for a query string', () => {
    expect(encodeCv(json)).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});

describe('signPayload and verifyPayload', () => {
  it('accepts a payload it signed', async () => {
    const payload = encodeCv(json);
    expect(await verifyPayload(secret, payload, await signPayload(secret, payload))).toBe(true);
  });

  it('rejects a payload that was changed after signing', async () => {
    const payload = encodeCv(json);
    const sig = await signPayload(secret, payload);
    expect(await verifyPayload(secret, encodeCv(JSON.stringify({ ...cv, color: '#000' })), sig)).toBe(false);
  });

  it('rejects a signature made with another secret', async () => {
    const payload = encodeCv(json);
    expect(await verifyPayload(secret, payload, await signPayload('other', payload))).toBe(false);
  });

  it('rejects an empty payload or signature', async () => {
    expect(await verifyPayload(secret, '', await signPayload(secret, ''))).toBe(false);
    expect(await verifyPayload(secret, encodeCv(json), '')).toBe(false);
  });
});
