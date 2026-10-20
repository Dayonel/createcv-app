import { getRequestContext } from '@cloudflare/next-on-pages';
import { notFound } from 'next/navigation';
import Template1 from '@/components/templates/template1/template1';
import { decodeCv, verifyPayload } from '@/lib/cv-print-link';
import { BaseCvSchema } from '@/schemas/basecv-schema';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Props = { searchParams: { cv?: string; sig?: string } };

/**
 * Renders the CV the API signed and put in the URL. Nothing is stored and there is no id to guess:
 * the page lives for one request, and an unsigned payload is refused so this domain cannot be used
 * as a renderer for someone else's JSON.
 */
export default async function PrintCv({ searchParams }: Props) {
  const { env } = getRequestContext() as unknown as { env: { CV_PRINT_SECRET: string } };
  const payload = searchParams.cv ?? '';

  if (!(await verifyPayload(env.CV_PRINT_SECRET, payload, searchParams.sig ?? ''))) notFound();

  const json = decodeCv(payload);
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    notFound();
  }
  if (!BaseCvSchema.safeParse(parsed).success) notFound();

  return <Template1 json={json} stored />;
}
