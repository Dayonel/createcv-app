import { Mark, mergeAttributes } from '@tiptap/react';

export const toHref = (url: string) =>
  /^(https?:|mailto:|tel:)/.test(url) ? url : `https://${url.trim()}`;

export default Mark.create({
  name: 'link',
  inclusive: false,

  addAttributes() {
    return { href: { default: null } };
  },

  parseHTML() {
    return [{ tag: 'a[href]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(HTMLAttributes, {
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'cv-link',
      }),
      0,
    ];
  },
});
