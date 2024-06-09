import styles from './Double.module.scss';
import Divider from '../Divider';
import Skills from '../Skills';
import Languages from '../Language/Languages';
import { Double as DoubleType } from '@/types/Double';
import RichText from '../RichText/RichText';
import { Placeholder } from '../Placeholder';
import { getEmptyText } from '@/utils/richTextUtils';

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

  return (
    <div>
      <div className={styles.double}>
        <>
          {content?.map((m) => {
            return (
              <div key={m.key}>
                {m.type === 'Skills' ? (
                  <div className="flex flex-col w-full gap-1">
                    {m.name !== undefined && (
                      <Divider>
                        <RichText
                          props={m.name}
                          className={`max-w-xs md:max-w-96 text-sm uppercase font-bold inline-block`}
                          input
                          remove
                          empty={m.empty}
                          onChange={(e) => {
                            m.name = e;
                            onChange();
                          }}
                          onRemove={() => {
                            delete m.name;
                            onRemove(false);
                          }}
                        ></RichText>
                      </Divider>
                    )}
                    {!m.name && (
                      <Placeholder
                        edit={edit}
                        className={`text-sm font-bold inline-block`}
                        childrenClassName="flex-row-reverse"
                        placeholder="DIVIDER"
                        onClick={() => {
                          m.name = getEmptyText('DIVIDER');
                          m.empty = true;
                          onChange();
                        }}
                        add
                      >
                        <Divider dashed></Divider>
                      </Placeholder>
                    )}

                    <Skills
                      skills={m.skills || []}
                      onChange={onChange}
                      onRemove={() => onRemove(false)}
                      edit={edit}
                    ></Skills>
                  </div>
                ) : (
                  m.type === 'Languages' && (
                    <div className="flex flex-col w-full">
                      {m.name !== undefined && (
                        <Divider>
                          <RichText
                            props={m.name}
                            className={`max-w-xs md:max-w-96 text-sm uppercase font-bold inline-block`}
                            input
                            remove
                            empty={m.empty}
                            onChange={(e) => {
                              m.name = e;
                              onChange();
                            }}
                            onRemove={() => {
                              delete m.name;
                              onRemove(false);
                            }}
                          ></RichText>
                        </Divider>
                      )}
                      {!m.name && (
                        <Placeholder
                          edit={edit}
                          className={`text-sm font-bold inline-block`}
                          childrenClassName="flex-row-reverse"
                          placeholder="DIVIDER"
                          onClick={() => {
                            m.name = getEmptyText('DIVIDER');
                            m.empty = true;
                            onChange();
                          }}
                          add
                        >
                          <Divider dashed></Divider>
                        </Placeholder>
                      )}
                      <div className="flex flex-col gap-3">
                        <Languages
                          languages={m.languages || []}
                          onChange={onChange}
                          onRemove={() => onRemove(false)}
                          edit={edit}
                        ></Languages>
                      </div>
                    </div>
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
