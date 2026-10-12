'use client';
import { useContext } from 'react';
import Transition from '../transitions/transition';
import styles from './instructions.module.scss';
import { instructions1 } from './icons/instructions-1';
import { instructions2 } from './icons/instructions-2';
import { FormContext } from '../providers/contexts';

export default function Instructions() {
  const { savedForm, printed } = useContext(FormContext);

  return (
    <div className={`${styles.instructions} hidden print:!hidden`}>
      <Transition active={!savedForm}>
        <div className="absolute -left-8 top-4 -translate-x-full">
          {instructions1}
        </div>
      </Transition>
      <Transition active={!printed}>
        <div className="absolute -right-6 -top-2 translate-x-1/2">
          {instructions2}
        </div>
      </Transition>
    </div>
  );
}
