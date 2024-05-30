'use client';
import { Download, Edit, View } from '@carbon/icons-react';
import {
  Button,
  ClickableTile,
  ContentSwitcher,
  IconSwitch,
  SelectableTile,
  Switch,
} from '@carbon/react';
// import { Switch } from './DndKit/Switch';
import { useState } from 'react';
import styles from './Actions.module.scss';

const download = () => {};

export default function Actions() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="row-start-1 md:col-start-2 flex flex-col-reverse md:flex-row items-center justify-between md:justify-end gap-5 w-full px-[6px]">
      {/* <Switch
        label="Add sections"
        checked={checked}
        onChange={setChecked}
      ></Switch> */}

      <button
        className={`${styles.tile} cds--tile cds--tile--clickable w-full`}
        style={{ minBlockSize: 'auto' }}
        onClick={download}
        type="button"
      >
        <div className="flex justify-between gap-4">
          <span>Download</span>
          <Download></Download>
        </div>
      </button>
      <div className="w-full">
        <ContentSwitcher onChange={() => {}} selectedIndex={0} size="lg">
          <Switch>View</Switch>
          <Switch>Edit</Switch>
          {/* <IconSwitch>
            <View></View>
          </IconSwitch>
          <IconSwitch>
            <Edit></Edit>
          </IconSwitch> */}
        </ContentSwitcher>
      </div>
    </div>
  );
}
