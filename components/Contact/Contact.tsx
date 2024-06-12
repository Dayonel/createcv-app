import {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Wikis,
} from '@carbon/icons-react';
import { Contact as ContactType } from '../../types/Contact';
import RichText from '../RichText/RichText';
import useColorStore from '@/store/useStore';

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
  Wikis,
};

export default function Contact({
  props,
  onChange,
  onControlsVisible,
}: ContactProps) {
  const Component = contactIcons[props.icon as keyof typeof contactIcons]; // Correct! JSX type can be a capitalized variable.
  const { color } = useColorStore();

  return (
    <span className={`flex items-center`}>
      {<Component fill={color}></Component>}
      <RichText
        className="max-w-52 sm:max-w-52 text-xs"
        props={props.text}
        onChange={(e) => {
          props.text = e;
          onChange();
        }}
        onControlsVisible={onControlsVisible}
        input
        empty={props.empty}
      ></RichText>
    </span>
  );
}
