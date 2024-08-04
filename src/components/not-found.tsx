'use client';

import { Close } from '@carbon/icons-react';
import { Link } from '@carbon/react';

export default function Not_Found() {
  return (
    <div className="container">
      <div className="page flex flex-col items-center">
        <Close style={{ fill: 'var(--cds-text-primary)' }} size={72}></Close>
        <h1>Not Found</h1>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
