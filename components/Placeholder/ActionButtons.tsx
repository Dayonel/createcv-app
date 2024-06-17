import { group } from 'console';
import Action from '../DndKit/components/Action/Action';
import { AddLarge, TrashCan } from '@carbon/icons-react';

interface ActionButtonsProps {
  add?: boolean;
  remove?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  children: any;
  group?: boolean;
}

export default function ActionButtons({
  add,
  remove,
  onAdd,
  onRemove,
  children,
  group
}: ActionButtonsProps) {
  return (
    <div className="group">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 md:duration-500 z-20">
        {add && (
          <Action
            className="absolute -translate-x-full"
            onClick={() => onAdd && onAdd()}
          >
            <AddLarge></AddLarge>
          </Action>
        )}
      </div>
      <div className={`relative ${group ? 'group' : 'group/item'} ease-in`}>
        <div className={`opacity-0 ${group ? 'group-hover:opacity-100' : 'group-hover/item:opacity-100'} transition-opacity duration-150 md:duration-500 z-20`}>
          {remove && (
            <Action
              className="absolute right-0 translate-x-full"
              onClick={() => onRemove && onRemove()}
            >
              <TrashCan></TrashCan>
            </Action>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
