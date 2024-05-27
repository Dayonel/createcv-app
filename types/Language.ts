import { Key } from './Key';

export type Language = {
  name?: string;
  level?: string;
  rating?: number;
} & Key;
