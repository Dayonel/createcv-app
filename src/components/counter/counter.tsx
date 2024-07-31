'use client';

import { useEffect, useState, useTransition } from 'react';
import styles from './counter.module.scss';
import * as d3 from 'd3-format';
import { InlineLoading } from '@carbon/react';
import { getPrints } from '@/actions/print';

export default function Counter() {
  const [counter, setCounter] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getPrints().then((t) => {
        setCounter(t.count);
      });
    });
  }, []);
  const formatter = d3.format('.2s');

  return (
    <>
      <div className={styles.counter}>
        <div className="flex flex-col items-center gap-12 w-full">
          <h2 className="text-4xl md:text-5xl font-bold">Resumes printed</h2>

          {!counter || isPending ? (
            <div className="min-h-14 md:min-h-16">
              <InlineLoading className="h-full justify-center"></InlineLoading>
            </div>
          ) : (
            <p
              style={{
                backgroundColor: 'var(--cds-background-inverse-hover)',
                color: 'var(--cds-text-inverse)',
              }}
              className="text-4xl md:text-5xl font-bold -rotate-1 px-4 py-2"
            >
              {counter && counter >= 1000 ? formatter(counter) : counter}+
            </p>
          )}

          <span className="text-center text-base">
            Create your professional resume today and get hired.
          </span>
        </div>
      </div>
    </>
  );
}
