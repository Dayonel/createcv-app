import { animated, easings, useSpring } from '@react-spring/web';
import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './transition.module.scss';

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

  return (
    <>
      {(active || show) && (
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
