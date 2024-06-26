import RichText from '@/components/RichText/RichText';
import { SingleContent as SingleContentType } from '../../types/Single';
import { Calendar } from '@carbon/icons-react';
import useColorStore from '@/store/colorStore';
import Placeholder from '@/components/Placeholder/Placeholder';
import placeholder from '../../../../../data/template1.json';
import ActionButtons from '@/components/Placeholder/ActionButtons';

export interface SingleContentProps {
  props: SingleContentType;
  onChange: () => void;
  onRemove: () => void;
  onAdd: () => void;
  onDelete: (e: string) => void;
}

export default function SingleContent({
  props,
  onChange,
  onRemove,
  onAdd,
  onDelete,
}: SingleContentProps) {
  const { color } = useColorStore();

  const placeholderContent = placeholder.sections.find(
    (f) => f.type === 'Single'
  )!.content![0] as SingleContentType;

  return (
    <>
      {props && (
        <ActionButtons
          add
          onAdd={onAdd}
          onRemove={() => onDelete(props.key)}
          remove
        >
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
                  ></RichText>
                )}
                {!props.title && (
                  <Placeholder
                    className=" text-base font-bold"
                    placeholder="Heading 2"
                    onClick={() => {
                      props.title = placeholderContent.title;
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
                      reverseRemove
                    ></RichText>
                  </div>
                )}
                {!props.date && (
                  <Placeholder
                    className="text-xs font-bold"
                    placeholder={`Date`}
                    onClick={() => {
                      props.date = placeholderContent.date;
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
                  ></RichText>
                )}
                {!props.subtitle && (
                  <Placeholder
                    className="text-sm font-bold"
                    placeholder="Heading 3"
                    onClick={() => {
                      props.subtitle = placeholderContent.subtitle;
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
                  ></RichText>
                )}
                {!props.topic && (
                  <Placeholder
                    className="text-xs"
                    placeholder="Text"
                    onClick={() => {
                      props.topic = placeholderContent.topic;
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
                  className="text-xs min-h-16 !py-[2px] w-full"
                  placeholder="Write something..."
                  onClick={() => {
                    props.description = placeholderContent.description;
                    onChange();
                  }}
                ></Placeholder>
              )}
            </div>
          </div>
        </ActionButtons>
      )}
    </>
  );
}
