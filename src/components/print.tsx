'use client';
import { InlineLoading } from '@carbon/react';
import Action from './dndkit/components/action/action';
import { useContext, useState } from 'react';
import { Download } from '@carbon/icons-react';
import { setCookie } from '@/utils/cookies';
import { print } from '@/actions/print';
import { PrintContext } from './providers/contexts';

interface PrintProps {
  smallIcon?: boolean;
}

export default function Print({ smallIcon: small }: PrintProps) {
  const [loading, setLoading] = useState(false);
  const { setCounter } = useContext(PrintContext);

  const download = async () => {
    setLoading(true);
    const id = await print().catch(() => 0);
    if (id) setCounter(id);
    setLoading(false);
    setCookie('printed', 'true');
    window.print();
  };

  return (
    <Action
      name="Print"
      className="action"
      title="Download"
      fill={loading ? 'transparent' : 'var(--cds-text-primary)'}
      onClick={download}
    >
      {loading ? (
        <InlineLoading className="flex justify-center items-center" />
      ) : (
        <div className="flex items-center gap-2">
          <Download size={small ? 16 : 20}></Download>
          {small && <span>Print</span>}
        </div>
      )}
    </Action>
  );
}
