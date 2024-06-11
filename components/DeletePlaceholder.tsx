import { TrashCan } from '@carbon/icons-react';
import styles from './DeletePlaceholder.module.scss';
import { forwardRef } from 'react';
import classNames from 'classnames';
import Transition from './Animations/Transition';

interface DeletePlaceholderProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  edit: boolean;
}

export default forwardRef<HTMLButtonElement, DeletePlaceholderProps>(
  function DeletePlaceholder({ className, edit, ...props }, ref) {
    return (
      <Transition
        edit={edit}
        className={classNames(styles.deletePlaceholder, className)}
      >
        <button ref={ref} {...props}>
          <TrashCan></TrashCan>
        </button>
      </Transition>
    );
  }
);
