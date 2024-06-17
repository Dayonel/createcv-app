import { useEffect, useId, useState } from 'react';
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
import { SortableItem } from './SortableItem';
import { Key } from '@/types/Key';

interface SortableProps {
  initialItems?: Key[];
  renderItem(args: any): React.ReactElement;
  onSort: (items: UniqueIdentifier[]) => void;
  onRemove?: (id: string) => void;
  wrapperStyle?: string;
  containerStyle?: string;
  handle?: boolean;
  exceptHandle?: string;
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
  exceptHandle,
  remove,
}: SortableProps) {
  const [items, setItems] = useState<UniqueIdentifier[]>(
    () => initialItems?.map((m) => m.key) || []
  );

  useEffect(() => {
    if (initialItems) {
      setItems(initialItems.map((m) => m.key));
    }
  }, [initialItems?.length, renderItem]);

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

      const sorted = arrayMove(items, oldIndex, newIndex);
      setItems(sorted);
      onSort(sorted);
    }
  };

  const handleRemove = (id: string) => {
    if (!onRemove) return;

    setItems((items) => items.filter((item) => item !== id));
    onRemove(id);
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
          items.map((m) => {
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
                handle={handle && (!exceptHandle || exceptHandle !== m)}
                remove={remove}
              ></SortableItem>
            );
          })}
      </SortableContext>
    </DndContext>
  );
}
