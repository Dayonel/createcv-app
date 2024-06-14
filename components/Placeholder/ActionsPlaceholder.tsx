import { Add, Copy, TrashCan } from '@carbon/icons-react';
import styles from './ActionsPlaceholder.module.scss';
import Action from '../DndKit/components/Action/Action';

interface ActionsPlaceholderProps {
  edit: boolean;
  onAdd: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  duplicate?: boolean;
  remove?: boolean;
}

export default function ActionsPlaceholder({
  edit,
  onAdd,
  onDuplicate,
  onDelete,
  duplicate,
  remove,
}: ActionsPlaceholderProps) {
  return (
    <>
      {edit && (
        <div className="print:hidden flex items-cente justify-center w-full px-[6px] mb-2">
          <div className={styles.wrapper}></div>
          <div className="flex items-center justify-center">
            <Action onClick={() => onAdd()}>
              <div className="flex items-center gap-1">
                <Add></Add>
                <span className="text-xs">Add</span>
              </div>
            </Action>
            {duplicate && (
              <Action
                onClick={() => {
                  if (onDuplicate) {
                    onDuplicate();
                  }
                }}
              >
                <div className="flex items-center gap-1">
                  <Copy></Copy>
                  <span className="text-xs">Duplicate</span>
                </div>
              </Action>
            )}
            {remove && (
              <Action
                onClick={() => {
                  if (onDelete) {
                    onDelete();
                  }
                }}
                active={{
                  fill: 'rgba(255, 70, 70, 0.95)',
                  background: 'rgba(255, 70, 70, 0.1)',
                }}
              >
                <div className="flex items-center gap-1">
                  <TrashCan></TrashCan>
                  <span className="text-xs">Delete</span>
                </div>
              </Action>
            )}
          </div>
          <div className={styles.wrapper}></div>
        </div>
      )}
    </>
  );
}
