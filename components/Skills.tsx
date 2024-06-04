import { Skill as SkillType } from '@/types/Skill';
import Skill, { InputProps } from './Skill';
import styles from './Skills.module.scss';
import Sortable from './DndKit/Sortable';
import { Placeholder } from './Placeholder';

interface SkillsProps {
  skills: SkillType[];
  onChange: () => void;
  onRemove: () => void;
  edit: boolean;
}

export default function Skills({
  skills,
  onChange,
  onRemove,
  edit,
}: SkillsProps) {
  return (
    <div className={styles.skills}>
      <Sortable
        initialItems={skills}
        renderItem={({ props, onControlsVisible }: InputProps) => (
          <Skill
            props={props}
            onChange={onChange}
            onControlsVisible={onControlsVisible}
          ></Skill>
        )}
        onSort={(items) => {
          skills.sort((a, b) => items.indexOf(a.key) - items.indexOf(b.key));
          onChange();
        }}
        onRemove={(e) => {
          const i = skills.findIndex((f) => f.key === e);
          skills.splice(i, 1);
          onRemove();
        }}
        handle
        remove
      ></Sortable>
      <Placeholder edit={edit}></Placeholder>
    </div>
  );
}
