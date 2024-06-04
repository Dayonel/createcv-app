import { animated, useSpring, easings } from '@react-spring/web';
import styles from './Placeholder.module.scss';
import { forwardRef, useEffect, useState } from 'react';
import { IconButton } from '@carbon/react';
import { Add } from '@carbon/icons-react';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  edit: boolean;
  wrapperStyle?: string;
}
export const Placeholder = forwardRef<HTMLDivElement, PlaceholderProps>(
  ({ edit, wrapperStyle }, ref) => {
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
          <animated.div
            ref={ref}
            className={`${
              wrapperStyle || styles.placeholder
            } absolute z-10 hover:z-20`}
            style={style}
          >
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
          </animated.div>
        )}
      </>
    );
  }
);
