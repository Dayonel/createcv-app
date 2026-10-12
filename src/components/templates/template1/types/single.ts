import { Key } from '@/types/key';
import { Image } from './image';

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
  tech?: string;
  images?: Image[];
} & Key;
