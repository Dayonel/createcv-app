'use client';
import { createContext } from 'react';

export const FormContext = createContext('');
export const FormProvider = ({ savedForm, children }: any) => {
  return (
    <FormContext.Provider value={savedForm}>{children}</FormContext.Provider>
  );
};
