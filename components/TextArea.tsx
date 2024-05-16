import styles from './TextArea.module.css';
import { ChangeEvent, useEffect, useRef } from 'react';

interface TextAreaProps {
  props: string[];
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ props, onChange }: TextAreaProps) {
  const [key, value] = props;

  const textArea = useRef<HTMLTextAreaElement>(null!);
  const height = useRef<number>(0);

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
      placeholder="Write something..."
      value={value}
      rows={5}
    />
  );
}
