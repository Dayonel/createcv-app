import { ChangeEvent } from 'react';
import styles from './Divider.module.scss';
import Input from './Input';

interface DividerProps {
  props: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Divider({ props, onChange }: DividerProps) {
  return (
    <div className="pr-[6px]">
      <div className={`relative w-full mb-2 overflow-hidden ${styles.divider}`}>
        <Input
          props={['experience_divider', props]}
          className={`text-sm uppercase font-bold outline-none highlight`}
          onChange={onChange}
        ></Input>
      </div>
    </div>
  );
}
