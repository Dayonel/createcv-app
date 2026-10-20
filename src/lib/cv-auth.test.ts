import { describe, expect, it } from 'vitest';
import { bearerToken, secretsMatch } from './cv-auth';

describe('secretsMatch', () => {
  it('accepts the equal secret', async () => {
    expect(await secretsMatch('sk-live-abc', 'sk-live-abc')).toBe(true);
  });

  it('rejects a secret that differs in one character', async () => {
    expect(await secretsMatch('sk-live-abd', 'sk-live-abc')).toBe(false);
  });

  it('rejects a secret of a different length', async () => {
    expect(await secretsMatch('sk-live-abc-extended', 'sk-live-abc')).toBe(false);
  });
});

describe('bearerToken', () => {
  const withHeader = (value?: string) =>
    new Request('https://example.com/api/cv', { method: 'POST', headers: value ? { authorization: value } : {} });

  it('reads the token', () => {
    expect(bearerToken(withHeader('Bearer abc123'))).toBe('abc123');
  });

  it('ignores the wrong scheme and a missing header', () => {
    expect(bearerToken(withHeader('Basic abc123'))).toBeNull();
    expect(bearerToken(withHeader())).toBeNull();
  });
});
