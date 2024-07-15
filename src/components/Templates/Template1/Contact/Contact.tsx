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
import { Contact as ContactType } from '../types/Contact';
import RichText from '../../../rich-text/rich-text';
import useColorStore from '@/store/colorStore';
import { getText } from '@/utils/richTextUtils';

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

const links = Object.keys(contactIcons).filter(
  (f) => f !== 'Email' && f !== 'LocationFilled' && f !== 'Phone'
);

export default function Contact({ props, onChange }: ContactProps) {
  const Component = contactIcons[props.icon as keyof typeof contactIcons]; // Correct! JSX type can be a capitalized variable.
  const { color } = useColorStore();

  const href = () => {
    const prefix = props.icon === 'Phone' ? 'tel:' : 'https://';
    const text = getText(props.text);
    return prefix + text;
  };

  return (
    <span className={`flex items-center`}>
      {<Component fill={color}></Component>}

      {links.indexOf(props.icon) !== -1 && (
        <a
          target="blank"
          rel="noopener noreferrer"
          href={href()}
          style={{ color: 'var(--cds-text-primary)' }}
          className={`max-w-52 text-xs hidden print:block`}
        >
          {getText(props.text)}
        </a>
      )}

      <RichText
        className={`max-w-52 text-xs ${
          links.indexOf(props.icon) !== -1 && 'print:hidden'
        }`}
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
