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
import { Contact as ContactType } from '../types/contact';
import RichText from '../../../rich-text/rich-text';
import useColorStore from '@/store/color-store';
import { getText } from '@/utils/rich-text-utils';

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
  const Component = contactIcons[props.icon as keyof typeof contactIcons];
  const { color } = useColorStore();

  const isLink = links.includes(props.icon);
  const text = getText(props.text);
  const href = /^https?:\/\//.test(text) ? text : `https://${text}`;

  return (
    <span className={`flex items-center`}>
      {<Component fill={color}></Component>}

      {isLink && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          className="cv-link max-w-52 text-xs hidden print:block"
        >
          {text}
        </a>
      )}

      <RichText
        className={`max-w-52 text-xs ${isLink ? 'print:hidden cv-link' : ''}`}
        props={props.text}
        onChange={(e) => {
          props.text = e;
          onChange();
        }}
        input
      ></RichText>
    </span>
  );
}
