'use client';
import { useMemo } from 'react';
import { FormContext, FormProps } from './contexts';

export const FormProvider = ({
  savedForm,
  printed,
  children,
}: FormProps & { children: React.ReactNode }) => {
  const value = useMemo(() => ({ savedForm, printed }), [savedForm, printed]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
