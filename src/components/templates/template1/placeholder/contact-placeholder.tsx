import { CSSProperties, forwardRef } from 'react';
import styles from './contact-placeholder.module.scss';
import {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  LogoX,
  Phone,
  Link,
  LogoInstagram,
  LogoDiscord,
  LogoFacebook,
  LogoYoutube,
  LogoPinterest,
} from '@carbon/icons-react';
import { getText, getTextContent } from '@/utils/rich-text-utils';
import { Contact } from '../types/contact';
import useColorStore from '@/store/color-store';
import { useOutsideClick } from '@/hooks/use-outside-click';

interface ContactPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onAdd: (e: Contact) => void;
  onClose: () => void;
  placeholder: Contact[];
}

export default forwardRef<HTMLDivElement, ContactPlaceholderProps>(
  function ContactPlaceholder(
    { open, onAdd, style, onClose, placeholder, ...props },
    ref
  ) {
    const { color } = useColorStore();
    const wrapper = useOutsideClick(() => onClose());

    return (
      <>
        {open && (
          <div {...props} ref={ref} className={`print:hidden w-full absolute`}>
            <ul ref={wrapper} className={styles.menu}>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder[0] as Contact)}
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <Email></Email>
                  <span>{getText(placeholder[0].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder[1] as Contact)}
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoLinkedin></LogoLinkedin>
                  <span>{getText(placeholder[1].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder[2] as Contact)}
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <Phone></Phone>
                  <span>{getText(placeholder[2].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder[3] as Contact)}
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoGithub></LogoGithub>
                  <span>{getText(placeholder[3].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder[4] as Contact)}
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LocationFilled></LocationFilled>
                  <span>{getText(placeholder[4].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder[5] as Contact)}
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <Link></Link>
                  <span>{getText(placeholder[5].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAdd({
                      icon: 'LogoX',
                      text: getTextContent('x.com/example'),
                    } as Contact)
                  }
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoX></LogoX>
                  <span>x.com/example</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAdd({
                      icon: 'LogoInstagram',
                      text: getTextContent('instagram.com/example'),
                    } as Contact)
                  }
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoInstagram></LogoInstagram>
                  <span>instagram.com/example</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAdd({
                      icon: 'LogoDiscord',
                      text: getTextContent('discord.com/example'),
                    } as Contact)
                  }
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoDiscord></LogoDiscord>
                  <span>discord.com/example</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAdd({
                      icon: 'LogoFacebook',
                      text: getTextContent('facebook.com/example'),
                    } as Contact)
                  }
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoFacebook></LogoFacebook>
                  <span>facebook.com/example</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAdd({
                      icon: 'LogoYoutube',
                      text: getTextContent('youtube.com/example'),
                    } as Contact)
                  }
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoYoutube></LogoYoutube>
                  <span>youtube.com/example</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAdd({
                      icon: 'LogoPinterest',
                      text: getTextContent('pinterest.com/example'),
                    } as Contact)
                  }
                  style={
                    {
                      '--fill': color,
                    } as CSSProperties
                  }
                >
                  <LogoPinterest></LogoPinterest>
                  <span>pinterest.com/example</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  }
);
