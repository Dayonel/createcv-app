import { Empty } from './Empty';
import { Key } from './Key';

export type Contact = {
  text: string;
  icon: string;
} & Key &
  Empty;
