export const getParagraphText = (json: string) =>
  JSON.parse(json).content[0].content[0].text;

export const getText = (json: string) => JSON.parse(json).content[0].text;

export const getEmptyParagraph = () =>
  '{"type":"doc","content":[{"type":"paragraph"}]}';

export const getEmptyText = (placeholder: string) =>
  `{"type":"doc","content":[{"type":"text","text":"${placeholder}"}]}`;
