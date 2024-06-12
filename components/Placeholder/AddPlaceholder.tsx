import './AddButton.css';
import { forwardRef } from 'react';
import Transition from '../Animations/Transition';
import { IconButton } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import styles from './AddPlaceholder.module.scss';
import classNames from 'classnames';

interface AddPlaceholderProps extends React.HTMLAttributes<HTMLButtonElement> {
  edit: boolean;
  label: string;
  skeletonClassName?: string;
  buttonClassName?: string;
}

export default forwardRef<HTMLButtonElement, AddPlaceholderProps>(
  function AddPlaceholder(
    { className, skeletonClassName, buttonClassName, edit, label, ...props },
    ref
  ) {
    return (
      <Transition
        edit={edit}
        className={classNames('add-placeholder', className)}
      >
        <div
          className={`${classNames(
            styles.skeleton,
            skeletonClassName
          )} flex items-center w-full`}
        >
          <IconButton
            ref={ref}
            {...props}
            label={label}
            size="sm"
            kind="ghost"
            align="bottom"
            className={buttonClassName}
          >
            <Add></Add>
          </IconButton>
        </div>
      </Transition>
    );
  }
);
