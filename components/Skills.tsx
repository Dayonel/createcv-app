import Input from './Input';
import styles from './Skills.module.scss';

interface SkillsProps {
  props: string[];
  onChange: () => void;
  onRemove: () => void;
}

export default function Skills({ props, onChange, onRemove }: SkillsProps) {
  return (
    <div className={styles.skills}>
      {props.map((m, i) => {
        return (
          <Input
            key={i}
            props={m}
            className={`max-w-xs md:max-w-lg font-bold outline-none highlight ${styles.skill}`}
            onChange={(e) => {
              props[i] = e.target.value;
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
