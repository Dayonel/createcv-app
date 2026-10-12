import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import useColorStore from '@/store/color-store';
import useResumeStore from '@/store/resume-store';
import { traverseUUID } from '@/utils/traverse-uuid';
import { setCookie } from '@/utils/cookies';
import { MenuContext } from '../../providers/contexts';
import { Template1 } from './types/template1';

const DEFAULT_COLOR = 'var(--cds-link-primary)';
const LIMIT = 100;

const replacer = (key: string, value: unknown) =>
  key === 'key' ? undefined : value;

const parse = (json: string | null) => {
  if (!json) return;
  try {
    return traverseUUID(JSON.parse(json)) as Template1;
  } catch {
    return;
  }
};

const readLocal = (key: string) =>
  typeof window === 'undefined' ? null : localStorage.getItem(key);

export const useTemplateForm = (json: string, stored?: boolean) => {
  const [data] = useState(() => parse(json)!);
  const [initial] = useState(
    () => (!stored && parse(readLocal('form'))) || parse(json)!
  );
  const [form, setFormState] = useState(initial);
  const [image, setImageState] = useState(
    () => readLocal('image') ?? undefined
  );
  const { color, setColor } = useColorStore();
  const setJson = useResumeStore((s) => s.setJson);
  const { undo, setUndo, redo, setRedo } = useContext(MenuContext);

  const [snapshot] = useState(() => ({
    saved: JSON.stringify(initial, replacer),
    history: [JSON.stringify(initial)],
  }));
  const latest = useRef(form);
  const saved = useRef(snapshot.saved);
  const history = useRef(snapshot.history);
  const index = useRef(0);

  const setForm = useCallback((next: Template1) => {
    setFormState(next);
    history.current = [
      ...history.current.slice(0, index.current + 1),
      JSON.stringify(next),
    ].slice(-LIMIT);
    index.current = history.current.length - 1;
  }, []);

  const go = useCallback((i: number) => {
    const entry = history.current[i];
    if (!entry) return;
    index.current = i;
    setFormState(JSON.parse(entry));
  }, []);

  const persist = useCallback(
    (next: Template1) => {
      const value = JSON.stringify({ ...next, color }, replacer);
      if (value === saved.current) return;
      saved.current = value;

      if (stored) return setJson(value);
      localStorage.setItem('form', value);
      setCookie('savedForm', 'true');
    },
    [color, stored, setJson]
  );

  const setImage = useCallback((src?: string) => {
    setImageState(src);
    if (!src) return localStorage.removeItem('image');
    localStorage.setItem('image', src);
    setCookie('savedForm', 'true');
  }, []);

  useEffect(() => {
    setColor(initial.color || DEFAULT_COLOR, initial.color !== DEFAULT_COLOR);
  }, [initial, setColor]);

  useEffect(() => {
    latest.current = form;
    const id = setTimeout(() => persist(form), 500);
    return () => clearTimeout(id);
  }, [form, persist]);

  useEffect(() => {
    if (stored) return;
    const flush = () => persist(latest.current);
    window.addEventListener('beforeunload', flush);
    return () => window.removeEventListener('beforeunload', flush);
  }, [stored, persist]);

  useEffect(() => {
    if (!undo) return;
    setUndo(false);
    go(index.current - 1);
  }, [undo, setUndo, go]);

  useEffect(() => {
    if (!redo) return;
    setRedo(false);
    go(index.current + 1);
  }, [redo, setRedo, go]);

  return { data, form, setForm, image, setImage };
};
