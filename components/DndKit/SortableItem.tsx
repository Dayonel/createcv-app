import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Handle from './components/Handle/Handle';
import { Remove } from './components/Remove/Remove';

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
        className={`${containerStyle || ''} relative grid group/item ease-in`}
      >
        {renderItem({})}

        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 md:duration-500 z-20">
          {remove && <Remove onClick={() => onRemove && onRemove(id)} />}
          {handle && <Handle {...listeners} tabIndex={-1} />}
        </div>
      </div>
    </div>
  );
};
