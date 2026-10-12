'use client';
import { useEffect, useMemo, useState } from 'react';
// react-doctor-disable-next-line react-doctor/no-flush-sync
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import useColorStore from '@/store/color-store';
import { deleteCookie } from '@/utils/cookies';
import Header from '../header/header';
import { MenuContext } from './contexts';

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [resetKey, setResetKey] = useState(0);
  const [edit, setEdit] = useState(false);
  const [undo, setUndo] = useState(false);
  const [redo, setRedo] = useState(false);

  useEffect(() => {
    const close = () => flushSync(() => setEdit(false));
    window.addEventListener('beforeprint', close);
    return () => window.removeEventListener('beforeprint', close);
  }, []);

  const { setTheme } = useTheme();
  const setColor = useColorStore((s) => s.setColor);

  const reset = () => {
    ['form', 'image', 'theme'].forEach((k) => localStorage.removeItem(k));
    ['savedForm', 'printed', 'theme'].forEach(deleteCookie);
    setColor('var(--cds-link-primary)');
    setTheme('system');
    setResetKey((k) => k + 1);
  };

  const value = useMemo(
    () => ({ resetKey, edit, setEdit, undo, setUndo, redo, setRedo }),
    [resetKey, edit, undo, redo]
  );

  return (
    <>
      <Header
        onReset={reset}
        onEdit={() => setEdit((e) => !e)}
        onUndo={() => setUndo(true)}
        onRedo={() => setRedo(true)}
      ></Header>
      <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
    </>
  );
};
