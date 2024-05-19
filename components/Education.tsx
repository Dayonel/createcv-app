import { Education as EducationType } from '@/types/Education';
import Input from './Input';
import { Calendar } from '@carbon/icons-react';
import styles from './Education.module.scss';
import RichText from './RichText';

interface EducationProps {
  props: [string, EducationType];
  onChange: () => void;
}

export default function Education({ props, onChange }: EducationProps) {
  const [key, education] = props;

  return (
    <div className={`${styles.education} flex flex-col`}>
      <div className="flex flex-wrap-reverse justify-between">
        <Input
          props={[key + '_title', education.title]}
          className="max-w-xs md:max-w-lg w-[383px] font-bold outline-none highlight"
          onChange={(e) => {
            education.title = e.target.value;
            onChange();
          }}
        ></Input>
        <div className="flex items-center justify-end">
          <Calendar></Calendar>
          <Input
            props={[key + '_date', education.date]}
            className="max-w-xs md:max-w-lg w-[40px] font-bold text-xs outline-none highlight"
            onChange={(e) => {
              education.date = e.target.value;
              onChange();
            }}
          ></Input>
        </div>
      </div>
      <div className="pt-2">
        <RichText
          props={education.description}
          onChange={(e) => {
            education.description = e;
            onChange();
          }}
        ></RichText>
      </div>
    </div>
  );
}
