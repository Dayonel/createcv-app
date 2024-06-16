import Action from '../DndKit/components/Action/Action';
import { AddLarge, TrashCan } from '@carbon/icons-react';

interface ActionButtonsProps {
  add?: boolean;
  remove?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  children: any;
}

export default function ActionButtons({
  add,
  remove,
  onAdd,
  onRemove,
  children,
}: ActionButtonsProps) {
  return (
    <div className="relative group ease-in">
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
        {add && (
          <Action
            className="absolute -translate-x-full"
            onClick={() => onAdd && onAdd()}
          >
            <AddLarge></AddLarge>
          </Action>
        )}

        {remove && (
          <Action
            className="absolute right-0 translate-x-full"
            onClick={() => onRemove && onRemove()}
          >
            <TrashCan></TrashCan>
          </Action>
        )}
      </div>
      {children}
    </div>
  );
}
