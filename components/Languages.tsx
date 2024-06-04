import Sortable from './DndKit/Sortable';
import Language, { LanguageProps } from './Language';
import { Language as LanguageType } from '@/types/Language';
import { Add } from './Add';

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
        renderItem={({ props, onControlsVisible }: LanguageProps) => {
          const i = languages.findIndex((f) => f.key === props?.key);
          return (
            props && (
              <Language
                id={`language_${i + 1}`}
                props={props}
                onChange={onChange}
                onControlsVisible={onControlsVisible}
                onRemove={() => {
                  if (
                    Object.keys(languages[i]).filter((f) => f !== 'rating')
                      .length == 0
                  ) {
                    languages.splice(i, 1);
                  }
                  onRemove();
                }}
              ></Language>
            )
          );
        }}
        onSort={(items) => {
          languages.sort((a, b) => items.indexOf(a.key) - items.indexOf(b.key));
          onChange();
        }}
        containerStyle="w-full"
        handle
      ></Sortable>
      <Add edit={edit}></Add>
    </div>
  );
}
