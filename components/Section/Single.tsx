import styles from './Single.module.scss';
import Divider from '../Divider';
import { Single as SingleType } from '@/types/Single';
import { UniqueIdentifier } from '@dnd-kit/core';
import Sortable from '../DndKit/Sortable';
import SingleContent, { SingleContentProps } from './Content/SingleContent';
import { Placeholder } from '../Placeholder';
import { getEmptyParagraph, getEmptyText } from '@/utils/richTextUtils';
import RichText from '../RichText/RichText';
import { v4 } from 'uuid';
import { Copy, TrashCan } from '@carbon/icons-react';
import { Transition } from '../Animations/Transition';

interface SingleProps {
  props: SingleType;
  onChange: () => void;
  onRemove: (full: boolean) => void;
  onAddSection: () => void;
  onDeleteSection: (e: string) => void;
  edit: boolean;
  last: boolean;
}

export default function Single({
  props,
  onChange,
  onRemove,
  onAddSection,
  onDeleteSection,
  edit,
  last,
}: SingleProps) {
  const content = props.content || [];

  const handleRemove = () => {
    if (
      !last &&
      !props.name &&
      content.map((m) => Object.keys(m)).flat().length === 0
    ) {
      const i = content.indexOf(props);
      content.splice(i, 1);

      if (content.length === 0) {
        delete props.content;
      }

      onRemove(true);
    } else {
      onRemove(false);
    }
  };

  const addContent = () => {
    content.push({
      title: getEmptyText('Heading 2'),
      subtitle: getEmptyText('Heading 3'),
      date: getEmptyText(new Date().getFullYear().toString()),
      topic: getEmptyText('Text'),
      description: getEmptyParagraph(),
      key: v4(),
      empty: true,
    });

    onChange();
  };

  return (
    <>
      {props && (
        <div className="relative">
          {props.name !== undefined && (
            <div className="flex w-full">
              <Divider>
                <div className="inline-block">
                  <div className="flex gap-2">
                    <RichText
                      props={props.name}
                      className={`max-w-xs md:max-w-lg text-sm uppercase font-bold inline-block`}
                      input
                      remove
                      empty={props.empty}
                      onChange={(e) => {
                        props.name = e;
                        onChange();
                      }}
                      onRemove={() => {
                        delete props.name;
                        handleRemove();
                      }}
                    ></RichText>
                    <Transition edit={edit}>
                      <div className={styles.button}>
                        <button
                          type="button"
                          title="Add section"
                          onClick={() => onAddSection()}
                        >
                          <Copy></Copy>
                        </button>
                      </div>
                    </Transition>
                  </div>
                </div>
              </Divider>
              {!last && (
                <Transition edit={edit}>
                  <div className={styles.button}>
                    <button
                      type="button"
                      title="Delete section"
                      onClick={() => onDeleteSection(props.key)}
                    >
                      <TrashCan></TrashCan>
                    </button>
                  </div>
                </Transition>
              )}
            </div>
          )}
          {!props.name && (
            <Placeholder
              edit={edit}
              className={`text-sm font-bold inline-block`}
              childrenClassName="flex-row-reverse"
              placeholder="DIVIDER"
              onClick={() => {
                props.name = getEmptyText('DIVIDER');
                props.empty = true;
                onChange();
              }}
              add
            >
              <Divider dashed></Divider>
            </Placeholder>
          )}

          <div className={`relative flex flex-col gap-5`}>
            <Sortable
              initialItems={content}
              renderItem={({ props }: SingleContentProps) => (
                <SingleContent
                  props={props}
                  onChange={onChange}
                  onRemove={handleRemove}
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
              handle={content.length > 1}
              containerStyle="w-full"
            ></Sortable>
            <Placeholder
              edit={edit}
              className={`text-xs flex items-center w-full min-h-9`}
              childrenClassName={`-mt-4`}
              placeholder="Content"
              onClick={() => addContent()}
              add
            ></Placeholder>
          </div>
        </div>
      )}
    </>
  );
}
