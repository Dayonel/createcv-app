import { Language as LanguageType } from '@/types/Language';
import styles from './Language.module.scss';

interface LanguageProps {
  props: [string, LanguageType];
  onChange: () => void;
}

export default function Language({ props }: LanguageProps) {
  const [key, language] = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xs font-bold">{language.name}</span>
        <span className="text-xs">{language.level}</span>
      </div>
      <span className={`${styles.progress_background}`}>
        <span
          className={`${styles.progress}`}
          style={{ width: `${Math.min(language.rating * 10, 100)}%` }}
        ></span>
      </span>
    </div>
  );
}
