import {
  Download,
  OverflowMenuVertical,
  Redo,
  Reset,
  Undo,
  View,
} from '@carbon/icons-react';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import styles from './Actions.module.scss';
import { InlineLoading, Modal } from '@carbon/react';
import ColorPicker from './ColorPicker';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useTheme } from 'next-themes';
import ThemeToggle from '../ThemeToggle';
import Action from '../DndKit/components/Action/Action';

export interface ActionsProps {
  onEdit: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
}

export default function Actions({
  onEdit,
  onUndo,
  onRedo,
  onReset,
}: ActionsProps) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));
  const { theme, setTheme } = useTheme();
  const prevTheme = useRef<string>();
  const [openModal, setOpenModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setTheme('g10');
  };

  const deferredPrinting = useDeferredValue(isPrinting);

  useEffect(() => {
    if (isPrinting === true) {
      setIsPrinting(false);
      window.print();
    }
  }, [deferredPrinting]);

  return (
    <div className="relative">
      <div
        className={`${styles.actions} print:opacity-0 flex justify-center z-30`}
      >
        <ColorPicker></ColorPicker>
        <Action
          className="action"
          title="Show hidden"
          fill="var(--cds-text-primary)"
          onClick={() => onEdit()}
        >
          <View size={20}></View>
        </Action>
        <Action
          className="action"
          title="Download"
          fill={`${isPrinting ? 'transparent' : 'var(--cds-text-primary)'}`}
          onClick={() => download()}
        >
          {isPrinting ? (
            <InlineLoading className="flex justify-center"></InlineLoading>
          ) : (
            <Download size={20}></Download>
          )}
        </Action>
        <div ref={ref}>
          <Action
            className="action"
            title="More..."
            fill="var(--cds-text-primary)"
            onClick={() => setOpen(!open)}
          >
            <OverflowMenuVertical size={20}></OverflowMenuVertical>
          </Action>
          {open && (
            <ul className="menu">
              <li>
                <Action
                  title="Reset"
                  fill="var(--cds-text-primary)"
                  onClick={() => setOpenModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <Reset size={20}></Reset>
                    <span>Reset</span>
                  </div>
                </Action>
              </li>
              <li>
                <Action
                  title="Undo"
                  fill="var(--cds-text-primary)"
                  onClick={() => onUndo()}
                >
                  <div className="flex items-center gap-2">
                    <Undo size={20}></Undo>
                    <span>Undo</span>
                  </div>
                </Action>
              </li>
              <li>
                <Action
                  title="Redo"
                  fill="var(--cds-text-primary)"
                  onClick={() => onRedo()}
                >
                  <div className="flex items-center gap-2">
                    <Redo size={20}></Redo>
                    <span>Redo</span>
                  </div>
                </Action>
              </li>
              <li>
                <ThemeToggle></ThemeToggle>
              </li>
            </ul>
          )}
        </div>
      </div>
      {mounted && (
        <Modal
          open={openModal}
          modalAriaLabel="Reset changes"
          modalLabel="Reset changes"
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onRequestClose={() => setOpenModal(false)}
          onRequestSubmit={() => {
            onReset();
            setOpenModal(false);
          }}
          size="xs"
          selectorPrimaryFocus=".flex"
        >
          <span className="flex">All changes will be lost, are you sure?</span>
        </Modal>
      )}
    </div>
  );
}
