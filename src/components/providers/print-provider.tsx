'use client';
import { useMemo, useState } from 'react';
import { PrintContext } from './contexts';

export const PrintProvider = ({ children }: { children: React.ReactNode }) => {
  const [counter, setCounter] = useState<number | null>(null);
  const value = useMemo(() => ({ counter, setCounter }), [counter]);

  return <PrintContext.Provider value={value}>{children}</PrintContext.Provider>;
};
