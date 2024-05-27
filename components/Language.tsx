import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from './RichText/RichText';

interface LanguageProps {
  props: LanguageType;
  onChange: () => void;
  onRemove: () => void;
  id?: string;
}

export default function Language({ props, onChange, onRemove, id }: LanguageProps) {
  return (
    <>
      {(props.name || props.level) && (
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-between">
            {props.name && (
              <RichText
                id={id}
                className="max-w-xs md:max-w-52 text-xs font-bold"
                props={props.name}
                onChange={(e) => {
                  props.name = e;
                  onChange();
                }}
                onRemove={() => {
                  delete props.name;
                  onRemove();
                }}
                input
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
