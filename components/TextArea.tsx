import styles from './TextArea.module.css';
import { ChangeEvent, useEffect, useRef } from 'react';

export default function TextArea({ props, onChange }: any) {
  const [key, value] = props;

  const textArea = useRef<HTMLTextAreaElement>(null!);
  const height = useRef<number>();
  const placeholder = useRef<string>(value);

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    measureHeight(e.target);
    onChange(e);
  };

  const measureHeight = (el: HTMLTextAreaElement) => {
    el.style.height = '0px';
    el.style.height = `${Math.max(
      el.scrollHeight,
      height.current ? height.current : 0
    )}px`;

    return el.scrollHeight;
  };

  useEffect(() => {
    height.current = measureHeight(textArea.current);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => measureHeight(textArea.current));

    return () =>
      window.removeEventListener('resize', () =>
        measureHeight(textArea.current)
      );
  }, []);

  return (
    <textarea
      ref={textArea}
      className={`${styles.textarea} max-w-xs md:max-w-lg text-xs outline-none highlight italic text-justify overflow-hidden min-w-full resize-none max-h-[92px] md:max-h-[72px]`}
      name={key}
      onChange={onChangeHandler}
      placeholder={placeholder.current}
      value={value}
      rows={5}
    />
  );
}
