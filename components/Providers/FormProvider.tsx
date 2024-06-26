'use client';
import { createContext } from 'react';

interface FormProps {
  savedForm: string | undefined;
  printed: string | undefined;
}
interface FormProviderProps extends FormProps {
  children: any;
}
export const FormContext = createContext<FormProps>({
  savedForm: '',
  printed: '',
});

export const FormProvider = ({
  savedForm,
  printed,
  children,
}: FormProviderProps) => {
  return (
    <FormContext.Provider value={{ savedForm, printed }}>
      {children}
    </FormContext.Provider>
  );
};
