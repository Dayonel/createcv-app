import styles from './Double.module.scss';
import Divider from '../Divider';
import Skills from '../Skills';
import Languages from '../Languages';
import { Double as DoubleType } from '@/types/Double';

interface DoubleProps {
  props: DoubleType;
  onChange: () => void;
}

export default function Double({ props, onChange }: DoubleProps) {
  const { content } = props;
  const [first, second] = content || [];

  return (
    <div>
      <div className={styles.double}>
        <div className="flex flex-col w-full gap-1">
          {first.name !== undefined && (
            <Divider
              props={first.name}
              onChange={(e) => {
                first.name = e.target.value;
                onChange();
              }}
            ></Divider>
          )}
          {first.skills && (
            <Skills
              props={['skills', first.skills]}
              onChange={onChange}
            ></Skills>
          )}
        </div>
        <div className="flex flex-col w-full">
          {second.name !== undefined && (
            <Divider
              props={second.name}
              onChange={(e) => {
                second.name = e.target.value;
                onChange();
              }}
            ></Divider>
          )}
          <div className="flex flex-col gap-3">
            {second.languages && (
              <Languages
                props={['languages', second.languages]}
                onChange={onChange}
              ></Languages>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
