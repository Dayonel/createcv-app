import { Skill as SkillType } from '@/types/Skill';
import { useEffect, useRef, useState } from 'react';
import styles from './Skill.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export interface InputProps {
  props?: SkillType;
  onChange: () => void;
  onControlsVisible: (e: boolean) => void;
}

export default function Skill({
  props,
  onChange,
  onControlsVisible,
}: InputProps) {
  const placeholder = useRef(props?.value);
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));
  useEffect(() => {
    if (onControlsVisible) {
      onControlsVisible(controlsVisible);
    }
  }, [controlsVisible]);

  return (
    <>
      {props !== undefined && (
        <input
          ref={controlsRef}
          type="text"
          name={props.key}
          className={`${styles.skill} max-w-xs print:max-w-lg md:max-w-lg font-bold outline-none highlight min-w-[2.5ch]`}
          onChange={(e) => {
            props.value = e.target.value;
            onChange();
          }}
          onFocus={() => setControlsVisible(true)}
          placeholder={placeholder.current}
          value={props.value}
        />
      )}
    </>
  );
}
