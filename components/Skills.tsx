import { Skill as SkillType } from '@/types/Skill';
import Skill, { InputProps } from './Skill';
import styles from './Skills.module.scss';
import Sortable from './DndKit/Sortable';
import placeholder from '../data/placeholder.json';
import { Placeholder } from './Placeholder';
import { DoubleContent } from '@/types/Double';
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
  const placeholderSkill = (
    placeholder.sections
      .find((f) => f.type === 'Double')!
      .content.find((c) => 'type' in c && c.type === 'Skills')! as DoubleContent
  ).skills![0];

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
      <Placeholder
        noButton
        edit={edit}
        className={`${styles.skill} !border-none !p-[0.75rem] !h-full`}
        placeholder={placeholderSkill.value}
        onClick={() => {
          skills.push({ ...placeholderSkill, key: v4() });
          onChange();
        }}
      ></Placeholder>
    </div>
  );
}
