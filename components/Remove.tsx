import { TrashCan } from '@carbon/icons-react';
import { IconButton } from '@carbon/react';
import styles from './Remove.module.scss';

interface RemoveProps {
  onClick: () => void;
  onBlur: () => void;
}

export default function Remove({ onClick, onBlur }: RemoveProps) {
  return (
    <div className={`${styles.remove} normal-case`}>
      <IconButton
        label="Remove"
        kind="ghost"
        size="sm"
        align="bottom"
        onClick={onClick}
        onBlur={onBlur}
      >
        <TrashCan></TrashCan>
      </IconButton>
    </div>
  );
}
