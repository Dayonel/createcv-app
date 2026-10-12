import {
  OverflowMenuVertical,
  Redo,
  Reset,
  TrashCan,
  Undo,
  View,
} from '@carbon/icons-react';
import { useMounted } from '@/hooks/use-mounted';
import { useState } from 'react';
import styles from './resume-toolbar.module.scss';
import { Modal, ToastNotification } from '@carbon/react';
import ColorPicker from './color-picker';
import { useOutsideClick } from '@/hooks/use-outside-click';
import ThemeToggle from '../theme-toggle';
import Action from '../dndkit/components/action/action';
import Print from '../print';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import DeleteResume from '../resume/delete-resume';
import SaveResume from '../resume/save-resume';

export interface ResumeToolbar {
  onEdit: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
}

export default function ResumeToolbar({
  onEdit,
  onUndo,
  onRedo,
  onReset,
}: ResumeToolbar) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));
  const [showReset, setShowReset] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const mounted = useMounted();
  const pathName = usePathname();


  return (
    <div className="relative">
      <div
        className={`${styles.actions} print:opacity-0 flex justify-center z-30`}
      >
        {!pathName.startsWith('/resumes/') && (
          <>
            <Action
              name="Show Hidden"
              className="action"
              title="Show hidden"
              fill="var(--cds-text-primary)"
              onClick={() => onEdit()}
            >
              <View size={20}></View>
            </Action>
            <Print></Print>
          </>
        )}
        <div ref={ref}>
          <Action
            name="Overflow Menu"
            className="action"
            title="More..."
            fill="var(--cds-text-primary)"
            onClick={() => setOpen(!open)}
          >
            <OverflowMenuVertical size={20}></OverflowMenuVertical>
          </Action>

          <ul className={cn('menu', open ? 'block' : 'hidden')}>
            {pathName.startsWith('/resumes/') && (
              <>
                <li>
                  <Print smallIcon></Print>
                </li>
                <li>
                  <Action
                    name="Show Hidden"
                    className="action"
                    title="Show hidden"
                    fill="var(--cds-text-primary)"
                    onClick={() => onEdit()}
                  >
                    <div className="flex items-center gap-2">
                      <View></View>
                      <span>View</span>
                    </div>
                  </Action>
                </li>
              </>
            )}
            <li>
              <Action
                name="Reset"
                title="Reset"
                fill="var(--cds-text-primary)"
                onClick={() => setShowReset(true)}
              >
                <div className="flex items-center gap-2">
                  <Reset></Reset>
                  <span>Reset</span>
                </div>
              </Action>
            </li>
            <li>
              <Action
                name="Undo"
                title="Undo"
                fill="var(--cds-text-primary)"
                onClick={() => onUndo()}
              >
                <div className="flex items-center gap-2">
                  <Undo></Undo>
                  <span>Undo</span>
                </div>
              </Action>
            </li>
            <li>
              <Action
                name="Redo"
                title="Redo"
                fill="var(--cds-text-primary)"
                onClick={() => onRedo()}
              >
                <div className="flex items-center gap-2">
                  <Redo></Redo>
                  <span>Redo</span>
                </div>
              </Action>
            </li>
            <li>
              <ColorPicker></ColorPicker>
            </li>
            <li>
              <ThemeToggle small></ThemeToggle>
            </li>
            {pathName.startsWith('/resumes/') && (
              <li>
                <Action
                  name="Delete"
                  className="action"
                  title="Delete"
                  fill="var(--cds-text-error)"
                  onClick={() => setShowDelete(true)}
                >
                  <div className="flex items-center gap-2">
                    <TrashCan></TrashCan>
                    <span style={{ color: 'var(--cds-text-error)' }}>
                      Delete
                    </span>
                  </div>
                </Action>
              </li>
            )}
          </ul>
        </div>
      </div>
      {mounted && (
        <>
          <Modal
            open={showReset}
            modalAriaLabel="Reset changes"
            modalHeading="Reset changes"
            primaryButtonText="Confirm"
            secondaryButtonText="Cancel"
            onRequestClose={() => setShowReset(false)}
            onRequestSubmit={() => {
              onReset();
              setShowReset(false);
            }}
            size="xs"
            selectorPrimaryFocus=".flex"
          >
            <span className="flex">
              All changes will be lost, are you sure?
            </span>
          </Modal>

          <DeleteResume
            open={showDelete}
            onClose={() => setShowDelete(false)}
          ></DeleteResume>
        </>
      )}
    </div>
  );
}
