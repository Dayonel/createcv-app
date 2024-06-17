import Sortable from '../DndKit/Sortable';
import Language, { LanguageProps } from './Language';
import { Language as LanguageType } from '@/types/Language';

interface LanguagesProps {
  languages: LanguageType[];
  onChange: () => void;
  onRemove: () => void;
  edit: boolean;
}

export default function Languages({
  languages,
  onChange,
  onRemove,
  edit,
}: LanguagesProps) {
  // TODO: Fix this component
  return (
    <div className="relative flex flex-col gap-3">
      <Sortable
        initialItems={languages}
        renderItem={({ props }: LanguageProps) => {
          const language = languages.find((f) => f.key === props?.key);
          const i = languages.findIndex((f) => f.key === props?.key);
          return (
            props && (
              <Language
                id={`language_${i + 1}`}
                props={props}
                onChange={onChange}
                onRemove={() => {
                  if (
                    language &&
                    Object.keys(language).filter(
                      (f) => f !== 'rating' && f !== 'key'
                    ).length === 0
                  ) {
                    languages.splice(i, 1);
                  }
                  onRemove();
                }}
                onDelete={() => {
                  languages.splice(i, 1);
                  onRemove();
                }}
                edit={edit}
              ></Language>
            )
          );
        }}
        onSort={(items) => {
          languages.sort((a, b) => items.indexOf(a.key) - items.indexOf(b.key));
          onChange();
        }}
        containerStyle="w-full"
        handle={languages.length > 1}
      ></Sortable>
    </div>
  );
}
