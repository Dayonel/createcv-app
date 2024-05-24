import { Calendar } from '@carbon/icons-react';
import Input from '../Input';
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
      {name && (
        <Divider
          props={name}
          onChange={(e) => {
            props.name = e.target.value;
            onChange();
          }}
        ></Divider>
      )}

      {content.map((m, i) => {
        return (
          <div key={i} className={`${styles.single} flex flex-col gap-1`}>
            <div className="flex flex-wrap justify-between items-center gap-2">
              {m.title && (
                <Input
                  props={['_title', m.title]}
                  className="max-w-xs md:max-w-lg w-[144px] font-bold outline-none highlight"
                  onChange={(e) => {
                    m.title = e.target.value;
                    onChange();
                  }}
                ></Input>
              )}

              <div className="flex items-center justify-end">
                {m.date && (
                  <>
                    <Calendar></Calendar>
                    <Input
                      props={['_date', m.date]}
                      className="max-w-xs md:max-w-lg w-[115px] font-bold text-xs outline-none highlight"
                      onChange={(e) => {
                        m.date = e.target.value;
                        onChange();
                      }}
                    ></Input>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              {m.subtitle && (
                <Input
                  props={['_subtitle', m.subtitle]}
                  className="text-sm max-w-xs md:max-w-lg w-[56px] outline-none highlight"
                  onChange={(e) => {
                    m.subtitle = e.target.value;
                    onChange();
                  }}
                ></Input>
              )}

              {m.topic && (
                <Input
                  props={['_topic', m.topic]}
                  className="max-w-xs md:max-w-lg w-[73px] text-xs outline-none highlight"
                  onChange={(e) => {
                    m.topic = e.target.value;
                    onChange();
                  }}
                ></Input>
              )}
            </div>
            {m.description && (
              <div className="pt-1">
                <RichText
                  props={m.description}
                  onChange={(e) => {
                    m.description = e;
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
