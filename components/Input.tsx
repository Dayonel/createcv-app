import { ChangeEvent, useEffect, useRef } from 'react';

interface InputProps {
  props: [string, string];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
  disableMinSize?: boolean;
  disableResize?: boolean;
}

export default function Input({
  props,
  onChange,
  className,
  disableMinSize,
  disableResize,
}: InputProps) {
  const [key, value] = props;

  const input = useRef<HTMLInputElement>(null!);
  const width = useRef<number>(22);
  const placeholder = useRef(value);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disableResize) {
      measureWidth(e.target);
    }
    onChange(e);
  };

  const measureWidth = (el: HTMLInputElement) => {
    el.style.width = '0px';
    el.style.width = `${Math.max(
      el.scrollWidth,
      width.current ? width.current : 0
    )}px`;

    return el.scrollWidth;
  };

  useEffect(() => {
    if (!disableMinSize) {
      width.current = measureWidth(input.current);
    }
  }, [disableMinSize]);

  return (
    <input
      ref={input}
      type="text"
      className={className}
      name={key}
      onInput={onChangeHandler}
      placeholder={placeholder.current}
      value={value}
    />
  );
}
