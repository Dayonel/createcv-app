import Input from './Input';
import styles from './Skills.module.scss';

interface SkillsProps {
  props: string[];
  onChange: () => void;
}

export default function Skills({ props, onChange }: SkillsProps) {
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
            fixedSize
          ></Input>
        );
      })}
    </div>
  );
}
