import { notFound } from 'next/navigation';
import Template1 from '@/components/templates/template1/template1';
import { decodeCv } from '@/lib/cv-print-link';
import { BaseCvSchema } from '@/schemas/basecv-schema';

export const dynamic = 'force-dynamic';

type Props = { searchParams: { cv?: string } };

/**
 * Renders the CV from the URL and nothing else: no lookup, no storage, no secret. Anything that is
 * not a CV is refused, so this page cannot be used to render arbitrary markup.
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

  return <Template1 json={JSON.stringify(parsed)} stored />;
}
