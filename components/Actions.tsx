'use client';
import { Download } from '@carbon/icons-react';
import { ClickableTile, SelectableTile } from '@carbon/react';
import { Switch } from './DndKit/Switch';
import { useState } from 'react';
import styles from './Actions.module.scss';

const download = () => {};

export default function Actions() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="row-start-1 md:col-start-2 flex items-center justify-end gap-5 w-full px-2">
      <Switch
        label="Add sections"
        checked={checked}
        onChange={setChecked}
      ></Switch>
      <ClickableTile
        className={`${styles.tile}`}
        renderIcon={Download}
        hasRoundedCorners
        style={{ minBlockSize: 'auto' }}
      >
        Download
      </ClickableTile>
    </div>
  );
}
