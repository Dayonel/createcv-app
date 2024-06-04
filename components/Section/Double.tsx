import styles from './Double.module.scss';
import Divider from '../Divider';
import Skills from '../Skills';
import Languages from '../Languages';
import { Double as DoubleType } from '@/types/Double';

interface DoubleProps {
  props: DoubleType;
  onChange: () => void;
  onRemove: () => void;
  edit: boolean;
}

export default function Double({
  props,
  onChange,
  onRemove,
  edit,
}: DoubleProps) {
  const { content } = props;

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
                      <Divider
                        className="max-w-xs md:max-w-56"
                        props={m.name}
                        onChange={(e) => {
                          m.name = e;
                          onChange();
                        }}
                        onRemove={() => {
                          delete m.name;
                          onRemove();
                        }}
                      ></Divider>
                    )}
                    {m.skills && (
                      <Skills
                        skills={m.skills}
                        onChange={onChange}
                        onRemove={() => {
                          if (m.skills?.length == 0) {
                            delete m.skills;
                          }
                          onRemove();
                        }}
                        edit={edit}
                      ></Skills>
                    )}
                  </div>
                ) : (
                  m.type === 'Languages' && (
                    <div className="flex flex-col w-full">
                      {m.name !== undefined && (
                        <Divider
                          className="max-w-xs md:max-w-56"
                          props={m.name}
                          onChange={(e) => {
                            m.name = e;
                            onChange();
                          }}
                          onRemove={() => {
                            delete m.name;
                            onRemove();
                          }}
                        ></Divider>
                      )}
                      <div className="flex flex-col gap-3">
                        {m.languages && (
                          <Languages
                            languages={m.languages}
                            onChange={onChange}
                            onRemove={() => {
                              if (m.languages?.length == 0) {
                                delete m.languages;
                              }
                              onRemove();
                            }}
                            edit={edit}
                          ></Languages>
                        )}
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
