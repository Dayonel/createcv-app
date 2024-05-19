import Input from './Input';
import { Experience as ExperienceType } from '../types/Experience';
import { Calendar } from '@carbon/icons-react';
import styles from './Experience.module.scss';
import RichText from './RichText';

interface ExperienceProps {
  props: [string, ExperienceType];
  onChange: () => void;
}

export default function Experience({ props, onChange }: ExperienceProps) {
  const [key, experience] = props;

  return (
    <div className={`${styles.experience} flex flex-col`}>
      <div className="flex flex-wrap-reverse justify-between">
        <Input
          props={[key + '_title', experience.title]}
          className="max-w-xs md:max-w-lg w-[144px] font-bold outline-none highlight"
          onChange={(e) => {
            experience.title = e.target.value;
            onChange();
          }}
        ></Input>
        <div className="flex items-center justify-end">
          <Calendar></Calendar>
          <Input
            props={[key + '_date', experience.date]}
            className="max-w-xs md:max-w-lg w-[115px] font-bold text-xs outline-none highlight"
            onChange={(e) => {
              experience.date = e.target.value;
              onChange();
            }}
            disableMinSize
          ></Input>
        </div>
      </div>
      <div className="flex flex-wrap-reverse justify-between">
        <Input
          props={[key + '_company', experience.company]}
          className="text-sm max-w-xs md:max-w-lg w-[56px] outline-none highlight"
          onChange={(e) => {
            experience.company = e.target.value;
            onChange();
          }}
        ></Input>
        <Input
          props={[key + '_topic', experience.topic]}
          className="max-w-xs md:max-w-lg w-[73px] text-xs outline-none highlight"
          onChange={(e) => {
            experience.topic = e.target.value;
            onChange();
          }}
          disableMinSize
        ></Input>
      </div>

      <div className="pt-2">
        <RichText
          props={experience.description}
          onChange={(e) => {
            experience.description = e;
            onChange();
          }}
        ></RichText>
      </div>
    </div>
  );
}
