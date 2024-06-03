import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef, memo } from 'react';
import styles from './SortableItem.module.scss';
import { Handle, Remove } from './components';

interface SortableItemProps {
  id: string;
  children: any;
  onRemove: (id: string) => void;
}

export const SortableItem = memo(
  forwardRef<HTMLDivElement, SortableItemProps>(
    ({ id, children, onRemove }, ref) => {
      const animateLayoutChanges: AnimateLayoutChanges = (args) =>
        defaultAnimateLayoutChanges({ ...args, wasDragging: true });

      const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: id, animateLayoutChanges: animateLayoutChanges });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          className="relative flex items-center"
        >
          {children}
          <Remove className={styles.Remove} onClick={() => onRemove(id)} />
          <Handle {...listeners} />
        </div>
      );
    }
  )
);
