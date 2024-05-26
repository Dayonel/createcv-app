import Language from './Language';
import { Language as LanguageType } from '@/types/Language';

interface LanguagesProps {
  props: LanguageType[];
  onChange: () => void;
}

export default function Languages({ props, onChange }: LanguagesProps) {
  return (
    <div className="flex flex-col gap-3">
      {props.map((m, i) => {
        return (
          <Language
            id={`language_${i + 1}`}
            key={i}
            props={m}
            onChange={onChange}
            onRemove={() => {
              if (!m.name && !m.level) {
                props.splice(i, 1)
              }

              onChange();
            }}
          ></Language>
        );
      })}
    </div>
  );
}
