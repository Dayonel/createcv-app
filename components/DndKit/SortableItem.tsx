import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import Handle from './components/Handle/Handle';
import { Remove } from './components/Remove/Remove';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface SortableItemProps {
  id: string;
  renderItem(args: any): React.ReactElement;
  onRemove?: (id: string) => void;
  wrapperStyle?: string;
  containerStyle?: string;
  handle?: boolean;
  remove?: boolean;
}

export const SortableItem = ({
  id,
  renderItem,
  onRemove,
  wrapperStyle,
  containerStyle,
  handle,
  remove,
}: SortableItemProps) => {
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, animateLayoutChanges });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`${wrapperStyle || ''} flex items-center cursor-default ${
        isDragging ? 'z-10' : ''
      }`}
      tabIndex={-1}
    >
      <div
        onFocus={() => setControlsVisible(true)}
        ref={controlsRef}
        className={`${containerStyle || ''} relative grid`}
      >
        {renderItem({})}
        {controlsVisible && (
          <>
            {remove && (
              <Remove
                onClick={() => onRemove && onRemove(id)}
                onBlur={() => setControlsVisible(false)}
              />
            )}
            {handle && <Handle {...listeners} tabIndex={-1} />}
          </>
        )}
      </div>
    </div>
  );
};
