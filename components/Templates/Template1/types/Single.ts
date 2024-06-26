import { Key } from '@/types/Key';

export type Single = {
  name?: string;
  type: string;
  content?: SingleContent[];
} & Key;

export type SingleContent = {
  title?: string;
  subtitle?: string;
  date?: string;
  topic?: string;
  description?: string;
} & Key;
