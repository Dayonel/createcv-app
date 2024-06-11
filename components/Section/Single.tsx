import Divider from '../Divider';
import { Single as SingleType } from '@/types/Single';
import { UniqueIdentifier } from '@dnd-kit/core';
import Sortable from '../DndKit/Sortable';
import SingleContent, { SingleContentProps } from './Content/SingleContent';
import Placeholder from '../Placeholder';
import { getEmptyParagraph, getEmptyText } from '@/utils/richTextUtils';
import RichText from '../RichText/RichText';
import { v4 } from 'uuid';
import DeletePlaceholder from '../DeletePlaceholder';

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
      content
        .map((m) => Object.keys(m).filter((f) => f !== 'key' && f !== 'empty'))
        .flat().length === 0
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

  const deleteContent = () => {
    const i = content.indexOf(props);
    content.splice(i, 1);

    onChange();
  };

  return (
    <>
      {props && (
        <div className="relative">
          {props.name !== undefined && (
            <div className="flex items-center w-full">
              <Divider>
                <div className="inline-block">
                  <div className="flex items-center">
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
                  </div>
                </div>
              </Divider>
              {!last && (
                <DeletePlaceholder
                  edit={edit}
                  onClick={() => onDeleteSection(props.key)}
                ></DeletePlaceholder>
              )}
            </div>
          )}
          {!props.name && (
            <Placeholder
              edit={edit}
              className={`text-sm font-bold inline-block`}
              childrenClassName="flex-row-reverse"
              placeholder="+ SECTION"
              onClick={() => {
                props.name = getEmptyText('SECTION');
                props.empty = true;
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
                    <DeletePlaceholder
                      edit={edit}
                      onClick={() => deleteContent()}
                    ></DeletePlaceholder>
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
            <Placeholder
              edit={edit}
              className={`text-xs flex items-center w-full min-h-24 !ml-2 !pl-4`}
              childrenClassName={`-mt-4`}
              placeholder="+ Content"
              onClick={() => addContent()}
            ></Placeholder>
          </div>
        </div>
      )}
    </>
  );
}
