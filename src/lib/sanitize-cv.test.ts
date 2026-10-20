import { describe, expect, it } from 'vitest';
import { sanitizeCv } from './sanitize-cv';

const cv = (images: { src?: string; href?: string }[]) => ({
  color: '#000',
  contacts: [],
  sections: [{ key: 's1', type: 'Experience', content: [{ key: 'c1', images }] }],
});

describe('sanitizeCv', () => {
  it('keeps an https image and its https link', () => {
    const [item] = sanitizeCv(cv([{ src: 'https://cdn.example.com/a.png', href: 'https://example.com' }])).sections[0]!.content!;
    expect(item.images).toEqual([{ src: 'https://cdn.example.com/a.png', href: 'https://example.com' }]);
  });

  it('drops an image whose src would run code', () => {
    const [item] = sanitizeCv(cv([{ src: 'javascript:alert(1)' }, { src: 'data:image/png;base64,AA' }])).sections[0]!.content!;
    expect(item.images).toEqual([{ src: 'data:image/png;base64,AA' }]);
  });

  it('strips a javascript link but keeps the image', () => {
    const [item] = sanitizeCv(cv([{ src: 'https://cdn.example.com/a.png', href: 'javascript:alert(1)' }])).sections[0]!.content!;
    expect(item.images).toEqual([{ src: 'https://cdn.example.com/a.png', href: undefined }]);
  });

  it('leaves a CV without images alone, without mutating the input', () => {
    const input = { color: '#000', contacts: [], sections: [{ key: 's1', type: 'Experience' }] };
    const output = sanitizeCv(input);
    expect(output).toEqual(input);
    expect(output).not.toBe(input);
  });
});
