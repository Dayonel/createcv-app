import styles from './Contact.module.scss';
import {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Link,
} from '@carbon/icons-react';
import { Contact as ContactType } from '../types/Contact';
import RichText from './RichText/RichText';

export interface ContactProps {
  props: ContactType;
  onChange: () => void;
  onControlsVisible: (e: boolean) => void;
}

const contactIcons = {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Link,
};

export default function Contact({
  props,
  onChange,
  onControlsVisible,
}: ContactProps) {
  const Component = contactIcons[props.icon as keyof typeof contactIcons]; // Correct! JSX type can be a capitalized variable.

  return (
    <span className={`flex items-center ${styles.contact}`}>
      {<Component></Component>}
      <RichText
        className="max-w-52 md:max-w-52 text-xs"
        props={props.text}
        onChange={(e) => {
          props.text = e;
          onChange();
        }}
        onControlsVisible={onControlsVisible}
        input
      ></RichText>
    </span>
  );
}
