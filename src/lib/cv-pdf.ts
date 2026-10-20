import type { BaseCv } from '../schemas/basecv-schema';
import { encodeCv } from './cv-print-link';

export type QuickAction = (
  action: 'pdf',
  options: { url: string; pdfOptions?: Record<string, unknown> },
) => Promise<Response>;

export type PdfDeps = {
  origin: string;
  /** The `BROWSER` binding, which needs no API token and no account id. */
  browser: { quickAction: QuickAction };
};

// preferCSSPageSize lets the print stylesheet decide the page, and printBackground keeps the accent
// colour, which T1.4's pixel diff would otherwise flag.
const PDF_OPTIONS = { format: 'a4', printBackground: true, preferCSSPageSize: true };

/**
 * Renders a CV by pointing Browser Run at the print page, with the CV itself in the URL. The bytes
 * come from the same components and stylesheet the app prints with (D18), and nothing is written to
 * the database on the way.
 */
export function createPdfRenderer({ origin, browser }: PdfDeps) {
  return async function render(cv: BaseCv): Promise<Uint8Array> {
    const url = `${origin}/print?cv=${encodeCv(JSON.stringify(cv))}`;

    const response = await browser.quickAction('pdf', { url, pdfOptions: PDF_OPTIONS });
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 200);
      throw new Error(`browser run answered ${response.status}: ${detail}`);
    }
    return new Uint8Array(await response.arrayBuffer());
  };
}
