import { Calendar } from '@carbon/icons-react';
import RichText from '../RichText/RichText';
import styles from './Single.module.scss';
import Divider from '../Divider';
import { Single as SingleType } from '@/types/Single';

interface SingleProps {
  props: SingleType;
  onChange: () => void;
}

export default function Single({ props, onChange }: SingleProps) {
  const { name } = props;
  const content = props.content || [];

  return (
    <div>
      {name !== undefined && (
        <Divider
          props={name}
          onChange={(e) => {
            props.name = e;
            onChange();
          }}
          onRemove={() => {
            delete props.name;
            onChange();
          }}
        ></Divider>
      )}

      {content.map((m, i) => {
        return (
          <div key={i} className={`${styles.single} flex flex-col gap-1`}>
            <div className="flex flex-wrap justify-between items-center gap-2">
              {m.title !== undefined && (
                <RichText
                  className="max-w-xs md:max-w-lg font-bold text-base"
                  props={m.title}
                  onChange={(e) => {
                    m.title = e;
                    onChange();
                  }}
                  input
                  onRemove={() => {
                    delete m.title;
                    onChange();
                  }}
                ></RichText>
              )}

              <div className="flex flex-wrap items-center">
                {m.date !== undefined && (
                  <>
                    <Calendar></Calendar>
                    <RichText
                      className="font-bold text-xs max-w-xs"
                      props={m.date}
                      onChange={(e) => {
                        m.date = e;
                        onChange();
                      }}
                      onRemove={() => {
                        delete m.date;
                        onChange();
                      }}
                      input
                    ></RichText>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              {m.subtitle !== undefined && (
                <RichText
                  className="max-w-xs md:max-w-lg font-bold text-sm"
                  props={m.subtitle}
                  onChange={(e) => {
                    m.subtitle = e;
                    onChange();
                  }}
                  onRemove={() => {
                    delete m.subtitle;
                    onChange();
                  }}
                  input
                ></RichText>
              )}

              {m.topic !== undefined && (
                <RichText
                  className="text-xs max-w-xs"
                  props={m.topic}
                  onChange={(e) => {
                    m.topic = e;
                    onChange();
                  }}
                  onRemove={() => {
                    delete m.topic;
                    onChange();
                  }}
                  input
                ></RichText>
              )}
            </div>
            {m.description !== undefined && (
              <div className="pt-1">
                <RichText
                  props={m.description}
                  onChange={(e) => {
                    m.description = e;
                    onChange();
                  }}
                  onRemove={() => {
                    delete m.description;
                    onChange();
                  }}
                ></RichText>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
