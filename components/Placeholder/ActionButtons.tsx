import { useEffect, useState } from 'react';
import Action from '../DndKit/components/Action/Action';
import { Add, AddLarge, TrashCan } from '@carbon/icons-react';
import useMousePosition from '@/hooks/useMousePosition';

interface ActionButtonsProps {
  element: HTMLElement | null;
  add?: boolean;
  remove?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

export default function ActionButtons({
  element,
  add,
  remove,
  onAdd,
  onRemove,
}: ActionButtonsProps) {
  const mousePosition = useMousePosition();
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (!element) return;
    const rect = element.getBoundingClientRect();

    setOver(
      mousePosition.y >= rect.y && mousePosition.y <= rect.y + rect.height
    );
  }, [mousePosition]);

  return (
    <>
      {over && (
        <>
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
              className="absolute right-0 translate-x-full -translate-y-[2px]"
              onClick={() => onRemove && onRemove()}
            >
              <TrashCan></TrashCan>
            </Action>
          )}
        </>
      )}
    </>
  );
}
