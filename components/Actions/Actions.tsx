import { BookmarkAdd, Download, Edit } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import styles from './Actions.module.scss';
import { IconButton } from '@carbon/react';
import ColorPicker from './ColorPicker';

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
      className={`${styles.actions} flex flex-col md:flex-row items-center justify-start md:justify-end place-self-start md:place-self-end gap-2 h-full row-start-1 row-span-2 md:row-span-1 col-start-2`}
    >
      <IconButton disabled label="New resume" kind="ghost" align="bottom">
        <BookmarkAdd size={24}></BookmarkAdd>
      </IconButton>
      <ColorPicker></ColorPicker>
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
