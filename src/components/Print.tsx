'use client';
import { InlineLoading } from '@carbon/react';
import Action from './DndKit/components/Action/Action';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Download } from '@carbon/icons-react';
import { setCookie } from '@/actions/cookies';

export default function Print() {
  const [isPrinting, setIsPrinting] = useState(false);
  const _print = useMemo(() => typeof window === 'object' && window.print, []);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useRef<string | null>(searchParams.get('print'));
  const { resolvedTheme, setTheme } = useTheme();
  const prevTheme = useRef<string>();

  const download = () => {
    setIsPrinting(true);
  };

  useEffect(() => {
    if (params.current) {
      setIsPrinting(true);
      prevTheme.current = resolvedTheme;
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    window.print = () => {
      download();
    };

    window.addEventListener('keydown', onCtrlP);
    window.addEventListener('afterprint', afterPrint);

    return () => {
      window.removeEventListener('keydown', onCtrlP);
      window.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  const onCtrlP = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };

  const afterPrint = () => {
    setTheme(prevTheme.current!);
    setIsPrinting(false);
    setCookie('printed', 'true');
    params.current = null;
    router.replace('/');
  };

  const deferredPrinting = useDeferredValue(isPrinting);

  useEffect(() => {
    if (!_print) return;
    if (!deferredPrinting) return;

    if (!params.current) {
      window.location.href = '?print=1';
      return;
    }

    _print();
  }, [deferredPrinting]);

  return (
    <Action
      className="action"
      title="Download"
      fill={`${isPrinting ? 'transparent' : 'var(--cds-text-primary)'}`}
      onClick={download}
    >
      {isPrinting ? (
        <InlineLoading className="flex justify-center items-center" />
      ) : (
        <Download size={20}></Download>
      )}
    </Action>
  );
}
