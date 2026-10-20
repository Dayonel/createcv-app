import { BaseCvSchema, type BaseCv } from '../schemas/basecv-schema';
import { bearerToken, secretsMatch } from './cv-auth';

export type CvDeps = {
  apiKey: string;
  render: (cv: BaseCv) => Promise<Uint8Array>;
  /** Returns false when this caller is over the limit. */
  hit: (ip: string) => Promise<boolean>;
};

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

/**
 * The POST handler for /api/cv, with its collaborators passed in so the status codes can be tested
 * without a renderer or a database. Nothing here logs the request body: a CV is PII.
 */
export function createCvHandler({ apiKey, render, hit }: CvDeps) {
  return async function POST(request: Request): Promise<Response> {
    const token = bearerToken(request);
    if (!token || !(await secretsMatch(token, apiKey))) return json(401, { error: 'unauthorized' });

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json(422, { error: 'invalid json' });
    }

    const parsed = BaseCvSchema.safeParse(body);
    if (!parsed.success) return json(422, { error: 'invalid cv', issues: parsed.error.issues.length });

    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
    if (!(await hit(ip))) return json(429, { error: 'rate limited' }, { 'retry-after': '3600' });

    const pdf = await render(parsed.data);
    return new Response(pdf, {
      status: 200,
      headers: { 'content-type': 'application/pdf', 'content-length': String(pdf.byteLength) },
    });
  };
}
