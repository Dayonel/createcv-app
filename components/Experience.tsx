import Input from './Input';
import { Experience as ExperienceType } from '../types/Experience';
import { ChangeEvent } from 'react';
import { Calendar } from '@carbon/icons-react';
import styles from './Experience.module.scss';

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
          className="max-w-xs md:max-w-lg font-bold outline-none highlight"
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
          ></Input>
        </div>
      </div>
      <div className="flex flex-wrap-reverse justify-between">
        <Input
          props={[key + '_company', experience.company]}
          className="text-sm max-w-xs md:max-w-lg outline-none highlight"
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
        ></Input>
      </div>
      <ul className="flex flex-col gap-3 list-disc py-2 px-6">
        {experience.descriptions.map((m, i) => (
          <li key={i} className="text-xs">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
