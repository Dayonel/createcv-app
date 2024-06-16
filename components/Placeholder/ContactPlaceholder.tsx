import './Menu.scss';
import {
  CSSProperties,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './ContactPlaceholder.module.scss';
import {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Wikis,
} from '@carbon/icons-react';
import placeholder from '../../data/placeholder.json';
import { getText } from '@/utils/richTextUtils';
import { Contact } from '@/types/Contact';
import useColorStore from '@/store/colorStore';
import { ColorContext } from '../ColorProvider';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface ContactPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onAdd: (e: Contact) => void;
  onClose: () => void;
}

export default forwardRef<HTMLDivElement, ContactPlaceholderProps>(
  function ContactPlaceholder({ open, onAdd, style, onClose, ...props }, ref) {
    const [mounted, setMounted] = useState(false);
    const serverColor = useContext(ColorContext);
    const { color } = useColorStore();
    const wrapper = useOutsideClick(() => onClose());

    useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <>
        {open && (
          <div
            {...props}
            ref={ref}
            className={`print:hidden w-full absolute`}
          >
            <ul ref={wrapper} className={styles.menu}>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder.contacts[0] as Contact)}
                  style={
                    {
                      '--fill': mounted ? color : serverColor,
                    } as CSSProperties
                  }
                >
                  <Email></Email>
                  <span>{getText(placeholder.contacts[0].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder.contacts[1] as Contact)}
                  style={
                    {
                      '--fill': mounted ? color : serverColor,
                    } as CSSProperties
                  }
                >
                  <LogoLinkedin></LogoLinkedin>
                  <span>{getText(placeholder.contacts[1].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder.contacts[2] as Contact)}
                  style={
                    {
                      '--fill': mounted ? color : serverColor,
                    } as CSSProperties
                  }
                >
                  <Phone></Phone>
                  <span>{getText(placeholder.contacts[2].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder.contacts[3] as Contact)}
                  style={
                    {
                      '--fill': mounted ? color : serverColor,
                    } as CSSProperties
                  }
                >
                  <LogoGithub></LogoGithub>
                  <span>{getText(placeholder.contacts[3].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder.contacts[4] as Contact)}
                  style={
                    {
                      '--fill': mounted ? color : serverColor,
                    } as CSSProperties
                  }
                >
                  <LocationFilled></LocationFilled>
                  <span>{getText(placeholder.contacts[4].text)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAdd(placeholder.contacts[5] as Contact)}
                  style={
                    {
                      '--fill': mounted ? color : serverColor,
                    } as CSSProperties
                  }
                >
                  <Wikis></Wikis>
                  <span>{getText(placeholder.contacts[5].text)}</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  }
);
