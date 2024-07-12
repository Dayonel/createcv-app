import React, { forwardRef, CSSProperties } from 'react';
import classNames from 'classnames';

import styles from './Action.module.scss';

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background?: string;
  };
  fill?: string;
  cursor?: CSSProperties['cursor'];
  reverseRemove?: boolean;
}

export default forwardRef<HTMLButtonElement, ActionProps>(function Action(
  { active, className, reverseRemove, cursor, style, fill, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      {...props}
      className={classNames(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          '--fill': fill || active?.fill,
          '--background': active?.background,
        } as CSSProperties
      }
      type="button"
    />
  );
});
