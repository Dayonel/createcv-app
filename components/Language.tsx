import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from './RichText/RichText';
import useColorStore from '@/store/useStore';
import { Placeholder } from './Placeholder';
import placeholder from '../data/placeholder.json';
import { DoubleContent } from '@/types/Double';
import { getText } from '@/utils/richTextUtils';

export interface LanguageProps {
  props: LanguageType;
  onChange: () => void;
  onRemove: () => void;
  id: string;
  onControlsVisible: (e: boolean) => void;
  edit: boolean;
}

export default function Language({
  props,
  onChange,
  onRemove,
  id,
  onControlsVisible,
  edit,
}: LanguageProps) {
  const { color } = useColorStore();

  const placeholderLanguage = (
    placeholder.sections
      .find((f) => f.type === 'Double')!
      .content.find(
        (c) => 'type' in c && c.type === 'Languages'
      )! as DoubleContent
  ).languages![0];

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
            {!props.value && (
              <Placeholder
                noButton
                edit={edit}
                className="text-xs font-bold"
                placeholder={getText(placeholderLanguage.value!)}
                onClick={() => {
                  props.value = placeholderLanguage.value;
                  onChange();
                }}
              ></Placeholder>
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
            {!props.level && (
              <Placeholder
                noButton
                edit={edit}
                className="text-xs font-bold"
                placeholder={getText(placeholderLanguage.level!)}
                onClick={() => {
                  props.level = placeholderLanguage.level;
                  onChange();
                }}
              ></Placeholder>
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
                  backgroundImage: `linear-gradient(${color}, ${color})`,
                }}
              ></input>
            </div>
          )}
        </div>
      )}
    </>
  );
}
