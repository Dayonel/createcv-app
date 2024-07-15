import { Contact } from './contact';
import { Double } from './double';
import { Single } from './single';

export type Form = {
  color: string;
  title?: string;
  subtitle?: string;
  contacts: Contact[];
  summary?: string;
  sections: Single[] | Double[];
};
