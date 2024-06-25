import { InlineLoading } from '@carbon/react';
import Action from './DndKit/components/Action/Action';
import { Download } from '@carbon/icons-react';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function Print() {
  const [isPrinting, setIsPrinting] = useState(false);
  const searchParams = useSearchParams();
  const _print = useMemo(() => typeof window === 'object' && window.print, []);
  const router = useRouter();
  const params = useRef<string | null>(searchParams.get('print'));
  const { resolvedTheme, setTheme } = useTheme();
  const prevTheme = useRef<string>();

  useEffect(() => {
    if (params.current) {
      prevTheme.current = resolvedTheme;
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    window.print = () => {
      download();
    };

    window.addEventListener('afterprint', afterPrint);

    return () => window.removeEventListener('afterprint', afterPrint);
  }, []);

  const afterPrint = () => {
    setTheme(prevTheme.current!);
    params.current = null;
    router.replace('/');
  };

  const download = () => {
    setIsPrinting(true);
  };

  useEffect(() => {
    if (!isPrinting) return;

    if (!params.current) {
      setTimeout(() => {
        window.location.href = '?print=1';
      }, 100);
      return;
    }
  }, [isPrinting]);

  const deferredTheme = useDeferredValue(resolvedTheme);

  useEffect(() => {
    if (!_print) return;
    if (deferredTheme !== 'light') return;
    if (!params.current) return;

    _print();
  }, [_print, deferredTheme, params.current]);

  return (
    <Action
      className="action"
      title="Download"
      fill={`${isPrinting ? 'transparent' : 'var(--cds-text-primary)'}`}
      onClick={() => download()}
    >
      {isPrinting ? (
        <InlineLoading className="flex justify-center"></InlineLoading>
      ) : (
        <Download size={20}></Download>
      )}
    </Action>
  );
}
