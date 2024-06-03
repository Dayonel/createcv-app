'use client';
import { useId, useState } from 'react';
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
import { ContactProps } from '../Contact';

interface SortableProps {
  initialItems?: Key[];
  renderItem(args: any): React.ReactElement;
  onSort: (items: UniqueIdentifier[]) => void;
  onRemove: (id: string) => void;
}

export default function Sortable({
  initialItems,
  renderItem,
  onSort,
  onRemove,
}: SortableProps) {
  const [items, setItems] = useState<UniqueIdentifier[]>(
    () => initialItems?.map((m) => m.key) || []
  );

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
        {items.map((m, i) => {
          return (
            <SortableItem
              key={m}
              id={m.toString()}
              onRemove={(id) => handleRemove(id)}
            >
              {initialItems &&
                renderItem({
                  props: initialItems[i],
                } as ContactProps)}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
}
