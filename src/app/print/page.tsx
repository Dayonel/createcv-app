import { notFound } from 'next/navigation';
import Template1 from '@/components/templates/template1/template1';
import { decodeCv } from '@/lib/cv-print-link';
import { sanitizeCv } from '@/lib/sanitize-cv';
import { BaseCvSchema } from '@/schemas/basecv-schema';

export const dynamic = 'force-dynamic';

type Props = { searchParams: { cv?: string } };

/**
 * Renders the CV from the URL and nothing else: no lookup, no storage, no secret. Anything that is
 * not a CV is refused, and its image URLs are sanitised, because this endpoint is open.
 */
export default async function PrintCv({ searchParams }: Props) {
  const payload = searchParams.cv ?? '';
  if (!payload) notFound();

  let parsed: unknown;
  try {
    parsed = JSON.parse(decodeCv(payload));
  } catch {
    notFound();
  }
  if (!BaseCvSchema.safeParse(parsed).success) notFound();

  return <Template1 json={JSON.stringify(sanitizeCv(parsed as never))} stored />;
}
