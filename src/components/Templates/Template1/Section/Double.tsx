import styles from './Double.module.scss';
import Divider from '../Divider/Divider';
import Skills from '../Skill/Skills';
import Languages from '../Language/Languages';
import { DoubleContent, Double as DoubleType } from '../types/Double';
import RichText from '../../../rich-text/rich-text';
import Placeholder from '../../../placeholder/placeholder';
import { v4 } from 'uuid';
import placeholder from '../../../../data/template1.json';
import ActionButtons from '../../../placeholder/action-buttons';
import { getTextContent } from '@/utils/richTextUtils';

interface DoubleProps {
  props: DoubleType;
  onChange: () => void;
  onRemove: (full: boolean) => void;
  last: boolean;
}

export default function Double({ props, onChange, onRemove }: DoubleProps) {
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
                          className={`text-sm font-bold inline-block`}
                          childrenClassName="flex-row-reverse"
                          placeholder="SECTION"
                          onClick={() => {
                            m.name = getTextContent('Skills');
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
                            className={`text-sm font-bold inline-block`}
                            childrenClassName="flex-row-reverse"
                            placeholder="SECTION"
                            onClick={() => {
                              m.name = getTextContent('Languages');
                              onChange();
                            }}
                          >
                            <Divider dashed></Divider>
                          </Placeholder>
                        )}
                        <div className="flex flex-col gap-3">
                          <Languages
                            languages={m.languages || []}
                            onChange={onChange}
                            onRemove={() => onRemove(false)}
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
