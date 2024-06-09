import { forwardRef } from 'react';
import styles from './LanguagePlaceholder.module.scss';

interface LanguagePlaceholderProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const LanguagePlaceholder = forwardRef<
  HTMLButtonElement,
  LanguagePlaceholderProps
>(({ ...props }, ref) => {
  return (
    <>
      <button
        {...props}
        ref={ref}
        type="button"
        className={`${styles.wrapper} block w-full px-[6px]`}
      >
        <div className="w-full relative grid">
          <div className="flex flex-wrap justify-between w-full">
            <div
              className={`${styles.placeholder} font-bold`}
              id="language_placeholder"
            >
              Language
            </div>
            <div className={styles.placeholder}>Level</div>
          </div>
          <input
            aria-labelledby="language_placeholder"
            type="range"
            className={styles.input}
          ></input>
        </div>
      </button>
    </>
  );
});
