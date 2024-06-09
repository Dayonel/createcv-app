import './Menu.scss';
import { forwardRef } from 'react';
import styles from './ContactPlaceholder.module.scss';
import { MenuButton, MenuItem } from '@carbon/react';
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

interface ContactPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  onAdd: (e: Contact) => void;
}

export default forwardRef<HTMLDivElement, ContactPlaceholderProps>(
  function ContactPlaceholder({ onAdd, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={`${styles.wrapper} w-full mx-[6px]`}>
        <div className="menu w-full">
          <MenuButton
            className="w-full"
            label="+ Add"
            kind="ghost"
            menuAlignment="bottom"
            size="sm"
          >
            <MenuItem
              label={getText(placeholder.contacts[0].text)}
              renderIcon={Email}
              onClick={() => onAdd(placeholder.contacts[0] as Contact)}
            ></MenuItem>
            <MenuItem
              label={getText(placeholder.contacts[1].text)}
              renderIcon={LogoLinkedin}
              onClick={() => onAdd(placeholder.contacts[1] as Contact)}
            ></MenuItem>
            <MenuItem
              label={getText(placeholder.contacts[2].text)}
              renderIcon={Phone}
              onClick={() => onAdd(placeholder.contacts[2] as Contact)}
            ></MenuItem>
            <MenuItem
              label={getText(placeholder.contacts[3].text)}
              renderIcon={LogoGithub}
              onClick={() => onAdd(placeholder.contacts[3] as Contact)}
            ></MenuItem>
            <MenuItem
              label={getText(placeholder.contacts[4].text)}
              renderIcon={LocationFilled}
              onClick={() => onAdd(placeholder.contacts[4] as Contact)}
            ></MenuItem>
            <MenuItem
              label={getText(placeholder.contacts[5].text)}
              renderIcon={Wikis}
              onClick={() => onAdd(placeholder.contacts[5] as Contact)}
            ></MenuItem>
          </MenuButton>
        </div>
      </div>
    );
  }
);
