import { Download, Edit, TextColor, TextFont } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import styles from './Actions.module.scss';
import { IconButton } from '@carbon/react';

export interface ActionsProps {
  onEdit: (e: boolean) => void;
}

export default function Actions({ onEdit }: ActionsProps) {
  const [edit, setEdit] = useState(false);
  const download = () => {};

  useEffect(() => {
    if (onEdit) {
      onEdit(edit);
    }
  }, [edit]);

  return (
    <div
      className={`${styles.actions} flex flex-col md:flex-row items-center justify-end place-self-start md:place-self-end gap-2 row-start-1 row-span-2 md:row-span-1 col-start-2`}
    >
      <IconButton label="Font" kind="ghost" align="bottom">
        <TextFont size={24}></TextFont>
      </IconButton>
      <IconButton label="Color" kind="ghost" align="bottom">
        <TextColor size={24}></TextColor>
      </IconButton>
      <IconButton
        label="Edit"
        kind="ghost"
        align="bottom"
        onClick={() => setEdit(!edit)}
        isSelected={edit}
      >
        <Edit size={24}></Edit>
      </IconButton>
      <IconButton
        label="Download"
        kind="ghost"
        align="bottom"
        onClick={() => download()}
      >
        <Download size={24}></Download>
      </IconButton>
    </div>
  );
}
