import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import Remove from './Remove';

interface InputProps {
  props: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
  fixedSize?: boolean;
  onRemove: () => void;
  name?: string;
}

export default function Input({
  props,
  onChange,
  className,
  fixedSize,
  onRemove,
  name,
}: InputProps) {
  const input = useRef<HTMLInputElement>(null!);
  const width = useRef<number>();
  const placeholder = useRef(props);
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!fixedSize) {
      measureWidth(e.target);
    }
    onChange(e);
  };

  const measureWidth = (el: HTMLInputElement) => {
    if (!el) return;

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
    <>
      {props !== undefined && (
        <div
          ref={controlsRef}
          className="flex relative"
          onFocus={() => setControlsVisible(true)}
        >
          <input
            ref={input}
            type="text"
            name={name}
            className={`${className} min-w-[2.5ch]`}
            onInput={onChangeHandler}
            placeholder={placeholder.current}
            value={props}
          />
          {controlsVisible && (
            <Remove
              onClick={onRemove}
              onBlur={() => setControlsVisible(false)}
            ></Remove>
          )}
        </div>
      )}
    </>
  );
}
