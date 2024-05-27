import Language from './Language';
import { Language as LanguageType } from '@/types/Language';

interface LanguagesProps {
  props: LanguageType[];
  onChange: () => void;
  onRemove: () => void;
}

export default function Languages({
  props,
  onChange,
  onRemove,
}: LanguagesProps) {
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
              if (Object.keys(m).filter((f) => f !== 'rating').length == 0) {
                props.splice(i, 1);
              }
              onRemove();
            }}
          ></Language>
        );
      })}
    </div>
  );
}
