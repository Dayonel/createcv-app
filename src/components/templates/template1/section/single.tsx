import { sortByKeys } from '@/utils/sort';
import Divider from '../divider/divider';
import { Single as SingleType } from '../types/single';
import Sortable from '../../../dndkit/sortable';
import SingleContent, { SingleContentProps } from './content/single-content';
import Placeholder from '../../../placeholder/placeholder';
import RichText from '../../../rich-text/rich-text';
import { v4 } from 'uuid';
import ActionButtons from '../../../placeholder/action-buttons';

interface SingleProps {
  props: SingleType;
  onChange: () => void;
  onRemove: (full: boolean) => void;
  onAddSection: (e: string) => void;
  onDeleteSection: (e: string) => void;
  last: boolean;
  placeholder: SingleType;
}

export default function Single({
  props,
  onChange,
  onRemove,
  onAddSection,
  onDeleteSection,
  last,
  placeholder,
}: SingleProps) {
  const content = (props.content ??= []);

  const handleRemove = () => {
    const empty = content.every((m) =>
      Object.keys(m).every((k) => k === 'key'),
    );
    onRemove(!last && !props.name && empty);
  };

  const addContent = () => {
    props.content = [...content, { ...placeholder.content![0], key: v4() }];
    onChange();
  };

  const deleteContent = (key: string) => {
    props.content = content.filter((f) => f.key !== key);
    onChange();
  };

  return (
    <>
      <ActionButtons
        add
        remove={!last}
        onAdd={() => onAddSection(props.key)}
        onRemove={() => onDeleteSection(props.key)}
        group
      >
        {props.name ? (
          <Divider>
            <div className="inline-block">
              <RichText
                props={props.name}
                className="max-w-48 print:max-w-lg md:max-w-lg text-sm uppercase font-bold inline-block"
                input
                remove
                onChange={(e) => {
                  props.name = e;
                  onChange();
                }}
                onRemove={() => {
                  delete props.name;
                  handleRemove();
                }}
              />
            </div>
          </Divider>
        ) : (
          <Placeholder
            className="text-sm font-bold inline-block"
            childrenClassName="flex-row-reverse"
            placeholder="SECTION"
            onClick={() => {
              props.name = placeholder.name;
              onChange();
            }}
          >
            <Divider dashed />
          </Placeholder>
        )}
      </ActionButtons>

      <div className="relative flex flex-col gap-5">
        <Sortable
          initialItems={content}
          renderItem={({ props }: SingleContentProps) => (
            <SingleContent
              props={props}
              onChange={onChange}
              onRemove={handleRemove}
              onAdd={addContent}
              onDelete={deleteContent}
              placeholder={placeholder.content![0]}
            />
          )}
          onSort={(items) => {
            props.content = sortByKeys(content, items);
            onChange();
          }}
          handle={content.length > 1}
          containerStyle="w-full"
        />
      </div>
    </>
  );
}
