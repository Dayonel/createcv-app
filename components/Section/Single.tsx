import Divider from '../Divider';
import { Single as SingleType } from '@/types/Single';
import { UniqueIdentifier } from '@dnd-kit/core';
import Sortable from '../DndKit/Sortable';
import SingleContent, { SingleContentProps } from './Content/SingleContent';
import Placeholder from '../Placeholder/Placeholder';
import RichText from '../RichText/RichText';
import { v4 } from 'uuid';
import Transition from '../Animations/Transition';
import Action from '../DndKit/components/Action/Action';
import { TrashCan } from '@carbon/icons-react';
import ActionsPlaceholder from '../Placeholder/ActionsPlaceholder';
import classNames from 'classnames';
import placeholder from '../../data/placeholder.json';
import { SingleContent as SingleContentType } from '@/types/Single';

interface SingleProps {
  props: SingleType;
  onChange: () => void;
  onRemove: (full: boolean) => void;
  onAddSection: (e: string) => void;
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
      content.map((m) => Object.keys(m).filter((f) => f !== 'key')).flat()
        .length === 0
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
      title: placeholderContent.title,
      subtitle: placeholderContent.subtitle,
      date: placeholderContent.date,
      topic: placeholderContent.topic,
      description: placeholderContent.description,
      key: v4(),
    });

    onChange();
  };

  const deleteContent = () => {
    const i = content.indexOf(props);
    content.splice(i, 1);

    onChange();
  };

  const placeholderSingle = placeholder.sections.find(
    (f) => f.type === 'Single'
  )!;
  const placeholderContent = placeholderSingle.content![0] as SingleContentType;

  return (
    <>
      {props && (
        <div className="relative">
          {props.name !== undefined && (
            <>
              <div className="flex items-center w-full">
                <Divider
                  className={classNames(
                    edit ? 'hidden' : 'block',
                    'print:block'
                  )}
                >
                  <div className="inline-block">
                    <div className="flex items-center">
                      <RichText
                        props={props.name}
                        className={`max-w-48 print:max-w-lg md:max-w-lg text-sm uppercase font-bold inline-block`}
                        input
                        onChange={(e) => {
                          props.name = e;
                          onChange();
                        }}
                        onRemove={() => {
                          delete props.name;
                          handleRemove();
                        }}
                      ></RichText>
                    </div>
                  </div>
                </Divider>
                <ActionsPlaceholder
                  edit={edit}
                  onAdd={() => addContent()}
                  onDuplicate={() => onAddSection(props.key)}
                  onDelete={() => onDeleteSection(props.key)}
                  duplicate
                  remove={!last}
                ></ActionsPlaceholder>
              </div>
            </>
          )}
          {!props.name && (
            <Placeholder
              edit={edit}
              className={`text-sm font-bold inline-block`}
              childrenClassName="flex-row-reverse"
              placeholder="SECTION"
              onClick={() => {
                props.name = placeholderSingle.name;
                onChange();
              }}
            >
              <Divider dashed></Divider>
            </Placeholder>
          )}

          <div className={`relative flex flex-col gap-5 pt-[1px]`}>
            <Sortable
              initialItems={content}
              renderItem={({ props }: SingleContentProps) => (
                <>
                  <SingleContent
                    props={props}
                    onChange={onChange}
                    onRemove={handleRemove}
                    edit={edit}
                  ></SingleContent>

                  {content.indexOf(props) > 0 && (
                    <div className="print:hidden">
                      <Transition
                        edit={edit}
                        className="absolute top-0 right-1 translate-x-full"
                      >
                        <Action
                          active={{
                            fill: 'rgba(255, 70, 70, 0.95)',
                            background: 'rgba(255, 70, 70, 0.1)',
                          }}
                          onClick={() => deleteContent()}
                        >
                          <TrashCan></TrashCan>
                        </Action>
                      </Transition>
                    </div>
                  )}
                </>
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
          </div>
        </div>
      )}
    </>
  );
}
