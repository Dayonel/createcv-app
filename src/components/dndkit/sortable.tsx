import { useId } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  DragEndEvent,
  UniqueIdentifier,
  MeasuringStrategy,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './sortable-item';
import { Key } from '@/types/key';

interface SortableProps {
  initialItems?: Key[];
  renderItem(args: any): React.ReactElement;
  onSort: (items: UniqueIdentifier[]) => void;
  onRemove?: (id: string) => void;
  wrapperStyle?: string;
  containerStyle?: string;
  handle?: boolean;
  noHandleFirst?: boolean;
  remove?: boolean;
}

export default function Sortable({
  initialItems,
  renderItem,
  onSort,
  onRemove,
  wrapperStyle,
  containerStyle,
  handle,
  noHandleFirst,
  remove,
}: SortableProps) {
  const items: UniqueIdentifier[] = initialItems?.map((m) => m.key) ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      onSort(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleRemove = (id: string) => {
    onRemove?.(id);
  };

  return (
    <DndContext
      id={useId()}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {initialItems &&
          items.map((m, i) => {
            return (
              <SortableItem
                key={m}
                id={m.toString()}
                onRemove={(id) => handleRemove(id)}
                renderItem={() =>
                  renderItem({
                    props:
                      initialItems[initialItems.findIndex((i) => i.key === m)],
                  })
                }
                wrapperStyle={wrapperStyle}
                containerStyle={containerStyle}
                handle={handle && (!noHandleFirst || i > 0)}
                remove={remove}
              ></SortableItem>
            );
          })}
      </SortableContext>
    </DndContext>
  );
}
