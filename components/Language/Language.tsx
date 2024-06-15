import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from '../RichText/RichText';
import useColorStore from '@/store/colorStore';
import Placeholder from '../Placeholder/Placeholder';
import Transition from '../Animations/Transition';
import Action from '../DndKit/components/Action/Action';
import { useContext, useEffect, useRef, useState } from 'react';
import { ColorContext } from '../ColorProvider';
import placeholder from '../../data/placeholder.json';
import { DoubleContent } from '@/types/Double';
import ActionButtons from '../Placeholder/ActionButtons';

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const placeholderContent = (
    placeholder.sections.find((f) => f.type === 'Double')!
      .content![1] as DoubleContent
  ).languages![0];

  return (
    <>
      <div ref={ref} className="flex flex-col w-full">
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
              ></RichText>
            )}
            {!props.value && (
              <Placeholder
                edit={edit}
                className="text-xs font-bold"
                placeholder="Language"
                onClick={() => {
                  props.value = placeholderContent.value;
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
                reverseRemove
              ></RichText>
            )}
            {!props.level && (
              <Placeholder
                edit={edit}
                className="text-xs font-bold"
                placeholder="Level"
                onClick={() => {
                  props.level = placeholderContent.level;
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

      <ActionButtons
        element={ref.current}
        onRemove={() => onDelete()}
        remove
      ></ActionButtons>
    </>
  );
}
