import { Skill } from '@/types/Skill';
import Input from './Input';
import styles from './Skills.module.scss';

interface SkillsProps {
  props: Skill[];
  onChange: () => void;
  onRemove: () => void;
}

export default function Skills({ props, onChange, onRemove }: SkillsProps) {
  return (
    <div className={styles.skills}>
      {props.map((m, i) => {
        return (
          <Input
            key={m.key}
            props={m.name}
            className={`max-w-xs md:max-w-lg font-bold outline-none highlight ${styles.skill}`}
            onChange={(e) => {
              props[i].name = e.target.value;
              onChange();
            }}
            onRemove={() => {
              props.splice(i, 1);
              onRemove();
            }}
            fixedSize
          ></Input>
        );
      })}
    </div>
  );
}
