import { v4 } from 'uuid';
import styles from './template1.module.scss';
import Single from './section/single';
import Double from './section/double';
import Divider from './divider/divider';
import Placeholder from '../../placeholder/placeholder';
import { Template1 } from './types/template1';
import { Single as SingleType } from './types/single';
import { Double as DoubleType } from './types/double';

const components = { Single, Double };

interface TemplateSectionsProps {
  form: Template1;
  data: Template1;
  setForm: (form: Template1) => void;
}

export default function TemplateSections({
  form,
  data,
  setForm,
}: TemplateSectionsProps) {
  const { sections } = form;
  const update = () => setForm({ ...form });
  const setSections = (next: Template1['sections']) =>
    setForm({ ...form, sections: next });

  const single = data.sections.find((f) => f.type === 'Single') as SingleType;
  const double = data.sections.find((f) => f.type === 'Double') as DoubleType;

  const deleteSection = (key: string) =>
    setSections(sections.filter((f) => f.key !== key));

  const addSection = (key?: string) => {
    const i = sections.findIndex((f) => f.key === key) + 1 || sections.length;
    setSections([
      ...sections.slice(0, i),
      {
        key: v4(),
        name: single.name,
        type: 'Single',
        content: [{ ...single.content![0], key: v4() }],
      },
      ...sections.slice(i),
    ]);
  };

  return (
    <div className={styles.sections}>
      {sections.map((s) => {
        const Component = components[s.type as keyof typeof components];
        return (
          <div className="flex flex-col" key={s.key}>
            <Component
              props={s}
              onChange={update}
              onRemove={(full) => (full ? deleteSection(s.key) : update())}
              onDeleteSection={deleteSection}
              last={sections.filter((z) => z.type === s.type).length === 1}
              onAddSection={addSection}
              placeholder={s.type === 'Single' ? single : double}
            ></Component>
          </div>
        );
      })}

      <Placeholder
        className="text-sm font-bold inline-block"
        childrenClassName="flex-row-reverse"
        placeholder="SECTION"
        onClick={() => addSection()}
      >
        <Divider dashed />
      </Placeholder>
    </div>
  );
}
