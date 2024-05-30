'use client';
import { Download } from '@carbon/icons-react';
import { Button, ClickableTile, SelectableTile } from '@carbon/react';
import { Switch } from './DndKit/Switch';
import { useState } from 'react';
import styles from './Actions.module.scss';

const download = () => {};

export default function Actions() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="row-start-1 md:col-start-2 flex items-center justify-center md:justify-end gap-5 w-full">
      <Switch
        label="Add sections"
        checked={checked}
        onChange={setChecked}
      ></Switch>
      <button
        className={`${styles.tile} cds--link cds--tile cds--tile--clickable`}
        style={{ minBlockSize: 'auto' }}
        onClick={download}
        type="button"
      >
        <div className="flex gap-4">
          <span>Download</span>
          <Download></Download>
        </div>
      </button>
    </div>
  );
}
