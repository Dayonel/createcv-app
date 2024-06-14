import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from '../RichText/RichText';
import useColorStore from '@/store/colorStore';
import Placeholder from '../Placeholder/Placeholder';
import { getEmptyText } from '@/utils/richTextUtils';
import Transition from '../Animations/Transition';
import Action from '../DndKit/components/Action/Action';
import { TrashCan } from '@carbon/icons-react';
import { useContext, useEffect, useState } from 'react';
import { ColorContext } from '../ColorProvider';

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
  const [mounted, setMounted] = useState(false);
  const serverColor = useContext(ColorContext);
  const { color } = useColorStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
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
                onControlsVisible={onControlsVisible}
                empty={props.empty}
              ></RichText>
            )}
            {!props.value && (
              <Placeholder
                edit={edit}
                className="text-xs font-bold"
                placeholder="Language"
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
                onControlsVisible={onControlsVisible}
                empty={props.empty}
                reverseRemove
              ></RichText>
            )}
            {!props.level && (
              <Placeholder
                edit={edit}
                className="text-xs font-bold"
                placeholder="Level"
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
                backgroundImage: `linear-gradient(${
                  mounted ? color : serverColor
                }, ${mounted ? color : serverColor})`,
              }}
            ></input>
          </div>
        )}
      </div>
      <div className="print:hidden">
        <Transition
          className="absolute right-1 translate-x-full -translate-y-full"
          edit={edit}
        >
          <Action
            active={{
              fill: 'rgba(255, 70, 70, 0.95)',
              background: 'rgba(255, 70, 70, 0.1)',
            }}
            onClick={() => onDelete()}
          >
            <TrashCan></TrashCan>
          </Action>
        </Transition>
      </div>
    </>
  );
}
