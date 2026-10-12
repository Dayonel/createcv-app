import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<any>();
  const latest = useRef(callback);

  useEffect(() => {
    latest.current = callback;
  });

  useEffect(() => {
    let initialClickInside = false;

    const handlePointerDown = (e: PointerEvent) => {
      initialClickInside = ref.current && ref.current.contains(e.target);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !initialClickInside
      ) {
        latest.current();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return ref;
};
