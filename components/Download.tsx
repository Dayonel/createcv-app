'use client';
import { DocumentPdf } from '@carbon/icons-react';
import { Button } from '@carbon/react';

const download = () => {};

export default function Download() {
  return (
    <Button
      className="download place-self-center md:place-self-end self-center md:self-start row-start-1 md:col-start-2"
      kind="tertiary"
      renderIcon={DocumentPdf}
      onClick={download}
    >
      Download
    </Button>
  );
}
