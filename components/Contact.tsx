import styles from './Contact.module.scss';
import Input from './Input';
import { ChangeEvent } from 'react';
import {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Link,
} from '@carbon/icons-react';
import { Contact as ContactType } from '../types/Contact';

interface ContactProps {
  props: [string, ContactType];
  onChange: () => void;
}

const contactIcons = {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Link,
};

export default function Contact({ props, onChange }: ContactProps) {
  const [key, contact] = props;
  const Component = contactIcons[contact.icon as keyof typeof contactIcons]; // Correct! JSX type can be a capitalized variable.

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    contact.text = e.target.value;
    onChange();
  };

  return (
    <span className={`pl-[6px] flex items-center h-[24px] ${styles.contact}`}>
      {<Component></Component>}
      <Input
        props={[key, contact.text]}
        className="max-w-xs md:max-w-lg text-xs outline-none highlight"
        onChange={onChangeHandler}
      ></Input>
    </span>
  );
}
