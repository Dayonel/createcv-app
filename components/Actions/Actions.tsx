import './OverflowMenu.css';
import { Download, Edit, Redo, Undo } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import styles from './Actions.module.scss';
import { IconButton, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import ColorPicker from './ColorPicker';

export interface ActionsProps {
  onEdit: (e: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export default function Actions({
  onEdit,
  canUndo,
  onUndo,
  canRedo,
  onRedo,
}: ActionsProps) {
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
      <div className="block md:hidden">
        <OverflowMenu className="overflow-menu">
          <OverflowMenuItem
            itemText="Undo"
            onClick={() => onUndo()}
          ></OverflowMenuItem>
          <OverflowMenuItem
            itemText="Redo"
            onClick={() => onRedo()}
          ></OverflowMenuItem>
        </OverflowMenu>
      </div>
      <div className="hidden md:block">
        <IconButton
          disabled={!canUndo}
          label="Undo"
          kind="ghost"
          align="bottom"
          onClick={() => onUndo()}
        >
          <Undo size={24}></Undo>
        </IconButton>
        <IconButton
          disabled={!canRedo}
          label="Redo"
          kind="ghost"
          align="bottom"
          onClick={() => onRedo()}
        >
          <Redo size={24}></Redo>
        </IconButton>
      </div>
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
