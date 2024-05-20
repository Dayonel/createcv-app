import styles from './Skill.module.scss';

interface SkillProps {
  props: [string, string];
  onChange: () => void;
}

export default function Skill({ props }: SkillProps) {
  const [key, skill] = props;

  return <span className={`${styles.skill}`}>{skill}</span>;
}
