export const hideKey = (obj: any, key: string) => {
  for (const [k, v] of Object.entries(obj)) {
    if (k === key) {
      Object.defineProperty(obj, k, { enumerable: false });
    }
    if (typeof v === 'object') {
      hideKey(v, key);
    }
  }
};
