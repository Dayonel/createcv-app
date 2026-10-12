import { createContext, Dispatch, SetStateAction } from 'react';

type Setter<T> = Dispatch<SetStateAction<T>>;

export interface MenuProps {
  resetKey: number;
  edit: boolean;
  setEdit: Setter<boolean>;
  undo: boolean;
  setUndo: Setter<boolean>;
  redo: boolean;
  setRedo: Setter<boolean>;
}

export interface PrintProps {
  counter: number | null;
  setCounter: Setter<number | null>;
}

export interface FormProps {
  savedForm: string | undefined;
  printed: string | undefined;
}

const noop = () => {};

export const MenuContext = createContext<MenuProps>({
  resetKey: 0,
  edit: false,
  setEdit: noop,
  undo: false,
  setUndo: noop,
  redo: false,
  setRedo: noop,
});

export const PrintContext = createContext<PrintProps>({
  counter: null,
  setCounter: noop,
});

export const FormContext = createContext<FormProps>({
  savedForm: '',
  printed: '',
});

export const CookieThemeContext = createContext<string | undefined>(undefined);
