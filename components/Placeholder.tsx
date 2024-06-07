import { forwardRef, useEffect, useMemo, useState } from 'react';
import styles from './Placeholder.module.scss';
import classNames from 'classnames';
import { animated, easings, useSpring } from '@react-spring/web';
import { IconButton } from '@carbon/react';
import { Add } from '@carbon/icons-react';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  edit: boolean;
  noButton?: boolean;
}
export const Placeholder = forwardRef<HTMLDivElement, PlaceholderProps>(
  ({ className, edit, noButton, ...props }, ref) => {
    const [show, setShow] = useState(() => edit);
    const style = useSpring({
      opacity: edit ? 1 : 0,
      config: {
        duration: 175,
        easing: easings.linear,
      },
      onRest: () => setShow(edit),
    });

    useEffect(() => {
      if (!edit) {
        style.opacity.start(); // play on close
      } else {
        setShow(edit); // play on start immediately
      }
    }, [edit]);

    return (
      <>
        {show && (
          <animated.div ref={ref} style={style}>
            <div
              ref={ref}
              {...props}
              className={classNames(styles.placeholder, className)}
              data-placeholder={props.placeholder}
            >
              {!noButton && (
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
          </animated.div>
        )}
      </>
    );
  }
);
