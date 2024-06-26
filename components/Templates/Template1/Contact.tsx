import {
  Email,
  LocationFilled,
  LogoDiscord,
  LogoFacebook,
  LogoGithub,
  LogoInstagram,
  LogoLinkedin,
  LogoPinterest,
  LogoX,
  LogoYoutube,
  Phone,
  Link,
  Wikis,
} from '@carbon/icons-react';
import { Contact as ContactType } from './types/Contact';
import RichText from '../../RichText/RichText';
import useColorStore from '@/store/colorStore';

export interface ContactProps {
  props: ContactType;
  onChange: () => void;
}

const contactIcons = {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Link,
  LogoX,
  LogoInstagram,
  LogoDiscord,
  LogoFacebook,
  LogoYoutube,
  LogoPinterest,
  Wikis,
};

export default function Contact({ props, onChange }: ContactProps) {
  const Component = contactIcons[props.icon as keyof typeof contactIcons]; // Correct! JSX type can be a capitalized variable.
  const { color } = useColorStore();

  return (
    <span className={`flex items-center`}>
      {<Component fill={color}></Component>}
      <RichText
        className="max-w-52 text-xs"
        props={props.text}
        onChange={(e) => {
          props.text = e;
          onChange();
        }}
        input
        remove
      ></RichText>
    </span>
  );
}
