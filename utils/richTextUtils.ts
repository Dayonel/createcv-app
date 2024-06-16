export const getParagraphText = (json: string) =>
  JSON.parse(json).content[0].content[0].text;

export const getText = (json: string) => JSON.parse(json).content[0].text;

export const getTextContent = (text: string) =>
  `{"type":"doc","content":[{"type":"text","text":"${text}"}]}`;

