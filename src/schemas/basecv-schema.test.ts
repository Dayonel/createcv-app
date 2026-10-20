import { describe, expect, it } from 'vitest';
import { BaseCvSchema } from './basecv-schema';

// The shape these fixtures use is the one the app already stores: Template1 plus its parts.
const minimal = {
  color: '#1f2933',
  contacts: [{ key: 'c1', text: 'me@example.com', icon: 'mail' }],
  sections: [],
};

describe('BaseCvSchema', () => {
  it('accepts the shape the app stores', () => {
    expect(BaseCvSchema.parse(minimal)).toMatchObject({ color: '#1f2933' });
  });

  it('requires a colour and a contact list', () => {
    expect(BaseCvSchema.safeParse({ ...minimal, color: undefined }).success).toBe(false);
    expect(BaseCvSchema.safeParse({ ...minimal, contacts: undefined }).success).toBe(false);
  });

  it('keeps the skills of a double section instead of folding it into a single', () => {
    const cv = {
      ...minimal,
      sections: [
        { key: 's1', type: 'Skills', content: [{ key: 'd1', skills: [{ key: 'k1', value: 'TypeScript' }] }] },
      ],
    };
    const section = BaseCvSchema.parse(cv).sections[0] as { content?: { skills?: unknown[] }[] };
    expect(section.content?.[0].skills).toEqual([{ key: 'k1', value: 'TypeScript' }]);
  });

  it('keeps the description of a single section', () => {
    const cv = {
      ...minimal,
      sections: [
        { key: 's1', type: 'Experience', content: [{ key: 'e1', title: 'Engineer', description: 'Built it' }] },
      ],
    };
    const section = BaseCvSchema.parse(cv).sections[0] as { content?: { description?: string }[] };
    expect(section.content?.[0].description).toBe('Built it');
  });

  it('rejects content that is neither single nor double', () => {
    const cv = { ...minimal, sections: [{ key: 's1', type: 'Experience', content: [{ key: 'x', nonsense: true }] }] };
    expect(BaseCvSchema.safeParse(cv).success).toBe(false);
  });
});
