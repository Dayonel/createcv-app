'use client';
import Divider from '../Divider';
import { Single as SingleType } from '@/types/Single';
import { UniqueIdentifier } from '@dnd-kit/core';
import Sortable from '../DndKit/Sortable';
import SingleContent, { SingleContentProps } from './Content/SingleContent';
import { Placeholder } from '../Placeholder';

interface SingleProps {
  props: SingleType;
  onChange: () => void;
  onRemove: () => void;
  edit: boolean;
}

export default function Single({
  props,
  onChange,
  onRemove,
  edit,
}: SingleProps) {
  const { name } = props;
  const content = props.content || [];

  return (
    <div className="relative">
      {name !== undefined && (
        <Divider
          props={name}
          onChange={(e) => {
            props.name = e;
            onChange();
          }}
          onRemove={() => {
            delete props.name;
            onRemove();
          }}
        ></Divider>
      )}

      <div className={`relative flex flex-col gap-6`}>
        <Sortable
          initialItems={content}
          renderItem={({ props, onControlsVisible }: SingleContentProps) => (
            <SingleContent
              props={props}
              onChange={onChange}
              onRemove={onRemove}
              onControlsVisible={onControlsVisible}
              edit={edit}
            ></SingleContent>
          )}
          onSort={(items: UniqueIdentifier[]) => {
            if (props.content) {
              props.content.sort(
                (a, b) => items.indexOf(a.key) - items.indexOf(b.key)
              );
              onChange();
            }
          }}
          onRemove={(e: string) => {
            if (props.content) {
              const i = props.content.findIndex((f) => f.key === e);
              props.content.splice(i, 1);
              onRemove();
            }
          }}
          handle={content.length > 1}
          containerStyle="w-full"
        ></Sortable>
      </div>
      <Placeholder
        wrapperStyle="bottom-0 translate-y-full -translate-x-full"
        edit={edit}
      ></Placeholder>
    </div>
  );
}
