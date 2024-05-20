import './Language.scss';
import { Language as LanguageType } from '@/types/Language';
import Input from './Input';

interface LanguageProps {
  props: [string, LanguageType];
  onChange: () => void;
}

export default function Language({ props, onChange }: LanguageProps) {
  const [key, language] = props;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Input
          props={[key + '_language', language.name]}
          className={`text-xs max-w-xs md:max-w-lg font-bold outline-none highlight`}
          onChange={(e) => {
            language.name = e.target.value;
            onChange();
          }}
        ></Input>
        <Input
          props={[key + '_level', language.level]}
          className={`text-xs max-w-xs md:max-w-lg outline-none highlight w-[46px]`}
          onChange={(e) => {
            language.level = e.target.value;
            onChange();
          }}
        ></Input>
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
