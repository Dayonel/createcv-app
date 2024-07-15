import {
  OverflowMenuVertical,
  Redo,
  Reset,
  Undo,
  View,
} from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import styles from './actions.module.scss';
import { Modal } from '@carbon/react';
import ColorPicker from './color-picker';
import { useOutsideClick } from '@/hooks/use-outside-click';
import ThemeToggle from '../theme-toggle';
import Action from '../dndkit/components/action/action';
import Print from '../print';

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
  const [openModal, setOpenModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <Print></Print>
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
