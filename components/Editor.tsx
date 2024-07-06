'use client';
import { useContext, useEffect, useState } from 'react';
import Instructions from './Instructions/Instructions';
import Template1 from './Templates/Template1/Template1';
import Watermark from './Watermark';
import { InlineLoading } from '@carbon/react';
import { FormContext } from './Providers/FormProvider';

export default function Editor() {
  const { savedForm } = useContext(FormContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-[900px] mb-0 md:mb-11">
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
  );
}
