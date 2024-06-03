import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from './RichText/RichText';

export interface LanguageProps {
  props: LanguageType;
  onChange: () => void;
  onRemove: () => void;
  id: string;
  onControlsVisible: (e: boolean) => void;
}

export default function Language({
  props,
  onChange,
  onRemove,
  id,
  onControlsVisible,
}: LanguageProps) {
  return (
    <>
      {(props.value || props.level) && (
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-between">
            {props.value && (
              <RichText
                id={id}
                className="max-w-xs md:max-w-52 text-xs font-bold"
                props={props.value}
                onChange={(e) => {
                  props.value = e;
                  onChange();
                }}
                onRemove={() => {
                  delete props.value;
                  onRemove();
                }}
                input
                remove
                onControlsVisible={onControlsVisible}
              ></RichText>
            )}
            {props.level && (
              <RichText
                className="max-w-xs md:max-w-52 text-xs"
                props={props.level}
                onChange={(e) => {
                  props.level = e;
                  onChange();
                }}
                onRemove={() => {
                  delete props.level;
                  onRemove();
                }}
                input
                remove
                onControlsVisible={onControlsVisible}
              ></RichText>
            )}
          </div>
          {props.rating != undefined && (
            <div className="px-[6px]">
              <input
                aria-labelledby={id}
                type="range"
                step={1}
                min={0}
                max={10}
                value={props.rating}
                onChange={(e) => {
                  props.rating = +e.target.value;
                  onChange();
                }}
                style={{
                  backgroundSize: `${Math.min(props.rating * 10, 100)}%`,
                }}
              ></input>
            </div>
          )}
        </div>
      )}
    </>
  );
}
