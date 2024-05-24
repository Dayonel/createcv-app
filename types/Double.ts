import { Language } from './Language';

export type Double = {
  type: string;
  content?: DoubleContent[];
};

export type DoubleContent = {
  name?: string;
  skills?: string[];
  languages?: Language[];
};
