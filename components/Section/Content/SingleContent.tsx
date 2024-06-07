import RichText from '@/components/RichText/RichText';
import { SingleContent as SingleContentType } from '@/types/Single';
import { Calendar } from '@carbon/icons-react';
import useColorStore from '@/store/useStore';
import { Placeholder } from '@/components/Placeholder';
import { getText } from '@/utils/richTextUtils';
import placeholder from '../../../data/placeholder.json';

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

  const placeholderContent = placeholder.sections.find(
    (f) => f.type === 'Single'
  )!.content![0] as SingleContentType;

  return (
    <div className={`relative flex flex-col gap-1`}>
      {props && (
        <>
          <div className="flex flex-wrap justify-between items-center gap-2">
            {props.title !== undefined && (
              <RichText
                className="max-w-xs md:max-w-lg font-bold text-base"
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
                edit={edit}
                className=" text-base font-bold"
                placeholder={getText(placeholderContent.title!)}
                onClick={() => {
                  props.title = placeholderContent.title;
                  onChange();
                }}
              ></Placeholder>
            )}
            {props.date !== undefined && (
              <div className="flex flex-wrap items-center">
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
                ></RichText>
              </div>
            )}
            {!props.date && (
              <Placeholder
                edit={edit}
                className="text-xs font-bold"
                placeholder={getText(placeholderContent.date!)}
                onClick={() => {
                  props.date = placeholderContent.date;
                  onChange();
                }}
              ></Placeholder>
            )}
          </div>
          <div className="flex flex-wrap justify-between items-center">
            {props.subtitle !== undefined && (
              <RichText
                className="max-w-xs md:max-w-lg font-bold text-sm"
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
                edit={edit}
                className="text-sm font-bold"
                placeholder={getText(placeholderContent.subtitle!)}
                onClick={() => {
                  props.subtitle = placeholderContent.subtitle;
                  onChange();
                }}
              ></Placeholder>
            )}

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
                edit={edit}
                className="text-xs"
                placeholder={getText(placeholderContent.topic!)}
                onClick={() => {
                  props.topic = placeholderContent.topic;
                  onChange();
                }}
              ></Placeholder>
            )}
          </div>

          {props.description !== undefined && (
            <div className="pt-1">
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
            </div>
          )}
          {!props.description && (
            <Placeholder
              edit={edit}
              className="text-xs font-bold"
              placeholder={getText(placeholderContent.description!)}
              onClick={() => {
                props.description = placeholderContent.description;
                onChange();
              }}
            ></Placeholder>
          )}
        </>
      )}
    </div>
  );
}
