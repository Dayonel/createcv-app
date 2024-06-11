import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from '../RichText/RichText';
import useColorStore from '@/store/useStore';
import Placeholder from '../Placeholder';
import { getEmptyText } from '@/utils/richTextUtils';
import DeletePlaceholder from '../DeletePlaceholder';

export interface LanguageProps {
  props: LanguageType;
  onChange: () => void;
  onRemove: () => void;
  onDelete: () => void;
  id: string;
  onControlsVisible: (e: boolean) => void;
  edit: boolean;
}

export default function Language({
  props,
  onChange,
  onRemove,
  onDelete,
  id,
  onControlsVisible,
  edit,
}: LanguageProps) {
  const { color } = useColorStore();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-between">
          <div>
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
                empty={props.empty}
              ></RichText>
            )}
            {!props.value && (
              <Placeholder
                edit={edit}
                className="text-xs font-bold"
                placeholder="+ Language"
                onClick={() => {
                  props.value = getEmptyText('Language');
                  props.empty = true;
                  onChange();
                }}
              ></Placeholder>
            )}
          </div>
          <div>
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
                empty={props.empty}
                reverseRemove
              ></RichText>
            )}
            {!props.level && (
              <Placeholder
                edit={edit}
                className="text-xs font-bold"
                placeholder="+ Level"
                onClick={() => {
                  props.level = getEmptyText('Level');
                  props.empty = true;
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
        <DeletePlaceholder
          edit={edit}
          onClick={() => onDelete()}
        ></DeletePlaceholder>
      </div>
    </>
  );
}
