// The print page renders a CV that arrived over an open endpoint, so any URL in it is untrusted.
// Text is escaped by React; these two sinks are not: an image's `src` and the gallery anchor's `href`.

const SAFE_SRC = /^(https?:\/\/|data:image\/)/i;
const SAFE_HREF = /^https?:\/\//i;

type LooseImage = { src?: string; href?: string };
type LooseContent = { key?: string; images?: LooseImage[] };
type LooseSection = { key?: string; type?: string; content?: LooseContent[] };
type Loose = { sections?: LooseSection[] };

/**
 * Drops images whose `src` is not http(s) or an inline image, and strips a `href` that is not http(s).
 * Everything else is untouched, because the template only needs those two to be safe.
 */
export function sanitizeCv<T extends Loose>(cv: T): T {
  const copy = structuredClone(cv);
  for (const section of copy.sections ?? []) {
    for (const item of section.content ?? []) {
      if (!item.images) continue;
      item.images = item.images
        .filter((image) => SAFE_SRC.test(image.src ?? ''))
        .map((image) => (image.href && !SAFE_HREF.test(image.href) ? { ...image, href: undefined } : image));
    }
  }
  return copy;
}
