import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Handle, Remove } from './components';

interface SortableItemProps {
  id: string;
  renderItem(args: any): React.ReactElement;
  onRemove: (id: string) => void;
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
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, animateLayoutChanges: animateLayoutChanges });

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
      <div className={`${containerStyle || ''} relative grid`}>
        {renderItem({
          onControlsVisible: (e: boolean) => setControlsVisible(e),
        })}
        {controlsVisible && (
          <>
            {remove && <Remove onClick={() => onRemove(id)} />}
            {handle && <Handle {...listeners} tabIndex={-1} />}
          </>
        )}
      </div>
    </div>
  );
};
