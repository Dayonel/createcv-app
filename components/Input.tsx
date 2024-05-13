import { useEffect, useRef } from 'react';

export default function Input({ props, onChange, className }: any) {
  const input = useRef<HTMLInputElement>(null!);
  const width = useRef<number>();
  const placeholder = useRef(props.value);

  const measureWidth = (el: HTMLInputElement | HTMLTextAreaElement) => {
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
      className={
        className ||
        'max-w-xs md:max-w-lg font-bold text-3xl outline-none text-center md:text-start highlight'
      }
      name={props.name}
      onChange={onChange}
      placeholder={placeholder.current}
      value={props.value}
    />
  );
}
