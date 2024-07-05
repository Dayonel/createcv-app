import { InlineLoading } from '@carbon/react';
import Action from './DndKit/components/Action/Action';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Download } from '@carbon/icons-react';
import { setCookie } from '@/actions/cookies';

export default function Print() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const _print = useMemo(() => typeof window === 'object' && window.print, []);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useRef<string | null>(searchParams.get('print'));
  const { resolvedTheme, setTheme } = useTheme();
  const prevTheme = useRef<string>();

  const download = () => {
    setIsLoading(true);
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

    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);

    return () => window.removeEventListener('afterprint', afterPrint);
  }, []);

  const beforePrint = () => {
    if (!params.current) {
      window.location.href = '?print=1';
    }
  };

  const afterPrint = () => {
    setTheme(prevTheme.current!);
    setIsPrinting(false);
    params.current = null;
    router.replace('/');
  };

  const deferredPrinting = useDeferredValue(isPrinting);

  useEffect(() => {
    if (!_print) return;
    if (!deferredPrinting) return;

    _print();
    setCookie('printed', 'true');
  }, [deferredPrinting]);

  return (
    <Action
      className="action"
      title="Download"
      fill={`${isLoading ? 'transparent' : 'var(--cds-text-primary)'}`}
      onClick={download}
    >
      {isLoading ? (
        <InlineLoading className="flex justify-center items-center" />
      ) : (
        <Download size={20}></Download>
      )}
    </Action>
  );
}
