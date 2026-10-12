import { forwardRef, useContext } from 'react';
import styles from './placeholder.module.scss';
import classNames from 'classnames';
import Transition from '../transitions/transition';
import { MenuContext } from '../providers/contexts';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  children?: any;
  childrenClassName?: string;
}
export default forwardRef<HTMLDivElement, PlaceholderProps>(
  function Placeholder(
    { className, childrenClassName, children, ...props },
    ref
  ) {
    const { edit } = useContext(MenuContext);

    return (
      <div className="print:hidden">
        <Transition active={edit} className="w-full">
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
      </div>
    );
  }
);
