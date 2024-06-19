import { animated, easings, useSpring } from '@react-spring/web';
import { forwardRef, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Transition.module.scss';

interface TransitionParams extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  children: any;
}

export default forwardRef<HTMLDivElement, TransitionParams>(function Transition(
  { children, className, active, ...props },
  ref
) {
  const [show, setShow] = useState(() => active);
  const style = useSpring({
    opacity: active ? 1 : 0,
    config: {
      duration: 175,
      easing: easings.linear,
    },
    onRest: () => setShow(active),
  });

  useEffect(() => {
    if (!active) {
      style.opacity.start(); // play on close
    } else {
      setShow(active); // play on start immediately
    }
  }, [active]);

  return (
    <>
      {show && (
        <animated.div
          ref={ref}
          style={style}
          {...props}
          className={classNames(styles.transition, className)}
        >
          {children}
        </animated.div>
      )}
    </>
  );
});
