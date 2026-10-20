import { describe, expect, it, vi } from 'vitest';
import { decodeCv } from './cv-print-link';
import { createPdfRenderer } from './cv-pdf';

const cv = { color: '#1f2933', contacts: [{ key: 'c1', text: 'me@example.com', icon: 'mail' }], sections: [] };
const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46]);

const setup = (response: Response) => {
  const fetchImpl = vi.fn(async (_url: string, _init: RequestInit) => response);
  const render = createPdfRenderer({
    accountId: 'acct',
    token: 'browser-token',
    origin: 'https://cv.example.com',
    secret: 'print-secret',
    fetchImpl: fetchImpl as unknown as typeof fetch,
  });
  return { render, fetchImpl };
};

describe('createPdfRenderer', () => {
  it('asks browser run to fetch the print page with the CV in the URL', async () => {
    const { render, fetchImpl } = setup(new Response(bytes, { status: 200 }));
    await render(cv);

    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.cloudflare.com/client/v4/accounts/acct/browser-run/pdf');
    expect(init.method).toBe('POST');
    expect((init.headers as Record<string, string>).authorization).toBe('Bearer browser-token');

    const body = JSON.parse(String(init.body));
    const parsed = new URL(body.url);
    expect(parsed.origin).toBe('https://cv.example.com');
    expect(parsed.pathname).toBe('/print');
    expect(JSON.parse(decodeCv(parsed.searchParams.get('cv') ?? ''))).toEqual(cv);
    expect(parsed.searchParams.get('sig')).toMatch(/^[0-9a-f]{64}$/);
    expect(body.pdfOptions).toMatchObject({ printBackground: true, preferCSSPageSize: true });
  });

  it('returns the bytes', async () => {
    const { render } = setup(new Response(bytes, { status: 200 }));
    expect(await render(cv)).toEqual(bytes);
  });

  it('surfaces a browser run failure', async () => {
    const { render } = setup(new Response('boom', { status: 522 }));
    await expect(render(cv)).rejects.toThrow(/522/);
  });
});
