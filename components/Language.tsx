import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from './RichText/RichText';

interface LanguageProps {
  props: LanguageType;
  onChange: () => void;
  id?: string;
}

export default function Language({ props, onChange, id }: LanguageProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-between">
        <RichText
          id={id}
          className="max-w-xs md:max-w-52 text-xs font-bold"
          props={props.name}
          onChange={(e) => {
            props.name = e;
            onChange();
          }}
          input
        ></RichText>
        <RichText
          className="max-w-xs md:max-w-52 text-xs"
          props={props.level}
          onChange={(e) => {
            props.level = e;
            onChange();
          }}
          input
        ></RichText>
      </div>
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
          style={{ backgroundSize: `${Math.min(props.rating * 10, 100)}%` }}
        ></input>
      </div>
    </div>
  );
}
