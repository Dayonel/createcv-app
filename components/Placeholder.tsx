import { forwardRef } from 'react';
import styles from './Placeholder.module.scss';
import classNames from 'classnames';
import { Add } from './Add';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  edit: boolean;
}
export const Placeholder = forwardRef<HTMLDivElement, PlaceholderProps>(
  ({ className, edit, ...props }, ref) => {
    return (
      <>
        {edit && (
          <div
            ref={ref}
            {...props}
            className={classNames(styles.placeholder, className)}
          >
            <Add edit={edit}></Add>
          </div>
        )}
      </>
    );
  }
);
