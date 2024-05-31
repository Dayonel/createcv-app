'use client';
import { Download } from '@carbon/icons-react';
import { ContentSwitcher, Switch } from '@carbon/react';
import { useState } from 'react';
import styles from './Actions.module.scss';

const download = () => {};

export default function Actions() {
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles.actions}>
      <button
        className={`${styles.tile} cds--tile cds--tile--clickable`}
        style={{ minBlockSize: 'auto' }}
        onClick={download}
        type="button"
      >
        <div className="flex justify-between gap-4">
          <span>Download</span>
          <Download></Download>
        </div>
      </button>
      <ContentSwitcher
        style={{ blockSize: '50px' }}
        onChange={(e) => setEdit(e.index == 1)}
        selectedIndex={0}
        size="lg"
      >
        <Switch>View</Switch>
        <Switch>Edit</Switch>
      </ContentSwitcher>
    </div>
  );
}
