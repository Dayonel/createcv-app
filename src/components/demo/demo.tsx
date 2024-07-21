'use client';

import styles from './demo.module.scss'
import { useContext, useEffect, useState } from 'react';
import Instructions from '../instructions/instructions';
import Template1 from '../templates/template1/template1';
import Watermark from '../watermark';
import { InlineLoading } from '@carbon/react';
import { FormContext } from '../providers/form-provider';

export default function Demo() {
  const { savedForm } = useContext(FormContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.demo}>
      <div className="mb-0 md:mb-11">
        {savedForm && !mounted ? (
          <div className="!min-h-[calc(100dvh-10rem)] flex items-center">
            <InlineLoading className="flex justify-center"></InlineLoading>
          </div>
        ) : (
          <div className="relative">
            <Template1></Template1>
            <Instructions></Instructions>
            <Watermark></Watermark>
          </div>
        )}
      </div>
    </div>
  );
}
