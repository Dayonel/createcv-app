import { useRef } from 'react';
import styles from './Link.module.scss';

export default function Link({ props, onChange, children }: any) {
  const placeholder = useRef(props.value);

  return (
    <span className={`flex items-center ${styles.link}`}>
      {children}
      <input
        type="text"
        className={
          'max-w-xs md:max-w-lg text-xs outline-none text-center md:text-start highlight'
        }
        name={props.name}
        onChange={onChange}
        placeholder={placeholder.current}
        value={props.value}
      />
    </span>
  );
}
