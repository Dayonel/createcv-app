import { ChangeEvent, useEffect, useRef } from 'react';

interface InputProps {
  props: [string, string];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
  fixedSize?: boolean;
}

export default function Input({
  props,
  onChange,
  className,
  fixedSize,
}: InputProps) {
  const [key, value] = props;

  const input = useRef<HTMLInputElement>(null!);
  const width = useRef<number>();
  const placeholder = useRef(value);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!fixedSize) {
      measureWidth(e.target);
    }
    onChange(e);
  };

  const measureWidth = (el: HTMLInputElement) => {
    el.style.width = '0px';
    el.style.width = `${Math.max(el.scrollWidth, width.current || 0)}px`;

    return el.scrollWidth;
  };

  useEffect(() => {
    if (!fixedSize) {
      width.current = measureWidth(input.current);
    }
  }, [fixedSize]);

  return (
    <input
      ref={input}
      type="text"
      className={`${className} min-w-[2.5ch]`}
      name={key}
      onInput={onChangeHandler}
      placeholder={placeholder.current}
      value={value}
    />
  );
}
