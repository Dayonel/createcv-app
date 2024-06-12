import { v4 as uuidv4 } from 'uuid';

// traverse object and sets key: uuid
export const traverseUUID = (obj: any) => {
  let res: any = Array.isArray(obj) ? [] : {};

  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      res[k] = v.map((m) => ({ ...traverseUUID(m), key: uuidv4() }));
    } else if (v && typeof v === 'object') {
      for (const [k2, v2] of Object.entries(v)) {
        res[k2] = traverseUUID(v2); // {icon:'Email',text:'def'}
      }
    } else {
      res[k] = v; // title: 'abc',
    }
  }

  return res;
};
