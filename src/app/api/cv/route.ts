import { getRequestContext } from '@cloudflare/next-on-pages';
import { createPdfRenderer } from '@/lib/cv-pdf';
import { d1Limiter } from '@/lib/cv-rate-limit';
import { createCvHandler } from '@/lib/cv-route';

export const runtime = 'edge';

type Env = {
  DB: D1Database;
  CV_API_KEY: string;
  CV_ACCOUNT_ID: string;
  CV_BROWSER_TOKEN: string;
  CV_PRINT_SECRET: string;
};

export async function POST(request: Request): Promise<Response> {
  const { env } = getRequestContext() as unknown as { env: Env };
  return createCvHandler({
    apiKey: env.CV_API_KEY,
    hit: d1Limiter(env.DB),
    render: createPdfRenderer({
      accountId: env.CV_ACCOUNT_ID,
      token: env.CV_BROWSER_TOKEN,
      origin: new URL(request.url).origin,
      secret: env.CV_PRINT_SECRET,
    }),
  })(request);
}
