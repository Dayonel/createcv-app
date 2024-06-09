import { animated, easings, useSpring } from '@react-spring/web';
import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Transition.module.scss';

interface TransitionParams extends React.HTMLAttributes<HTMLDivElement> {
  edit: boolean;
  children: any;
}

export default forwardRef<HTMLDivElement, TransitionParams>(function Transition(
  { edit, children, className },
  ref
) {
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
          style={style}
          className={classNames(styles.transition, className)}
        >
          {children}
        </animated.div>
      )}
    </>
  );
});
