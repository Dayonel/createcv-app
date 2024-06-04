import RichText from '@/components/RichText/RichText';
import styles from './SingleContent.module.scss';
import { SingleContent as SingleContentType } from '@/types/Single';
import { Calendar } from '@carbon/icons-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useEffect, useState } from 'react';
import { Add } from '@/components/Add';

export interface SingleContentProps {
  props: SingleContentType;
  onChange: () => void;
  onRemove: () => void;
  onControlsVisible: (e: boolean) => void;
  edit: boolean;
}

export default function SingleContent({
  props,
  onChange,
  onRemove,
  onControlsVisible,
  edit,
}: SingleContentProps) {
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));

  useEffect(() => {
    onControlsVisible(controlsVisible);
  }, [controlsVisible]);

  return (
    <div
      ref={controlsRef}
      className={`relative ${styles.single} flex flex-col gap-1`}
      onFocus={() => setControlsVisible(true)}
    >
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
            {props.title === undefined && (
              <Add
                wrapperStyle="top-4 -translate-y-full -translate-x-full"
                edit={edit}
              ></Add>
            )}
            {props.date !== undefined && (
              <div className="flex flex-wrap items-center">
                <Calendar></Calendar>
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
            {props.date === undefined && (
              <Add
                wrapperStyle="top-4 right-0 -translate-y-full translate-x-full"
                edit={edit}
              ></Add>
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
            {props.subtitle === undefined && (
              <Add
                wrapperStyle="top-12 -translate-y-full -translate-x-full"
                edit={edit}
              ></Add>
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
            {props.topic === undefined && (
              <Add
                wrapperStyle="top-12 right-0 -translate-y-full translate-x-full"
                edit={edit}
              ></Add>
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
          {props.description === undefined && <Add edit={edit}></Add>}
        </>
      )}
    </div>
  );
}
