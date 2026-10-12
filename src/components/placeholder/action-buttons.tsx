import { useState } from 'react';
import Action from '../dndkit/components/action/action';
import { AddLarge, TrashCan } from '@carbon/icons-react';
import { useOutsideClick } from '@/hooks/use-outside-click';

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
  group,
}: ActionButtonsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useOutsideClick(() => setVisible(false));

  return (
    <div
      ref={ref}
      className="group"
      onFocus={() => setVisible(true)}
      onPointerUp={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <div
        className={`${
          visible ? 'opacity-100' : 'opacity-0'
        } opacity-0 md:group-hover:opacity-100 transition-opacity duration-150 md:duration-500 z-20`}
      >
        {add && (
          <Action
            name="Add"
            className="absolute -translate-x-full"
            onClick={() => onAdd && onAdd()}
          >
            <AddLarge></AddLarge>
          </Action>
        )}
      </div>
      <div className={`relative ${group ? 'group' : 'group/item'} ease-in`}>
        <div
          className={`opacity-0 ${visible ? 'opacity-100' : 'opacity-0'} ${
            group
              ? 'md:group-hover:opacity-100'
              : 'md:group-hover/item:opacity-100'
          } transition-opacity duration-150 md:duration-500 z-20`}
        >
          {remove && (
            <Action
              name="Remove"
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
