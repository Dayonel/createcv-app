'use client';
import { InlineLoading, ToastNotification } from '@carbon/react';
import Action from './dndkit/components/action/action';
import {
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useTheme } from 'next-themes';
import { Download } from '@carbon/icons-react';
import { setCookie } from '@/actions/cookies';
import { print } from '@/actions/print';
import { PrintContext } from './providers/print-provider';

interface PrintProps {
  small?: boolean;
}

export default function Print({ small }: PrintProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const _print = useMemo(() => typeof window === 'object' && window.print, []);
  const { resolvedTheme, setTheme } = useTheme();
  const prevTheme = useRef<string>();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const { setCounter } = useContext(PrintContext);

  const download = () => {
    startTransition(() => {
      print()
        .then((t) => {
          setIsPrinting(true);
          prevTheme.current = resolvedTheme;
          setTheme('light');
          setCounter(t);
        })
        .catch(() => setError('Please try again later or contact support.'));
    });
  };

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
  };

  const deferredPrinting = useDeferredValue(isPrinting);

  useEffect(() => {
    if (!_print) return;
    if (!deferredPrinting) return;

    _print();
  }, [deferredPrinting]);

  return (
    <>
      <Action
        className="action"
        title="Download"
        fill={`${isPending ? 'transparent' : 'var(--cds-text-primary)'}`}
        onClick={download}
      >
        {isPending ? (
          <InlineLoading className="flex justify-center items-center" />
        ) : (
          <div className="flex items-center gap-2">
            <Download size={small ? 16 : 20}></Download>
            {small && <span>Print</span>}
          </div>
        )}
      </Action>

      {error && (
        <ToastNotification
          title="An unknown error occurred"
          className="fixed bottom-4 right-4 pb-4 z-50"
          timeout={5000}
        >
          <span className="text-xs">{error}</span>
        </ToastNotification>
      )}
    </>
  );
}
