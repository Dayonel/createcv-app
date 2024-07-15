import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Handle from './components/handle/handle';
import { Remove } from './components/remove/remove';
import { useState } from 'react';
import { useOutsideClick } from '@/hooks/use-outside-click';

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
  const [visible, setVisible] = useState(false);
  const ref = useOutsideClick(() => setVisible(false));
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
      } group`}
      tabIndex={-1}
    >
      <div
        ref={ref}
        className={`${containerStyle || ''} relative grid group/item ease-in`}
        onClick={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {renderItem({})}

        <div
          className={`${
            visible ? 'opacity-100' : 'opacity-0'
          } md:group-hover/item:opacity-100 transition-opacity duration-150 md:duration-500`}
        >
          {remove && <Remove onClick={() => onRemove && onRemove(id)} />}
          {handle && <Handle {...listeners} tabIndex={-1} />}
        </div>
      </div>
    </div>
  );
};
