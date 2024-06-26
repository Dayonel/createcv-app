import { Key } from '@/types/Key';
import { Language } from './Language';
import { Skill } from './Skill';

export type Double = {
  type: string;
  content?: DoubleContent[];
} & Key;

export type DoubleContent = {
  name?: string;
  type?: string;
  skills?: Skill[];
  languages?: Language[];
} & Key;
