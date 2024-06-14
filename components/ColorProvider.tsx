'use client';
import { createContext } from 'react';

export const ColorContext = createContext('');

export const ColorProvider = ({ color, children }: any) => {
  return (
    <ColorContext.Provider value={color}>{children}</ColorContext.Provider>
  );
};
