import { Skill as SkillType } from '@/types/Skill';
import Skill, { InputProps } from './Skill';
import styles from './Skills.module.scss';
import Sortable from './DndKit/Sortable';
import Placeholder from './Placeholder';
import { v4 } from 'uuid';

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
            empty={props?.empty}
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
        handle={skills.length > 1}
        remove
      ></Sortable>
      <Placeholder
        edit={edit}
        className={`${styles.skill} !font-normal !border-none !p-[0.85rem] !h-full w-full`}
        placeholder="+ Skill"
        onClick={() => {
          skills.push({ value: 'Skill', key: v4(), empty: true });
          onChange();
        }}
      ></Placeholder>
    </div>
  );
}
