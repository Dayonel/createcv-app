import { describe, expect, it, vi } from 'vitest';
import { createCvHandler } from './cv-route';

const cv = { color: '#1f2933', contacts: [{ key: 'c1', text: 'me@example.com', icon: 'mail' }], sections: [] };
const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46]);

const handler = (render = vi.fn(async (_cv: unknown) => pdf)) => ({ POST: createCvHandler({ render }), render });

const call = (body: unknown) =>
  new Request('https://example.com/api/cv', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

describe('POST /api/cv', () => {
  it('answers 422 for a body that is not json', async () => {
    const { POST } = handler();
    expect((await POST(call('{nope'))).status).toBe(422);
  });

  it('answers 422 for json that is not a CV', async () => {
    const { POST } = handler();
    const response = await POST(call({ color: '#000', contacts: [] }));
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ error: 'invalid cv' });
  });

  it('answers 200 with a pdf, without asking for a key', async () => {
    const { POST } = handler();
    const response = await POST(call(cv));
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/pdf');
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(pdf);
  });

  it('renders the parsed CV', async () => {
    const { POST, render } = handler();
    await POST(call(cv));
    expect(render).toHaveBeenCalledWith(expect.objectContaining({ color: '#1f2933' }));
  });
});
