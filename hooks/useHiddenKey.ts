export const useHiddenKey = (obj: any, key: string) => {
  for (const [k, v] of Object.entries(obj)) {
    if (k === key) {
      Object.defineProperty(obj, k, { enumerable: false });
    }
    if (typeof v === 'object') {
      useHiddenKey(v, key);
    }
  }
};
