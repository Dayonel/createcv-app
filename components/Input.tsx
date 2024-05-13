import { ChangeEvent, useEffect, useRef } from 'react';

export default function Input({ props, onChange, className }: any) {
  const input = useRef<HTMLInputElement>(null!);
  const width = useRef<number>();
  const placeholder = useRef(props.value);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    measureWidth(e.target);
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
    width.current = measureWidth(input.current);
  }, []);

  return (
    <input
      ref={input}
      type="text"
      className={className}
      name={props.name}
      onChange={onChangeHandler}
      placeholder={placeholder.current}
      value={props.value}
    />
  );
}
