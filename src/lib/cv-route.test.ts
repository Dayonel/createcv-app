import { describe, expect, it, vi } from 'vitest';
import { createCvHandler } from './cv-route';

const cv = { color: '#1f2933', contacts: [{ key: 'c1', text: 'me@example.com', icon: 'mail' }], sections: [] };
const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46]);

const handler = (overrides: Partial<Parameters<typeof createCvHandler>[0]> = {}) =>
  createCvHandler({ apiKey: 'secret', render: async () => pdf, hit: async () => true, ...overrides });

const call = (body: unknown, auth = 'Bearer secret') =>
  new Request('https://example.com/api/cv', {
    method: 'POST',
    headers: { authorization: auth, 'cf-connecting-ip': '203.0.113.7', 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

describe('POST /api/cv', () => {
  it('answers 401 without a key or with the wrong one, before rendering', async () => {
    const render = vi.fn(async () => pdf);
    expect((await handler({ render })(call(cv, ''))).status).toBe(401);
    expect((await handler({ render })(call(cv, 'Bearer wrong'))).status).toBe(401);
    expect(render).not.toHaveBeenCalled();
  });

  it('answers 422 for a body that is not json', async () => {
    expect((await handler()(call('{nope'))).status).toBe(422);
  });

  it('answers 422 for json that is not a CV', async () => {
    const response = await handler()(call({ color: '#000', contacts: [] }));
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ error: 'invalid cv' });
  });

  it('answers 429 with a retry hint once the caller is over the limit', async () => {
    const response = await handler({ hit: async () => false })(call(cv));
    expect(response.status).toBe(429);
    expect(response.headers.get('retry-after')).toBe('3600');
  });

  it('answers 200 with a pdf and the bytes the renderer produced', async () => {
    const render = vi.fn(async () => pdf);
    const response = await handler({ render })(call(cv));
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/pdf');
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(pdf);
  });

  it('passes the parsed CV and the caller ip to the collaborators', async () => {
    const hit = vi.fn(async () => true);
    const render = vi.fn(async () => pdf);
    await handler({ hit, render })(call(cv));
    expect(hit).toHaveBeenCalledWith('203.0.113.7');
    expect(render).toHaveBeenCalledWith(expect.objectContaining({ color: '#1f2933' }));
  });
});
