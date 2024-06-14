import {
  Download,
  Edit,
  OverflowMenuVertical,
  Redo,
  Undo,
} from '@carbon/icons-react';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Actions.module.scss';
import { IconButton, InlineLoading } from '@carbon/react';
import ColorPicker from './ColorPicker';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useTheme } from 'next-themes';

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
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));
  const { theme, setTheme } = useTheme();
  const prevTheme = useRef<string>();

  // print
  useEffect(() => {
    window.addEventListener('afterprint', afterPrint);

    return () => window.removeEventListener('afterprint', afterPrint);
  }, []);
  const afterPrint = () => setTheme(prevTheme.current!);

  const [isPrinting, setIsPrinting] = useState(false);
  const download = () => {
    setIsPrinting(true);
    prevTheme.current = theme;
    console.log(prevTheme);
    setTheme('g10');
  };

  const deferredPrinting = useDeferredValue(isPrinting);

  useEffect(() => {
    if (isPrinting === true) {
      setIsPrinting(false);
      window.print();
    }
  }, [deferredPrinting]);

  useEffect(() => {
    if (onEdit) {
      onEdit(edit);
    }
  }, [edit]);

  return (
    <div
      ref={ref}
      className={`${styles.actions} print:opacity-0 flex flex-col print:flex-row md:flex-row items-center justify-start print:justify-end md:justify-end place-self-start print:place-self-end md:place-self-end gap-2 h-full row-start-1 row-span-2 print:row-span-1 md:row-span-1 col-start-2`}
    >
      <div className="block md:hidden relative">
        <IconButton
          label="More..."
          kind="ghost"
          align="bottom"
          onClick={() => setOpen(!open)}
          isSelected={open}
        >
          <OverflowMenuVertical size={24}></OverflowMenuVertical>
        </IconButton>
        {open && (
          <ul className={styles.menu}>
            <li>
              <IconButton
                disabled={!canUndo}
                label="Undo"
                kind="ghost"
                align="bottom"
                onClick={() => onUndo()}
              >
                <Undo size={24}></Undo>
              </IconButton>
            </li>
            <li>
              <IconButton
                disabled={!canRedo}
                label="Redo"
                kind="ghost"
                align="bottom"
                onClick={() => onRedo()}
              >
                <Redo size={24}></Redo>
              </IconButton>
            </li>
          </ul>
        )}
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
        disabled={isPrinting}
      >
        {isPrinting ? (
          <InlineLoading className="flex justify-center"></InlineLoading>
        ) : (
          <Download size={24}></Download>
        )}
      </IconButton>
    </div>
  );
}
