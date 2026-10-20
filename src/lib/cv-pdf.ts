import type { BaseCv } from '@/schemas/basecv-schema';

/** Replaced in T1.3 by the Browser Run render chosen in D15. */
export async function renderCvPdf(_cv: BaseCv): Promise<Uint8Array> {
  throw new Error('renderCvPdf is implemented in T1.3');
}
