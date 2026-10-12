type Doc = { type: string; content?: any[] };

export const parseDoc = (json: string): Doc => {
  try {
    const doc = JSON.parse(json);
    return doc && typeof doc === 'object' ? doc : { type: 'doc' };
  } catch {
    return { type: 'doc' };
  }
};

export const getParagraphText = (json: string): string =>
  parseDoc(json).content?.[0]?.content?.[0]?.text ?? '';

export const getText = (json: string): string =>
  parseDoc(json).content?.[0]?.text ?? '';

export const getTextContent = (text: string) =>
  JSON.stringify({ type: 'doc', content: [{ type: 'text', text }] });

const toDate = (s?: string) => {
  if (!s) return;
  if (/present|now/i.test(s)) return new Date();
  if (/[a-z]/i.test(s)) return new Date(`1 ${s}`);
};

const plural = (n: number, unit: string) =>
  n ? `${n} ${unit}${n > 1 ? 's' : ''}` : '';

export const duration = (range: string) => {
  const [from, to] = range.split(/\s[-–—]\s/).map(toDate);
  if (!from || !to) return '';

  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    to.getMonth() -
    from.getMonth() +
    1;
  if (!(months > 0)) return '';

  return [plural(Math.floor(months / 12), 'yr'), plural(months % 12, 'mo')]
    .filter(Boolean)
    .join(' ');
};
