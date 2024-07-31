'use client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

export interface PrintProps {
  counter: number | null;
  setCounter: Dispatch<SetStateAction<number | null>>;
}

export const PrintContext = createContext<PrintProps>({
  counter: null,
  setCounter: () => {},
});

export const PrintProvider = ({ children }: any) => {
  const [counter, setCounter] = useState<number | null>(null);

  return (
    <PrintContext.Provider value={{ counter, setCounter }}>
      {children}
    </PrintContext.Provider>
  );
};
