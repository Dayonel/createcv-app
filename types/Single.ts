export type Single = {
  name?: string;
  type: string;
  content?: SingleContent[];
};

export type SingleContent = {
  title?: string;
  subtitle?: string;
  date?: string;
  topic?: string;
  description?: string;
};
