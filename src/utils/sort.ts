import { Key } from '@/types/key';

export const sortByKeys = <T extends Key>(list: T[], keys: unknown[]) =>
  [...list].sort((a, b) => keys.indexOf(a.key) - keys.indexOf(b.key));
