import { getRequestContext } from '@cloudflare/next-on-pages';
import { createPdfRenderer, type QuickAction } from '@/lib/cv-pdf';
import { createCvHandler } from '@/lib/cv-route';

export const runtime = 'edge';

type Env = { BROWSER: { quickAction: QuickAction } };

export async function POST(request: Request): Promise<Response> {
  const { env } = getRequestContext() as unknown as { env: Env };
  return createCvHandler({
    render: createPdfRenderer({ origin: new URL(request.url).origin, browser: env.BROWSER }),
  })(request);
}
