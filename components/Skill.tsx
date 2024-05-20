import { ChangeEvent } from 'react';
import Input from './Input';
import styles from './Skill.module.scss';

interface SkillProps {
  props: [string, string];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Skill({ props, onChange }: SkillProps) {
  const [key, skill] = props;

  return (
    <Input
      props={[key, skill]}
      className={`max-w-xs md:max-w-lg font-bold outline-none highlight ${styles.skill}`}
      onChange={(e) => onChange(e)}
      disableMinSize
      disableResize
    ></Input>
  );
}
