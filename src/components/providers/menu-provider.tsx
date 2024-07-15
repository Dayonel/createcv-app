'use client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import Header from '../header/header';

export interface MenuProps {
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  undo: boolean;
  setUndo: Dispatch<SetStateAction<boolean>>;
  redo: boolean;
  setRedo: Dispatch<SetStateAction<boolean>>;
}

interface MenuProviderProps {
  children: any;
}

export const MenuContext = createContext<MenuProps>({
  reset: false,
  setReset: () => {},
  edit: false,
  setEdit: () => {},
  undo: false,
  setUndo: () => {},
  redo: false,
  setRedo: () => {},
});
export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [reset, setReset] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [undo, setUndo] = useState<boolean>(false);
  const [redo, setRedo] = useState<boolean>(false);

  return (
    <>
      <Header
        onReset={() => setReset(true)}
        onEdit={() => setEdit(!edit)}
        onUndo={() => setUndo(true)}
        onRedo={() => setRedo(true)}
      ></Header>
      <MenuContext.Provider
        value={{ reset, setReset, edit, setEdit, undo, setUndo, redo, setRedo }}
      >
        {children}
      </MenuContext.Provider>
    </>
  );
};
