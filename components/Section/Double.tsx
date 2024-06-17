import styles from './Double.module.scss';
import Divider from '../Divider';
import Skills from '../Skills';
import Languages from '../Language/Languages';
import { DoubleContent, Double as DoubleType } from '@/types/Double';
import RichText from '../RichText/RichText';
import Placeholder from '../Placeholder/Placeholder';
import { v4 } from 'uuid';
import placeholder from '../../data/placeholder.json';
import ActionButtons from '../Placeholder/ActionButtons';

interface DoubleProps {
  props: DoubleType;
  onChange: () => void;
  onRemove: (full: boolean) => void;
  edit: boolean;
  last: boolean;
}

export default function Double({
  props,
  onChange,
  onRemove,
  edit,
}: DoubleProps) {
  const content = props.content || [];

  const placeholderDouble = placeholder.sections.find(
    (f) => f.type === 'Double'
  )!;

  const placeholderLanguage = (placeholderDouble.content![1] as DoubleContent)
    .languages![0];

  const addSkill = () => {
    content[0].skills!.push({
      value: 'Skill',
      key: v4(),
    });
    onChange();
  };

  const addLanguage = () => {
    content[1].languages!.push({
      value: placeholderLanguage.value,
      level: placeholderLanguage.level,
      rating: 10,
      key: v4(),
    });
    onChange();
  };

  return (
    <div>
      <div className={styles.double}>
        <>
          {content?.map((m) => {
            return (
              <div key={m.key}>
                {m.type === 'Skills' ? (
                  <ActionButtons add onAdd={() => addSkill()}>
                    <div className="flex flex-col w-full gap-1 group-item">
                      {m.name !== undefined && (
                        <>
                          <Divider>
                            <div className="inline-block">
                              <div className="flex items-center">
                                <RichText
                                  props={m.name}
                                  className={`max-w-xs print:max-w-96 md:max-w-96 text-sm uppercase font-bold inline-block`}
                                  input
                                  remove
                                  onChange={(e) => {
                                    m.name = e;
                                    onChange();
                                  }}
                                  onRemove={() => {
                                    delete m.name;
                                    onRemove(false);
                                  }}
                                ></RichText>
                              </div>
                            </div>
                          </Divider>
                        </>
                      )}
                      {!m.name && (
                        <Placeholder
                          edit={edit}
                          className={`text-sm font-bold inline-block`}
                          childrenClassName="flex-row-reverse"
                          placeholder="SECTION"
                          onClick={() => {
                            m.name = placeholderDouble.name;
                            onChange();
                          }}
                        >
                          <Divider dashed></Divider>
                        </Placeholder>
                      )}

                      <Skills
                        skills={m.skills || []}
                        onChange={onChange}
                        onRemove={() => onRemove(false)}
                      ></Skills>
                    </div>
                  </ActionButtons>
                ) : (
                  m.type === 'Languages' && (
                    <ActionButtons add onAdd={() => addLanguage()}>
                      <div className="flex flex-col w-full">
                        {m.name !== undefined && (
                          <>
                            <Divider>
                              <div className="inline-block">
                                <div className="flex items-center">
                                  <RichText
                                    props={m.name}
                                    className={`max-w-xs print:max-w-96 md:max-w-96 text-sm uppercase font-bold inline-block`}
                                    input
                                    remove
                                    onChange={(e) => {
                                      m.name = e;
                                      onChange();
                                    }}
                                    onRemove={() => {
                                      delete m.name;
                                      onRemove(false);
                                    }}
                                  ></RichText>
                                </div>
                              </div>
                            </Divider>
                          </>
                        )}
                        {!m.name && (
                          <Placeholder
                            edit={edit}
                            className={`text-sm font-bold inline-block`}
                            childrenClassName="flex-row-reverse"
                            placeholder="SECTION"
                            onClick={() => {
                              m.name = placeholderDouble.name;
                              onChange();
                            }}
                          >
                            <Divider dashed></Divider>
                          </Placeholder>
                        )}
                        <div className="flex flex-col gap-3 pt-[1px]">
                          <Languages
                            languages={m.languages || []}
                            onChange={onChange}
                            onRemove={() => onRemove(false)}
                            edit={edit}
                          ></Languages>
                        </div>
                      </div>
                    </ActionButtons>
                  )
                )}
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
}
