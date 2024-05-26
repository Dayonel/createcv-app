import { TrashCan } from '@carbon/icons-react';
import { IconButton } from '@carbon/react';
import styles from './Remove.module.scss';

interface RemoveProps {
  onClick: () => void;
}

export default function Remove({ onClick }: RemoveProps) {
  return (
    <div className={`${styles.remove} normal-case`}>
      <IconButton
        label="Remove"
        kind="ghost"
        size="sm"
        align="bottom"
        onClick={onClick}
      >
        <TrashCan></TrashCan>
      </IconButton>
    </div>
  );
}
