import styles from './double.module.scss';
import Divider from '../divider/divider';
import Skills from '../skill/skills';
import Languages from '../language/languages';
import { Double as DoubleType } from '../types/double';
import RichText from '../../../rich-text/rich-text';
import Placeholder from '../../../placeholder/placeholder';
import { v4 } from 'uuid';
import ActionButtons from '../../../placeholder/action-buttons';
import { getTextContent } from '@/utils/rich-text-utils';

interface DoubleProps {
  props: DoubleType;
  onChange: () => void;
  onRemove: (full: boolean) => void;
  last: boolean;
  placeholder: DoubleType;
}

export default function Double({
  props,
  onChange,
  onRemove,
  placeholder,
}: DoubleProps) {
  const content = props.content || [];

  const language = placeholder.content![1].languages![0];

  const addSkill = () => {
    content[0].skills = [
      ...(content[0].skills ?? []),
      { value: 'Skill', key: v4() },
    ];
    onChange();
  };

  const addLanguage = () => {
    content[1].languages = [
      ...(content[1].languages ?? []),
      { value: language.value, level: language.level, rating: 10, key: v4() },
    ];
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
                        onUpdate={(skills) => {
                          m.skills = skills;
                          onChange();
                        }}
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
                            onUpdate={(languages) => {
                              m.languages = languages;
                              onChange();
                            }}
                            placeholder={language}
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
