import Input from './Input';
import styles from './Skills.module.scss';

interface SkillsProps {
  props: [string, string[]];
  onChange: () => void;
}

export default function Skills({ props, onChange }: SkillsProps) {
  const [key, skills] = props;

  return (
    <div className={styles.skills}>
      {skills.map((m, i) => {
        return (
          <Input
            key={i}
            props={[key, m]}
            className={`max-w-xs md:max-w-lg font-bold outline-none highlight ${styles.skill}`}
            onChange={onChange}
            fixedSize
          ></Input>
        );
      })}
    </div>
  );
}
