import { Skill as SkillType } from '../types/skill';
import Skill, { InputProps } from './skill';
import styles from './skills.module.scss';
import Sortable from '../../../dndkit/sortable';
import { sortByKeys } from '@/utils/sort';

interface SkillsProps {
  skills: SkillType[];
  onChange: () => void;
  onUpdate: (skills: SkillType[]) => void;
}

export default function Skills({ skills, onChange, onUpdate }: SkillsProps) {
  const remove = (key: string) => onUpdate(skills.filter((f) => f.key !== key));

  return (
    <div className={styles.skills}>
      <Sortable
        initialItems={skills}
        renderItem={({ props }: InputProps) => (
          <Skill props={props} onChange={onChange} onRemove={remove}></Skill>
        )}
        onSort={(keys) => onUpdate(sortByKeys(skills, keys))}
        onRemove={remove}
        handle={skills.length > 1}
        remove
      ></Sortable>
    </div>
  );
}
