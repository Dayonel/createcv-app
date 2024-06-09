import { Empty } from './Empty';
import { Key } from './Key';

export type Single = {
  name?: string;
  type: string;
  content?: SingleContent[];
} & Key &
  Empty;

export type SingleContent = {
  title?: string;
  subtitle?: string;
  date?: string;
  topic?: string;
  description?: string;
} & Key &
  Empty;
