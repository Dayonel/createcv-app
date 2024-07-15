import { Skill as SkillType } from '../types/Skill';
import Skill, { InputProps } from './Skill';
import styles from './Skills.module.scss';
import Sortable from '../../../dndkit/sortable';

interface SkillsProps {
  skills: SkillType[];
  onChange: () => void;
  onRemove: () => void;
}

export default function Skills({ skills, onChange, onRemove }: SkillsProps) {
  const remove = (e: string) => {
    const i = skills.findIndex((f) => f.key === e);
    skills.splice(i, 1);
    onRemove();
  };
  return (
    <div className={styles.skills}>
      <Sortable
        initialItems={skills}
        renderItem={({ props }: InputProps) => (
          <Skill props={props} onChange={onChange} onRemove={remove}></Skill>
        )}
        onSort={(items) => {
          skills.sort((a, b) => items.indexOf(a.key) - items.indexOf(b.key));
          onChange();
        }}
        onRemove={remove}
        handle={skills.length > 1}
        remove
      ></Sortable>
    </div>
  );
}
