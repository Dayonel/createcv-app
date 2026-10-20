import { getRequestContext } from '@cloudflare/next-on-pages';
import { renderCvPdf } from '@/lib/cv-pdf';
import { d1Limiter } from '@/lib/cv-rate-limit';
import { createCvHandler } from '@/lib/cv-route';

export const runtime = 'edge';

export async function POST(request: Request): Promise<Response> {
  const { env } = getRequestContext() as unknown as { env: { DB: D1Database; CV_API_KEY: string } };
  return createCvHandler({ apiKey: env.CV_API_KEY, render: renderCvPdf, hit: d1Limiter(env.DB) })(request);
}
