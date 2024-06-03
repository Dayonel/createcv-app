import RichText from '@/components/RichText/RichText';
import styles from './SingleContent.module.scss';
import { SingleContent as SingleContentType } from '@/types/Single';
import { Calendar } from '@carbon/icons-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useEffect, useState } from 'react';

export interface SingleContentProps {
  props: SingleContentType;
  onChange: () => void;
  onRemove: () => void;
  onControlsVisible: (e: boolean) => void;
}

export default function SingleContent({
  props,
  onChange,
  onRemove,
  onControlsVisible,
}: SingleContentProps) {
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));

  useEffect(() => {
    onControlsVisible(controlsVisible);
  }, [controlsVisible]);

  return (
    <>
      {props && (
        <div
          ref={controlsRef}
          className={`${styles.single} flex flex-col gap-1`}
          onFocus={() => setControlsVisible(true)}
        >
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

            <div className="flex flex-wrap items-center">
              {props.date !== undefined && (
                <>
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
                </>
              )}
            </div>
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
        </div>
      )}
    </>
  );
}
