import { Contact } from './Contact';
import { Double } from './Double';
import { Single } from './Single';

export type Form = {
  color: string;
  title?: string;
  subtitle?: string;
  contacts?: Contact[];
  summary?: string;
  sections?: Single[] | Double[];
};
