import { BaseCvSchema, type BaseCv } from '../schemas/basecv-schema';

export type CvDeps = {
  render: (cv: BaseCv) => Promise<Uint8Array>;
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/**
 * The POST handler for /api/cv: validate the body is a CV, render it, return the PDF. It is open by
 * the owner's decision, and it never logs the body, because a CV is personal data.
 */
export function createCvHandler({ render }: CvDeps) {
  return async function POST(request: Request): Promise<Response> {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json(422, { error: 'invalid json' });
    }

    const parsed = BaseCvSchema.safeParse(body);
    if (!parsed.success) return json(422, { error: 'invalid cv', issues: parsed.error.issues.length });

    const pdf = await render(parsed.data);
    return new Response(pdf, {
      status: 200,
      headers: { 'content-type': 'application/pdf', 'content-length': String(pdf.byteLength) },
    });
  };
}
