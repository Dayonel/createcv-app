import { Key } from '@/types/key';
import { Language } from './language';
import { Skill } from './skill';

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
