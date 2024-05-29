'use client';
import { DocumentPdf } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { Switch } from './Switch/Switch';
import { useState } from 'react';

const download = () => {};

export default function Actions() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="place-self-center md:place-self-end self-center md:self-start row-start-1 md:col-start-2 flex flex-col-reverse md:flex-row items-center gap-5">
      <Switch
        label="Add sections"
        checked={checked}
        onChange={setChecked}
      ></Switch>
      <Button kind="tertiary" renderIcon={DocumentPdf} onClick={download}>
        Download
      </Button>
    </div>
  );
}
