import Language from './Language';
import { Language as LanguageType } from '@/types/Language';

interface LanguagesProps {
  props: [string, LanguageType[]];
  onChange: () => void;
}

export default function Languages({ props, onChange }: LanguagesProps) {
  const [key, languages] = props;

  return (
    <div className="flex flex-col gap-3">
      {languages.map((m, i) => {
        return (
          <Language
            key={i}
            props={['language', m]}
            onChange={onChange}
          ></Language>
        );
      })}
    </div>
  );
}
