export type Experience = {
  title: string;
  company: string;
  location: string;
  date: string;
  topic: string;
  descriptions: string[];
} & Record<string, unknown>;
