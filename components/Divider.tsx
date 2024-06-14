import useColorStore from '@/store/colorStore';
import styles from './Divider.module.scss';
import { forwardRef, useContext } from 'react';
import { ColorContext } from './ColorProvider';
import classnames from 'classnames';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean;
  children?: any;
}

export default forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { dashed, children, className, ...props },
  ref
) {
  const serverColor = useContext(ColorContext);
  const { color } = useColorStore();

  return (
    <div
      ref={ref}
      className={classnames(`pr-[6px] w-full`, className)}
      {...props}
    >
      <div
        className={`relative overflow-x-clip ${styles.divider} ${
          dashed ? 'after:border-dashed' : 'after:border-solid'
        }`}
        style={{ color: serverColor || color }}
      >
        {children}
      </div>
    </div>
  );
});
