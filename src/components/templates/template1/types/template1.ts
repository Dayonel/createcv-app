import { Contact } from './contact';
import { Double } from './double';
import { Single } from './single';

export type Template1 = {
  color: string;
  title?: string;
  subtitle?: string;
  contacts: Contact[];
  summary?: string;
  sections: Single[] | Double[];
};
