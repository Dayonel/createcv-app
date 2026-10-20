import { describe, expect, it, vi } from 'vitest';
import { decodeCv } from './cv-print-link';
import { createPdfRenderer, type QuickAction } from './cv-pdf';

const cv = { color: '#1f2933', contacts: [{ key: 'c1', text: 'me@example.com', icon: 'mail' }], sections: [] };
const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46]);

const binding = (response: Response) => {
  const quickAction = vi.fn(
    async (_action: 'pdf', _options: { url: string; pdfOptions?: Record<string, unknown> }) => response,
  );
  return { quickAction: quickAction as unknown as QuickAction, spy: quickAction };
};

describe('createPdfRenderer', () => {
  it('asks the binding to print the page with the CV in the URL', async () => {
    const { quickAction, spy } = binding(new Response(bytes, { status: 200 }));
    const render = createPdfRenderer({ origin: 'https://cv.example.com', browser: { quickAction } });
    expect(await render(cv)).toEqual(bytes);

    const [action, options] = spy.mock.calls[0];
    expect(action).toBe('pdf');
    const parsed = new URL(options.url);
    expect(parsed.origin).toBe('https://cv.example.com');
    expect(parsed.pathname).toBe('/print');
    expect(JSON.parse(decodeCv(parsed.searchParams.get('cv') ?? ''))).toEqual(cv);
    expect(parsed.searchParams.get('sig')).toBeNull();
    expect(options.pdfOptions).toMatchObject({ printBackground: true, preferCSSPageSize: true });
  });

  it('surfaces a browser run failure', async () => {
    const { quickAction } = binding(new Response('boom', { status: 522 }));
    const render = createPdfRenderer({ origin: 'https://cv.example.com', browser: { quickAction } });
    await expect(render(cv)).rejects.toThrow(/522/);
  });
});
