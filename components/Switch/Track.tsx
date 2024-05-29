import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './Switch.module.scss';
import { State } from './constants';

export function Track() {
  const { setNodeRef: setOnRegionNodeRef } = useDroppable({
    id: State.On,
  });
  const { setNodeRef: setOffRegionNodeRef } = useDroppable({
    id: State.Off,
  });

  return (
    <span className={styles.Track}>
      <span ref={setOffRegionNodeRef} className={styles.OffRegion} />
      <span ref={setOnRegionNodeRef} className={styles.OnRegion} />
    </span>
  );
}
