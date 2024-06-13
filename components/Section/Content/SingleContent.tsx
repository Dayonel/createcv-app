import RichText from '@/components/RichText/RichText';
import { SingleContent as SingleContentType } from '@/types/Single';
import { Calendar } from '@carbon/icons-react';
import useColorStore from '@/store/useStore';
import Placeholder from '@/components/Placeholder/Placeholder';
import { getEmptyParagraph, getEmptyText } from '@/utils/richTextUtils';

export interface SingleContentProps {
  props: SingleContentType;
  onChange: () => void;
  onRemove: () => void;
  edit: boolean;
}

export default function SingleContent({
  props,
  onChange,
  onRemove,
  edit,
}: SingleContentProps) {
  const { color } = useColorStore();

  return (
    <>
      {props && (
        <div className={`relative flex flex-col gap-1`}>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              {props.title !== undefined && (
                <RichText
                  className="max-w-xs print:max-w-lg md:max-w-lg font-bold text-base"
                  props={props.title}
                  onChange={(e) => {
                    props.title = e;
                    onChange();
                  }}
                  input
                  remove
                  onRemove={() => {
                    delete props.title;
                    onRemove();
                  }}
                  empty={props.empty}
                ></RichText>
              )}
              {!props.title && (
                <Placeholder
                  edit={edit}
                  className=" text-base font-bold"
                  placeholder="Heading 2"
                  onClick={() => {
                    props.title = getEmptyText('Heading 2');
                    props.empty = true;
                    onChange();
                  }}
                ></Placeholder>
              )}
            </div>
            <div>
              {props.date !== undefined && (
                <div className="flex items-center pl-[6px]">
                  <Calendar fill={color}></Calendar>
                  <RichText
                    className="font-bold text-xs max-w-xs"
                    props={props.date}
                    onChange={(e) => {
                      props.date = e;
                      onChange();
                    }}
                    onRemove={() => {
                      delete props.date;
                      onRemove();
                    }}
                    input
                    remove
                    empty={props.empty}
                  ></RichText>
                </div>
              )}
              {!props.date && (
                <Placeholder
                  edit={edit}
                  className="text-xs font-bold"
                  placeholder={`Date`}
                  onClick={() => {
                    props.date = getEmptyText(
                      new Date().getFullYear().toString()
                    );
                    props.empty = true;
                    onChange();
                  }}
                >
                  <Calendar fill={color}></Calendar>
                </Placeholder>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <div>
              {props.subtitle !== undefined && (
                <RichText
                  className="max-w-xs print:max-w-lg md:max-w-lg font-bold text-sm"
                  props={props.subtitle}
                  onChange={(e) => {
                    props.subtitle = e;
                    onChange();
                  }}
                  onRemove={() => {
                    delete props.subtitle;
                    onRemove();
                  }}
                  input
                  remove
                  empty={props.empty}
                ></RichText>
              )}
              {!props.subtitle && (
                <Placeholder
                  edit={edit}
                  className="text-sm font-bold"
                  placeholder="Heading 3"
                  onClick={() => {
                    props.subtitle = getEmptyText('Heading 3');
                    props.empty = true;
                    onChange();
                  }}
                ></Placeholder>
              )}
            </div>
            <div>
              {props.topic !== undefined && (
                <RichText
                  className="text-xs max-w-xs"
                  props={props.topic}
                  onChange={(e) => {
                    props.topic = e;
                    onChange();
                  }}
                  onRemove={() => {
                    delete props.topic;
                    onRemove();
                  }}
                  input
                  remove
                  empty={props.empty}
                ></RichText>
              )}
              {!props.topic && (
                <Placeholder
                  edit={edit}
                  className="text-xs"
                  placeholder="Text"
                  onClick={() => {
                    props.topic = getEmptyText('Text');
                    props.empty = true;
                    onChange();
                  }}
                ></Placeholder>
              )}
            </div>
          </div>

          <div className="pt-1">
            {props.description !== undefined && (
              <RichText
                props={props.description}
                onChange={(e) => {
                  props.description = e;
                  onChange();
                }}
                onRemove={() => {
                  delete props.description;
                  onRemove();
                }}
                remove
              ></RichText>
            )}
            {!props.description && (
              <Placeholder
                edit={edit}
                className="text-xs min-h-16 !py-[2px] w-full"
                placeholder="Write something..."
                onClick={() => {
                  props.description = getEmptyParagraph();
                  onChange();
                }}
              ></Placeholder>
            )}
          </div>
        </div>
      )}
    </>
  );
}
