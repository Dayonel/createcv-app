import { forwardRef, useEffect, useState } from 'react';
import styles from './Placeholder.module.scss';
import classNames from 'classnames';
import Transition from './Animations/Transition';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  edit: boolean;
  children?: any;
  childrenClassName?: string;
}
export default forwardRef<HTMLDivElement, PlaceholderProps>(
  function Placeholder(
    { className, childrenClassName, edit, children, ...props },
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
          ></div>
        </div>
      </Transition>
    );
  }
);
