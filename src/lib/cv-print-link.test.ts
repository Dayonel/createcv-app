import { describe, expect, it } from 'vitest';
import { decodeCv, encodeCv } from './cv-print-link';

const cv = { color: '#1f2933', contacts: [{ key: 'c1', text: 'me@example.com', icon: 'mail' }], sections: [] };

describe('encodeCv and decodeCv', () => {
  it('round-trips a CV', () => {
    expect(JSON.parse(decodeCv(encodeCv(JSON.stringify(cv))))).toEqual(cv);
  });

  it('round-trips characters that are not ASCII', () => {
    const json = JSON.stringify({ ...cv, summary: 'Gérard — “senior” engineer, 5 ★' });
    expect(decodeCv(encodeCv(json))).toBe(json);
  });

  it('produces something safe for a query string', () => {
    expect(encodeCv(JSON.stringify(cv))).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
