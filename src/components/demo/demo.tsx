'use client';

import { useMounted } from '@/hooks/use-mounted';
import { useContext } from 'react';
import Instructions from '../instructions/instructions';
import Template1 from '../templates/template1/template1';
import { InlineLoading } from '@carbon/react';
import { FormContext } from '../providers/contexts';

export default function Demo({ json }: { json: string }) {
  const { savedForm } = useContext(FormContext);
  const mounted = useMounted();


  return (
    <div className="container">
      <div className="mb-0 md:mb-11">
        {savedForm && !mounted ? (
          <div className="!min-h-[calc(100dvh-10rem)] flex items-center">
            <InlineLoading className="flex justify-center"></InlineLoading>
          </div>
        ) : (
          <div className="relative">
            <Template1 json={json}></Template1>
            <Instructions></Instructions>
          </div>
        )}
      </div>
    </div>
  );
}
