import Input from './Input';
import { Experience as ExperienceType } from '../types/Experience';
import { ChangeEvent } from 'react';
import { Calendar } from '@carbon/icons-react';
import styles from './Experience.module.scss';
import TextArea from './TextArea';

interface ExperienceProps {
  props: [string, ExperienceType];
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => void;
}

export default function Experience({ props, onChange }: ExperienceProps) {
  const [key, value] = props;

  const handleExperienceChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e, key);
  };

  return (
    <div className={`${styles.experience} flex flex-col`}>
      <div className="flex flex-wrap-reverse justify-between">
        <Input
          props={['title', value.title]}
          className="max-w-xs md:max-w-lg font-bold outline-none highlight"
          onChange={handleExperienceChange}
        ></Input>
        <div className="flex items-center justify-end">
          <Calendar></Calendar>
          <Input
            props={['date', value.date]}
            className="max-w-xs md:max-w-lg w-[115px] font-bold text-xs outline-none highlight"
            onChange={handleExperienceChange}
          ></Input>
        </div>
      </div>
      <div className="flex flex-wrap-reverse justify-between">
        <Input
          props={['company', value.company]}
          className="text-sm max-w-xs md:max-w-lg outline-none highlight"
          onChange={handleExperienceChange}
        ></Input>
        <Input
          props={['topic', value.topic]}
          className="max-w-xs md:max-w-lg w-[73px] text-xs outline-none highlight"
          onChange={handleExperienceChange}
        ></Input>
      </div>
      <ul className="flex flex-col gap-3 list-disc py-2 px-6">
        {value.descriptions.map((m, i) => (
          <li key={i} className="text-xs">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
