import { sortByKeys } from '@/utils/sort';
import Sortable from '../../../dndkit/sortable';
import Language, { LanguageProps } from './language';
import { Language as LanguageType } from '../types/language';

interface LanguagesProps {
  languages: LanguageType[];
  onChange: () => void;
  onUpdate: (languages: LanguageType[]) => void;
  placeholder: LanguageType;
}

const isEmpty = (language: LanguageType) =>
  Object.keys(language).every((f) => f === 'rating' || f === 'key');

export default function Languages({
  languages,
  onChange,
  onUpdate,
  placeholder,
}: LanguagesProps) {
  const remove = (key: string) =>
    onUpdate(languages.filter((f) => f.key !== key));

  return (
    <div className="relative flex flex-col gap-3">
      <Sortable
        initialItems={languages}
        renderItem={({ props }: LanguageProps) =>
          props && (
            <Language
              id={`language_${languages.indexOf(props) + 1}`}
              props={props}
              onChange={onChange}
              onRemove={() =>
                isEmpty(props) ? remove(props.key) : onChange()
              }
              onDelete={() => remove(props.key)}
              placeholder={placeholder}
            ></Language>
          )
        }
        onSort={(keys) => onUpdate(sortByKeys(languages, keys))}
        containerStyle="w-full"
        handle={languages.length > 1}
      ></Sortable>
    </div>
  );
}
