import './language.scss';
import { Language as LanguageType } from '../types/language';
import RichText from '../../../rich-text/rich-text';
import useColorStore from '@/store/color-store';
import Placeholder from '../../../placeholder/placeholder';
import ActionButtons from '../../../placeholder/action-buttons';

export interface LanguageProps {
  props: LanguageType;
  onChange: () => void;
  onRemove: () => void;
  onDelete: () => void;
  id: string;
  placeholder: LanguageType;
}

export default function Language({
  props,
  onChange,
  onRemove,
  onDelete,
  id,
  placeholder,
}: LanguageProps) {
  const { color } = useColorStore();

  return (
    <>
      <ActionButtons onRemove={() => onDelete()} remove>
        <div className="flex flex-col w-full">
          <div className="flex flex-wrap justify-between">
            <div>
              {props.value && (
                <RichText
                  id={id}
                  className="max-w-xs print:max-w-52 md:max-w-52 text-xs font-bold"
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
                ></RichText>
              )}
              {!props.value && (
                <Placeholder
                  className="text-xs font-bold"
                  placeholder="Language"
                  onClick={() => {
                    props.value = placeholder.value;
                    onChange();
                  }}
                ></Placeholder>
              )}
            </div>
            <div>
              {props.level && (
                <RichText
                  className="max-w-xs print:max-w-52 md:max-w-52 text-xs"
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
                  reverseRemove
                ></RichText>
              )}
              {!props.level && (
                <Placeholder
                  className="text-xs font-bold"
                  placeholder="Level"
                  onClick={() => {
                    props.level = placeholder.level;
                    onChange();
                  }}
                ></Placeholder>
              )}
            </div>
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
                  backgroundImage: `linear-gradient(${color}, ${color})`,
                }}
              ></input>
            </div>
          )}
        </div>
      </ActionButtons>
    </>
  );
}
