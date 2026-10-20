import type { BaseCv } from '../schemas/basecv-schema';
import { encodeCv, signPayload } from './cv-print-link';

export type PdfDeps = {
  accountId: string;
  token: string;
  origin: string;
  secret: string;
  fetchImpl?: typeof fetch;
};

// preferCSSPageSize lets the print stylesheet decide the page, and printBackground keeps the accent
// colour, which T1.4's pixel diff would otherwise flag.
const PDF_OPTIONS = { format: 'a4', printBackground: true, preferCSSPageSize: true };

/**
 * Renders a CV by pointing Browser Run at the print page, with the CV itself signed into the URL.
 * The bytes come from the same components and stylesheet the app prints with (D18), and nothing is
 * written to the database on the way.
 */
export function createPdfRenderer({ accountId, token, origin, secret, fetchImpl = fetch }: PdfDeps) {
  return async function render(cv: BaseCv): Promise<Uint8Array> {
    const payload = encodeCv(JSON.stringify(cv));
    const url = `${origin}/print?cv=${payload}&sig=${await signPayload(secret, payload)}`;

    const response = await fetchImpl(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-run/pdf`,
      {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ url, pdfOptions: PDF_OPTIONS }),
      },
    );
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 200);
      throw new Error(`browser run answered ${response.status}: ${detail}`);
    }
    return new Uint8Array(await response.arrayBuffer());
  };
}
