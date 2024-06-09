import { forwardRef, useEffect, useState } from 'react';
import styles from './Placeholder.module.scss';
import classNames from 'classnames';
import { IconButton } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import Transition from './Animations/Transition';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  edit: boolean;
  add?: boolean;
  children?: any;
  childrenClassName?: string;
}
export default forwardRef<HTMLDivElement, PlaceholderProps>(
  function Placeholder(
    { className, childrenClassName, edit, add, children, ...props },
    ref
  ) {
    return (
      <Transition edit={edit} className="w-full">
        <div className={classNames(styles.children, childrenClassName)}>
          {children}
          <div
            ref={ref}
            {...props}
            className={classNames(styles.placeholder, className)}
            data-placeholder={props.placeholder}
          >
            {add && (
              <div className={`${styles.wrapper} z-20`}>
                <IconButton
                  className={styles.add}
                  type="button"
                  label="Add"
                  kind="ghost"
                  size="sm"
                  align="bottom"
                >
                  <Add></Add>
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </Transition>
    );
  }
);
