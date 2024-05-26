import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import RichText from './RichText/RichText';

interface LanguageProps {
  props: [string, LanguageType];
  onChange: () => void;
}

export default function Language({ props, onChange }: LanguageProps) {
  const [key, language] = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-between">
        <RichText
          className="max-w-xs md:max-w-52 text-xs font-bold"
          props={language.name}
          onChange={(e) => {
            language.name = e;
            onChange();
          }}
          input
        ></RichText>
        <RichText
          className="max-w-xs md:max-w-52 text-xs"
          props={language.level}
          onChange={(e) => {
            language.level = e;
            onChange();
          }}
          input
        ></RichText>
      </div>
      <div className="px-[6px]">
        <input
          type="range"
          step={1}
          min={0}
          max={10}
          value={language.rating}
          onChange={(e) => {
            language.rating = +e.target.value;
            onChange();
          }}
          style={{ backgroundSize: `${Math.min(language.rating * 10, 100)}%` }}
        ></input>
      </div>
    </div>
  );
}
