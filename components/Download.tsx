'use client';
import { DocumentPdf } from '@carbon/icons-react';
import { Button } from '@carbon/react';

const download = () => {};

export default function Download() {
  return (
    <Button kind="tertiary" renderIcon={DocumentPdf} onClick={download}>
      Download
    </Button>
  );
}
